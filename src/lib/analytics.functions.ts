import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';

const targets = ['/', '/courses', '/courses/software-engineering-web', '/courses/software-engineering-mobile-app', '/courses/cybersecurity', '/about', '/contact', '/apply', '/feedback', '/privacy'] as const;
const clickTargets = ['whatsapp', 'tiktok', 'facebook'] as const;

const eventSchema = z.discriminatedUnion('event_type', [
  z.object({ event_type: z.literal('page_view'), target: z.enum(targets), visitor_id: z.string().uuid() }),
  z.object({ event_type: z.literal('social_click'), target: z.enum(clickTargets), visitor_id: z.string().uuid() }),
]);

export const recordSiteEvent = createServerFn({ method: 'POST' })
  .inputValidator((input: unknown) => eventSchema.parse(input))
  .handler(async ({ data }) => {
    // A browser identifier is used only to count one visit per page per day.
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
    const { error } = await supabaseAdmin.from('site_events').insert(data);
    if (error && error.code !== '23505') throw new Error('Could not record activity.');
    return { ok: true };
  });

export const getSiteTraffic = createServerFn({ method: 'GET' })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: role, error: roleError } = await context.supabase.from('user_roles').select('role').eq('user_id', context.userId).eq('role', 'admin').maybeSingle();
    if (roleError || !role) throw new Error('Administrator access required.');
    const { data, error } = await context.supabase.from('site_events').select('event_type,target');
    if (error) throw new Error('Could not load traffic.');
    const totals: Record<string, number> = {};
    for (const row of data ?? []) totals[row.target] = (totals[row.target] ?? 0) + 1;
    return totals;
  });