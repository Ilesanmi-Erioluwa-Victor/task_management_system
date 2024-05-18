# Task Management API

This RESTful API allows users to manage tasks and handle user authentication.

## Getting Started

#### Prerequisites

Ensure you have the following installed:

- Node.js (>=10.13.0)
- npm or Yarn package manager
- Database server (e.g., PostgreSQL, MySQL) which I have provided already here **Supabase Postgres**

### Installation
Ensure  NestJS is installed globally on your system, you can run the following command to have it install if not installed:

```bash
npm install -g @nestjs/cli
```

1. Clone the repository

```bash
git clone https://github.com/Ilesanmi-Erioluwa-Victor/Niyo_backend_task.git
```

2. Navigate to the project directory:

```bash
cd Niyo_backend_task
```
3. Install dependencies: 

```bash
npm install
```

### Configuration
1. Create a .env file in the root directory of the project:
 copy and paste this to your .env file
```# Database configuration
DATABASE_URL=*******
```
PS: The DATABASE_URL value is provided on the google docs file attached to my email respond

### Running the Application
To start the development server, run the following command:
``` 
npm run start:dev
 ```
or 
``` 
yarn start:dev
 ```
The API server should now be running locally on port 3000 by default.

### API Documentation
You can access the Swagger documentation for the API at http://localhost:3000/api.
when your server is running locally at port 3000