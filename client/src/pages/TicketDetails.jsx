import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getTicketById, updateTicket } from '../services/api'

function TicketDetails() {
  const { ticketId } = useParams()
  const navigate = useNavigate()

  const [ticket, setTicket] = useState(null)
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [status, setStatus] = useState('')
  const [note, setNote] = useState('')
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        setLoading(true)
        setError('')

        const data = await getTicketById(ticketId)

        setTicket(data.ticket)
        setStatus(data.ticket.status)
      } catch (error) {
        console.error(error)
        setError('Failed to load ticket')
      } finally {
        setLoading(false)
      }
    }

    fetchTicket()
  }, [ticketId])

  const handleUpdate = async () => {
    try {
      setUpdating(true)
      setError('')

      const data = await updateTicket(ticketId, {
        status,
        notes: note,
      })

      setTicket(data.ticket)
      setNote('')

      // Refresh the ticket so the new note appears
      const refreshedData = await getTicketById(ticketId)

      setTicket(refreshedData.ticket)
      setNotes(refreshedData.notes || [])
      setStatus(refreshedData.ticket.status)
    } catch (error) {
      console.error(error)
      setError(error.message || 'Failed to update ticket')
    } finally {
      setUpdating(false)
    }
  }

  if (loading) {
    return (
      <main className="mx-auto max-w-5xl px-6 py-10">
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-8 text-center text-slate-400">
          Loading ticket...
        </div>
      </main>
    )
  }

  if (error && !ticket) {
    return (
      <main className="mx-auto max-w-5xl px-6 py-10">
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 text-red-400">
          {error}
        </div>

        <button
          onClick={() => navigate('/')}
          className="mt-4 rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800"
        >
          Back to Dashboard
        </button>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">

      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="mb-6 text-sm text-slate-400 transition hover:text-white"
      >
        ← Back to Dashboard
      </button>

      {/* Heading */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm text-blue-400">
            {ticket.ticket_id}
          </p>

          <h2 className="mt-1 text-3xl font-bold text-white">
            {ticket.subject}
          </h2>
        </div>

        <span className="w-fit rounded-full bg-slate-800 px-4 py-2 text-sm text-slate-300">
          {ticket.status}
        </span>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Ticket Information */}
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

        <h3 className="mb-6 text-lg font-semibold text-white">
          Ticket Information
        </h3>

        <div className="grid gap-6 sm:grid-cols-2">

          <div>
            <p className="text-sm text-slate-500">
              Customer Name
            </p>

            <p className="mt-1 text-white">
              {ticket.customer_name}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Customer Email
            </p>

            <p className="mt-1 text-white">
              {ticket.customer_email}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Created
            </p>

            <p className="mt-1 text-white">
              {new Date(ticket.created_at).toLocaleString()}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Last Updated
            </p>

            <p className="mt-1 text-white">
              {new Date(ticket.updated_at).toLocaleString()}
            </p>
          </div>

        </div>

        {/* Description */}
        <div className="mt-8 border-t border-slate-800 pt-6">

          <p className="text-sm text-slate-500">
            Description
          </p>

          <p className="mt-2 whitespace-pre-wrap leading-7 text-slate-300">
            {ticket.description}
          </p>

        </div>

      </div>

      {/* Update Ticket */}
      <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900 p-6">

        <h3 className="mb-6 text-lg font-semibold text-white">
          Update Ticket
        </h3>

        {/* Status */}
        <div>
          <label
            htmlFor="ticket-status"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            Status
          </label>

          <select
            id="ticket-status"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-blue-500 sm:w-72"
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        {/* Note */}
        <div className="mt-6">

          <label
            htmlFor="ticket-note"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            Add Note
          </label>

          <textarea
            id="ticket-note"
            value={note}
            onChange={(event) => setNote(event.target.value)}
            placeholder="Add an internal support note..."
            rows="4"
            className="w-full resize-none rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
          />

        </div>

        <button
          onClick={handleUpdate}
          disabled={updating}
          className="mt-4 rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {updating ? 'Saving...' : 'Save Changes'}
        </button>

      </div>
            {/* Notes */}
      <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900 p-6">

        <h3 className="mb-6 text-lg font-semibold text-white">
          Notes
        </h3>

        {notes.length === 0 ? (
          <p className="text-sm text-slate-500">
            No notes have been added yet.
          </p>
        ) : (
          <div className="space-y-4">

            {notes.map((item) => (
              <div
                key={item.id}
                className="rounded-lg border border-slate-800 bg-slate-950 p-4"
              >

                <p className="whitespace-pre-wrap text-sm leading-6 text-slate-300">
                  {item.note_text}
                </p>

                <p className="mt-3 text-xs text-slate-500">
                  {new Date(item.created_at).toLocaleString()}
                </p>

              </div>
            ))}

          </div>
        )}

      </div>

    </main>
  )
}

export default TicketDetails