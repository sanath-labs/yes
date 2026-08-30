# KisanQueue Architecture

## Project Overview

KisanQueue is a React-based web application for managing farmer procurement queues with real-time tracking, AI-based wait time prediction, and transparent status updates.

**Problem Statement:** SIH 2026 - SIH26032  
**Tech Stack:** React 18, Vite, React Router, Tailwind CSS, Lucide Icons, Recharts

## Directory Structure

```
kisanqueue/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Layout.jsx       # Main layout wrapper
│   │   ├── ProtectedRoute.jsx # Route protection
│   │   ├── ToastStack.jsx   # Toast notifications
│   │   ├── StatusBadge.jsx  # Status indicator
│   │   └── KisanBot.jsx     # AI chatbot
│   ├── pages/               # Page components (routes)
│   │   ├── LandingPage.jsx
│   │   ├── FarmerLogin.jsx
│   │   ├── FarmerDashboard.jsx
│   │   ├── LiveQueue.jsx
│   │   ├── OperatorDashboard.jsx
│   │   ├── AdminDashboard.jsx
│   │   └── ...
│   ├── context/             # Global state management
│   │   └── AppContext.jsx   # Central app state
│   ├── services/            # Business logic
│   │   ├── notificationService.js
│   │   └── predictionEngine.js
│   ├── data/                # Mock data
│   │   └── mockData.js
│   ├── i18n/                # Internationalization
│   │   └── translations.js
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles (Tailwind)
├── index.html               # HTML template
├── package.json             # Dependencies
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind configuration
└── postcss.config.js        # PostCSS configuration
```

## Core Components

### State Management (AppContext)

Central state management using React Context API:

```javascript
useApp() → {
  // Auth state
  role, farmer, staff, loginFarmer, loginStaff, logout
  
  // UI state
  language, darkMode, notifications
  
  // Queue state
  queue, isSimulating, youIndex, farmersAhead, prediction
  
  // Procurement state
  procurementStage, procurementDetails, completeProcurement
  
  // Payment state
  paymentStage, history
}
```

### Role-Based Access

Three user types with different capabilities:

1. **Farmer** - Queue booking, tracking, payments
2. **Operator** - Centre management, queue monitoring
3. **Admin** - State-wide analytics, reports

### Pages & Routes

- `/` - Landing page
- `/farmer-login` - Farmer authentication
- `/operator-login` - Operator authentication
- `/admin-login` - Admin authentication
- `/register` - Farmer registration
- `/farmer/*` - Farmer dashboard & features
- `/operator/*` - Operator center management
- `/admin/*` - Administrative dashboards

## Key Features

### 1. Queue Management

**LiveQueue.jsx**
- Real-time queue visualization
- Split-flap token board display
- Current position tracking
- Estimated wait time (AI-powered)
- Queue animation and transitions

### 2. Prediction Engine

**predictionEngine.js**
- Calculates wait time based on:
  - Number of farmers ahead
  - Active counters
  - Average processing time
  - Historical patterns

### 3. Slot Booking

**SlotBooking.jsx**
- Date/time selection
- Crop type selection
- Quantity input
- Centre availability
- Confirmation workflow

### 4. Notifications

**notificationService.js**
- In-app toast notifications
- SMS-ready notification templates
- Real-time updates
- Notification history

### 5. Analytics

**OperatorAnalytics.jsx & AdminReports.jsx**
- Queue congestion charts
- Payment processing analytics
- Centre performance metrics
- Farmer behavior insights
- Revenue tracking

## Data Flow

```
User Action
    ↓
Component Event Handler
    ↓
AppContext Action (useApp hook)
    ↓
State Update
    ↓
Component Re-render
    ↓
UI Update
```

## Authentication Flow

1. User enters phone number
2. System validates and "sends OTP" (demo mode)
3. User enters OTP
4. System verifies and creates session
5. User redirected to dashboard
6. ProtectedRoute checks role and allows/denies access

## Styling Strategy

**Tailwind CSS** with custom theme:
- Color palette: Agricultural theme (greens, golds, earthy tones)
- Typography: Fraunces (headings), Noto Sans (body), IBM Plex Mono (code)
- Dark mode support
- Custom components: flap board animations, pulse effects

## Internationalization

**Languages supported:**
- English (en)
- Kannada (kn)
- Hindi (hi)
- Marathi (mr)
- Tamil (ta)
- Telugu (te)

Translation keys organized by feature.

## Mock Data Structure

**DEMO_FARMER**
```javascript
{
  id, name, phone, aadharId,
  preferredCentreId, cropType, quantity,
  registrationDate
}
```

**Queue Entry**
```javascript
{
  id, farmerId, status, position,
  arrivedAt, completedAt, isYou
}
```

## Performance Considerations

- **Code Splitting:** Routes lazy-loaded with React.lazy()
- **Bundle Size:** ~193 KB gzipped
- **Rendering:** Efficient re-renders with Context (consider Redux for large scale)
- **Images:** SVG icons via Lucide, optimized fonts

## Security Notes

- Mock authentication (for demo only)
- In production: Implement proper OAuth/JWT
- Validate all inputs server-side
- Use HTTPS for all communications
- Sanitize user inputs

## Future Enhancements

1. Backend API integration
2. Real database (PostgreSQL/MongoDB)
3. WebSocket for live updates
4. SMS/Email notifications
5. Payment gateway integration
6. Advanced analytics
7. Mobile app (React Native)
8. Machine learning for better predictions
9. Multi-language support expansion
10. Accessibility improvements (WCAG 2.1 AA)

## Development Workflow

```bash
# Setup
npm install

# Development with hot-reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Code analysis (if linting set up)
npm run lint
```

## Dependencies

**Runtime:**
- react, react-dom (UI)
- react-router-dom (Routing)
- recharts (Data visualization)
- lucide-react (Icons)

**Build:**
- vite (Build tool)
- @vitejs/plugin-react (React plugin)
- tailwindcss (Utility CSS)
- postcss, autoprefixer (CSS processing)

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Modern mobile browsers

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

---

**Last Updated:** 2026-08-30  
**Maintainer:** Sanath Labs
