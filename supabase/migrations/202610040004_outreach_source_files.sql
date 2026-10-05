-- Broaden the private Outreach Studio source bucket to supported documents.
update storage.buckets
set allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp', 'text/plain', 'text/markdown', 'text/csv', 'application/json', 'application/pdf']
where id = 'outreach-media';

create or replace function public.create_outreach_source_asset(
  p_slug text,
  p_title text,
  p_caption text,
  p_file_key text,
  p_mime_type text,
  p_type text
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
  if p_slug !~ '^[a-z0-9-]{3,160}$' or p_file_key !~ '^outreach/[a-zA-Z0-9._/-]+$' or p_type not in ('IMAGE', 'OTHER') or p_mime_type not in ('image/jpeg', 'image/png', 'image/webp', 'text/plain', 'text/markdown', 'text/csv', 'application/json', 'application/pdf') then
    raise exception 'Invalid outreach source metadata';
  end if;
  insert into public.media_assets (slug, type, title, caption, alt_text, file_key, mime_type, access_status, status, rights)
  values (p_slug, p_type, p_title, nullif(p_caption, ''), nullif(p_caption, ''), p_file_key, p_mime_type, 'PRIVATE', 'DRAFT', 'Admin outreach upload')
  returning id into asset_id;
  return asset_id;
end;
$$;

revoke all on function public.create_outreach_source_asset(text, text, text, text, text, text) from public;
grant execute on function public.create_outreach_source_asset(text, text, text, text, text, text) to authenticated;
notify pgrst, 'reload schema';
