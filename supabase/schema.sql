-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql/new)

-- Enable Row Level Security
alter table if exists public.bouquet_entries disable row level security;
alter table if exists public.guestbook_entries disable row level security;

drop table if exists public.bouquet_entries;
drop table if exists public.guestbook_entries;

-- Bouquet entries
create table public.bouquet_entries (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  name text not null,
  gift text not null,
  message text not null
);

-- Guestbook entries
create table public.guestbook_entries (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  name text not null,
  message text not null
);

-- Allow public access (no auth needed)
create policy "Allow all on bouquet_entries"
  on public.bouquet_entries for all
  using (true)
  with check (true);

create policy "Allow all on guestbook_entries"
  on public.guestbook_entries for all
  using (true)
  with check (true);

alter table public.bouquet_entries enable row level security;
alter table public.guestbook_entries enable row level security;

-- Seed data (migrated from original localStorage defaults)
insert into public.bouquet_entries (name, gift, message, created_at) values
  ('Rev. Sr. Mary Anastasia (DDL)', 'Holy Mass', 'May God''s grace sustain you, dearest daughter, as you make this perpetual commitment.', now() - interval '1 day'),
  ('The Eke Family', 'Daily Rosary', 'We are incredibly proud of your devotion, Chimezirim. Walking this path is a lifelong blessing.', now() - interval '2 days'),
  ('St. Michael''s Parish Community', 'Divine Mercy Chaplet', 'All of Idima-Abam rejoices with you on this sacred day. God has truly called you by name.', now() - interval '3 days');

insert into public.guestbook_entries (name, message, created_at) values
  ('Ethel Omoje', 'Congratulations Sister Jane! Sending you radiant love and blessings from afar on this glorious milestone.', now() - interval '1 day'),
  ('Isaac Okonkwo', 'Wishing you profound joy and strength as you take your final vows. God bless your beautiful heart!', now() - interval '2 days'),
  ('The Ukeh Family', 'What a blessing to witness such faith! May your perpetual vows be a fountain of grace for all those you serve.', now() - interval '3 days');
