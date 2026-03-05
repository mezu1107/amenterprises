import { HeroSection } from "@/components/public/sections/hero-section"
import { ServicesSection } from "@/components/public/sections/services-section"
import QuizSection from "@/components/public/sections/quiz-section"
import { ProcessSection } from "@/components/public/sections/process-section"
import { PortfolioSection } from "@/components/public/sections/portfolio-section"
import { TestimonialsSection } from "@/components/public/sections/testimonials-section"
import { PricingSection } from "@/components/public/sections/pricing-section"
import { CTASection } from "@/components/public/sections/cta-section"

import { getTranslations } from "next-intl/server"

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: "HomePage" })

  return {
    title: t("title"),
    description: t("description"),
  }
}

export default async function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <QuizSection />
      <ProcessSection />
      <PortfolioSection />
      <TestimonialsSection />
      <PricingSection />
      <CTASection />
    </>
  )
}