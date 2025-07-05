# Flowbiz CRM API

Backend API for the FlowBiz CRM system solution.

## Features

- GraphQL API using Apollo Server and Pothos
- PostgreSQL database with Prisma ORM
- Authentication with JWT, Google OAuth, and other providers
- Role-based authorization
- Business management
- Lead tracking with customizable stages
- Customer relationship management
- Order and feedback tracking
- Campaign and social media management
- Analytics and reporting
- Notifications system

## Development

### Prerequisites

- Node.js 18+
- PostgreSQL 14+

### Getting Started

1. Clone the repository
2. Install dependencies
   ```bash
   npm install
   ```
3. Set up environment variables (copy `.env.example` to `.env`)
4. Run migrations
   ```bash
   npx prisma migrate deploy
   ```
5. Start development server
   ```bash
   npm run dev
   ```

### Seeding the Database

The API includes a modular seeding system to populate the database with realistic test data:

```bash
# Seed with default settings
npm run seed

# Clear existing data and reseed
npm run seed:clear

# Seed only specific modules
npm run seed -- --module leads

# Customize data volume
npm run seed -- --users-per-business 50 --leads-per-business 200

# See all options
npm run seed -- --help
```

For more details on the seeding system, see [seed/README.md](seed/README.md)
