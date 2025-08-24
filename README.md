# Second-Brainly-App 🧠

A full-stack knowledge management and content sharing platform built with React, TypeScript, Node.js, and MongoDB. This application allows users to organize, tag, and share various types of content including Twitter posts, YouTube videos.

## 🎯 Project Overview

Second-Brainly-App is a personal knowledge management system that helps users:
- **Organize Content**: Save and categorize different types of content (images, tweets, videos, documents)
- **Tag Management**: Create and manage tags for easy content discovery
- **Content Sharing**: Generate shareable links for your organized content
- **User Authentication**: Secure user registration and login system
- **Content Filtering**: Filter content by tags and types

## 🏗️ Project Structure

```
Second-Brainly-App/
├── backend/                    # Node.js/TypeScript Backend API
│   ├── src/
│   │   ├── db/
│   │   │   └── schema.ts      # MongoDB schemas (Users, Content, Tags)
│   │   ├── routes/
│   │   │   ├── index.ts       # Main router configuration
│   │   │   ├── user.ts        # User authentication routes
│   │   │   ├── content.ts     # Content management routes
│   │   │   └── brain.ts       # Brain/organization routes
│   │   ├── utils/
│   │   │   ├── config.ts      # Environment configuration
│   │   │   ├── middleware.ts  # Authentication middleware
│   │   │   └── ...           # Utility functions
│   │   └── server.ts         # Express server setup
│   ├── package.json          # Backend dependencies
│   └── tsconfig.json         # TypeScript configuration
├── brainly-frontend/          # React/TypeScript Frontend
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── MainContent.tsx    # Main content display
│   │   │   ├── Navbar.tsx         # Navigation component
│   │   │   ├── CreateBrainModal.tsx # Content creation modal
│   │   │   └── ...               # Other components
│   │   ├── pages/            # Page components
│   │   │   ├── Home.tsx      # Main dashboard
│   │   │   ├── SignIn.tsx    # Login page
│   │   │   ├── SignUp.tsx    # Registration page
│   │   │   └── Share.tsx     # Shared content view
│   │   ├── hooks/            # Custom React hooks
│   │   └── App.tsx           # Main application component
│   ├── package.json          # Frontend dependencies
│   └── vite.config.ts        # Vite build configuration
├── Jenkinsfile               # Jenkins CI/CD pipeline
├── Dockerfile               # Multi-stage Docker build
├── .dockerignore            # Docker build exclusions
└── README.md               # This file
```

## 🚀 Features

### Backend Features
- **RESTful API** with Express.js
- **MongoDB Integration** with Mongoose ODM
- **User Authentication** with JWT tokens
- **Password Hashing** with bcrypt
- **CORS Support** for cross-origin requests
- **TypeScript** for type safety

### Frontend Features
- **React 19** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Responsive Design** for mobile and desktop
- **Content Filtering** and search capabilities

### Content Types Supported
- 🐦 **Twitter Posts** - Tweet sharing and embedding
- 📺 **YouTube Videos** - Video links and embedding

## 🛠️ Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js** (v20 or higher)
- **Bun** (for backend runtime)
- **MongoDB** (local or cloud instance)
- **Git**

## 📦 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Second-Brainly-App
```

## 🚀 Quick Start Options

### Option A: Using Docker (Recommended)

The easiest way to get started is using Docker Compose:

```bash
# Start all services with Docker Compose
docker-compose up -d

# Access the application
# Frontend: http://localhost:5173
# Backend API: http://localhost:3000
# MongoDB: localhost:27017
```

### Option B: Manual Setup (Without Docker)

#### 2. Backend Setup

```bash
cd backend

# Install dependencies using Bun
bun install

# Create environment file
cp .env.example .env
# Edit .env with your MongoDB connection string and other configs

# Start development server
bun run start
```

#### 3. Frontend Setup

```bash
cd brainly-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

#### 4. Environment Configuration

Create a `.env` file in the `backend` directory:

```env
MONGO_URL=mongodb://localhost:27017/second-brainly
PORT=3000
JWT_SECRET=your-secret-key-here
```

## 🐳 Docker Setup

### Option 1: Using Docker Compose (Recommended)

The project includes a `docker-compose.yml` file that sets up the complete application stack:

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

The Docker Compose setup includes:
- **MongoDB** database with authentication
- **Backend API** service
- **MongoDB Express** (optional, for database management)

### Option 2: Manual Docker Build

```bash
# Build the Docker image
docker build -t second-brainly-app .

# Run the container
docker run -p 3000:3000 \
  -e MONGO_URL=mongodb://your-mongo-host:27017/second-brainly \
  -e JWT_SECRET=your-secret-key \
  second-brainly-app
```

### Docker Profiles

The docker-compose.yml supports different profiles:

```bash
# Development mode (includes MongoDB Express)
docker-compose --profile dev up -d

# Production mode (includes Nginx)
docker-compose --profile prod up -d

# Basic mode (backend + MongoDB only)
docker-compose up -d
```

## 🔄 Jenkins CI/CD Setup

### Prerequisites for Jenkins

1. **Jenkins Server** with the following plugins:
   - Pipeline
   - Git
   - Docker
   - NodeJS Plugin

2. **Node.js Installation** on Jenkins server (v20+)

3. **Docker** installed on Jenkins server


### Running the Pipeline

1. **Create a new Jenkins Pipeline job**
2. **Configure Git repository** with your project URL
3. **Set up credentials** for deployment targets
4. **Configure environment variables** as needed
5. **Trigger the pipeline** by pushing to `develop` or `main` branches

### Pipeline Stages

```
Checkout → Setup Environment → Install Dependencies → 
Lint & Type Check → Build → Test → Security Scan → 
Docker Build → Deploy (Staging/Production)
```


## 📝 API Endpoints

### Authentication
- `POST /api/v1/user/signup` - User registration
- `POST /api/v1/user/signin` - User login

### Content Management
- `GET /api/v1/content` - Get user's content
- `POST /api/v1/content` - Create new content
- `PUT /api/v1/content/:id` - Update content
- `DELETE /api/v1/content/:id` - Delete content

### Brain/Tags
- `GET /api/v1/brain/tags` - Get all tags
- `POST /api/v1/brain/tags` - Create new tag

## 🔧 Development

### Backend Development
```bash
cd backend
bun run start  # Starts with hot reload
```

### Frontend Development
```bash
cd brainly-frontend
npm run dev    # Starts Vite dev server
```

### Building for Production
```bash
# Backend
cd backend
bun run build

# Frontend
cd brainly-frontend
npm run build
```

### Automated Deployment (Jenkins)
1. Push to `develop` branch for staging deployment
2. Push to `main` branch for production deployment
3. Jenkins pipeline handles the rest automatically

