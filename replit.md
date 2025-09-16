# Triveda - Ayurvedic Diet Management Platform

## Overview

Triveda is a comprehensive Ayurvedic diet management platform that bridges traditional Ayurvedic wisdom with modern nutritional science. The application serves three primary user types: patients seeking personalized diet guidance, Ayurvedic practitioners creating and monitoring diet plans, and hospital/clinic administrators managing multiple practitioners and generating reports.

The platform focuses on constitutional assessment (Prakriti evaluation), intelligent diet chart generation based on Ayurvedic principles, patient compliance monitoring, and seamless communication between practitioners and patients. It's designed as a professional healthcare tool suitable for government-affiliated projects while maintaining user-friendly interfaces.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The application uses React with TypeScript for the frontend, implementing a single-page application (SPA) architecture. The UI is built with shadcn/ui components and Tailwind CSS for styling, following a healthcare-focused design system with sage green primary colors and Inter/Merriweather fonts. The application uses local storage for data persistence and state management, eliminating the need for backend calls during the prototype phase.

### Component Structure
The application follows a role-based navigation system with dedicated dashboards for each user type:
- **Landing Page**: Central entry point with role selection and feature showcase
- **Patient Flow**: Registration, Prakriti assessment, diet chart viewing, and meal logging
- **Doctor Flow**: Patient management, diet chart creation with AI assistance, and compliance monitoring
- **Admin Flow**: Multi-practitioner management, reporting, and clinic-level analytics

### State Management
All application state is managed through React hooks and browser localStorage. Mock data is used throughout the application to simulate real-world scenarios, including patient profiles, food databases, diet charts, and compliance metrics. The data structure follows defined schemas for users, patients, diet charts, and seasonal guidelines.

### Design System
The application implements a healthcare-specific design approach based on Fluent Design principles:
- **Color Palette**: Sage green primary (HSL 142 69% 58%) with warm neutral backgrounds
- **Typography**: Inter for medical data readability, Merriweather for Ayurvedic content
- **Layout**: 12-column responsive grid with consistent spacing units
- **Components**: Card-based layouts, multi-step forms, and data tables with filtering

### Navigation Flow
The application uses programmatic navigation through state management rather than URL routing. User flows are carefully designed to guide users through complex processes like constitutional assessment and diet chart creation while maintaining simplicity and professional appearance.

### Data Architecture
The application uses predefined schemas for:
- **User Profiles**: Demographics, constitutional types (Prakriti/Vikriti), health goals, and preferences
- **Food Database**: Nutritional information combined with Ayurvedic properties (Rasa, Virya, Vipaka)
- **Diet Charts**: Meal plans with rationales based on constitutional analysis
- **Seasonal Guidelines**: Regional and seasonal dietary recommendations

## External Dependencies

### UI Framework
- **React 18+**: Core frontend framework with TypeScript support
- **shadcn/ui**: Component library built on Radix UI primitives
- **Tailwind CSS**: Utility-first CSS framework with custom healthcare color scheme
- **Radix UI**: Accessible component primitives for complex UI patterns

### Development Tools
- **Vite**: Modern build tool and development server
- **TypeScript**: Type safety and enhanced development experience
- **PostCSS**: CSS processing with Tailwind integration

### Database Schema (Prepared for Future)
- **Drizzle ORM**: Type-safe database access layer configured for PostgreSQL
- **Neon Database**: Configured as the primary database provider
- **Database Migrations**: Schema management through Drizzle Kit

### Build and Deployment
- **ESBuild**: Fast bundling for production builds
- **Express.js**: Server framework prepared for API integration
- **Session Management**: PostgreSQL session store configuration ready for authentication

### External Assets
- **Google Fonts**: Inter and Merriweather font families for typography
- **Lucide React**: Icon library for consistent iconography throughout the application