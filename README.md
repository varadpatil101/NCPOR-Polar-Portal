# NCPOR Polar Knowledge & Outreach Portal

Cloud-backend-first Next.js prototype. The public interface is operational in explicit demo mode until a Supabase Cloud project is configured.

## Run locally

1. Copy `.env.example` to `.env.local`.
2. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` from your Supabase Cloud project to load cloud data. Do not put `SUPABASE_SERVICE_ROLE_KEY` in client code.
3. Install dependencies with `pnpm install`, then run `pnpm dev`.

## Vercel environment variables

Vercel does not import a local `.env.local` file from a manually uploaded project. In **Project Settings → Environment Variables**, configure the following names for every environment you deploy (at least **Production** and **Preview**):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

These are required by both the browser Supabase client and the server-side session/data client. Because they are `NEXT_PUBLIC_*` values, redeploy after adding or changing them so Next.js can embed the browser-safe configuration in the build.

`SUPABASE_SERVICE_ROLE_KEY` is server-only and is required only for code paths using the trusted `createAdminClient`; never give it a `NEXT_PUBLIC_` prefix. `GROQ_API_KEY` is also server-only and is required only for the Outreach Studio AI route.

## Supabase setup

Apply `supabase/migrations/202610030001_initial_schema.sql` and then `supabase/seed.sql` to the connected Supabase Cloud database. The migration enables RLS and exposes only published public data. Create a private `media` Storage bucket and policy before enabling uploads.

## Checks

`pnpm lint` · `pnpm typecheck` · `pnpm test` · `pnpm build` · `pnpm test:e2e`

All visible demo content is synthetic and is labelled in the interface. It must not be treated as official NCPOR research, activity, or measurement data.
