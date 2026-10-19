import { industriesPage } from "@/content/industries";
import { revealDelay } from "@/lib/reveal";
import { Icon, type IconName } from "@/components/ui/icon";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

// One icon per strength, in content order: security, scalable architecture, AI.
const ICONS: IconName[] = ["shield-check", "trending-up", "sparkles"];

/** "What we bring to every industry": the three strengths shared by every sector. */
export function IndustryStrengths({ tone = "surface" }: { tone?: "default" | "surface" }) {
  const { heading, items } = industriesPage.strengths;
  return (
    <Section tone={tone} labelledBy="strengths-title">
      <SectionHeading id="strengths-title" align="center" {...heading} />
      <ul className="mt-12 grid gap-5 md:grid-cols-3">
        {items.map((item, i) => (
          <li
            key={item.title}
            data-reveal
            style={revealDelay(i)}
            className="group flex flex-col gap-4 rounded-2xl border border-line bg-background p-7 shadow-soft transition-[translate,box-shadow,border-color] duration-300 ease-smooth hover:-translate-y-1 hover:border-brand-300 hover:shadow-lift dark:hover:border-brand-700"
          >
            <span className="bg-brand-gradient grid size-12 place-items-center rounded-2xl text-white shadow-glow transition-[rotate,scale] duration-300 ease-smooth group-hover:scale-105 group-hover:-rotate-6">
              <Icon name={ICONS[i]} className="size-6" />
            </span>
            <h3 className="text-xl font-bold">{item.title}</h3>
            <p className="text-muted">{item.description}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
