# SupportDesk – Support CRM System

SupportDesk is a full-stack Customer Support CRM system built to manage customer support tickets through a simple, clean, and responsive dashboard.

The application allows support teams to create, search, filter, view, and update customer support tickets while maintaining internal support notes.

This project was developed as a full-stack assessment using React, Node.js, Express.js, and Supabase PostgreSQL.

---

## 🚀 Live Application

### Frontend
https://supportdesk-psi.vercel.app

### Backend API
https://supportdesk-ddw8.onrender.com

### API Health Check
https://supportdesk-ddw8.onrender.com/api/health

---

## ✨ Features

### 🎫 Ticket Management

- Create new support tickets
- Automatically generate unique ticket IDs such as `TKT-001`
- Store customer name and email
- Add ticket subject and detailed issue description
- Automatically record ticket creation time
- Automatically record ticket update time
- Manage ticket status

### 🔎 Search & Filtering

Search tickets in real time using:

- Ticket ID
- Customer name
- Customer email
- Ticket subject
- Ticket description

Tickets can also be filtered by:

- Open
- In Progress
- Closed

### 📄 Ticket Details

Each ticket has a dedicated details page containing:

- Ticket ID
- Subject
- Description
- Customer information
- Current status
- Creation date
- Last updated date
- Internal support notes

### 📝 Internal Notes

Support staff can add internal notes to tickets.

Each note stores:

- Note content
- Related ticket
- Creation timestamp

### 📊 Dashboard

The dashboard provides an overview of:

- Total tickets
- Open tickets
- In Progress tickets
- Closed tickets

It also displays recently created tickets in a structured table.

### 📱 Responsive Interface

The application uses a clean CRM-style interface designed to work across desktop and mobile screen sizes.

---

# 🛠️ Tech Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- React Router
- JavaScript

## Backend

- Node.js
- Express.js
- REST API
- CORS

## Database

- Supabase
- PostgreSQL

## Deployment

- Vercel – Frontend
- Render – Backend
- Supabase – Database

## Development Tools

- Visual Studio Code
- Git
- GitHub
- Postman / REST API testing
- PowerShell

---

# 🏗️ System Architecture

```text
                  ┌──────────────────────┐
                  │      User / Agent    │
                  └──────────┬───────────┘
                             │
                             ▼
                  ┌──────────────────────┐
                  │    React Frontend    │
                  │   Vite + Tailwind    │
                  └──────────┬───────────┘
                             │
                             │ REST API
                             ▼
                  ┌──────────────────────┐
                  │   Node.js + Express  │
                  │      Backend API      │
                  └──────────┬───────────┘
                             │
                             │ Supabase Client
                             ▼
                  ┌──────────────────────┐
                  │  Supabase PostgreSQL │
                  │                      │
                  │  tickets             │
                  │  notes               │
                  └──────────────────────┘
```

---

# 📁 Project Structure

```text
supportdesk/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── CreateTicket.jsx
│   │   │   └── TicketDetails.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── config/
│   │   └── supabase.js
│   │
│   ├── controllers/
│   │   └── ticketController.js
│   │
│   ├── routes/
│   │   └── ticketRoutes.js
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── .gitignore
└── README.md
```

> `.env` files contain private credentials and are excluded from Git using `.gitignore`.

---

# 🗄️ Database Design

SupportDesk uses two PostgreSQL tables.

## Tickets Table

| Column | Description |
|---|---|
| `id` | Primary key |
| `ticket_id` | Unique ticket identifier such as `TKT-001` |
| `customer_name` | Customer name |
| `customer_email` | Customer email |
| `subject` | Ticket subject |
| `description` | Detailed issue description |
| `status` | Ticket status |
| `created_at` | Ticket creation timestamp |
| `updated_at` | Last update timestamp |

Supported ticket statuses:

```text
Open
In Progress
Closed
```

## Notes Table

| Column | Description |
|---|---|
| `id` | Primary key |
| `ticket_id` | Related ticket ID |
| `note_text` | Internal support note |
| `created_at` | Note creation timestamp |

The `ticket_id` in the notes table references the corresponding ticket.

---

# 🔌 REST API

The backend exposes REST APIs for ticket management.

## 1. Health Check

```http
GET /api/health
```

Checks whether the SupportDesk backend is running.

### Response

```json
{
  "success": true,
  "message": "SupportDesk API is running"
}
```

---

## 2. Create Ticket

```http
POST /api/tickets
```

Creates a new support ticket.

### Example Request

```json
{
  "customer_name": "Rahul Sharma",
  "customer_email": "rahul@example.com",
  "subject": "Order not received",
  "description": "My order has not been delivered yet."
}
```

The backend automatically generates a ticket ID and sets the initial status to `Open`.

---

## 3. Get All Tickets

```http
GET /api/tickets
```

Returns all support tickets.

---

## 4. Filter Tickets by Status

```http
GET /api/tickets?status=Open
```

Supported values:

```text
Open
In Progress
Closed
```

---

## 5. Search Tickets

```http
GET /api/tickets?search=Rahul
```

The search functionality can search across ticket IDs, customer names, customer emails, subjects, and descriptions.

---

## 6. Get Ticket Details

```http
GET /api/tickets/:ticket_id
```

Example:

```http
GET /api/tickets/TKT-001
```

Returns the ticket information along with its associated internal notes.

---

## 7. Update Ticket

```http
PUT /api/tickets/:ticket_id
```

Updates the ticket status and can add an internal note.

### Example Request

```json
{
  "status": "In Progress",
  "notes": "The issue is currently being investigated."
}
```

---

# ⚙️ Local Development Setup

Follow the steps below to run SupportDesk locally.

## Prerequisites

Make sure the following are installed:

- Node.js
- npm
- Git
- A Supabase account

---

## 1. Clone the Repository

```bash
git clone https://github.com/VaibbhavGupta/supportdesk.git
```

Move into the project directory:

```bash
cd supportdesk
```

---

# Frontend Setup

## 2. Install Frontend Dependencies

```bash
cd client
npm install
```

---

## 3. Configure Frontend Environment Variables

Create a file named:

```text
.env
```

inside the `client` folder.

Add:

```env
VITE_API_URL=http://localhost:5000/api
```

---

## 4. Start the Frontend

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

# Backend Setup

## 5. Open a New Terminal

From the project root:

```bash
cd server
```

Install backend dependencies:

```bash
npm install
```

---

## 6. Configure Backend Environment Variables

Create a file named:

```text
.env
```

inside the `server` folder.

Add your Supabase credentials:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_SECRET_KEY=your_supabase_secret_key
```

Do not commit this file to GitHub.

---

## 7. Start the Backend

```bash
npm start
```

The backend will normally run at:

```text
http://localhost:5000
```

You can verify it using:

```text
http://localhost:5000/api/health
```

---

# 🔐 Environment Variables

## Frontend

```env
VITE_API_URL=
```

Example:

```env
VITE_API_URL=http://localhost:5000/api
```

## Backend

```env
SUPABASE_URL=
SUPABASE_SECRET_KEY=
```

Never publish actual environment values or API keys in the repository.

The project uses `.gitignore` to prevent `.env` files from being committed.

---

# 🌐 Deployment

## Frontend – Vercel

The React frontend is deployed on Vercel.

Live URL:

https://supportdesk-psi.vercel.app

The frontend uses the following production environment variable:

```env
VITE_API_URL=https://supportdesk-ddw8.onrender.com/api
```

---

## Backend – Render

The Node.js and Express backend is deployed on Render.

Live API:

https://supportdesk-ddw8.onrender.com

Health check:

https://supportdesk-ddw8.onrender.com/api/health

The backend receives the Supabase credentials through Render environment variables.

---

## Database – Supabase

Supabase PostgreSQL is used as the application's persistent database.

The database stores:

- Tickets
- Internal support notes

---

# 🔄 Application Workflow

The main ticket workflow is:

```text
1. User opens SupportDesk
           ↓
2. Dashboard loads tickets
           ↓
3. User creates a support ticket
           ↓
4. React sends POST request
           ↓
5. Express API validates the request
           ↓
6. Ticket is stored in Supabase
           ↓
7. Unique Ticket ID is generated
           ↓
8. Dashboard displays the new ticket
           ↓
9. User can search/filter the ticket
           ↓
10. User opens ticket details
           ↓
11. User updates status or adds a note
           ↓
12. Changes are stored in Supabase
```

---

# 📊 Key API Flow

```text
React
  │
  │ GET /api/tickets
  ▼
Express Router
  │
  ▼
Ticket Controller
  │
  ▼
Supabase PostgreSQL
  │
  ▼
JSON Response
  │
  ▼
React Dashboard
```

---

# 🎯 Project Objective

The objective of SupportDesk is to demonstrate an end-to-end full-stack customer support workflow.

The application connects:

```text
Frontend
   ↓
REST API
   ↓
Backend Logic
   ↓
Database
```

This project demonstrates practical implementation of:

- Frontend development
- REST API development
- Database integration
- CRUD operations
- Search and filtering
- State management
- Deployment
- Environment variable management
- Git and GitHub workflow

---

# 📌 Current Scope

The current version focuses on the core support CRM workflow:

- Ticket creation
- Ticket listing
- Ticket search
- Status filtering
- Ticket details
- Status updates
- Internal notes
- Dashboard statistics
- Production deployment

---

# 🔮 Future Improvements

Potential future improvements include:

- User authentication
- Role-based access control
- Ticket priority levels
- Email notifications
- File attachments
- Advanced analytics
- Ticket assignment to support agents
- Customer profiles
- SLA tracking
- AI-assisted ticket summarization
- AI-generated customer reply suggestions

---

# 🧪 Testing

The application was tested across the main support workflow:

- Backend health check
- Ticket creation
- Ticket listing
- Ticket search
- Status filtering
- Ticket details
- Ticket status updates
- Internal notes
- Frontend-to-backend communication
- Production deployment

---

# 👨‍💻 Author

**Vaibhav Gupta**

GitHub:  
https://github.com/VaibbhavGupta

Project Repository:  
https://github.com/VaibbhavGupta/supportdesk

---

# 📄 License

This project was created for educational and assessment purposes.
