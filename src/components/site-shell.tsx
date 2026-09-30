import { useEffect, useState } from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import { ArrowUp, Menu, X, MessageCircle, Instagram, Facebook, Music2, Mail } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useServerFn } from '@tanstack/react-start';
import { Button } from '@/components/ui/button';
import { Brand } from './brand';
import { social, whatsappMessage } from '@/lib/site';
import { recordSiteEvent } from '@/lib/analytics.functions';
const links = [{ to: '/', label: 'Home' },{ to: '/courses', label: 'Explore Courses' },{ to: '/about', label: 'About Us' },{ to: '/contact', label: 'Contact Us' }] as const;
const courseLinks = [{slug:'software-engineering-web',label:'Software Engineering (Web)'},{slug:'software-engineering-mobile-app',label:'Software Engineering (Mobile App)'},{slug:'cybersecurity',label:'Cybersecurity'}];
export function SiteShell({ children }: { children: React.ReactNode }) {
  const [open,setOpen]=useState(false);
  const path = useRouterState({ select: s => s.location.pathname });
  const record = useServerFn(recordSiteEvent);
  const publicPage = !path.startsWith('/admin');
  useEffect(() => {
    if (!publicPage) return;
    const visitor = window.sessionStorage.getItem('mzalendo-visitor') || crypto.randomUUID();
    window.sessionStorage.setItem('mzalendo-visitor', visitor);
    const target = path === '/courses/' ? '/courses' : path;
    record({ data: { event_type: 'page_view', target, visitor_id: visitor } }).catch(() => {});
  }, [path, publicPage, record]);
  const trackClick = (target: 'whatsapp' | 'tiktok' | 'facebook') => {
    const visitor = window.sessionStorage.getItem('mzalendo-visitor') || crypto.randomUUID();
    window.sessionStorage.setItem('mzalendo-visitor', visitor);
    record({ data: { event_type: 'social_click', target, visitor_id: visitor } }).catch(() => {});
  };
  if (!publicPage) return <>{children}</>;
  return <><header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-xl"><div className="section-wrap flex h-20 items-center justify-between gap-6"><Link to="/" onClick={()=>setOpen(false)} aria-label="Mzalendo Tech Hub home"><Brand className="h-14 w-48 object-contain object-left sm:w-56" /></Link><nav aria-label="Main navigation" className="hidden items-center gap-8 lg:flex">{links.map(l=><Link key={l.to} to={l.to} className="text-sm font-semibold text-foreground transition hover:text-primary" activeProps={{className:'text-primary'}}>{l.label}</Link>)}</nav><div className="hidden lg:block"><Button asChild variant="accent" className="h-11 px-6"><Link to="/apply" search={{course:undefined}}>Apply Now</Link></Button></div><Button variant="ghost" size="icon" className="lg:hidden" aria-label={open?'Close menu':'Open menu'} aria-expanded={open} onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</Button></div><AnimatePresence>{open&&<motion.nav initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} className="overflow-hidden border-t border-border bg-background lg:hidden" aria-label="Mobile navigation"><div className="section-wrap flex flex-col gap-1 py-4">{links.map(l=><Link key={l.to} to={l.to} onClick={()=>setOpen(false)} className="rounded px-3 py-3 text-sm font-semibold hover:bg-surface">{l.label}</Link>)}<Button asChild variant="accent" className="mt-2"><Link to="/apply" search={{course:undefined}} onClick={()=>setOpen(false)}>Apply Now</Link></Button></div></motion.nav>}</AnimatePresence></header>
  <main>{children}</main>
  <footer className="bg-footer text-footer-foreground"><div className="section-wrap grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-4"><div><Link to="/"><Brand className="h-20 w-60 rounded bg-background object-contain" /></Link><p className="mt-5 font-semibold text-teal">We Equip and Transform.</p><p className="mt-3 text-sm leading-7 opacity-75">Practical technology training, mentorship, and opportunities to shape your future.</p></div><div><h3 className="mb-5 text-lg font-bold">Quick Links</h3><div className="flex flex-col gap-3 text-sm opacity-85">{links.map(l=><Link key={l.to} to={l.to} className="hover:text-teal">{l.label}</Link>)}<Link to="/apply" search={{course:undefined}} className="hover:text-teal">Apply Now</Link></div></div><div><h3 className="mb-5 text-lg font-bold">Our Courses</h3><div className="flex flex-col gap-3 text-sm opacity-85">{courseLinks.map(c=><Link key={c.slug} to="/courses/$slug" params={{slug:c.slug}} className="hover:text-teal">{c.label}</Link>)}</div></div><div><h3 className="mb-5 text-lg font-bold">Connect With Us</h3><div className="flex flex-wrap gap-2">{([{key:'tiktok',Icon:Music2},{key:'facebook',Icon:Facebook},{key:'instagram',Icon:Instagram},{key:'email',Icon:Mail}] as const).map(({key,Icon})=> social[key]?<a key={key} href={key==='email'?`mailto:${social.email}`:social[key]} onClick={()=>{if(key==='tiktok'||key==='facebook')trackClick(key)}} target={key==='email'?undefined:'_blank'} rel="noopener noreferrer" aria-label={key} className="grid size-10 place-items-center rounded border border-footer-foreground/20 hover:bg-teal"><Icon size={18}/></a>:<span key={key} title={`${key} link awaiting official details`} aria-label={`${key} coming soon`} className="grid size-10 place-items-center rounded border border-footer-foreground/20 opacity-40"><Icon size={18}/></span>)}</div><div className="mt-6 flex flex-col gap-3 text-sm"><Link to="/feedback" className="hover:text-teal">Share feedback</Link><Link to="/privacy" className="hover:text-teal">Privacy Policy</Link></div></div></div><div className="border-t border-footer-foreground/15"><div className="section-wrap flex flex-wrap items-center justify-between gap-4 py-6 text-xs opacity-75"><span>© 2026 Mzalendo Tech Hub. All Rights Reserved.</span><Button variant="ghost" size="sm" className="text-footer-foreground" onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}><ArrowUp size={15}/> Back to Top</Button></div></div></footer>
  {social.whatsapp?<a href={`https://wa.me/${social.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`} onClick={()=>trackClick('whatsapp')} target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-5 z-40 flex items-center gap-2 rounded-full bg-teal px-4 py-3 text-sm font-bold text-primary-foreground shadow-xl transition hover:-translate-y-1"><MessageCircle size={20}/>Chat with Us</a>:<Button variant="teal" onClick={()=>{window.alert('Our WhatsApp number will be available soon. Please use the contact form to reach us.');}} className="fixed bottom-6 right-5 z-40 gap-2 rounded-full px-4 py-3 shadow-xl" aria-label="WhatsApp contact coming soon"><MessageCircle size={20}/>Chat with Us</Button>}</>;
}
