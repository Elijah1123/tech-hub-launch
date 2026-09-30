CREATE TABLE public.site_events (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 event_type text NOT NULL CHECK (event_type IN ('page_view','social_click')),
 target text NOT NULL CHECK (target IN ('/','/courses','/courses/software-engineering-web','/courses/software-engineering-mobile-app','/courses/cybersecurity','/about','/contact','/apply','/feedback','/privacy','whatsapp','tiktok','facebook')),
 visitor_id uuid NOT NULL,
 event_day date NOT NULL DEFAULT (now() AT TIME ZONE 'UTC')::date,
 created_at timestamptz NOT NULL DEFAULT now(),
 UNIQUE (event_type, target, visitor_id, event_day)
);
GRANT SELECT ON public.site_events TO authenticated;
GRANT ALL ON public.site_events TO service_role;
ALTER TABLE public.site_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY site_events_admin_read ON public.site_events FOR SELECT TO authenticated USING (private.has_role(auth.uid(),'admin'));
CREATE INDEX site_events_summary ON public.site_events (event_type, target);