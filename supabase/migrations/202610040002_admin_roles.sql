-- Explicit authorization for authenticated portal users. Keep this separate from auth identities.
create type public.app_role as enum ('CONTRIBUTOR','REVIEWER','EDITOR','ADMIN');
create table public.user_roles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role public.app_role not null default 'CONTRIBUTOR',
  created_at timestamptz not null default now()
);
alter table public.user_roles enable row level security;
grant select on public.user_roles to authenticated;
create policy "Users can read their own role" on public.user_roles for select to authenticated using (auth.uid() = user_id);
notify pgrst, 'reload schema';
-- Add an ADMIN row explicitly for each approved administrator after applying this migration.
