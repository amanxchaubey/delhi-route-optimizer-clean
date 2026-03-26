# 🚇 Delhi Route Optimizer

A full-stack web application for optimizing public transit routes across Delhi's metro and bus networks. Search routes, compare metro vs bus options in real-time, explore interactive maps, check live crowd levels, and calculate fares — all in one place.

> **Live Demo:** [delhi-route-optimizer-clean.vercel.app](https://delhi-route-optimizer-clean.vercel.app)

---

## ✨ Features

### 🔍 Smart Route Search
- BFS-based pathfinding across Delhi Metro's entire network
- Nearest station resolution — enter a landmark or area and get matched to the closest metro station with walking directions
- Displays station count, estimated time, fare, transfers, and lines used
- Full station chain visualization with transfer indicators

### 📊 Real-Time Intelligence
- Live crowd level indicators for every station on your route (Low / Moderate / High / Very High)
- Peak vs off-peak detection with time-aware crowd estimation
- Metro operating status (active / standby based on 6 AM – 11 PM schedule)
- DTC bus delay tracking with traffic-aware estimates

### 🆚 Metro vs Bus Comparison
- Side-by-side comparison of metro and bus for every searched route
- Automatic "optimal mode" recommendation based on current time, traffic, and crowd data
- Fare comparison (metro vs non-AC bus vs AC bus)

### 🗺️ Interactive Maps
- **Live Map** — Leaflet-powered interactive Delhi transit map with all metro lines, stations, and searched routes
- **Static Metro Map** — Quick-reference official metro network map
- Metro line highlighting when exploring individual lines

### 💰 Fare Calculator
- Calculate fares by distance for metro, bus (AC/non-AC), and combined routes
- Detailed fare breakdowns

### 🚉 Metro Line Explorer
- Browse all Delhi Metro lines with station lists
- Click a line to highlight it on the live map

### 🔐 Authentication
- Email/password sign-up & login with JWT
- OAuth login via **Google** and **GitHub**
- Auth-gated features (route search, fare calculator, real-time panel, admin dashboard)

### 🛡️ Admin Dashboard
- User management and analytics
- Report system with Recharts visualizations
- Station management
- Newsletter subscriber management

### 📬 Newsletter
- Email subscription from the footer
- Backend-managed subscriber list with Nodemailer integration

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| Vite (Rolldown) | Build tool & dev server |
| TailwindCSS 4 | Styling |
| Leaflet + React-Leaflet | Interactive maps |
| Recharts | Dashboard charts |
| React Router 7 | Client-side routing |
| Axios | HTTP client |
| Lucide React | Icon library |

### Backend
| Technology | Purpose |
|---|---|
| Express 5 | Web framework |
| MongoDB + Mongoose 9 | Database & ODM |
| Passport.js | OAuth (Google, GitHub) |
| JSON Web Tokens | Authentication |
| Bcrypt.js | Password hashing |
| Helmet | Security headers |
| Nodemailer | Email / newsletter |
| Morgan | Request logging |

### Deployment
| Service | Component |
|---|---|
| [Vercel](https://vercel.com) | Frontend hosting |
| [Render](https://render.com) | Backend hosting |
| MongoDB Atlas | Cloud database |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18+
- **npm** v9+
- A **MongoDB** instance (local or [Atlas](https://www.mongodb.com/atlas))

### 1. Clone the Repository

```bash
git clone https://github.com/amanxchaubey/delhi-route-optimizer-clean.git
cd delhi-route-optimizer-clean
```

### 2. Backend Setup

```bash
cd delhi-transit-backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/delhi-transit
JWT_SECRET=your-super-secret-key
NODE_ENV=development
CLIENT_URL=http://localhost:5173
SERVER_URL=http://localhost:5000

# Google OAuth (https://console.cloud.google.com/apis/credentials)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# GitHub OAuth (https://github.com/settings/developers)
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

Seed the database (optional):

```bash
npm run seed
```

Start the backend:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd delhi-transit-frontend
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 🔑 OAuth Setup

### Google
1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create an OAuth 2.0 Client ID
3. Add authorized redirect URI: `<SERVER_URL>/api/oauth/google/callback`
4. Add authorized JavaScript origin: `<CLIENT_URL>`

### GitHub
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create a new OAuth App
3. Set authorization callback URL: `<SERVER_URL>/api/oauth/github/callback`
4. Set homepage URL: `<CLIENT_URL>`

---

## 📁 Project Structure

```
delhi-route-optimizer-clean/
├── delhi-transit-backend/
│   ├── config/            # Database & Passport configuration
│   ├── controllers/       # Route controllers
│   ├── middleware/         # Auth & error handling middleware
│   ├── models/            # Mongoose schemas (User, Route, Station, Report, Subscriber)
│   ├── routes/            # API routes (auth, oauth, transit, stations, newsletter)
│   ├── services/          # Business logic services
│   ├── scripts/           # Utility scripts
│   ├── seed.js            # Database seeder
│   └── server.js          # Express app entry point
│
├── delhi-transit-frontend/
│   ├── public/            # Static assets
│   └── src/
│       ├── api/           # API client modules
│       ├── components/    # React components
│       │   ├── AdminDashboard.jsx   # Admin panel with analytics
│       │   ├── AdminLogin.jsx       # Auth page (email + OAuth)
│       │   ├── FareCalculator.jsx   # Fare computation modal
│       │   ├── Hero.jsx             # Route search hero section
│       │   ├── LiveMap.jsx          # Interactive Leaflet transit map
│       │   ├── MetroLines.jsx       # Metro line explorer
│       │   ├── RealTimePanel.jsx    # Live timings side panel
│       │   ├── StaticMap.jsx        # Static metro map modal
│       │   └── ...                  # Header, Footer, Features, etc.
│       ├── context/       # React context (AuthContext)
│       ├── data/          # Static data (metro lines, stations, coords)
│       ├── services/      # API service layer
│       └── utils/         # Route search, station info, transit helpers
│
└── README.md
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Login with email/password |
| `GET` | `/api/oauth/google` | Initiate Google OAuth |
| `GET` | `/api/oauth/github` | Initiate GitHub OAuth |
| `GET` | `/api/transit/*` | Transit data & route info |
| `GET` | `/api/stations` | Station data |
| `GET` | `/api/routes` | Saved routes |
| `POST` | `/api/newsletter/subscribe` | Subscribe to newsletter |

---

## 🌐 Environment Variables

### Backend (`.env`)

| Variable | Description |
|---|---|
| `PORT` | Server port (default: 5000) |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret for JWT signing |
| `NODE_ENV` | `development` or `production` |
| `CLIENT_URL` | Frontend URL (for CORS & OAuth redirects) |
| `SERVER_URL` | Backend URL (for OAuth callback URLs) |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `GITHUB_CLIENT_ID` | GitHub OAuth client ID |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth client secret |

### Frontend (`.env`)

| Variable | Description |
|---|---|
| `VITE_API_URL` | Backend API base URL |

---

## 📄 License

This project is licensed under the ISC License.

---

<p align="center">
  Built with ❤️ for Delhi commuters
</p>
