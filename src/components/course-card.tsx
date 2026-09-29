import { Link } from '@tanstack/react-router';
import { ArrowUpRight, CalendarDays, Clock3, MonitorPlay, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { images, type Course } from '@/lib/site';
export function CourseCard({ course }: { course: Course }) {
  return <article className="group overflow-hidden rounded-lg border border-border bg-card shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
    <Link to="/courses/$slug" params={{ slug: course.slug }} className="block overflow-hidden"><img src={images[course.slug]} alt={course.title} width={1024} height={768} loading="lazy" className="aspect-[1.65] w-full object-cover transition duration-500 group-hover:scale-105" /></Link>
    <div className="p-6"><span className="text-xs font-bold uppercase text-teal">Career programme</span><h3 className="mt-2 min-h-14 text-xl font-bold text-primary">{course.title}</h3><p className="mt-3 min-h-20 text-sm leading-6 text-muted-foreground">{course.description}</p>
      <div className="mt-5 divide-y divide-border border-y border-border text-sm">
        <div className="flex items-start gap-3 py-3"><CalendarDays className="mt-0.5 size-5 shrink-0 text-teal"/><div><span className="block text-xs text-muted-foreground">Start date</span><strong className="text-primary">{course.start_date ? new Date(`${course.start_date}T12:00:00`).toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'}) : 'To be confirmed'}</strong></div></div>
        <div className="flex items-start gap-3 py-3"><Clock3 className="mt-0.5 size-5 shrink-0 text-teal"/><div><span className="block text-xs text-muted-foreground">Course duration</span><strong className="text-primary">{course.duration}</strong></div></div>
        <div className="flex items-start gap-3 py-3"><MonitorPlay className="mt-0.5 size-5 shrink-0 text-teal"/><div><span className="block text-xs text-muted-foreground">Mode of learning</span><strong className="block text-primary">{course.learning_mode}</strong><span className="text-xs text-muted-foreground">{course.schedule} · {course.weekly_hours}</span></div></div>
        <div className="flex items-start gap-3 py-3"><Wallet className="mt-0.5 size-5 shrink-0 text-orange"/><div><span className="block text-xs text-muted-foreground">Tuition fee</span><strong className="text-primary">{course.tuition_kes ? `KSh ${course.tuition_kes.toLocaleString()}` : 'To be confirmed'}</strong>{course.tuition_usd > 0 && <span className="text-xs text-muted-foreground"> / USD {course.tuition_usd}</span>}</div><Button asChild variant="outline" size="icon" className="ml-auto shrink-0" aria-label={`View ${course.title}`}><Link to="/courses/$slug" params={{ slug: course.slug }}><ArrowUpRight /></Link></Button></div>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3"><Button asChild variant="outline"><Link to="/courses/$slug" params={{ slug: course.slug }}>View Details</Link></Button><Button asChild variant="accent"><Link to="/apply" search={{ course: course.slug }}>Apply Here</Link></Button></div>
    </div></article>;
}
