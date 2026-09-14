# Brown West Home Services Website

Final static frontend for Brown West Home Services in Greenbrier, Arkansas.

## Production files

- `index.html` — page content, SEO metadata, LocalBusiness structured data, Google map, service scope, and quote request form
- `styles.css` — responsive black-and-gold design for desktop, tablet, and mobile
- `app.js` — mobile navigation plus validated quote-request actions for SMS and email
- `assets/favicon.svg` — browser favicon
- `assets/*.webp` — optimized clean photo backgrounds used by the live page

The original generated PNG artwork remains in `assets/` as source artwork, but the website itself uses the optimized text-free WebP images so no lettering is clipped inside image cards.

## Contact actions

- Phone links call `559-580-8352`
- Text links open the device SMS app
- Email links open a message to `brown.rickey95@gmail.com`
- The quote form validates required fields and builds a complete SMS or email from the customer's answers
- The map points to `21 Mitchell Circle, Greenbrier, AR 72058`

## Service scope

Public copy is limited to non-licensed handyman and household work. The site does not advertise plumbing, electrical, HVAC, gas, roofing, structural remodeling, hazardous-waste work, or other licensed trades.

## Deployment

No build step is required. Publish the entire folder on a static host with `index.html` as the site root.

Before public launch, add the final public domain to hosting/DNS and then add a canonical URL, sitemap, and domain-specific search-console verification.
