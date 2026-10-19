import { testimonials } from "@/content/testimonials";
import { Container } from "@/components/ui/container";

// The companies behind the site's testimonials, as text (no logo files have been supplied).
const clients = [...new Set(testimonials.map((t) => t.company))];

export function ClientStrip() {
  return (
    <section aria-label="Clients" className="border-y border-line bg-surface">
      <Container>
        <ul data-reveal className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 py-6 sm:gap-x-14">
          {clients.map((client) => (
            <li
              key={client}
              className="font-display text-lg font-semibold text-muted transition-colors duration-200 hover:text-foreground sm:text-xl"
            >
              {client}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
