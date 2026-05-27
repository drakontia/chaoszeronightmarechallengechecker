import Link from "next/link";
import { useTranslations } from "next-intl";

export function ChallengeHeader() {
  const t = useTranslations();

  return (
    <header className="flex flex-col gap-4 border-b border-zinc-200 pb-6 md:flex-row md:items-start md:justify-between">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-zinc-900">{t("site.title")}</h1>
        <p className="max-w-2xl text-sm leading-6 text-zinc-600">{t("site.description")}</p>
      </div>

      <div className="flex items-center gap-4 self-start">
        <Link
          href="https://czn-deck-builder.drakontia.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("site.deckBuilder")}
          className="inline-flex h-8 items-center gap-1.5 rounded-md border border-zinc-300 px-3 text-xs font-medium text-zinc-700 transition hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-600"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" aria-hidden fill="none" stroke="currentColor" strokeWidth={2}>
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <path d="M8 21h8M12 17v4" />
          </svg>
          {t("site.deckBuilder")}
        </Link>
        <iframe
          src="https://github.com/sponsors/drakontia/button"
          title="Sponsor drakontia"
          height="32"
          width="114"
          style={{ border: 0, borderRadius: "6px" }}
        />
        <Link
          href="https://x.com/MhdenOfRamuh"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("site.xLink")}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300 text-zinc-700 transition hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-600"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
            <path
              fill="currentColor"
              d="M18.901 1.153h3.68l-8.04 9.19 9.458 12.504h-7.406l-5.8-7.584-6.633 7.584H.478l8.597-9.825L0 1.153h7.594l5.243 6.932z"
            />
          </svg>
        </Link>
      </div>
    </header>
  );
}
