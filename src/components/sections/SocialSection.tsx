"use client";

import { useEffect } from "react";

export default function SocialSection() {
  useEffect(() => {
    // Instagram
    if (!document.querySelector('script[src="https://www.instagram.com/embed.js"]')) {
      const instagramScript = document.createElement("script");
      instagramScript.src = "https://www.instagram.com/embed.js";
      instagramScript.async = true;
      document.body.appendChild(instagramScript);
    }

    // TikTok
    if (!document.querySelector('script[src="https://www.tiktok.com/embed.js"]')) {
      const tiktokScript = document.createElement("script");
      tiktokScript.src = "https://www.tiktok.com/embed.js";
      tiktokScript.async = true;
      document.body.appendChild(tiktokScript);
    }

    // Re-render des embeds si les scripts sont déjà chargés
    setTimeout(() => {
      // @ts-expect-error Instagram global
      window.instgrm?.Embeds?.process();

      // @ts-expect-error TikTok global
      window.tiktokEmbed?.lib?.render();
    }, 500);
  }, []);

  return (
    <section className="w-full bg-background px-6 py-16 sm:px-10 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary sm:text-base">
            Suivez-nous !
          </p>

          <h2 className="mt-3 text-3xl font-title text-foreground sm:text-4xl">
            Retrouvez Namas'thés sur les réseaux
          </h2>

          <p className="mt-4 text-base leading-8 text-foreground sm:text-lg">
            Découvrez nos créations, nos nouveautés et toute l'actualité de
            Namas'thés sur Instagram et TikTok.
          </p>
        </div>

        <div className="mt-12 grid items-start lg:grid-cols-2">
          {/* Instagram */}
          <div className="flex justify-center overflow-hidden rounded-md">
            <blockquote
              className="instagram-media rounded-md shadow-sm"
              data-instgrm-permalink="https://www.instagram.com/reel/DaiB9Mptmbm/"
              data-instgrm-version="14"
              style={{
                background: "bg-primary",
                border: 0,
                borderRadius: "5px",
                margin: 0,
                maxWidth: "340px",
                minWidth: "280px",
                width: "100%",
              }}
            />
          </div>

          {/* TikTok */}
          <div className="flex justify-center overflow-hidden rounded-md">
            <blockquote
              className="tiktok-embed rounded-md shadow-sm"
              cite="https://www.tiktok.com/@namas.thes/video/7666055128524410144"
              data-video-id="7666055128524410144"
              style={{
                background: "bg-primary",
                border: 0,
                borderRadius: "5px",
                maxWidth: "320px",
                minWidth: "320px",
                width: "100%",
                margin: 0,
              }}
            >
              <section>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.tiktok.com/@namas.thes"
                >
                  @namas.thes
                </a>
              </section>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}