import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createTicket } from '../services/api'

function CreateTicket() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    subject: '',
    description: '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      setLoading(true)
      setError('')

      const data = await createTicket(formData)

      navigate(`/tickets/${data.ticket_id}`)
    } catch (error) {
      console.error(error)
      setError(error.message || 'Failed to create ticket')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">

      {/* Heading */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white">
          Create New Ticket
        </h2>

        <p className="mt-2 text-slate-400">
          Create a support ticket for a customer.
        </p>
      </div>

      {/* Form Card */}
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Customer Name */}
          <div>
            <label
              htmlFor="customer_name"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Customer Name
            </label>

            <input
              id="customer_name"
              name="customer_name"
              type="text"
              value={formData.customer_name}
              onChange={handleChange}
              placeholder="Enter customer name"
              required
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
            />
          </div>

          {/* Customer Email */}
          <div>
            <label
              htmlFor="customer_email"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Customer Email
            </label>

            <input
              id="customer_email"
              name="customer_email"
              type="email"
              value={formData.customer_email}
              onChange={handleChange}
              placeholder="customer@example.com"
              required
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
            />
          </div>

          {/* Subject */}
          <div>
            <label
              htmlFor="subject"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Issue Subject
            </label>

            <input
              id="subject"
              name="subject"
              type="text"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Briefly describe the issue"
              required
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Description
            </label>

            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the customer's issue in detail..."
              rows="6"
              required
              className="w-full resize-none rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 border-t border-slate-800 pt-6">

            <button
              type="button"
              onClick={() => navigate('/')}
              className="rounded-lg border border-slate-700 px-5 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Ticket'}
            </button>

          </div>

        </form>

      </div>

    </main>
  )
}

export default CreateTicket