# Library Management Application

This is a library management application built with Node.js (NestJS framework) and PostgreSQL. The application manages users and books, including borrowing and returning functionality. The API is built using NestJS, and PostgreSQL is used as the database.

## Requirements

Before you begin, ensure you have the following installed:

- **Docker**: [Install Docker](https://docs.docker.com/get-docker/)
- **Docker Compose**: [Install Docker Compose](https://docs.docker.com/compose/install/)
- **Node.js**: [Install Node.js](https://nodejs.org/en/) (LTS recommended)
## Setup Instructions

### 1. Clone the Repository

```bash
git clone 
cd invent-analytics
```
2. Install Dependencies

Install the required Node.js dependencies for the project:
    
```bash
npm install
```

3. Configure the .env file

Create a .env file in the root directory with the following configuration:
```DB_HOST=127.0.0.1
DB_PORT=5433
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=mydatabase
DB_SSLMODE=disable
```
These environment variables are used to configure PostgreSQL.

4. Build and Run the Application with Docker Compose

To start both the NestJS backend and PostgreSQL database together, you can use Docker Compose. Run the following command:

```bash
docker-compose up -d
```
This will build and start both services:

	•	Node.js/NestJS will run on port 3000.
	•	PostgreSQL will run on port 5433.

5. Running NestJS in Development Mode

To run NestJS in development mode (with hot-reloading), use the following command:

```bash
npm run start:dev
```

