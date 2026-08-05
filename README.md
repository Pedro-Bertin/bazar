# Bazar

A full-stack marketplace web app built with Next.js, TypeScript, and Prisma. Users can create an account, sign in, manage their address, and list products for sale with images.

## Features

- **Authentication** — account creation and login with hashed passwords (bcrypt).
- **User profiles** — each user has a linked address (street, neighborhood, city, state, zip).
- **Product listings** — create, view, and manage products with title, description, price, category, and multiple images.
- **Image uploads** — product images are hosted via Cloudinary.
- **Private routes** — account and product management pages are only accessible to authenticated users.
- **UI components** — built with Radix UI primitives and shadcn-style components, styled with Tailwind CSS, with light/dark theme support via next-themes.

## Tech stack

- **Framework:** Next.js (App Router) + React
- **Language:** TypeScript
- **Database / ORM:** PostgreSQL + Prisma
- **Auth:** bcrypt password hashing, Server Actions for user/session logic
- **Image hosting:** Cloudinary (next-cloudinary)
- **UI:** Tailwind CSS, Radix UI, lucide-react icons

## Project structure

- `actions/` — server actions for users (`user.actions.ts`) and products (`product.actions.ts`)
- `app/` — routes, including `(private)` route group, `login`, and `register` pages
- `components/ui/` — reusable UI components
- `prisma/` — database schema (`User`, `Address`, `Product`, `ProductImage`)
- `lib/` — shared utilities

## Getting started

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Set up your environment variables (database connection string, Cloudinary credentials).

3. Run the Prisma migrations:

```bash
npx prisma migrate dev
```

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Status

This project is being actively revisited and improved. Feedback and suggestions are welcome.
