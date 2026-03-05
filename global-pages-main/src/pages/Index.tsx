/**
 * Index Page — Demo Landing Page
 * 
 * Demonstrates the i18n system with a navbar, hero section, features grid, and footer.
 * All text uses t() for translations. Layout flips for RTL languages.
 */

import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useTranslation } from "@/hooks/useTranslation";
import { Zap, Shield, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <span className="text-lg font-bold tracking-tight text-primary">i18n Demo</span>

          <div className="hidden items-center gap-6 md:flex">
            {(["home", "products", "pricing", "contact"] as const).map((key) => (
              <a
                key={key}
                href="#"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {t(`navbar.${key}`)}
              </a>
            ))}
          </div>

          <LanguageSwitcher />
        </div>
      </nav>

      {/* ── Hero Section ── */}
      <section className="flex flex-col items-center justify-center px-4 py-24 text-center md:py-32">
        <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
          {t("hero.title")}
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground md:text-xl">
          {t("hero.subtitle")}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button size="lg">{t("hero.cta")}</Button>
          <Button size="lg" variant="outline">
            {t("hero.ctaSecondary")}
          </Button>
        </div>
      </section>

      {/* ── Features Section ── */}
      <section className="border-t border-border bg-muted/40 px-4 py-20">
        <div className="container mx-auto">
          <h2 className="mb-12 text-center text-3xl font-bold">{t("features.title")}</h2>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              { icon: Zap, title: "features.speed", desc: "features.speedDesc" },
              { icon: Shield, title: "features.secure", desc: "features.secureDesc" },
              { icon: Globe, title: "features.global", desc: "features.globalDesc" },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{t(title)}</h3>
                <p className="text-sm text-muted-foreground">{t(desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border px-4 py-8">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
          <span>© 2026 i18n Demo. {t("footer.rights")}.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground">{t("footer.privacy")}</a>
            <a href="#" className="hover:text-foreground">{t("footer.terms")}</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
