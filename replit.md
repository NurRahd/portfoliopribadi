# Portfolio Website

## Overview

This is a modern full-stack portfolio website built with React, Express, and PostgreSQL. The application features a responsive design with a clean, professional interface for showcasing personal information, skills, experience, education, and articles. It includes both public-facing portfolio pages and an admin interface for content management.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state management
- **UI Components**: Radix UI with shadcn/ui component library
- **Styling**: Tailwind CSS with CSS custom properties for theming
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon serverless PostgreSQL
- **API Design**: RESTful API endpoints for CRUD operations
- **Development**: TypeScript throughout the stack

### Database Schema
The application uses PostgreSQL with the following main entities:
- **Users**: Authentication and user management
- **Profile**: Personal information and social links
- **Skills**: Technical skills with categories and proficiency levels
- **Experiences**: Work experience with technologies used
- **Education**: Educational background
- **Certifications**: Professional certifications
- **Activities**: Personal activities and interests
- **Articles**: Blog posts and articles
- **Contact Messages**: Visitor contact form submissions

## Key Components

### Public Pages
- **Home**: Hero section with profile information, skills showcase, experience timeline
- **Articles**: Blog/article listing with categories and search functionality
- **Contact**: Contact form with validation and personal values display
- **Navigation**: Responsive navigation with dark/light theme toggle

### Admin Interface
- **Profile Management**: Edit personal information and social links
- **Content Management**: CRUD operations for skills, experiences, education, certifications
- **Article Management**: Create and edit blog posts with rich text capabilities
- **Data Tables**: Responsive tables for managing different content types

### UI/UX Features
- **Responsive Design**: Mobile-first approach with breakpoint-specific layouts
- **Dark/Light Theme**: System preference detection with manual toggle
- **Loading States**: Skeleton loaders for better perceived performance
- **Form Validation**: Zod schema validation with React Hook Form
- **Toast Notifications**: User feedback for actions and errors

## Data Flow

1. **Client Requests**: React components make API calls using TanStack Query
2. **API Layer**: Express.js routes handle HTTP requests and validation
3. **Database Layer**: Drizzle ORM manages PostgreSQL operations
4. **Response Flow**: Data flows back through the same layers with proper error handling
5. **State Management**: TanStack Query caches responses and manages loading states

## External Dependencies

### Frontend Dependencies
- **@radix-ui/**: Component primitives for accessible UI components
- **@tanstack/react-query**: Server state management and caching
- **react-hook-form**: Form handling with validation
- **wouter**: Lightweight client-side routing
- **tailwindcss**: Utility-first CSS framework
- **date-fns**: Date manipulation and formatting

### Backend Dependencies
- **drizzle-orm**: Type-safe ORM for PostgreSQL
- **@neondatabase/serverless**: Serverless PostgreSQL driver
- **express**: Web application framework
- **zod**: Schema validation library

### Development Tools
- **TypeScript**: Static type checking
- **Vite**: Build tool and development server
- **ESBuild**: JavaScript bundler for production
- **Drizzle Kit**: Database migration and introspection tools

## Deployment Strategy

### Development Environment
- **Runtime**: Node.js 20 with Replit development environment
- **Database**: PostgreSQL 16 provided by Replit
- **Port Configuration**: Application runs on port 5000
- **Hot Reload**: Vite development server with HMR enabled

### Production Build
- **Frontend Build**: Vite builds static assets to `dist/public`
- **Backend Build**: ESBuild bundles server code to `dist/index.js`
- **Deployment Target**: Autoscale deployment on Replit
- **Environment Variables**: `DATABASE_URL` for database connection

### Database Management
- **Migrations**: Drizzle Kit manages schema migrations
- **Schema Location**: `shared/schema.ts` for type-safe database definitions
- **Connection**: Serverless connection pooling via Neon

## Changelog

```
Changelog:
- June 21, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```