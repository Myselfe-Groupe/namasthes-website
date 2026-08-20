"use client"

export default function UmamiStatsCard() {
  // Remplace cette URL par ton lien "Share URL" récupéré sur Umami
  const shareUrl = "https://cloud.umami.is/analytics/eu/share/Fqyw6TLrj3ajBA51"

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold tracking-tight">Statistiques d'audience</h3>
        <p className="text-sm text-muted-foreground">Mesure de trafic en temps réel (via Umami Cloud)</p>
      </div>
      
      {/* L'iframe embarque proprement l'interface Umami épurée */}
      <div className="w-full overflow-hidden rounded-xl border bg-card shadow-sm">
        <iframe
          src={`${shareUrl}?embed=true`} // 💡 L'argument ?embed=true retire le menu Umami pour un rendu parfait
          className="h-112.5 w-full border-0 bg-transparent"
          loading="lazy"
          allowFullScreen
        />
      </div>
    </div>
  )
}