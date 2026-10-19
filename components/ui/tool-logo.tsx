import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * Logo files in public/logos, downloaded from codenax.com/logos. Tools missing here
 * (Pinecone, Twilio, Microsoft Azure…) have no logo on the site and get a letter badge.
 */
const LOGOS: Record<string, string> = {
  TypeScript: "typescript", JavaScript: "javascript", Python: "python", Java: "java", Go: "go",
  "C#": "csharp", PHP: "php", Ruby: "ruby", Rust: "rust", Kotlin: "kotlin", Swift: "swift",
  React: "react", "Next.js": "nextjs", Vue: "vue", Angular: "angular", "Tailwind CSS": "tailwindcss",
  Redux: "redux", "Node.js": "nodejs", Express: "express", NestJS: "nestjs", Django: "django",
  FastAPI: "fastapi", Laravel: "laravel", ".NET": "dotnet", "Spring Boot": "spring",
  GraphQL: "graphql", Flutter: "flutter", "React Native": "reactnative", SwiftUI: "swiftui",
  "Jetpack Compose": "jetpackcompose", OpenAI: "openai", TensorFlow: "tensorflow",
  PyTorch: "pytorch", LangChain: "langchain", "Hugging Face": "huggingface",
  "scikit-learn": "scikitlearn", n8n: "n8n", Zapier: "zapier", Make: "make",
  "Apache Airflow": "airflow", Celery: "celery", Stripe: "stripe", PostgreSQL: "postgresql",
  MySQL: "mysql", MongoDB: "mongodb", Redis: "redis", Supabase: "supabase", Firebase: "firebase",
  Prisma: "prisma", AWS: "aws", "Google Cloud": "googlecloud", Docker: "docker",
  Kubernetes: "kubernetes", Vercel: "vercel", "GitHub Actions": "githubactions",
  Terraform: "terraform",
};

/** Near-black logos that would vanish on the dark theme; they are inverted there. */
const DARK_LOGOS = new Set(["Java", "Rust", "Next.js", "Angular", "Express", "Django", "Prisma", "AWS", "Vercel"]);

/** "Vercel — Web" → "Vercel", "Node.js (NestJS)" → "Node.js": the tool a stack entry names. */
function toolName(entry: string) {
  return entry.split(" — ")[0].split(" (")[0].trim();
}

type ToolLogoProps = {
  tool: string;
  /** "muted": greyscale until its `group` parent is hovered (marquee). "color": always in colour. */
  tone?: "muted" | "color";
  /** Size classes; defaults to size-5. (cn() doesn't resolve conflicts, so don't pass both.) */
  className?: string;
};

/** A tool's logo, or a gradient letter badge when the site has none. Decorative: the name is the label. */
export function ToolLogo({ tool, tone = "color", className }: ToolLogoProps) {
  const name = toolName(tool);
  const file = LOGOS[name];
  // In dark mode, greyed-out dark colours (e.g. C#'s purple) nearly vanish, so resting logos are brightened there.
  const toneClass =
    tone === "muted" &&
    "opacity-70 grayscale transition-[filter,opacity] duration-200 group-hover:opacity-100 group-hover:grayscale-0 dark:brightness-175 dark:group-hover:brightness-100";

  if (!file) {
    return (
      <span
        aria-hidden
        className={cn(
          "grid shrink-0 place-items-center rounded-full bg-brand-gradient text-[0.625rem] font-bold text-white",
          toneClass,
          className ?? "size-5",
        )}
      >
        {name[0]}
      </span>
    );
  }

  return (
    <Image
      src={`/logos/${file}.svg`}
      alt=""
      width={20}
      height={20}
      unoptimized
      className={cn("shrink-0", className ?? "size-5", toneClass, DARK_LOGOS.has(name) && "dark:invert dark:hue-rotate-180")}
    />
  );
}
