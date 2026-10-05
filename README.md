# SupportDesk - Support CRM System

SupportDesk is a full-stack Customer Support CRM system built to manage customer support tickets through a simple, clean, and responsive dashboard.

The application allows support teams to create, search, filter, view, update, and assign customer support tickets while maintaining internal support notes.

This project was developed as a full-stack assessment using React, Node.js, Express.js, and Supabase PostgreSQL.

---

## Live Application

### Frontend

https://supportdesk-psi.vercel.app

### Backend API

https://supportdesk-ddw8.onrender.com

### API Health Check

https://supportdesk-ddw8.onrender.com/api/health

### GitHub Repository

https://github.com/VaibbhavGupta/supportdesk

---

## Features

### Ticket Management

- Create new support tickets
- Automatically generate unique ticket IDs such as `TKT-001`
- Store customer name and email
- Add ticket subject and detailed issue description
- Automatically record ticket creation time
- Automatically record ticket update time
- Manage ticket status
- Assign tickets to support agents

### Search and Filtering

Search tickets using:

- Ticket ID
- Customer name
- Customer email
- Ticket subject
- Ticket description

Tickets can also be filtered by:

- Open
- In Progress
- Closed

### Ticket Details

Each ticket has a dedicated details page containing:

- Ticket ID
- Subject
- Description
- Customer information
- Current status
- Creation date
- Last updated date
- Internal support notes
- Assigned support agent

### Ticket Assignment

Support tickets can be assigned to a specific support agent.

The assignment feature helps establish clear ownership of tickets and distribute incoming support work across the team.

Assigned agents can be:

- Selected while creating a ticket
- Changed from the ticket details page
- Viewed directly from the dashboard
- Stored persistently in the database

### Internal Notes

Support staff can add internal notes to tickets.

Each note stores:

- Note content
- Related ticket
- Creation timestamp

### Dashboard

The dashboard provides an overview of:

- Total tickets
- Open tickets
- In Progress tickets
- Closed tickets

The dashboard also displays tickets in a structured table with:

- Ticket ID
- Customer
- Assigned support agent
- Subject
- Status
- Created date

### Responsive Interface

The application uses a clean CRM-style interface designed to work across desktop and mobile screen sizes.

---

## Tech Stack

### Frontend

- React.js
- Vite
- Tailwind CSS
- React Router
- JavaScript

### Backend

- Node.js
- Express.js
- REST API
- CORS

### Database

- Supabase
- PostgreSQL

### Deployment

- Vercel - Frontend
- Render - Backend
- Supabase - Database

### Development Tools

- Visual Studio Code
- Git
- GitHub
- PowerShell

---

## System Architecture

```text
                    +----------------------+
                    |      User / Agent    |
                    +----------+-----------+
                               |
                               v
                    +----------------------+
                    |    React Frontend    |
                    |   Vite + Tailwind    |
                    +----------+-----------+
                               |
                               | REST API
                               v
                    +----------------------+
                    |   Node.js + Express  |
                    |      Backend API     |
                    +----------+-----------+
                               |
                               | Supabase Client
                               v
                    +----------------------+
                    |  Supabase PostgreSQL |
                    |                      |
                    |  tickets             |
                    |  notes               |
                    +----------------------+
```

---

## Project Structure

```text
supportdesk/
|
├── client/
│   ├── src/
│   │   ├── components/
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
│   ├── middleware/
│   │   └── errorHandler.js
│   │
│   ├── services/
│   │   └── aiService.js
│   │
│   ├── server.js
│   └── package.json
│
├── database/
│   └── schema.sql
│
├── .env.example
├── .gitignore
├── README.md
└── package.json
```

> Local `.env` files contain private credentials and should never be committed to GitHub.

---

## Database Design

SupportDesk uses two PostgreSQL tables.

### Tickets Table

| Column | Description |
|---|---|
| `id` | Primary key |
| `ticket_id` | Unique ticket identifier such as `TKT-001` |
| `customer_name` | Customer name |
| `customer_email` | Customer email |
| `subject` | Ticket subject |
| `description` | Detailed issue description |
| `status` | Ticket status |
| `assigned_to` | Support agent assigned to the ticket |
| `created_at` | Ticket creation timestamp |
| `updated_at` | Last update timestamp |

### Supported Ticket Statuses

```text
Open
In Progress
Closed
```

### Notes Table

| Column | Description |
|---|---|
| `id` | Primary key |
| `ticket_id` | Related ticket ID |
| `note_text` | Internal support note |
| `created_at` | Note creation timestamp |

The `ticket_id` in the notes table references the corresponding ticket.

---

## REST API

The backend exposes REST APIs for ticket management.

### 1. Health Check

```http
GET /api/health
```

Checks whether the SupportDesk backend is running.

Example response:

```json
{
  "success": true,
  "message": "SupportDesk API is running"
}
```

### 2. Create Ticket

```http
POST /api/tickets
```

Creates a new support ticket.

Example request:

```json
{
  "customer_name": "Rahul Sharma",
  "customer_email": "rahul@example.com",
  "subject": "Order not received",
  "description": "My order has not been delivered yet.",
  "assigned_to": "Rahul Mehta"
}
```

The `assigned_to` field is optional.

The backend automatically generates a ticket ID and sets the initial status to `Open`.

### 3. Get All Tickets

```http
GET /api/tickets
```

Returns all support tickets.

### 4. Filter Tickets by Status

```http
GET /api/tickets?status=Open
```

Supported values:

```text
Open
In Progress
Closed
```

### 5. Search Tickets

```http
GET /api/tickets?search=Rahul
```

The search functionality searches across:

- Ticket IDs
- Customer names
- Customer emails
- Ticket subjects
- Ticket descriptions

### 6. Get Ticket Details

```http
GET /api/tickets/:ticket_id
```

Example:

```http
GET /api/tickets/TKT-001
```

Returns the ticket information along with its associated internal notes.

### 7. Update Ticket

```http
PUT /api/tickets/:ticket_id
```

Updates the ticket status, assigned support agent, and/or adds an internal note.

Example request:

```json
{
  "status": "In Progress",
  "assigned_to": "Rahul Mehta",
  "notes": "The issue is currently being investigated."
}
```

The `assigned_to` and `notes` fields are optional.

---

## Local Development Setup

Follow the steps below to run SupportDesk locally.

### Prerequisites

Make sure the following are installed:

- Node.js
- npm
- Git
- A Supabase account

### 1. Clone the Repository

```bash
git clone https://github.com/VaibbhavGupta/supportdesk.git
```

Move into the project directory:

```bash
cd supportdesk
```

---

## Frontend Setup

### 2. Install Frontend Dependencies

```bash
cd client
npm install
```

### 3. Configure Frontend Environment Variables

Create a file named `.env` inside the `client` folder.

Add:

```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Start the Frontend

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

## Backend Setup

### 5. Open a New Terminal

From the project root:

```bash
cd server
```

Install backend dependencies:

```bash
npm install
```

### 6. Configure Backend Environment Variables

Create a file named `.env` inside the `server` folder.

Add your Supabase credentials:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_SECRET_KEY=your_supabase_secret_key
```

Do not commit this file to GitHub.

### 7. Start the Backend

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

## Environment Variables

### Frontend

```env
VITE_API_URL=http://localhost:5000/api
```

### Backend

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_SECRET_KEY=your_supabase_secret_key
```

Never publish actual environment values or API keys in the repository.

The project uses `.gitignore` to prevent `.env` files from being committed.

---

## Deployment

### Frontend - Vercel

The React frontend is deployed on Vercel.

Live URL:

https://supportdesk-psi.vercel.app

Production environment variable:

```env
VITE_API_URL=https://supportdesk-ddw8.onrender.com/api
```

### Backend - Render

The Node.js and Express backend is deployed on Render.

Live API:

https://supportdesk-ddw8.onrender.com

Health check:

https://supportdesk-ddw8.onrender.com/api/health

The backend receives the Supabase credentials through Render environment variables.

### Database - Supabase

Supabase PostgreSQL is used as the application's persistent database.

The database stores:

- Tickets
- Internal support notes
- Ticket assignment information

---

## Application Workflow

The main ticket workflow is:

```text
1. User opens SupportDesk
           |
           v
2. Dashboard loads tickets
           |
           v
3. User creates a support ticket
           |
           v
4. User can optionally assign the ticket to a support agent
           |
           v
5. React sends a POST request
           |
           v
6. Express API validates the request
           |
           v
7. Ticket is stored in Supabase
           |
           v
8. Unique Ticket ID is generated
           |
           v
9. Dashboard displays the new ticket
           |
           v
10. User can search or filter the ticket
           |
           v
11. User opens ticket details
           |
           v
12. User can update status, assignment, or add a note
           |
           v
13. Changes are stored in Supabase
```

---

## Key API Flow

```text
React Frontend
      |
      | REST API Request
      v
Express Router
      |
      v
Ticket Controller
      |
      v
Supabase PostgreSQL
      |
      v
JSON Response
      |
      v
React Frontend
```

---

## Project Objective

The objective of SupportDesk is to demonstrate an end-to-end full-stack customer support workflow.

The application connects:

```text
Frontend
   |
   v
REST API
   |
   v
Backend Logic
   |
   v
Database
```

This project demonstrates practical implementation of:

- Frontend development
- REST API development
- Database integration
- CRUD operations
- Search and filtering
- Ticket assignment and ownership
- Status management
- Internal notes
- State management
- Deployment
- Environment variable management
- Git and GitHub workflow

---

## Current Scope

The current version focuses on the core support CRM workflow:

- Ticket creation
- Ticket listing
- Ticket search
- Status filtering
- Ticket details
- Status updates
- Internal notes
- Ticket assignment
- Assigned agent visibility on dashboard
- Dashboard statistics
- Production deployment

---

## Bonus Feature - Ticket Assignment

Ticket Assignment was added as a practical enhancement beyond the core assessment requirements.

The feature allows support tickets to be assigned to predefined support agents, establishing clear ownership and helping distribute incoming support work across the team.

The assignment can be:

- Selected when creating a ticket
- Updated from the ticket details page
- Viewed from the dashboard
- Persisted in the `tickets.assigned_to` database field

A predefined support-agent list was used instead of implementing a full authentication and user-management system.

This keeps the feature focused on workload distribution without adding unnecessary complexity to the assessment project.

### Why Ticket Assignment?

In a support environment, multiple incoming tickets can become difficult to manage when there is no clear ownership.

Assigning tickets to support agents helps:

- Distribute workload
- Establish responsibility
- Reduce the chance of tickets being overlooked
- Make it easier to identify who is handling an issue

The feature was intentionally kept simple by using a predefined support-agent list rather than building a complete authentication and user-management system.

---

## Future Improvements

Potential future improvements include:

- User authentication
- Role-based access control
- Ticket priority levels
- Email notifications
- File attachments
- Advanced analytics
- Customer profiles
- SLA tracking
- AI-assisted ticket summarization
- AI-generated customer reply suggestions

---

## Testing

The application was tested across the main support workflow:

- Backend health check
- Ticket creation
- Automatic ticket ID generation
- Ticket listing
- Ticket search
- Status filtering
- Ticket details
- Ticket status updates
- Internal notes
- Ticket assignment
- Assignment persistence in Supabase
- Assigned agent visibility on dashboard
- Frontend-to-backend communication
- Production deployment

---

## Security

The project follows basic security practices for environment configuration.

- Supabase credentials are stored in environment variables.
- `.env` files are excluded from Git.
- Sensitive credentials are not hard-coded in the source code.
- Production environment variables are configured separately on Render and Vercel.

---

## What This Project Demonstrates

This project demonstrates the complete flow of a full-stack application:

```text
User Interface
      |
      v
React Components
      |
      v
API Service
      |
      v
REST API
      |
      v
Express Controllers
      |
      v
Supabase
      |
      v
PostgreSQL Database
```

It demonstrates practical experience with:

- React application development
- Component-based UI development
- Tailwind CSS
- REST API design
- Express.js
- PostgreSQL
- Supabase
- CRUD operations
- Search functionality
- Filtering
- State management
- Form handling
- Error handling
- Environment variables
- Git and GitHub
- Vercel deployment
- Render deployment

---

## Author

**Vaibhav Gupta**

GitHub:

https://github.com/VaibbhavGupta

Project Repository:

https://github.com/VaibbhavGupta/supportdesk

---

## License

This project was created for educational and assessment purposes.
