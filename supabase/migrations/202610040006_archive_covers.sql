-- Private cover images for archive records. Signed URLs are available only for published records.
alter table public.expeditions add column if not exists cover_image_key text, add column if not exists cover_image_alt text;
alter table public.publications add column if not exists cover_image_key text, add column if not exists cover_image_alt text;
alter table public.datasets add column if not exists cover_image_key text, add column if not exists cover_image_alt text;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('archive-covers', 'archive-covers', false, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update set public = false, file_size_limit = 5242880, allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp'];

create policy "Admins upload archive covers" on storage.objects for insert to authenticated
with check (bucket_id = 'archive-covers' and exists (select 1 from public.user_roles where user_id = auth.uid() and role = 'ADMIN'));
create policy "Admins read archive covers" on storage.objects for select to authenticated
using (bucket_id = 'archive-covers' and exists (select 1 from public.user_roles where user_id = auth.uid() and role = 'ADMIN'));
create policy "Admins delete archive covers" on storage.objects for delete to authenticated
using (bucket_id = 'archive-covers' and exists (select 1 from public.user_roles where user_id = auth.uid() and role = 'ADMIN'));
create policy "Published archive covers are readable" on storage.objects for select
using (bucket_id = 'archive-covers' and (
  exists (select 1 from public.expeditions where cover_image_key = name and status = 'PUBLISHED') or
  exists (select 1 from public.publications where cover_image_key = name and status = 'PUBLISHED') or
  exists (select 1 from public.datasets where cover_image_key = name and status = 'PUBLISHED')
));

notify pgrst, 'reload schema';
