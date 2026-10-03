const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// Get all tickets
export const getTickets = async (params = {}) => {
  const query = new URLSearchParams(params).toString()

  const response = await fetch(
    `${API_BASE_URL}/tickets${query ? `?${query}` : ''}`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch tickets')
  }

  return response.json()
}

// Get one ticket
export const getTicketById = async (ticketId) => {
  const response = await fetch(
    `${API_BASE_URL}/tickets/${ticketId}`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch ticket')
  }

  return response.json()
}

// Create a new ticket
export const createTicket = async (ticketData) => {
  const response = await fetch(
    `${API_BASE_URL}/tickets`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ticketData),
    }
  )

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))

    throw new Error(
      error.message || 'Failed to create ticket'
    )
  }

  return response.json()
}

// Update a ticket
export const updateTicket = async (ticketId, ticketData) => {
  const response = await fetch(
    `${API_BASE_URL}/tickets/${ticketId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ticketData),
    }
  )

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))

    throw new Error(
      error.message || 'Failed to update ticket'
    )
  }

  return response.json()
}