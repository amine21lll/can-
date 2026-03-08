# FIFA World Cup 2026 Platform - Deployment Checklist

## Pre-Deployment Configuration

### 1. Environment Variables
Ensure all required environment variables are set in your Vercel project:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

### 2. Supabase Configuration
- [ ] Database schema created (script: `002-world-cup-2026-schema.sql`)
- [ ] Row Level Security (RLS) policies enabled
- [ ] Authentication providers configured
- [ ] Email templates set up for password reset
- [ ] Database backups enabled

### 3. Stripe Configuration
- [ ] Stripe account created and verified
- [ ] API keys added to environment variables
- [ ] Webhook endpoint configured at: `/api/webhooks/stripe`
- [ ] Webhook secret added to environment variables
- [ ] Payment testing completed in test mode

### 4. Domain & DNS
- [ ] Custom domain configured in Vercel
- [ ] DNS records updated
- [ ] SSL certificate provisioned (automatic with Vercel)
- [ ] OG image tags updated with correct domain

### 5. Security Audit
- [ ] All API routes have proper authentication checks
- [ ] RLS policies enforce data privacy
- [ ] CSRF protection enabled (Next.js default)
- [ ] Input validation on all forms
- [ ] SQL injection prevented (using parameterized queries)
- [ ] Sensitive data not logged

### 6. Performance Optimization
- [ ] Images optimized with Next.js Image component
- [ ] Code splitting verified
- [ ] Database indexes created
- [ ] CDN caching configured
- [ ] Core Web Vitals monitored

### 7. Testing Checklist
- [ ] Authentication flow tested (signup, login, logout)
- [ ] Payment flow tested with Stripe test cards
- [ ] Volunteer registration tested
- [ ] Admin dashboard permissions verified
- [ ] Mobile responsiveness tested on devices
- [ ] Accessibility tested with screen readers

### 8. Monitoring & Analytics
- [ ] Vercel Analytics enabled
- [ ] Error tracking configured (optional: Sentry)
- [ ] Email notifications set up for errors
- [ ] Database monitoring enabled
- [ ] Stripe webhook logs monitored

### 9. Content & Branding
- [ ] Logo images added to `/public/images/`
  - `wc2026-logo.png` - Header logo
  - `wc2026-og.png` - OpenGraph image (1200x630)
  - `wc2026-twitter.png` - Twitter card image
- [ ] Match data populated in database
- [ ] Stadium information complete
- [ ] Team information added
- [ ] Sponsor logos uploaded

### 10. Launch Preparation
- [ ] Robots.txt configured for search engines
- [ ] Sitemap.xml generated and submitted
- [ ] Google Search Console verified
- [ ] Page titles and meta descriptions reviewed
- [ ] Structured data validated with Schema.org validator
- [ ] Social media links configured

## Deployment Steps

1. **Push to Production**
   ```bash
   git push origin main
   ```

2. **Verify Vercel Deployment**
   - Check Vercel dashboard for successful build
   - Test all critical user flows
   - Monitor server logs for errors

3. **Post-Deployment Verification**
   - Test payment processing with real card
   - Verify email notifications work
   - Check database backups
   - Monitor error rates

## Critical URLs to Test

- [ ] Home page: `/`
- [ ] Matches page: `/matches`
- [ ] Tickets page: `/tickets`
- [ ] Volunteers page: `/volunteers`
- [ ] Login page: `/login`
- [ ] Register page: `/register`
- [ ] Admin dashboard: `/admin` (requires authentication)
- [ ] API health: `/api/health` (if implemented)

## Monitoring After Launch

- **Daily**: Check error logs and payment transactions
- **Weekly**: Review analytics and performance metrics
- **Monthly**: Security audit and backup verification

## Rollback Plan

In case of critical issues:
1. Revert to previous Vercel deployment
2. Check database integrity
3. Clear CDN cache if needed
4. Notify users via status page

## Support Contacts

- **Vercel Support**: https://vercel.com/help
- **Supabase Support**: https://supabase.com/support
- **Stripe Support**: https://support.stripe.com
- **Email**: support@worldcup2026.example.com

---

**Last Updated**: March 2026
**Deployment Version**: 1.0.0
