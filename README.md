# License Management System

A Node.js-based license management system designed to handle authentication, license verification, and user management.

## Features
- **License Management**: Create, verify, and manage licenses for your application.
- **Authentication**: Secure user authentication using tokens and email verification.
- **Caching**: Optimize performance with a built-in caching mechanism.
- **API Routes**:
  - `/auth`: Authentication routes.
  - `/license`: License management routes.
  - `/user`: User-related operations.

## Tech Stack
- **Backend Framework**: Express.js
- **Database**: MongoDB (via Mongoose)
- **Environment Variables**: Managed with dotenv
- **Validation**: yup for input validation
- **Caching**: Custom caching utility
- **API Client**: Supabase

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/graynneji/license.git
   cd license