# Quick Start Guide

## Getting Started in 5 Minutes

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm
- Supabase account (free tier available)
- Stripe account (test mode available)
- Git (for version control)

### Step 1: Clone & Install Dependencies

```bash
cd can-vi-main
npm install
# or
yarn install
pnpm install
bun install
```

### Step 2: Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe
STRIPE_SECRET_KEY=sk_test_your_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key
STRIPE_WEBHOOK_SECRET=whsec_your_secret
```

### Step 3: Set Up Supabase

1. Create a new Supabase project at https://supabase.com
2. In your project dashboard, go to **SQL Editor**
3. Create a new query and paste the contents of `/scripts/002-world-cup-2026-schema.sql`
4. Run the query to set up the database schema
5. Copy your URL and API keys from **Settings > API**

### Step 4: Configure Stripe

1. Go to https://stripe.com/docs/testing to get test card numbers
2. In your Stripe Dashboard, get your API keys from **Developers > API Keys**
3. Add your webhook endpoint:
   - URL: `https://your-domain.com/api/webhooks/stripe`
   - Events: `payment_intent.succeeded`, `payment_intent.payment_failed`

### Step 5: Run the Development Server

```bash
npm run dev
# or
yarn dev
pnpm dev
bun dev
```

Visit http://localhost:3000 to see the application.

## Key URLs to Test

- **Home**: http://localhost:3000
- **Register**: http://localhost:3000/register
- **Login**: http://localhost:3000/login
- **Matches**: http://localhost:3000/matches
- **Tickets**: http://localhost:3000/tickets
- **Volunteers**: http://localhost:3000/volunteers
- **Admin**: http://localhost:3000/admin (requires login)

## Test Credentials

### Test User Account
```
Email: test@example.com
Password: TestPassword123!
```

### Stripe Test Cards
```
Success: 4242 4242 4242 4242
Fail: 4000 0000 0000 0002
3D Secure: 4000 0025 0000 3155
```

## Important Files

| File | Purpose |
|------|---------|
| `/app/layout.tsx` | Root layout with metadata |
| `/app/globals.css` | World Cup 2026 color scheme |
| `/lib/supabase/` | Supabase configuration |
| `/app/api/` | API endpoints |
| `/components/auth/` | Authentication forms |
| `DEPLOYMENT.md` | Deployment checklist |
| `README_IMPLEMENTATION.md` | Full documentation |

## Common Tasks

### View Database
```bash
# Visit Supabase dashboard
https://app.supabase.com/project/your-project-id/editor
```

### Test Payment
1. Go to http://localhost:3000/tickets
2. Select a match and tickets
3. Proceed to checkout
4. Use Stripe test card: `4242 4242 4242 4242`
5. Check webhook logs in Stripe Dashboard

### Create Admin User
In Supabase SQL Editor:
```sql
UPDATE users SET role = 'admin' WHERE email = 'your@email.com';
```

### Reset Database
```bash
# Delete all tables and restart
# In Supabase SQL Editor, run:
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

# Then re-run: /scripts/002-world-cup-2026-schema.sql
```

## Troubleshooting

### "Database connection error"
- Verify Supabase URL and API keys in `.env.local`
- Check Supabase project is active
- Ensure database schema was created

### "Stripe error"
- Verify Stripe keys are in `.env.local`
- Make sure you're using TEST keys (starts with `pk_test_`)
- Check webhook secret is configured

### "Page shows 404"
- Verify all files exist in `/app/` directory
- Check middleware is properly configured
- Clear Next.js cache: `rm -rf .next`

### "Styles not loading"
- Verify Tailwind CSS is configured in `tailwind.config.js`
- Check `globals.css` is imported in `layout.tsx`
- Restart dev server

## Next Steps

1. **Read Full Documentation**: See `README_IMPLEMENTATION.md`
2. **Deploy to Vercel**: See `DEPLOYMENT.md`
3. **Test All Features**: Use the testing checklist in `DEPLOYMENT.md`
4. **Configure Monitoring**: Set up error tracking and analytics
5. **Customize Content**: Add your match data, team info, and branding

## Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Run production build

# Database
npm run db:sync         # Sync database schema
npm run db:reset        # Reset database

# Code Quality
npm run lint            # Run ESLint
npm run type-check      # TypeScript type checking

# Git
git add .
git commit -m "message"
git push origin main
```

## Architecture Quick Reference

```
User → Next.js Frontend
      ↓
    Middleware (Auth Check)
      ↓
    API Routes (Protected)
      ↓
    Supabase (PostgreSQL + Auth)
         +
    Stripe API (Payments)
```

## Security Reminders

⚠️ **IMPORTANT**:
- Never commit `.env.local` to git
- Use environment variables for all secrets
- Always verify webhook signatures
- Enable RLS on all Supabase tables
- Use HTTPS in production
- Keep dependencies updated: `npm audit fix`

## Support

- **Docs**: See `README_IMPLEMENTATION.md` for full documentation
- **Issues**: Check Git logs and error messages
- **Stripe**: https://support.stripe.com
- **Supabase**: https://supabase.com/support

---

**Ready to launch?** Follow the `DEPLOYMENT.md` checklist before going live!
