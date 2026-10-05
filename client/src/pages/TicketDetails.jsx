import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getTicketById, updateTicket } from '../services/api'

const SUPPORT_AGENTS = [
  'Vaibhav Gupta',
  'Amit Sharma',
  'Sneha Patel',
  'Rahul Mehta',
]

function TicketDetails() {
  const { ticketId } = useParams()
  const navigate = useNavigate()

  const [ticket, setTicket] = useState(null)
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [status, setStatus] = useState('')
  const [note, setNote] = useState('')
  const [assignedTo, setAssignedTo] = useState('')
  const [updating, setUpdating] = useState(false)

  const fetchTicket = async () => {
    try {
      setLoading(true)
      setError('')

      const data = await getTicketById(ticketId)

      setTicket(data.ticket)
      setNotes(data.notes || [])
      setStatus(data.ticket.status)
      setAssignedTo(data.ticket.assigned_to || '')
    } catch (error) {
      console.error(error)
      setError('Failed to load ticket')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTicket()
  }, [ticketId])

  const handleUpdate = async () => {
    if (
        !note.trim() &&
        status === ticket.status &&
        assignedTo === (ticket.assigned_to || '')
    ) {
        return
    }

    try {
      setUpdating(true)
      setError('')

      await updateTicket(ticketId, {
        status,
        assigned_to: assignedTo || null,
        notes: note.trim(),
      })

      setNote('')

      await fetchTicket()
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
        <div className="rounded-lg border border-slate-200 bg-white px-6 py-12 text-center text-sm text-slate-500">
          Loading ticket...
        </div>
      </main>
    )
  }

  if (error && !ticket) {
    return (
      <main className="mx-auto max-w-5xl px-6 py-10">

        <div className="rounded-lg border border-red-200 bg-red-50 p-5 text-sm text-red-700">
          {error}
        </div>

        <button
          onClick={() => navigate('/')}
          className="mt-4 rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Back to Tickets
        </button>

      </main>
    )
  }

  const getStatusClasses = (ticketStatus) => {
    if (ticketStatus === 'Open') {
      return 'bg-blue-50 text-blue-700 ring-blue-600/20'
    }

    if (ticketStatus === 'In Progress') {
      return 'bg-amber-50 text-amber-700 ring-amber-600/20'
    }

    return 'bg-emerald-50 text-emerald-700 ring-emerald-600/20'
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">

      {/* Back */}
      <button
        onClick={() => navigate('/')}
        className="mb-6 text-sm font-medium text-slate-500 transition hover:text-slate-900"
      >
        ← Back to tickets
      </button>

      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">

        <div>
          <p className="text-sm font-medium text-blue-600">
            {ticket.ticket_id}
          </p>

          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
            {ticket.subject}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Created {new Date(ticket.created_at).toLocaleString()}
          </p>
        </div>

        <span
          className={`inline-flex w-fit items-center rounded-full px-3 py-1.5 text-xs font-medium ring-1 ring-inset ${getStatusClasses(
            ticket.status
          )}`}
        >
          {ticket.status}
        </span>

      </div>

      {error && (
        <div className="mb-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Customer + Description */}
      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">

        {/* Main ticket */}
        <div className="rounded-lg border border-slate-200 bg-white">

          <div className="border-b border-slate-200 px-6 py-5">
            <h3 className="text-sm font-semibold text-slate-900">
              Issue Description
            </h3>
          </div>

          <div className="px-6 py-6">
            <p className="whitespace-pre-wrap text-sm leading-7 text-slate-700">
              {ticket.description}
            </p>
          </div>

        </div>

        {/* Customer */}
        <div className="rounded-lg border border-slate-200 bg-white">

          <div className="border-b border-slate-200 px-5 py-4">
            <h3 className="text-sm font-semibold text-slate-900">
              Customer
            </h3>
          </div>

          <div className="space-y-4 px-5 py-5">

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Name
              </p>

              <p className="mt-1 text-sm font-medium text-slate-900">
                {ticket.customer_name}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Email
              </p>

              <p className="mt-1 break-all text-sm text-slate-600">
                {ticket.customer_email}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Last Updated
              </p>

              <p className="mt-1 text-sm text-slate-600">
                {new Date(ticket.updated_at).toLocaleString()}
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* Update */}
      <div className="mt-6 rounded-lg border border-slate-200 bg-white">

        <div className="border-b border-slate-200 px-6 py-5">
          <h3 className="text-sm font-semibold text-slate-900">
            Update Ticket
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Change the ticket status or add an internal note.
          </p>
        </div>

        <div className="space-y-6 p-6">

        <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
                Assigned To
            </label>

            <select
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
                <option value="">Unassigned</option>

                {SUPPORT_AGENTS.map((agent) => (
                <option key={agent} value={agent}>
                    {agent}
                </option>
                ))}
            </select>
          </div>

          {/* Status */}
          <div>
            <label
              htmlFor="ticket-status"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Status
            </label>

            <select
              id="ticket-status"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 sm:w-64"
            >
              <option value="Open">
                Open
              </option>

              <option value="In Progress">
                In Progress
              </option>

              <option value="Closed">
                Closed
              </option>
            </select>
          </div>

          {/* Note */}
          <div>
            <label
              htmlFor="ticket-note"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Add Note
            </label>

            <textarea
              id="ticket-note"
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="Add an internal note for the support team..."
              rows="4"
              className="w-full resize-y rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-sm leading-6 text-slate-900 outline-none placeholder:text-slate-400 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
            />
          </div>

          <div className="flex justify-end border-t border-slate-100 pt-5">
        <button
        onClick={handleUpdate}
        disabled={
            updating ||
            (
            !note.trim() &&
            status === ticket.status &&
            assignedTo === (ticket.assigned_to || '')
            )
        }
        className="rounded-md bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
        {updating ? 'Saving...' : 'Save Changes'}
        </button>
          </div>

        </div>

      </div>

      {/* Notes */}
      <div className="mt-6 rounded-lg border border-slate-200 bg-white">

        <div className="border-b border-slate-200 px-6 py-5">
          <div className="flex items-center justify-between">

            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                Internal Notes
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Notes visible to the support team.
              </p>
            </div>

            <span className="text-xs font-medium text-slate-400">
              {notes.length} {notes.length === 1 ? 'note' : 'notes'}
            </span>

          </div>
        </div>

        <div className="p-6">

          {notes.length === 0 ? (
            <p className="text-sm text-slate-500">
              No internal notes have been added yet.
            </p>
          ) : (
            <div className="space-y-4">

              {notes.map((item) => (
                <div
                  key={item.id}
                  className="border-l-2 border-slate-200 pl-4"
                >

                  <p className="whitespace-pre-wrap text-sm leading-6 text-slate-700">
                    {item.note_text}
                  </p>

                  <p className="mt-2 text-xs text-slate-400">
                    {new Date(item.created_at).toLocaleString()}
                  </p>

                </div>
              ))}

            </div>
          )}

        </div>

      </div>

    </main>
  )
}

export default TicketDetails