# Bazar Dor (বাজার দর)


## Description

A web app that shows today's prices of everyday essentials across 12 markets in Bangladesh, with price changes,market-wise breakdowns and authentication.


## Features

1. **Authentication with BetterAuth** — email/password sign up and sign in,
   plus Google and GitHub social login, backed by MongoDB Atlas.
2. **Protected product pages** — `/product/[slug]` is only visible to
   signed-in users; visitors are redirected to sign in (with a toast) and
   sent back to the product after logging in.
3. **Live price data** — a scrolling price marquee, daily price movers
   (rising and falling), and a full product grid with Bangla numerals.
4. **Category browsing with sorting** — category pages with a price sort
   (low to high, high to low) and a custom 404 page for invalid routes.
5. **Profile management** — view account details and update your name
   from a dedicated update page.


## Tech stack

- Next.js (App Router), React, Tailwind CSS, daisyUI
- BetterAuth with the MongoDB adapter, MongoDB Atlas
- react-hot-toast for notifications
- Deployed on Vercel


## Live Link

https://bazar-dor-self-two.vercel.app/
