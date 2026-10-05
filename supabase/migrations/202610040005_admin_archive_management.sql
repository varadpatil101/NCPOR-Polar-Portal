-- Permit authenticated administrators to manage archive content through the portal.
-- Public read policies remain limited to PUBLISHED records.
create policy "Admins manage expeditions" on public.expeditions for all to authenticated
using (exists (select 1 from public.user_roles where user_id = auth.uid() and role = 'ADMIN'))
with check (exists (select 1 from public.user_roles where user_id = auth.uid() and role = 'ADMIN'));

create policy "Admins manage publications" on public.publications for all to authenticated
using (exists (select 1 from public.user_roles where user_id = auth.uid() and role = 'ADMIN'))
with check (exists (select 1 from public.user_roles where user_id = auth.uid() and role = 'ADMIN'));

create policy "Admins manage datasets" on public.datasets for all to authenticated
using (exists (select 1 from public.user_roles where user_id = auth.uid() and role = 'ADMIN'))
with check (exists (select 1 from public.user_roles where user_id = auth.uid() and role = 'ADMIN'));

create policy "Admins manage media assets" on public.media_assets for all to authenticated
using (exists (select 1 from public.user_roles where user_id = auth.uid() and role = 'ADMIN'))
with check (exists (select 1 from public.user_roles where user_id = auth.uid() and role = 'ADMIN'));

notify pgrst, 'reload schema';
