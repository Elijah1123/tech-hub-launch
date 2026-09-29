import { Link } from '@tanstack/react-router';
import { ArrowUpRight, CalendarDays, Clock3, MonitorPlay } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { images, type Course } from '@/lib/site';
export function CourseCard({ course }: { course: Course }) {
  return <article className="group overflow-hidden rounded-lg border border-border bg-card shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
    <Link to="/courses/$slug" params={{ slug: course.slug }} className="block overflow-hidden"><img src={images[course.slug]} alt={course.title} width={1024} height={768} loading="lazy" className="aspect-[1.65] w-full object-cover transition duration-500 group-hover:scale-105" /></Link>
    <div className="p-6"><span className="text-xs font-bold uppercase text-teal">Career programme</span><h3 className="mt-2 min-h-14 text-xl font-bold text-primary">{course.title}</h3><p className="mt-3 min-h-20 text-sm leading-6 text-muted-foreground">{course.description}</p>
      <div className="mt-5 grid grid-cols-2 gap-3 border-y border-border py-4 text-xs font-semibold text-foreground"><span className="flex items-center gap-2"><Clock3 className="size-4 text-teal" />{course.duration}</span><span className="flex items-center gap-2"><MonitorPlay className="size-4 text-teal" />{course.learning_mode}</span><span className="col-span-2 flex items-center gap-2"><CalendarDays className="size-4 text-teal" />{course.schedule} · {course.weekly_hours}</span></div>
      <div className="mt-5 flex items-center justify-between gap-2"><div><p className="text-xs text-muted-foreground">Tuition fee</p><p className="font-bold text-primary">KSh {course.tuition_kes.toLocaleString()} <span className="text-xs font-normal text-muted-foreground">/ USD {course.tuition_usd}</span></p></div><Button asChild variant="outline" size="icon" aria-label={`View ${course.title}`}><Link to="/courses/$slug" params={{ slug: course.slug }}><ArrowUpRight /></Link></Button></div>
      <div className="mt-5 grid grid-cols-2 gap-3"><Button asChild variant="outline"><Link to="/courses/$slug" params={{ slug: course.slug }}>View Details</Link></Button><Button asChild variant="accent"><Link to="/apply" search={{ course: course.slug }}>Apply Here</Link></Button></div>
    </div></article>;
}
