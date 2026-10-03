import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const location = useLocation()

  const isDashboard =
    location.pathname === '/' ||
    location.pathname.startsWith('/tickets')

  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Brand */}
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-600 text-sm font-bold text-white">
            S
          </div>

          <div>
            <h1 className="text-sm font-semibold tracking-tight text-slate-900">
              SupportDesk
            </h1>

            <p className="text-xs text-slate-500">
              Customer Support CRM
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-1">

          <Link
            to="/"
            className={`rounded-md px-3 py-2 text-sm font-medium transition ${
              isDashboard && location.pathname === '/'
                ? 'bg-slate-100 text-slate-900'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            Dashboard
          </Link>

          <Link
            to="/"
            className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
          >
            Tickets
          </Link>

          <Link
            to="/tickets/new"
            className="ml-3 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            + New Ticket
          </Link>

        </div>

      </div>
    </nav>
  )
}

export default Navbar