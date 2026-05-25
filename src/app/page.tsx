import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";

const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

function getProjectImages(folder: string) {
  const directory = join(process.cwd(), "public", "projects", folder);

  if (!existsSync(directory)) {
    return [];
  }

  return readdirSync(directory)
    .filter((file) => {
      const extension = file.slice(file.lastIndexOf(".")).toLowerCase();
      return imageExtensions.has(extension);
    })
    .sort((first, second) =>
      first.localeCompare(second, undefined, { numeric: true }),
    )
    .map((file) => `/projects/${folder}/${encodeURIComponent(file)}`);
}

const links = [
  { label: "GitHub", href: "https://github.com/joeemans" },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/youssef-mansour-792131246",
  },
  { label: "Email", href: "mailto:yousseff.mansourrr@gmail.com" },
  { label: "CV", href: "/Youssef-Mansour-CV.pdf" },
];

const projects = [
  {
    name: "BuzzShot",
    stack:
      "Next.js, React, TypeScript, NestJS, PostgreSQL, Prisma, Redis, Docker, TMDB API",
    images: getProjectImages("BuzzShot"),
    links: [
      { label: "Live", href: "https://buzz-shot-web.vercel.app/" },
      { label: "GitHub", href: "https://github.com/joeemans/BuzzShot" },
    ],
    bullets: [
      "Built and deployed a full-stack TypeScript monorepo for movie and series discovery with ratings, reviews, watchlists, custom lists, follows, activity feeds, notifications, and personalized recommendations.",
      "Developed a NestJS API with Prisma/PostgreSQL persistence, Redis caching, JWT access tokens, rotating HttpOnly refresh cookies, Google OAuth, CORS, Helmet, and Zod-based environment validation.",
      "Implemented a Next.js App Router frontend integrated with TMDB-backed media browsing, search, rich detail pages, authenticated user flows, and reusable shared TypeScript schemas.",
      "Containerized the local stack with Docker Compose and configured production deployment using Vercel, managed PostgreSQL, Redis, and Prisma migrations.",
    ],
  },
  {
    name: "Car Rental Web Application",
    stack: "React, Node.js, Express, SQL",
    images: getProjectImages("CarRental"),
    links: [
      {
        label: "GitHub",
        href: "https://github.com/joeemans/Car-Rental-Website",
      },
    ],
    bullets: [
      "Designed and implemented a full-stack car rental platform supporting user authentication, car browsing, reservations, and admin management.",
      "Built REST API endpoints with Express and SQL-backed persistence for users, vehicles, bookings, and administrative operations.",
      "Developed a responsive React interface for browsing available cars, managing reservations, and handling core user workflows.",
    ],
  },
  {
    name: "PragmaTrack",
    stack: "Python, FastAPI, React, LangChain, PostgreSQL, Docker",
    images: getProjectImages("PragmaTrack"),
    links: [],
    bullets: [
      "Built a full-stack platform aggregating odds from prediction-market APIs such as Kalshi, Polymarket, and Manifold into a unified PostgreSQL schema.",
      "Developed backend services for API ingestion, normalization, rate-limited endpoints, and structured access to market movement data.",
      "Integrated a LangChain-based RAG assistant for querying structured market data and generating grounded explanations from retrieved context.",
      "Exposed the system through a React frontend with interactive visualizations and user-facing analysis workflows.",
    ],
  },
];

type Project = (typeof projects)[number];

function ProjectGallery({ project }: { project: Project }) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-gray-950 shadow-sm">
      <div className="flex items-center justify-between border-b border-white/10 bg-gray-900 px-4 py-3">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        </div>
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
          {project.name}
        </span>
      </div>

      {project.images.length > 0 ? (
        <div className="gallery-track flex snap-x snap-mandatory gap-4 overflow-x-auto bg-gray-100 p-3 sm:p-4">
          {project.images.map((image, index) => (
            <figure
              key={image}
              id={`${project.name.toLowerCase().replaceAll(" ", "-")}-${index + 1}`}
              className="relative aspect-[16/9] min-w-full snap-center overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm"
            >
              <Image
                src={image}
                alt={`${project.name} screenshot ${index + 1}`}
                fill
                sizes="(min-width: 1024px) 1024px, 92vw"
                className="object-contain"
                priority={index === 0}
              />
              <figcaption className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-800 shadow-sm">
                {index + 1} / {project.images.length}
              </figcaption>
            </figure>
          ))}
        </div>
      ) : (
        <div className="flex aspect-[16/9] items-center justify-center bg-gray-100 px-6 text-center text-sm font-medium text-gray-500">
          Add screenshots to public/projects/{project.name}
        </div>
      )}
    </div>
  );
}

const skills = [
  {
    group: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind"],
  },
  {
    group: "Backend",
    items: ["Node.js", "NestJS", "Express", "REST APIs"],
  },
  {
    group: "Database / DevOps",
    items: ["PostgreSQL", "Prisma", "SQL", "Redis", "Docker"],
  },
  {
    group: "AI / ML",
    items: ["Python", "PyTorch", "Computer Vision", "RAG", "LLMs"],
  },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="mx-auto flex min-h-[72vh] w-full max-w-6xl flex-col justify-center px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
            Alexandria, Egypt
          </p>
          <h1 className="mt-5 text-5xl font-semibold tracking-normal text-gray-950 sm:text-6xl lg:text-7xl">
            Youssef Mansour
          </h1>
          <p className="mt-5 text-xl font-medium text-gray-700 sm:text-2xl">
            Software Engineer | Full-Stack Developer | Agentic AI & RAG Systems
          </p>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600">
            I am a Computer and Communications Engineering senior at Alexandria
            University with a 3.98/4.00 CGPA. I build production-minded
            full-stack web apps and agentic AI/RAG systems with TypeScript,
            React, Next.js, NestJS, Node.js, PostgreSQL, Python, and LangChain.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                download={link.label === "CV" ? true : undefined}
                className="rounded-full border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-900 shadow-sm transition hover:border-teal-500 hover:text-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="border-y border-gray-200 bg-white/80">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:px-10">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
              Selected Work
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-gray-950 sm:text-4xl">
              Projects
            </h2>
          </div>
          <div className="mt-10 space-y-10">
            {projects.map((project) => (
              <article
                key={project.name}
                className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-5 lg:p-6"
              >
                <ProjectGallery project={project} />
                <div className="grid gap-7 px-2 py-7 sm:px-4 sm:py-8 lg:grid-cols-[0.85fr_1.15fr] lg:px-5">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-950">
                      {project.name}
                    </h3>
                    <p className="mt-3 text-sm font-medium leading-6 text-gray-700 sm:text-base">
                      {project.stack}
                    </p>
                    {project.links.length > 0 ? (
                      <div className="mt-6 flex flex-wrap gap-3">
                        {project.links.map((link) => (
                          <a
                            key={link.label}
                            href={link.href}
                            target={
                              link.href.startsWith("http")
                                ? "_blank"
                                : undefined
                            }
                            rel={
                              link.href.startsWith("http")
                                ? "noreferrer"
                                : undefined
                            }
                            className="rounded-full border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-900 transition hover:border-teal-500 hover:text-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                          >
                            {link.label}
                          </a>
                        ))}
                      </div>
                    ) : null}
                  </div>
                  <ul className="space-y-3 text-sm leading-6 text-gray-600 sm:text-base sm:leading-7">
                    {project.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-600" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
              Toolkit
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-gray-950 sm:text-4xl">
              Skills
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {skills.map((skillGroup) => (
              <div
                key={skillGroup.group}
                className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
              >
                <h3 className="text-base font-semibold text-gray-950">
                  {skillGroup.group}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {skillGroup.items.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-gray-200 bg-white/80">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:px-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
              Education
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-gray-950">
              Alexandria University
            </h2>
            <p className="mt-5 text-lg leading-8 text-gray-600">
              B.Sc. in Computer and Communications Engineering, graduating July
              2026. CGPA: 3.98/4.00.
            </p>
          </div>
          <div id="contact">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
              Contact
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-gray-950">
              Let&apos;s build something useful.
            </h2>
            <p className="mt-5 text-lg leading-8 text-gray-600">
              I am open to software engineering, full-stack, frontend, and
              AI/RAG roles where I can ship reliable product features and
              practical intelligent systems.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="mailto:yousseff.mansourrr@gmail.com"
                className="rounded-full bg-gray-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2"
              >
                Email Me
              </a>
              <a
                href="tel:+201090110716"
                className="rounded-full border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-900 shadow-sm transition hover:border-teal-500 hover:text-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
              >
                Call
              </a>
              <a
                href="https://linkedin.com/in/youssef-mansour-792131246"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-900 shadow-sm transition hover:border-teal-500 hover:text-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
