import { FaArrowUpRightFromSquare, FaInstagram, FaTiktok } from "react-icons/fa6";

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/namas.thes/",
    icon: FaInstagram,
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@namas.thes",
    icon: FaTiktok,
  },
];

export default function SocialSection() {
  return (
    <section className="w-full bg-background px-6 py-16 sm:px-10 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary sm:text-base">
            Suivez-nous !
          </p>

          <h2 className="mt-3 text-3xl font-title text-secondary sm:text-4xl">
            Retrouvez Namas&apos;thés sur les réseaux
          </h2>

          <p className="mt-4 text-base leading-8 text-foreground sm:text-lg">
            Découvrez nos créations, nos nouveautés et toute l&apos;actualité de
            Namas&apos;thés sur Instagram et TikTok.
          </p>
        </div>

        <div className="mx-auto mt-8 flex max-w-xl flex-col justify-center gap-4 sm:flex-row">
          {socialLinks.map(({ name, href, icon: Icon }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-full border border-primary px-6 py-4 font-semibold text-primary transition-colors hover:bg-primary hover:text-background focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:flex-1"
            >
              <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
              <span>{name}</span>
              <FaArrowUpRightFromSquare className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span className="sr-only">(nouvel onglet)</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
