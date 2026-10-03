import supabase from '../config/supabase.js'

export const createTicket = async (req, res) => {
  try {
    const {
      customer_name,
      customer_email,
      subject,
      description
    } = req.body

    // Basic validation
    if (!customer_name || !customer_email || !subject || !description) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      })
    }

    // Find the latest ticket number
    const { data: latestTicket, error: latestError } = await supabase
      .from('tickets')
      .select('ticket_id')
      .order('id', { ascending: false })
      .limit(1)

    if (latestError) {
      throw latestError
    }

    let nextNumber = 1

    if (latestTicket && latestTicket.length > 0) {
      const lastTicketId = latestTicket[0].ticket_id
      const lastNumber = parseInt(lastTicketId.replace('TKT-', ''), 10)

      if (!isNaN(lastNumber)) {
        nextNumber = lastNumber + 1
      }
    }

    const ticketId = `TKT-${String(nextNumber).padStart(3, '0')}`

    // Insert ticket into database
    const { data, error } = await supabase
      .from('tickets')
      .insert([
        {
          ticket_id: ticketId,
          customer_name,
          customer_email,
          subject,
          description,
          status: 'Open'
        }
      ])
      .select()
      .single()

    if (error) {
      throw error
    }

    res.status(201).json({
      success: true,
      message: 'Ticket created successfully',
      ticket_id: data.ticket_id,
      created_at: data.created_at
    })

  } catch (error) {
    console.error('Create ticket error:', error)

    res.status(500).json({
      success: false,
      message: 'Failed to create ticket',
      error: error.message
    })
  }
}

export const getTickets = async (req, res) => {
  try {
    const { status, search } = req.query

    let query = supabase
      .from('tickets')
      .select('*')
      .order('created_at', { ascending: false })

    // Filter by status
    if (status) {
      query = query.eq('status', status)
    }

    // Search across ticket ID, customer name,
    // customer email, subject, and description
    if (search) {
      query = query.or(
        `ticket_id.ilike.%${search}%,customer_name.ilike.%${search}%,customer_email.ilike.%${search}%,subject.ilike.%${search}%,description.ilike.%${search}%`
      )
    }

    const { data, error } = await query

    if (error) {
      throw error
    }

    res.status(200).json({
      success: true,
      count: data.length,
      tickets: data
    })

  } catch (error) {
    console.error('Get tickets error:', error)

    res.status(500).json({
      success: false,
      message: 'Failed to fetch tickets',
      error: error.message
    })
  }
}

export const getTicketById = async (req, res) => {
  try {
    const { ticket_id } = req.params

    // Get the ticket
    const { data: ticket, error: ticketError } = await supabase
      .from('tickets')
      .select('*')
      .eq('ticket_id', ticket_id)
      .single()

    if (ticketError) {
      return res.status(404).json({
        success: false,
        message: 'Ticket not found',
      })
    }

    // Get notes belonging to this ticket
    const { data: notes, error: notesError } = await supabase
      .from('notes')
      .select('*')
      .eq('ticket_id', ticket_id)
      .order('created_at', {
        ascending: true,
      })

    if (notesError) {
      throw notesError
    }

    res.status(200).json({
      success: true,
      ticket,
      notes,
    })
  } catch (error) {
    console.error('Get ticket error:', error)

    res.status(500).json({
      success: false,
      message: 'Failed to fetch ticket',
    })
  }
}

export const updateTicket = async (req, res) => {
  try {
    const { ticket_id } = req.params
    const { status, notes } = req.body

    // Validate status if provided
    const allowedStatuses = ['Open', 'In Progress', 'Closed']

    if (status && !allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      })
    }

    // Check whether the ticket exists
    const { data: existingTicket, error: ticketError } = await supabase
      .from('tickets')
      .select('*')
      .eq('ticket_id', ticket_id)
      .single()

    if (ticketError) {
      if (ticketError.code === 'PGRST116') {
        return res.status(404).json({
          success: false,
          message: 'Ticket not found'
        })
      }

      throw ticketError
    }

    // Update ticket status
    if (status) {
      const { error: updateError } = await supabase
        .from('tickets')
        .update({
          status: status,
          updated_at: new Date().toISOString()
        })
        .eq('ticket_id', ticket_id)

      if (updateError) {
        throw updateError
      }
    }

    // Add note if provided
    let createdNote = null

    if (notes && notes.trim() !== '') {
      const { data: note, error: noteError } = await supabase
        .from('notes')
        .insert([
          {
            ticket_id: ticket_id,
            note_text: notes.trim()
          }
        ])
        .select()
        .single()

      if (noteError) {
        throw noteError
      }

      createdNote = note
    }

    // Get updated ticket
    const { data: updatedTicket, error: updatedTicketError } = await supabase
      .from('tickets')
      .select('*')
      .eq('ticket_id', ticket_id)
      .single()

    if (updatedTicketError) {
      throw updatedTicketError
    }

    res.status(200).json({
      success: true,
      message: 'Ticket updated successfully',
      ticket: updatedTicket,
      note: createdNote
    })

  } catch (error) {
    console.error('Update ticket error:', error)

    res.status(500).json({
      success: false,
      message: 'Failed to update ticket',
      error: error.message
    })
  }
}