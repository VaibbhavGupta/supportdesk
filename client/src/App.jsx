import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import CreateTicket from './pages/CreateTicket'
import TicketDetails from './pages/TicketDetails'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950">
        <Navbar />

       <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tickets/new" element={<CreateTicket />} />
          <Route
             path="/tickets/:ticketId"
              element={<TicketDetails />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App