# FIFA World Cup 2026 - Production-Ready Platform

A modern, full-stack Next.js application for the FIFA World Cup 2026 North America tournament. This platform enables ticket sales, volunteer management, match scheduling, and administrative oversight with a professional international sporting event aesthetic.

## 🏗️ Architecture Overview

### Technology Stack

- **Frontend**: Next.js 16 (React 19), TypeScript, Tailwind CSS v4
- **Database**: Supabase (PostgreSQL) with Row Level Security
- **Authentication**: Email/Password with Supabase Auth
- **Payments**: Stripe (checkout and webhook handling)
- **Deployment**: Vercel
- **Monitoring**: Vercel Analytics

### Project Structure

```
can-vi-main/
├── app/
│   ├── api/
│   │   ├── auth/          # Authentication endpoints
│   │   ├── payments/      # Stripe payment intents
│   │   ├── orders/        # Ticket orders management
│   │   ├── volunteers/    # Volunteer registration
│   │   ├── matches/       # Match data endpoints
│   │   ├── tickets/       # Ticket availability
│   │   ├── admin/         # Admin-only endpoints
│   │   └── webhooks/      # Stripe webhooks
│   ├── admin/             # Admin dashboard (protected)
│   ├── login/             # Authentication pages
│   ├── register/
│   ├── matches/           # Match listing and details
│   ├── tickets/           # Ticket booking page
│   ├── volunteers/        # Volunteer registration
│   ├── partners/          # Sponsor showcase
│   ├── globals.css        # World Cup 2026 color scheme
│   └── layout.tsx         # Root layout with SEO
├── components/
│   ├── auth/              # Login/Register forms
│   ├── checkout/          # Stripe checkout component
│   ├── layout/            # Header, footer, navigation
│   ├── home/              # Homepage sections
│   ├── seo/               # Structured data schemas
│   └── ui/                # shadcn/ui components
├── lib/
│   ├── supabase/          # Supabase client utilities
│   ├── stripe.ts          # Stripe configuration
│   ├── auth.ts            # Auth utilities
│   ├── accessibility.ts   # WCAG 2.1 utilities
│   └── admin-protection.ts
├── scripts/
│   ├── 001-create-database-schema.sql     # Initial schema
│   └── 002-world-cup-2026-schema.sql      # Production schema
├── middleware.ts          # Auth middleware
├── DEPLOYMENT.md          # Deployment checklist
└── package.json

```

## 🚀 Key Features Implemented

### 1. Authentication System
- **Email/Password signup and login** with Supabase Auth
- **Password reset** functionality
- **Protected routes** via middleware
- **Admin-only access** to volunteer and analytics dashboards
- **Session management** with HTTP-only cookies

### 2. Database & Data Management
- **Complete Supabase schema** with 10+ tables:
  - `users` - User accounts and profiles
  - `volunteers` - Volunteer registrations
  - `matches` - Tournament schedule
  - `stadiums` - Venue information
  - `teams` - Team details
  - `tickets` - Available seats
  - `orders` - Ticket purchases
  - `sponsors` - Partnership information
  - And more...
- **Row Level Security (RLS)** policies for data privacy
- **Automatic timestamps** for audit trails

### 3. Payment Processing
- **Stripe integration** for real payments
- **Payment intent creation** API
- **Webhook handling** for payment status updates
- **Order management** system
- **PCI compliance** through Stripe

### 4. Volunteer Management
- **Registration system** with form validation
- **Admin dashboard** for managing volunteers
- **Status tracking** (pending, approved, rejected)
- **Volunteer roles** (grounds crew, security, medical, etc.)

### 5. Ticket Management
- **Seat availability** tracking
- **Dynamic pricing** by match and seat type
- **Secure checkout** with Stripe
- **Order history** for authenticated users
- **Ticket download/confirmation**

### 6. Admin Dashboard
- **Analytics overview** with key metrics
- **Volunteer management** interface
- **Match management** (CRUD operations)
- **Ticket sales monitoring**
- **User management**

### 7. Design & Branding
- **FIFA World Cup 2026 color palette**: Navy Blue, Teal, Gold
- **Responsive design** (mobile-first)
- **Professional animations** (smooth transitions, hover effects)
- **Consistent typography** across the platform
- **Accessibility-first approach** (WCAG 2.1 AA compliant)

### 8. SEO & Performance
- **Comprehensive metadata** with OpenGraph tags
- **Structured data** (schema.org JSON-LD)
- **Sitemap & robots.txt** for search engines
- **Image optimization** with Next.js Image component
- **Core Web Vitals** optimized
- **Mobile-friendly** design

## 🔐 Security Features

### Authentication & Authorization
- **Secure password hashing** via Supabase (bcrypt)
- **JWT tokens** with secure storage
- **CSRF protection** via Next.js built-in
- **Rate limiting** on API endpoints
- **Admin role verification** on protected routes

### Data Protection
- **Row Level Security (RLS)** on database tables
- **Parameterized queries** prevent SQL injection
- **Input validation** on all forms
- **Sensitive data** never exposed in client code
- **HTTPS everywhere** via Vercel

### API Security
- **Authentication required** for sensitive endpoints
- **Permission checks** before data access
- **Webhook signature verification** from Stripe
- **CORS configuration** for third-party access

## 📊 Database Schema Highlights

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR UNIQUE,
  full_name VARCHAR,
  password_hash VARCHAR,
  role VARCHAR DEFAULT 'user',
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

### Orders Table
```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users,
  match_id UUID REFERENCES matches,
  ticket_count INTEGER,
  total_amount DECIMAL,
  stripe_payment_intent_id VARCHAR,
  status VARCHAR DEFAULT 'pending',
  created_at TIMESTAMP
);
```

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/password-reset` - Request password reset

### Tickets & Orders
- `GET /api/matches` - List all matches
- `GET /api/tickets?matchId=X` - Get available tickets
- `POST /api/orders` - Create ticket order
- `GET /api/orders` - User's order history
- `POST /api/payments/intent` - Create payment intent

### Volunteers
- `POST /api/volunteers` - Register as volunteer
- `GET /api/admin/volunteers` - List all volunteers (admin)
- `PATCH /api/admin/volunteers/:id` - Update volunteer status

### Admin
- `GET /api/admin/matches` - Manage matches
- `POST /api/admin/matches` - Create match
- `GET /api/admin/tickets` - Ticket analytics

### Webhooks
- `POST /api/webhooks/stripe` - Stripe payment updates

## 🌍 Color Scheme (FIFA World Cup 2026)

- **Primary Navy**: `oklch(0.2 0.12 260)` - #002B5C
- **Secondary Teal**: `oklch(0.55 0.15 200)` - #00A4B8
- **Accent Gold**: `oklch(0.75 0.18 90)` - #FFD700
- **Neutrals**: White, Gray, Black for text and backgrounds

## ♿ Accessibility Compliance

- **WCAG 2.1 AA** compliant
- **Keyboard navigation** support
- **Screen reader** compatible
- **Color contrast** ratios ≥ 4.5:1
- **Focus management** for interactive elements
- **Reduced motion** support via `prefers-reduced-motion`
- **Touch targets** minimum 44x44px
- **Alt text** for all images

## 🧪 Testing Checklist

Before deployment, verify:
- [ ] User can signup and receive confirmation email
- [ ] User can login with email/password
- [ ] Volunteer can register with form validation
- [ ] Admin can view and manage volunteers
- [ ] Stripe payment intent creates successfully
- [ ] Webhook receives and processes payments
- [ ] Protected routes redirect unauthenticated users
- [ ] Mobile layout responsive on all breakpoints
- [ ] Images load with Next.js Image optimization
- [ ] Metadata renders correctly in browser

## 📝 Environment Variables Required

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyxxxx
SUPABASE_SERVICE_ROLE_KEY=eyxxxx
STRIPE_SECRET_KEY=sk_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
```

## 🚢 Deployment

See `DEPLOYMENT.md` for comprehensive deployment checklist and post-launch verification steps.

### Quick Deploy to Vercel

```bash
# Push to GitHub
git push origin main

# Vercel auto-deploys on push
# Visit Vercel dashboard to configure environment variables
```

## 📈 Performance Metrics

Target metrics for production:
- **Lighthouse Score**: > 90
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3.5s

## 🔄 Continuous Improvement

After launch, monitor:
- User signup and login success rates
- Payment conversion funnel
- Page performance metrics
- Error rates and exceptions
- Volunteer registration trends
- Ticket sales velocity

## 📞 Support & Resources

- **Supabase Docs**: https://supabase.com/docs
- **Stripe Docs**: https://stripe.com/docs/payments
- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs

---

**Version**: 1.0.0  
**Last Updated**: March 2026  
**Status**: Production Ready ✅
