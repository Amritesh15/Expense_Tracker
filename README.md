# Expense Tracker

A full-stack expense tracking application built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- User authentication (login/register)
- Add, view, and delete expenses
- Categorize expenses
- View total expenses
- Responsive design

## Setup Instructions

### Prerequisites

- Node.js installed
- MongoDB Atlas account
- Git

### Backend Setup

1. Clone the repository:
```bash
git clone <your-repo-url>
cd expense-tracker
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Create a `.env` file in the backend directory:
- Copy `.env.example` to `.env`
- Fill in your MongoDB URI and JWT secret:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

4. (Optional) Seed the database with demo data:
```bash
npm run seed
```
This will create a demo user and sample expenses.
Demo credentials:
- Email: demo@example.com
- Password: demo123

5. Start the backend server:
```bash
npm run dev
```

### Frontend Setup

1. Install frontend dependencies:
```bash
cd frontend
npm install
```

2. Start the frontend development server:
```bash
npm run dev
```

The application should now be running at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

- `PORT`: The port number for the backend server
- `MONGO_URI`: Your MongoDB connection string
- `JWT_SECRET`: A secret key for JWT token generation

