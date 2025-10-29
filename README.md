# Expense Tracker - MERN Stack Application

A full-stack expense tracking web application built with MongoDB, Express.js, React.js, and Node.js. This application allows users to manage their expenses with features like adding, editing, deleting expenses, viewing statistics, and filtering.

## Features

### Frontend (React.js)
-  Add, edit, delete, and list expenses
-  Expense fields: title, amount, category, date
-  Display total expenses and category-wise summary
-  Uses React Hooks for state management
-  Responsive design with TailwindCSS
-  JWT-based authentication (login/signup)
-  Edit expense functionality
-  Filter by category and date
-  Charts using Recharts (category breakdown)

### Backend (Node.js + Express.js)
- RESTful APIs for expense operations (POST, GET, PUT, DELETE)
-  MongoDB integration (supports local or Atlas)
-  Field validation before saving data
-  JWT authentication for secure user management
-  User-specific expense tracking

## Tech Stack

- **Frontend**: React.js with Vite
- **Backend**: Node.js + Express.js
- **Database**: MongoDB (Mongoose)
- **Styling**: TailwindCSS
- **Authentication**: JWT (jsonwebtoken)
- **HTTP Client**: Axios
- **Charts**: Recharts

## Project Structure

```
SidLabs/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Expense.js
│   ├── routes/
│   │   ├── userRoutes.js
│   │   └── expenseRoutes.js
│   ├── utils/
│   │   └── auth.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── ExpenseForm.jsx
│   │   │   ├── ExpenseList.jsx
│   │   │   ├── ExpenseStats.jsx
│   │   │   └── CategoryChart.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Quick Start

If you want to run both frontend and backend together:

```bash
# Install all dependencies
npm install

# Run both frontend and backend
npm run dev
```

Or follow the detailed setup below.

## Installation and Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/expense-tracker
JWT_SECRET=your_secret_key_here
```

For MongoDB Atlas, use:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/expense-tracker
```

4. Start the backend server:
```bash
npm run dev
```

The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend application will run on `http://localhost:3000`

## API Endpoints

### User Endpoints

- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users/me` - Get current user

### Expense Endpoints

- `GET /api/expenses` - Get all expenses (supports query params: category, startDate, endDate)
- `GET /api/expenses/stats` - Get expense statistics
- `GET /api/expenses/:id` - Get single expense
- `POST /api/expenses` - Create new expense
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense

All expense endpoints require authentication (JWT token).

## Usage

1. **Register/Login**: Create an account or login with existing credentials
2. **Add Expense**: Click "Add Expense" button and fill in the details
3. **View Expenses**: See all your expenses listed with filtering options
4. **Edit Expense**: Click the edit icon on any expense to modify it
5. **Delete Expense**: Click the delete icon to remove an expense
6. **Filter**: Use the filter options to search by category or date range
7. **View Statistics**: Check the summary section for total expenses and category breakdown
8. **Charts**: Visual representation of your spending by category

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/expense-tracker
JWT_SECRET=your_secret_key_here
```

## Features Explained

### Authentication
- JWT-based authentication ensures users can only access their own expenses
- Password hashing with bcryptjs
- Token stored in localStorage

### Expense Management
- Full CRUD operations (Create, Read, Update, Delete)
- Field validation on both frontend and backend
- Date range and category filtering

### Statistics
- Total expense calculation
- Category-wise breakdown
- Visual charts for better understanding
- Average expense per transaction

### Responsive Design
- Mobile-first approach with TailwindCSS
- Works seamlessly on desktop, tablet, and mobile devices

## Development

### Backend Development
```bash
cd backend
npm run dev  # Uses nodemon for auto-reload
```

### Frontend Development
```bash
cd frontend
npm run dev  # Vite dev server with hot module replacement
```

## Production Build

### Backend
```bash
cd backend
npm start
```

### Frontend
```bash
cd frontend
npm run build
npm run preview  # Preview the production build
```



