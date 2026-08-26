import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";


function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`
}

export default async function AdminPage() {
  const cookieStore = cookies();
  const supabase = createClient(await cookieStore);

  const trackedBuckets = ["companies"]
  const storageQuotaGb = Number(process.env.SUPABASE_STORAGE_QUOTA_GB ?? 0)
  const storageQuotaBytes = Number.isFinite(storageQuotaGb) && storageQuotaGb > 0
    ? storageQuotaGb * 1024 * 1024 * 1024
    : null

  let usedStorageBytes = 0
  let storageError: string | null = null

  const { data: usageFromRpc, error: usageRpcError } = await supabase.rpc(
    "admin_storage_usage_bytes",
    { bucket_ids: trackedBuckets }
  )

  if (usageRpcError) {
    storageError = usageRpcError.message
  } else {
    usedStorageBytes = Number(usageFromRpc ?? 0)
  }

  const remainingStorageBytes =
    storageQuotaBytes !== null ? Math.max(storageQuotaBytes - usedStorageBytes, 0) : null
  const usagePercent =
    storageQuotaBytes && storageQuotaBytes > 0
      ? Math.min((usedStorageBytes / storageQuotaBytes) * 100, 100)
      : null

  return (
    <div className="space-y-8">
      <section className="rounded-xl border border-border bg-muted/70 p-6 shadow-[0_20px_80px_rgba(31,43,91,0.08)] backdrop-blur-sm sm:p-8">
        <p className="text-xs font-medium uppercase tracking-[0.35em] text-secondary">
          Dashboard admin
        </p>
        <h1 className="mt-3 font-title text-4xl text-secondary sm:text-5xl">
          Bienvenue dans l’espace d’administration
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-secondary/90 sm:text-base">
          Utilisez la sidebar pour naviguer entre les différentes actions du dashboard.
          Veuillez ne pas diffuser les informations de connexion et ne pas partager l’accès à l’espace d’administration.
        </p>
      </section>

      <section id="content" className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-2xl border border-border bg-background p-6">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-secondary">
            Accès rapides
          </p>
          <a href="/admin/companies/create" className="mt-4 block rounded-lg border border-border/70 bg-muted/50 p-4 text-sm text-secondary transition-colors hover:bg-muted">
            <span className="block font-medium text-foreground">Ajouter une entreprise</span>
            <span className="mt-1 block">Créer une nouvelle entreprise du groupe.</span>
          </a>

        </article>
        <article className="rounded-2xl border border-border bg-background p-6">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-secondary mb-3">
            Espace de stockage
          </p>
          {storageError ? (
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">
                Impossible de lire l&apos;utilisation du storage pour le moment.
              </p>
              <p className="text-xs text-muted-foreground">
                Verifie que la fonction SQL <code>admin_storage_usage_bytes</code> est bien creee dans Supabase.
                Elle doit pouvoir lire le schema <code>storage</code> pour additionner la taille des objets du bucket.
              </p>
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground">
                Buckets suivis : {trackedBuckets.join(", ")}
              </p>
              <p className="text-sm">
                Utilisé : <span className="font-semibold">{formatBytes(usedStorageBytes)}</span>
              </p>
              {remainingStorageBytes !== null ? (
                <>
                  <p className="text-sm">
                    Restant : <span className="font-semibold">{formatBytes(remainingStorageBytes)}</span>
                  </p>
                  <div className="space-y-1.5 pt-4">
                    <div className="h-2 w-full rounded-full bg-secondary/70 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${(usagePercent ?? 0) >= 90
                          ? "bg-destructive"
                          : (usagePercent ?? 0) >= 75
                            ? "bg-amber-500"
                            : "bg-primary-500"
                          }`}
                        style={{ width: `${usagePercent ?? 0}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {formatBytes(usedStorageBytes)} / {formatBytes(storageQuotaBytes ?? 0)} ({usagePercent?.toFixed(1)}% utilise)
                    </p>
                  </div>
                </>
              ) : (
                <p className="text-xs text-muted-foreground">
                  Ajoute la variable d&apos;environnement <code>SUPABASE_STORAGE_QUOTA_GB</code> pour afficher le stockage restant.
                </p>
              )}
            </>
          )}
        </article>
      </section>

      <section id="messages" className="">
        <article className="rounded-2xl border border-border bg-background p-6">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-secondary">
            Mesure d'audience
          </p>
          
        </article>
      </section>
    </div>
  );
}