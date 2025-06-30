# Photography & IT Development Portfolio Website

## Overview

This is a modern full-stack portfolio website built with React, Express, and PostgreSQL, specifically designed for a professional photographer and IT developer. The application features a responsive design with a clean, professional interface for showcasing photography work, development skills, services, and articles. It includes both public-facing portfolio pages and an admin interface for content management.

The website serves Alex Chen, a professional photographer and IT developer based in Bali, Indonesia, who combines creative photography skills with technical development expertise.

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
- **Skills**: Photography and development skills with categories and proficiency levels
- **Experiences**: Work experience combining photography and development projects
- **Education**: Educational background
- **Certifications**: Professional certifications
- **Activities**: Personal activities and interests
- **Articles**: Blog posts and articles about photography and development
- **Contact Messages**: Visitor contact form submissions
- **Galleries**: Photography portfolio with categories (portrait, landscape, event, commercial)
- **Services**: Photography and development services with pricing and features

## Key Components

### Public Pages
- **Home**: Hero section with photographer/developer profile, skills showcase, experience timeline
- **Gallery**: Photography portfolio with category filtering (portrait, landscape, event, commercial) and featured works
- **Services**: Photography and development services showcase with pricing and features
- **Articles**: Blog/article listing with categories and search functionality
- **Contact**: Contact form with validation and personal values display
- **Navigation**: Responsive navigation with camera logo and dark/light theme toggle

### Admin Interface
- **Profile Management**: Edit personal information and social links
- **Content Management**: CRUD operations for skills, experiences, education, certifications
- **Gallery Management**: Add, edit, and organize photography portfolio with category filtering
- **Services Management**: Manage photography and development service offerings
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
- June 28, 2025. Major theme transformation to Photography & IT Development portfolio
  - Added Gallery system with categories (portrait, landscape, event, commercial)
  - Added Services system for photography and development offerings
  - Updated database schema with galleries and services tables
  - Created Gallery page with category filtering and featured works
  - Created Services page with photography and development service showcase
  - Updated navigation with camera logo and new menu items
  - Transformed profile data to Rahd (Photographer & Developer)
  - Updated hero section to reflect dual expertise
  - Added API endpoints for galleries and services management
- June 21, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```