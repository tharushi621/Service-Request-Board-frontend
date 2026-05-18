# GlobalTNA – Mini Service Request Board

A full-stack web app where homeowners can post service requests and tradespeople can browse, filter and manage them.

**Tech Stack:** Next.js 14 (App Router) · Node.js + Express · MongoDB Atlas · Mongoose · Tailwind CSS


## Project Structure

frontend/
├── app/
│   ├── auth/
│   │   └── page.jsx
│   │
│   ├── context/
│   │   └── AuthContext.jsx
│   │
│   ├── jobs/
│   │   ├── [id]/
│   │   │   └── page.js
│   │   ├── new/
│   │   │   └── page.js
│   │   └── page.js
│   │
│   ├── splash/
│   │   └── page.jsx
│   │
│   ├── globals.css
│   ├── layout.js
│   └── page.js
│
├── components/
│   ├── JobCard.js
│   └── StatusBadge.js
│
├── lib/
│   └── api.js
│
├── public/
│   └── hero.jpg
│
├── .env
├── .gitignore
├── next.config.js
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
└── tailwind.config.js

### Frontend (`frontend/.env.local`)

Copy `frontend/.env.local.example` to `frontend/.env.local`:

NEXT_PUBLIC_API_URL=http://localhost:5000

## Setup & Run

### Prerequisites

- Node.js 18+
- A MongoDB Atlas account (free tier is fine)

### 1. Clone the repo

git clone https://github.com/<my-username>/globaltna.git
cd globaltna
