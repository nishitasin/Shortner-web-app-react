URL Shortener App
This is a starter project for the frontend track of the evaluation, built with Next.js, TypeScript, and Material UI. It includes a structured folder setup, a logging middleware, and authentication logic to help you get started quickly.

Project Structure
The project follows a standard Next.js and React convention with additional folders for better organization.

/
├── public/
├── src/
│   ├── api/          # API client and service calls
│   │   ├── client.ts
│   ├── components/   # Reusable UI components
│   │   ├── Layout.tsx
│   ├── hooks/        # Custom React hooks
│   │   ├── useAuth.ts
│   ├── middleware/   # Custom middleware (e.g., logger)
│   │   ├── logger.ts
│   ├── pages/        # Next.js pages/routes
│   │   ├── _app.tsx
│   │   ├── index.tsx (URL Shortener)
│   │   ├── stats.tsx (URL Stats)
│   ├── styles/       # Global styles and Material UI theme
│   │   ├── theme.ts
│   ├── utils/        # Utility functions
├── .env              # Environment variables (DO NOT COMMIT)
├── .gitignore        # Files and directories to ignore in Git
├── package.json      # Project dependencies and scripts
├── tsconfig.json     # TypeScript configuration

Getting Started
Clone this repository (or create a new folder and add the files).

Install dependencies:

npm install

Create a .env file in the root directory. Copy the content from the .env file block below and paste it into your file.

NEXT_PUBLIC_API_BASE_URL=[http://20.244.56.144/evaluation-service](http://20.244.56.144/evaluation-service)

Update useAuth.ts with your registration details (name, email, rollNo). The file has a comment marking where you need to do this.

Run the development server:

npm run dev

The application will be available at http://localhost:3000.

Features to Implement
Complete the UI and logic for the URL Shortener in src/pages/index.tsx.

Implement the API calls for shortening URLs.

Complete the URL Statistics page in src/pages/stats.tsx.

Add client-side validation and error handling.

Ensure the application is fully responsive for both desktop and mobile views.

Remember to use the Log function in src/middleware/logger.ts to capture important events throughout the application. Good luck!