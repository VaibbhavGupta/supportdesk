import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getTickets } from '../services/api'

function Dashboard() {
  const navigate = useNavigate()

  const [tickets, setTickets] = useState([])
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true)
        setError('')

        const params = {}

        if (search.trim()) {
          params.search = search
        }

        if (status) {
          params.status = status
        }

        const data = await getTickets(params)

        setTickets(data.tickets || [])
      } catch (error) {
        console.error(error)
        setError('Failed to load tickets')
      } finally {
        setLoading(false)
      }
    }

    fetchTickets()
  }, [search, status])

  const totalTickets = tickets.length

  const openTickets = tickets.filter(
    (ticket) => ticket.status === 'Open'
  ).length

  const inProgressTickets = tickets.filter(
    (ticket) => ticket.status === 'In Progress'
  ).length

  const closedTickets = tickets.filter(
    (ticket) => ticket.status === 'Closed'
  ).length

  const clearFilters = () => {
    setSearch('')
    setStatus('')
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
    <main className="mx-auto max-w-7xl px-6 py-10">

      {/* Page Header */}
      <div>
            <p className="text-sm font-medium text-blue-600">
                Support overview
            </p>

            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
                Dashboard
            </h2>

            <p className="mt-1 text-sm text-slate-500">
                Manage and track customer support tickets.
            </p>
            </div>

      {/* Statistics */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">
            Total Tickets
          </p>

          <p className="mt-2 text-2xl font-semibold text-slate-900">
            {totalTickets}
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">
              Open
            </p>

            <span className="h-2 w-2 rounded-full bg-blue-500" />
          </div>

          <p className="mt-2 text-2xl font-semibold text-slate-900">
            {openTickets}
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">
              In Progress
            </p>

            <span className="h-2 w-2 rounded-full bg-amber-500" />
          </div>

          <p className="mt-2 text-2xl font-semibold text-slate-900">
            {inProgressTickets}
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">
              Closed
            </p>

            <span className="h-2 w-2 rounded-full bg-emerald-500" />
          </div>

          <p className="mt-2 text-2xl font-semibold text-slate-900">
            {closedTickets}
          </p>
        </div>

      </div>

      {/* Filters */}
      <div className="mt-8 rounded-lg border border-slate-200 bg-white p-5">

        <div className="grid gap-4 md:grid-cols-[1fr_220px_auto] md:items-end">

          <div>
            <label
              htmlFor="ticket-search"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Search tickets
            </label>

            <input
              id="ticket-search"
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by ID, customer, email or subject..."
              className="w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
            />
          </div>

          <div>
            <label
              htmlFor="status-filter"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Status
            </label>

            <select
              id="status-filter"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
            >
              <option value="">
                All statuses
              </option>

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

          {(search || status) && (
            <button
              onClick={clearFilters}
              className="rounded-md border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
            >
              Clear
            </button>
          )}

        </div>

      </div>

      {/* Tickets */}
      <div className="mt-8">

        <div className="mb-4">
          <h3 className="text-base font-semibold text-slate-900">
            Recent Tickets
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Tickets received from your support system.
          </p>
        </div>

        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">

          {loading ? (
            <div className="px-6 py-12 text-center text-sm text-slate-500">
              Loading tickets...
            </div>
          ) : error ? (
            <div className="px-6 py-12 text-center text-sm text-red-600">
              {error}
            </div>
          ) : tickets.length === 0 ? (
            <div className="px-6 py-12 text-center">

              <p className="text-sm font-medium text-slate-700">
                No tickets found
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Try changing your search or filter.
              </p>

            </div>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full min-w-[840px] text-left">

                <thead className="border-b border-slate-200 bg-slate-50">

                  <tr>
                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Ticket
                    </th>

                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Customer
                    </th>

                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Assigned To
                    </th>

                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Subject
                    </th>

                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Status
                    </th>

                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Created
                    </th>
                  </tr>

                </thead>

                <tbody className="divide-y divide-slate-100">

                  {tickets.map((ticket) => (
                    <tr
                      key={ticket.ticket_id}
                      onClick={() =>
                        navigate(`/tickets/${ticket.ticket_id}`)
                      }
                      className="cursor-pointer transition hover:bg-slate-50"
                    >

                      <td className="px-5 py-4">
                        <span className="font-medium text-blue-600">
                          {ticket.ticket_id}
                        </span>
                      </td>

                      <td className="px-5 py-4">

                        <p className="text-sm font-medium text-slate-900">
                          {ticket.customer_name}
                        </p>

                        <p className="mt-0.5 text-xs text-slate-500">
                          {ticket.customer_email}
                        </p>

                      </td>

                      <td className="px-5 py-4">
                         <span className="text-sm text-slate-700">
                            {ticket.assigned_to || 'Unassigned'}
                         </span>
                     </td>

                      <td className="px-5 py-4">
                        <span className="text-sm text-slate-700">
                          {ticket.subject}
                        </span>
                      </td>

                      <td className="px-5 py-4">

                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${getStatusClasses(
                            ticket.status
                          )}`}
                        >
                          {ticket.status}
                        </span>

                      </td>

                      <td className="px-5 py-4 text-sm text-slate-500">
                        {new Date(
                          ticket.created_at
                        ).toLocaleDateString()}
                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>
          )}

        </div>

      </div>

    </main>
  )
}

export default Dashboard