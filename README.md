# StockFlow

A full-stack inventory management system built to practice and demonstrate web development concepts applied to inventory control and operational management.

## About the Project

StockFlow is a learning and portfolio project designed to simplify product registration, inventory monitoring, and stock level tracking.

The project connects a frontend interface to a REST API, with a backend organized into separate layers to improve maintainability and code organization.

## Features

- Register products
- List inventory products
- Search for a product by ID through the API
- Update product information through the API
- Delete products through the API
- Track product quantities and minimum stock levels
- Display inventory summary indicators
- Store data in a local SQLite database

*Note: Some API features may not yet be available through the frontend interface.*

## Technologies

**Frontend**
- HTML5
- CSS3
- JavaScript

**Backend**
- Node.js
- Express.js
- REST API
- SQLite
- better-sqlite3

**Tools**
- Git
- GitHub
- npm
- Visual Studio Code

## Project Structure

```text
StockFlow/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── database/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── app.js
│   │   └── server.js
│   ├── package.json
│   └── package-lock.json
├── frontend/
│   ├── app.js
│   ├── index.html
│   └── styles.css
├── .gitignore
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

Install the following tools before running the application:

- [Node.js](https://nodejs.org/)
- npm (included with Node.js)
- [Git](https://git-scm.com/)

### 1. Clone the repository

```bash
git clone https://github.com/marcosluizmlsp-bit/StockFlow.git
cd StockFlow
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Configure environment variables

Create a `.env` file inside the `backend/` directory:

```dotenv
PORT=3000
```

The `.env` file contains local configuration and should not be committed to Git.

### 4. Start the backend

From the `backend/` directory, run:

```bash
node src/server.js
```

The API should be available at:

`http://localhost:3000`

### 5. Open the frontend

Open `frontend/index.html` in your browser using a local development server, such as the Live Server extension in Visual Studio Code.

Keep the backend running while using the frontend.

## API Endpoints

Base URL: `http://localhost:3000/api/products`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/products` | List all products |
| GET | `/api/products/:id` | Get a product by ID |
| POST | `/api/products` | Create a product |
| PUT | `/api/products/:id` | Update a product |
| DELETE | `/api/products/:id` | Delete a product |

### Example: Create a product

```json
{
  "code": "PROD-001",
  "name": "Monitor",
  "quantity": 10,
  "minimumStock": 3
}
```

Send this JSON body in a `POST` request to `/api/products` with the `Content-Type: application/json` header.

## Architecture

The backend follows a layered structure:

- **Routes:** define API endpoints.
- **Controllers:** handle HTTP requests and responses.
- **Services:** contain application logic.
- **Repositories:** handle database operations.
- **Database:** manages SQLite configuration and initialization.

This separation helps keep responsibilities organized and makes the application easier to maintain and extend.

## Learning Goals

This project is being developed to strengthen practical knowledge of:

- JavaScript and programming logic
- HTTP and REST API concepts
- Backend development with Node.js and Express
- SQL and database integration
- Frontend-to-backend communication
- Git and GitHub workflows
- Inventory control and operational processes

## Roadmap

- [x] Product registration and listing
- [x] SQLite database integration
- [x] REST API for product operations
- [x] Initial frontend integration
- [ ] Complete product search in the frontend
- [ ] Add product deletion controls to the interface
- [ ] Add product editing controls to the interface
- [ ] Implement inventory movement history
- [ ] Add stock reports and low-stock alerts
- [ ] Improve validation and automated testing
- [ ] Deploy the application

## Project Status

**In development.**

StockFlow is an educational project that evolves incrementally as new features are implemented and tested.

## Author

**Marcos Luiz Santana Pereira**

GitHub: [@marcosluizmlsp-bit](https://github.com/marcosluizmlsp-bit)
