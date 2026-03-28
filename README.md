# Corover Chatbot Server API

A Node.js/Express-based backend server for the Corover chatbot application. This server provides RESTful APIs for chat management, conversation history, and dashboard analytics.

## Features

- **Chat Management**: Send messages and retrieve conversation history
- **Dashboard Analytics**: Access statistics, session data, and raw queries
- **Authentication**: JWT-based authentication for protected endpoints
- **Error Handling**: Centralized error handling middleware
- **CORS Support**: Cross-origin resource sharing enabled
- **MongoDB Integration**: Uses Mongoose for efficient database operations

## Tech Stack

- **Runtime**: Node.js with ES modules
- **Framework**: Express.js 5.2.1
- **Database**: MongoDB with Mongoose 9.3.3
- **Authentication**: JSON Web Tokens (JWT)
- **Utilities**: Cookie Parser, CORS
- **Development**: Nodemon for hot reload

## Prerequisites

- Node.js (v18+ recommended)
- Bun package manager (optional, can use npm/yarn)
- MongoDB instance (local or remote)
- Environment variables configured

## Installation

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the root directory with the required environment variables:

```
MONGODB_URI=mongodb://localhost:27017/corover
JWT_SECRET=your_jwt_secret_key
PORT=your_desired_port
```

## Running the Server

### Development Mode

```bash
npm run dev
```

Runs the server with Nodemon for automatic restarts on file changes.

### Production Mode

```bash
npm start
```

Starts the server on the configured port .

## API Routes

### Root Endpoint

- `GET /` - Welcome message

### Chat Module (`/api/chat`)

- `POST /api/chat/message` - Send a chat message

  - Body: `{ message: string, sessionId?: string }`
  - Returns: Chat response with session information
- `GET /api/chat/history/:sessionId` - Retrieve chat history

  - Params: `sessionId` - Session identifier
  - Returns: Array of messages in the conversation

### Dashboard Module (`/api/dashboard`)

- `POST /api/dashboard/login` - User authentication

  - Body: `{ username: string, password: string }`
  - Returns: JWT token for authenticated requests
- `GET /api/dashboard/stats` - Get chat statistics (Protected)

  - Headers: Authorization token required
  - Returns: Dashboard statistics
- `GET /api/dashboard/sessions` - Get user sessions (Protected)

  - Headers: Authorization token required
  - Returns: List of active sessions
- `GET /api/dashboard/raw-queries` - Get raw query data (Protected)

  - Headers: Authorization token required
  - Returns: Raw database queries/data

## Project Structure

```
server/
├── src/
│   ├── app.js                          # Express app configuration
│   ├── server.js                       # Server entry point
│   ├── config/
│   │   ├── db.js                       # Database configuration
│   │   └── env.js                      # Environment variables
│   ├── middleware/
│   │   ├── authenticate.middleware.js  # JWT authentication
│   │   └── errorHandler.middleware.js  # Error handling
│   ├── modules/
│   │   ├── chat/
│   │   │   ├── chat.controller.js      # Request handlers
│   │   │   ├── chat.model.js           # MongoDB schema
│   │   │   ├── chat.repository.js      # Database operations
│   │   │   └── chat.usecase.js         # Business logic
│   │   └── dashboard/
│   │       ├── dashboard.controller.js
│   │       ├── dashboard.model.js
│   │       ├── dashboard.repository.js
│   │       └── dashboard.usecase.js
│   ├── routes/
│   │   ├── index.js                    # Route registration
│   │   ├── chat/
│   │   │   └── chat.routes.js
│   │   └── dashboard/
│   │       └── dashboard.routes.js
│   └── utils/
│       ├── ApiError.js                 # Custom error class
│       ├── ApiResponse.js              # Standard response format
│       └── asyncHandler.js             # Async error wrapper
├── package.json
└── README.md
```

## Architecture

The server follows a layered architecture pattern:

- **Controllers**: Handle HTTP requests/responses
- **Use Cases**: Contain business logic
- **Repositories**: Manage database operations
- **Models**: Define MongoDB schemas
- **Middleware**: Process requests (authentication, error handling)
- **Utils**: Provide reusable utilities and helpers

## Error Handling

The server uses a centralized error handling middleware that:

- Catches and formats API errors
- Handles validation errors
- Provides consistent error responses
- Logs errors for debugging

## Authentication

Protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

Obtain a token by logging in through `/api/dashboard/login`.

## Development Guidelines

### Adding New Endpoints

1. Create a controller in `modules/<module>/`
2. Define routes in `routes/<module>/`
3. Register routes in `routes/index.js`
4. Use `asyncHandler` utility for error handling in controllers

### Environment Variables

- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT signing
- `PORT` - Server port (default: 5000)

## Scripts

```json
{
  "start": "node src/server.js",   
  "dev": "nodemon src/server.js"   
}
```

## Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **jsonwebtoken**: JWT authentication
- **cookie-parser**: Cookie handling
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variable management
- **nodemon**: Development auto-reload (dev dependency)
