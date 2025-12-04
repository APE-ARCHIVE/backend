# NoteBackend

A robust and high-performance backend for an educational note-sharing platform, built with [Elysia.js](https://elysiajs.com/) and [Bun](https://bun.sh/).

## 🚀 Features

-   **High Performance**: Built on top of Bun and Elysia for blazing fast request processing.
-   **Authentication**: Secure user authentication using Google OAuth and JWT.
-   **Role-Based Access Control (RBAC)**: Distinct roles for Students, Teachers, and Admins.
-   **Resource Management**: Upload, categorize, and manage educational resources with an approval workflow.
-   **Forum System**: Q&A platform with tagging, upvoting, and accepted answers.
-   **Announcements**: Priority-based announcement system.
-   **Structured Logging**: Comprehensive logging using Winston with HTTP request tracking.
-   **API Documentation**: Integrated Swagger UI for easy API exploration.

## 🛠️ Tech Stack

-   **Runtime**: [Bun](https://bun.sh/)
-   **Framework**: [Elysia.js](https://elysiajs.com/)
-   **Database**: PostgreSQL
-   **ORM**: [Prisma](https://www.prisma.io/)
-   **Logging**: Winston
-   **Documentation**: Swagger

## 📋 Prerequisites

Ensure you have the following installed:

-   [Bun](https://bun.sh/) (v1.0 or later)
-   PostgreSQL

## ⚙️ Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/NipunHemal/backend.git
    cd backend
    ```

2.  **Install dependencies:**
    ```bash
    bun install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the root directory and add the following:

    ```env
    # Server Configuration
    PORT=3000
    NODE_ENV=development

    # Database
    DATABASE_URL="postgresql://user:password@localhost:5432/notebackend?schema=public"

    # Authentication
    JWT_SECRET="your_jwt_secret"
    JWT_REFRESH_SECRET="your_refresh_secret"
    GOOGLE_CLIENT_ID="your_google_client_id"
    GOOGLE_CLIENT_SECRET="your_google_client_secret"
    ```

4.  **Generate Prisma Client:**
    ```bash
    bun run generate
    ```

## 🏃‍♂️ Running the Application

Start the development server:

```bash
bun dev
```

The server will start at `http://localhost:3000`.

## 📚 API Documentation

Once the server is running, you can access the interactive API documentation at:

```
http://localhost:3000/swagger
```

## 📂 Project Structure

```
src/
├── config/         # Configuration files (DB, Env)
├── controllers/    # Request handlers
├── dto/            # Data Transfer Objects
├── middlewares/    # Custom middlewares (Auth, Security)
├── models/         # Database models (if separate from Prisma)
├── plugins/        # Elysia plugins (Logger, Swagger)
├── routes/         # API Route definitions
├── services/       # Business logic
├── utils/          # Utility functions (Logger, Error handling)
└── app.ts          # App entry point
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.