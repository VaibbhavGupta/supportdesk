function Navbar() {
  return (
    <nav className="border-b border-slate-800 bg-slate-950">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        <div>
          <h1 className="text-xl font-bold text-white">
            SupportDesk
          </h1>
          <p className="text-xs text-slate-400">
            Customer Support CRM
          </p>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="#"
            className="text-sm text-slate-300 transition hover:text-white"
          >
            Dashboard
          </a>

          <a
            href="#"
            className="text-sm text-slate-300 transition hover:text-white"
          >
            Tickets
          </a>

          <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500">
            + New Ticket
          </button>
        </div>

      </div>
    </nav>
  )
}

export default Navbar