import { useEffect, useState } from 'react'
import { getTickets } from '../services/api'

function Dashboard() {
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

        if (search.trim() !== '') {
          params.search = search
        }

        if (status !== '') {
          params.status = status
        }

        const data = await getTickets(params)

        setTickets(data.tickets)
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

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">

      {/* Page Heading */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white">
          Dashboard
        </h2>

        <p className="mt-2 text-slate-400">
          Manage and track customer support tickets.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-400">
          {error}
        </div>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">
            Total Tickets
          </p>

          <p className="mt-2 text-3xl font-bold text-white">
            {totalTickets}
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">
            Open
          </p>

          <p className="mt-2 text-3xl font-bold text-blue-400">
            {openTickets}
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">
            In Progress
          </p>

          <p className="mt-2 text-3xl font-bold text-yellow-400">
            {inProgressTickets}
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">
            Closed
          </p>

          <p className="mt-2 text-3xl font-bold text-green-400">
            {closedTickets}
          </p>
        </div>

      </div>

      {/* Search and Filter */}
      <div className="mt-10 rounded-xl border border-slate-800 bg-slate-900 p-5">

        <div className="flex flex-col gap-4 md:flex-row">

          {/* Search */}
          <div className="flex-1">

            <label
              htmlFor="search"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Search Tickets
            </label>

            <input
              id="search"
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by ID, customer, email, subject..."
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
            />

          </div>

          {/* Status Filter */}
          <div className="w-full md:w-56">

            <label
              htmlFor="status"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Status
            </label>

            <select
              id="status"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
            >
              <option value="">All Statuses</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Closed">Closed</option>
            </select>

          </div>

        </div>

        {/* Clear Filters */}
        {(search || status) && (
          <button
            onClick={clearFilters}
            className="mt-4 text-sm font-medium text-blue-400 transition hover:text-blue-300"
          >
            Clear filters
          </button>
        )}

      </div>

      {/* Tickets */}
      <div className="mt-10">

        <div className="mb-4">
          <h3 className="text-xl font-semibold text-white">
            Recent Tickets
          </h3>

          <p className="text-sm text-slate-400">
            Tickets received from your support system.
          </p>
        </div>

        {loading ? (
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-8 text-center text-slate-400">
            Loading tickets...
          </div>
        ) : tickets.length === 0 ? (
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-8 text-center text-slate-400">
            No tickets found.
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">

            <div className="overflow-x-auto">

              <table className="w-full text-left">

                <thead className="border-b border-slate-800 bg-slate-950">

                  <tr>

                    <th className="px-6 py-4 text-sm font-medium text-slate-400">
                      Ticket ID
                    </th>

                    <th className="px-6 py-4 text-sm font-medium text-slate-400">
                      Customer
                    </th>

                    <th className="px-6 py-4 text-sm font-medium text-slate-400">
                      Subject
                    </th>

                    <th className="px-6 py-4 text-sm font-medium text-slate-400">
                      Status
                    </th>

                    <th className="px-6 py-4 text-sm font-medium text-slate-400">
                      Created
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {tickets.map((ticket) => (

                    <tr
                      key={ticket.ticket_id}
                      className="border-b border-slate-800 last:border-b-0 hover:bg-slate-800/50"
                    >

                      <td className="px-6 py-4 font-medium text-blue-400">
                        {ticket.ticket_id}
                      </td>

                      <td className="px-6 py-4">

                        <p className="text-sm font-medium text-white">
                          {ticket.customer_name}
                        </p>

                        <p className="text-xs text-slate-500">
                          {ticket.customer_email}
                        </p>

                      </td>

                      <td className="px-6 py-4 text-sm text-slate-300">
                        {ticket.subject}
                      </td>

                      <td className="px-6 py-4">

                        <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                          {ticket.status}
                        </span>

                      </td>

                      <td className="px-6 py-4 text-sm text-slate-400">
                        {new Date(ticket.created_at).toLocaleDateString()}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>
        )}

      </div>

    </main>
  )
}
    
export default Dashboard