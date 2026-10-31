import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar?: string;
}

export interface TestimonialsProps {
  testimonials: Testimonial[];
  className?: string;
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="space-y-4 p-6 rounded-2xl border border-border bg-surface/50">
      <p className="text-pretty leading-relaxed text-muted-foreground">{testimonial.content}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {testimonial.avatar ? (
            <img
              src={testimonial.avatar}
              alt={testimonial.name}
              className="h-8 w-8 rounded-full object-cover"
            />
          ) : (
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="font-display text-sm font-semibold">
                {testimonial.name.split(" ")[0]?.[0] ?? ""}
              </span>
            </div>
          )}
          <span className="text-xs text-muted-foreground">{testimonial.role}</span>
        </div>
      </div>
    </div>
  );
}

export function Testimonials({ testimonials, className }: TestimonialsProps) {
  return (
    <section className={cn("py-24", className)}>
      <div className="mx-auto max-w-3xl px-4">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-primary mb-4">
            Member testimonials
          </p>
          <div className="space-y-6">
            {testimonials.map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
