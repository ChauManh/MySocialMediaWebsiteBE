# My Social Media Services

A backend service for a social media application, built with Node.js, Express, MongoDB, and Socket.IO.

## Features

- User authentication (sign up, sign in, JWT-based auth, refresh token)
- User profile management (avatar, background, about, etc.)
- Friend system (send, accept, deny, cancel friend requests)
- Post creation, editing, deletion, commenting, liking, saving
- Real-time notifications and messaging via WebSocket (Socket.IO)
- Search users
- User search history
- Cloudinary integration for image/video uploads
- RESTful API structure

## Tech Stack

- Node.js
- Express.js
- MongoDB & Mongoose
- Socket.IO
- Cloudinary (media storage)
- Multer (file uploads)
- JWT (authentication)
- dotenv (environment variables)
- Docker (optional, for containerization)

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB instance (local or cloud)
- Cloudinary account (for media uploads)

### Setup

1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd mySocialMediaServices
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Configure environment variables:**
   - Copy `.env.example` to `.env` and fill in your values:
     ```
     cp .env.example .env
     ```
   - Set the following variables in `.env`:
     ```
     PORT=5000
     MONGO_DB=<your-mongodb-uri>
     JWT_SECRET=<your-jwt-secret>
     JWT_EXPIRE=1d
     JWT_REFRESH_SECRET=<your-refresh-secret>
     JWT_REFRESH_EXPIRE=7d
     FE_URL=<your-frontend-url>
     CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
     CLOUDINARY_API_KEY=<your-cloudinary-api-key>
     CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
     ```

4. **Run the server in development:**
   ```sh
   npm run dev
   ```

   The server will start on `http://localhost:5000`.

5. **API Endpoints:**
   - All API routes are prefixed with `/api/` (see [src/route/index.js](src/route/index.js))
   - Example: `POST /api/auth/signup`, `GET /api/user`, etc.

### Docker (Optional)

To run with Docker:

```sh
docker build -t my-social-media-backend .
docker run -p 5000:5000 --env-file .env my-social-media-backend
```

## Folder Structure

See the [project structure](#) for details. Main source code is in the `src/` directory.

## License

MIT