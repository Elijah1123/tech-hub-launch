import web from '@/assets/course-web.jpg';
import mobile from '@/assets/course-mobile.jpg';
import cyber from '@/assets/course-cyber.jpg';
export const images: Record<string, string> = { 'software-engineering-web': web, 'software-engineering-mobile-app': mobile, cybersecurity: cyber };
export const lessons: Record<string, string[]> = {
  'software-engineering-web': ['HTML, CSS and responsive layouts', 'JavaScript and modern frontend development', 'Building interactive web applications', 'Deployment and collaborative workflows'],
  'software-engineering-mobile-app': ['Mobile interface design', 'App architecture and development', 'Connecting mobile apps to data', 'Testing and publishing your projects'],
  cybersecurity: ['Digital threats and risk awareness', 'Network security fundamentals', 'Securing systems and information', 'Practical protection strategies'],
};
export const social = { tiktok: '', facebook: '', instagram: '', email: '', whatsapp: '' };
export const whatsappMessage = 'Hello Mzalendo Tech Hub, I would like to know more about your courses and enrollment process.';
export type Course = { id: string; title: string; slug: string; description: string; duration: string; start_date: string | null; learning_mode: string; schedule: string; weekly_hours: string; tuition_kes: number; tuition_usd: number; is_active: boolean };
