-- Private, admin-only image uploads for the Outreach Studio.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('outreach-media', 'outreach-media', false, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update set public = false, file_size_limit = 5242880, allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp'];

create policy "Admins upload outreach media" on storage.objects for insert to authenticated
with check (bucket_id = 'outreach-media' and exists (select 1 from public.user_roles where user_id = auth.uid() and role = 'ADMIN'));
create policy "Admins read outreach media" on storage.objects for select to authenticated
using (bucket_id = 'outreach-media' and exists (select 1 from public.user_roles where user_id = auth.uid() and role = 'ADMIN'));
create policy "Admins delete outreach media" on storage.objects for delete to authenticated
using (bucket_id = 'outreach-media' and exists (select 1 from public.user_roles where user_id = auth.uid() and role = 'ADMIN'));
create policy "Admins can read draft media" on public.media_assets for select to authenticated
using (exists (select 1 from public.user_roles where user_id = auth.uid() and role = 'ADMIN'));

create or replace function public.create_outreach_media_asset(
  p_slug text,
  p_title text,
  p_caption text,
  p_file_key text,
  p_mime_type text
) returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare asset_id uuid;
begin
  if auth.uid() is null or not exists (select 1 from public.user_roles where user_id = auth.uid() and role = 'ADMIN') then
    raise exception 'Administrator authorization is required';
  end if;
  if p_slug !~ '^[a-z0-9-]{3,160}$' or p_file_key !~ '^outreach/[a-zA-Z0-9._/-]+$' then
    raise exception 'Invalid media metadata';
  end if;
  insert into public.media_assets (slug, type, title, caption, alt_text, file_key, mime_type, access_status, status, rights)
  values (p_slug, 'IMAGE', p_title, nullif(p_caption, ''), nullif(p_caption, ''), p_file_key, p_mime_type, 'PRIVATE', 'DRAFT', 'Admin outreach upload')
  returning id into asset_id;
  return asset_id;
end;
$$;
revoke all on function public.create_outreach_media_asset(text, text, text, text, text) from public;
grant execute on function public.create_outreach_media_asset(text, text, text, text, text) to authenticated;
notify pgrst, 'reload schema';
