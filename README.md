# 🍽️ Restaurant Manager

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20App-brightgreen?style=for-the-badge&logo=vercel)](https://dz648r8r2xl3b.cloudfront.net/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)
[![Django](https://img.shields.io/badge/Django-6.0-green?style=for-the-badge&logo=django)](https://www.djangoproject.com/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker)](https://www.docker.com/)

A full-stack restaurant operations management system built for small to medium restaurants. It helps owners track daily sales, manage inventory, monitor production, log expenses, and get a real-time financial overview — all from a single dashboard. Supports both English and Tamil (தமிழ்) languages.

---

## Features

- **Dashboard** — Real-time overview of today's revenue, profit, waste cost, expenses, top-selling items, and low-stock alerts
- **Menu Management** — Add and manage menu items with categories (Breakfast, Lunch, Dinner, Snack, Drink), cost price, and selling price with auto-calculated margin
- **Sales Tracking** — Record daily sales per menu item and track quantity sold
- **Production Logging** — Log how many units of each menu item were prepared each day
- **Inventory Management** — Track ingredients with current stock, minimum stock thresholds, unit types, and cost per unit
- **Expense Tracking** — Record operational expenses (Rent, Salary, Gas, Electricity, Water, Internet, etc.)
- **Waste Monitoring** — Track wasted items with reasons (Unsold, Burnt, Spoiled, Returned) and calculate waste cost
- **Bilingual UI** — Full English and Tamil language support across the entire interface
- **Multi-User Support** — Each account has fully isolated data; registering a new account starts with a clean slate
- **User Registration** — Self-service account creation via the register page
- **JWT Authentication** — Secure login with token-based auth and auto inactivity logout
- **Protected Routes** — All pages require authentication

---

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| Vite | Build tool |
| Tailwind CSS 4 | Styling |
| React Router 7 | Client-side routing |
| Axios | HTTP client |
| Context API | Auth & language state |

### Backend
| Technology | Purpose |
|---|---|
| Django 6 | Web framework |
| Django REST Framework | REST API |
| SimpleJWT | JWT authentication |
| PostgreSQL | Production database |
| Gunicorn | WSGI server |
| WhiteNoise | Static file serving |

### Infrastructure
| Technology | Purpose |
|---|---|
| Docker & Docker Compose | Containerization |
| Nginx | Reverse proxy & frontend serving |
| AWS EC2 | Hosting |
| GitHub Actions | CI/CD pipeline |

---

## Project Structure

```
restaurant-predictor/
├── backend/
│   ├── config/             # Django settings, URLs, WSGI/ASGI
│   ├── restaurant/
│   │   ├── migrations/
│   │   ├── services/       # Business logic (dashboard calculations)
│   │   ├── models.py       # DB models
│   │   ├── serializers.py
│   │   ├── views.py        # API viewsets + dashboard + register views
│   │   └── urls.py
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── api/            # Axios instance
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # Auth & language context
│   │   ├── hooks/          # useAuth, useInactivityLogout
│   │   ├── i18n/           # English & Tamil translations
│   │   ├── pages/          # Dashboard, Menu, Sales, Inventory, Production, Expenses, Login, Register
│   │   └── services/       # API service functions
│   ├── Dockerfile
│   └── package.json
├── .github/workflows/      # GitHub Actions CI/CD
├── docker-compose.yml
└── nginx.conf
```

---

## Getting Started

### Prerequisites
- [Docker](https://www.docker.com/) and Docker Compose
- Node.js 18+ (for local frontend dev)
- Python 3.11+ (for local backend dev)

### Run with Docker (Recommended)

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd restaurant-predictor
   ```

2. Create a `.env` file in the root:
   ```env
   DOCKER_USERNAME=your_dockerhub_username
   DJANGO_SECRET_KEY=your_secret_key
   DB_NAME=restaurant_db
   DB_USER=postgres
   DB_PASSWORD=your_db_password
   DJANGO_SUPERUSER_USERNAME=admin
   DJANGO_SUPERUSER_EMAIL=admin@example.com
   DJANGO_SUPERUSER_PASSWORD=your_admin_password
   ```

3. Start all services:
   ```bash
   docker compose up -d
   ```

4. Open [http://localhost](http://localhost) in your browser.

### Local Development

**Backend:**
```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
pip install -r requirements.txt
# Create backend/config/.env with DB credentials
python manage.py migrate
python manage.py runserver
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

---

## Multi-User Data Isolation

Every piece of data (ingredients, menu items, sales, production, expenses, waste, suppliers) is scoped to the account that created it. Users who register and log in will only ever see and interact with their own data.

---

## API Endpoints

| Endpoint | Description |
|---|---|
| `POST /api/register/` | Create a new user account |
| `POST /api/token/` | Obtain JWT token |
| `POST /api/token/refresh/` | Refresh JWT token |
| `GET /api/dashboard/` | Today's revenue, profit, waste, top items, low stock |
| `CRUD /api/ingredients/` | Ingredient management |
| `CRUD /api/menu-items/` | Menu item management |
| `CRUD /api/sales/` | Sales records |
| `CRUD /api/productions/` | Production records |
| `CRUD /api/expenses/` | Expense records |
| `CRUD /api/wastes/` | Waste records |
| `CRUD /api/suppliers/` | Supplier management |

All endpoints except `/api/register/` and `/api/token/` require a valid JWT Bearer token.

---

## CI/CD

Pushing to the `master` branch automatically:
1. Builds and pushes Docker images for backend and frontend to Docker Hub
2. SSHs into the EC2 instance
3. Pulls the latest images and restarts services via `docker compose`
4. Runs `python manage.py migrate` to apply any pending migrations
5. Creates the Django superuser if it doesn't exist

Required GitHub Secrets: `DOCKER_USERNAME`, `DOCKER_PASSWORD`, `EC2_HOST`, `EC2_USER`, `EC2_SSH_KEY`, `REPO_URL`, `DJANGO_SECRET_KEY`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DJANGO_SUPERUSER_USERNAME`, `DJANGO_SUPERUSER_EMAIL`, `DJANGO_SUPERUSER_PASSWORD`

---

## License

This project is licensed under the MIT License.
