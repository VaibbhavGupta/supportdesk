import dotenv from 'dotenv'

dotenv.config()

const { default: express } = await import('express')
const { default: cors } = await import('cors')
const { default: ticketRoutes } = await import('./routes/ticketRoutes.js')

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'SupportDesk API is running',
  })
})

// Ticket routes
app.use('/api/tickets', ticketRoutes)

// Start server
app.listen(PORT, () => {
  console.log(`SupportDesk API running on http://localhost:${PORT}`)
})