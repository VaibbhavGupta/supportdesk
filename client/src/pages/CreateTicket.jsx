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

      {/* Header */}
      <div className="mb-8">

        <button
          type="button"
          onClick={() => navigate('/')}
          className="mb-5 text-sm font-medium text-slate-500 transition hover:text-slate-900"
        >
          ← Back to tickets
        </button>

        <p className="text-sm font-medium text-blue-600">
          Support ticket
        </p>

        <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
          Create New Ticket
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Create a support ticket for a customer issue.
        </p>

      </div>

      {/* Form */}
      <div className="rounded-lg border border-slate-200 bg-white">

        <div className="border-b border-slate-200 px-6 py-5">
          <h3 className="text-sm font-semibold text-slate-900">
            Ticket Information
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Enter the customer's details and describe the issue.
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="space-y-6 p-6">

            {/* Error */}
            {error && (
              <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* Customer Details */}
            <div className="grid gap-6 sm:grid-cols-2">

              <div>
                <label
                  htmlFor="customer_name"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Customer Name
                </label>

                <input
                  id="customer_name"
                  name="customer_name"
                  type="text"
                  value={formData.customer_name}
                  onChange={handleChange}
                  placeholder="e.g. Rahul Sharma"
                  required
                  className="w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                />
              </div>

              <div>
                <label
                  htmlFor="customer_email"
                  className="mb-2 block text-sm font-medium text-slate-700"
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
                  className="w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                />
              </div>

            </div>

            {/* Subject */}
            <div>
              <label
                htmlFor="subject"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Issue Subject
              </label>

              <input
                id="subject"
                name="subject"
                type="text"
                value={formData.subject}
                onChange={handleChange}
                placeholder="e.g. Payment failed during checkout"
                required
                className="w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Description
              </label>

              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the customer's issue, what happened, and any relevant details..."
                rows="7"
                required
                className="w-full resize-y rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-sm leading-6 text-slate-900 outline-none placeholder:text-slate-400 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
              />

              <p className="mt-2 text-xs text-slate-400">
                Include enough detail for another support agent to understand the issue.
              </p>
            </div>

          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4">

            <button
              type="button"
              onClick={() => navigate('/')}
              className="rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
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