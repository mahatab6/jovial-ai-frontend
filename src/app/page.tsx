import type { Metadata } from 'next';
import { Navbar } from '@/components/layouts/Navbar';
import { Footer } from '@/components/layouts/Footer';
import { HeroSection } from '@/features/landing/HeroSection';
import { StatsSection } from '@/features/landing/StatsSection';
import { FeaturesSection } from '@/features/landing/FeaturesSection';
import { WorkflowSection } from '@/features/landing/WorkflowSection';
import { TemplatesSection } from '@/features/landing/TemplatesSection';
import { DashboardPreview } from '@/features/landing/DashboardPreview';
import { TestimonialsSection } from '@/features/landing/TestimonialsSection';
import { PricingSection } from '@/features/landing/PricingSection';
import { FAQSection } from '@/features/landing/FAQSection';
import { CTASection } from '@/features/landing/CTASection';

export const metadata: Metadata = {
  title: 'Jovial AI — AI Content Generation Platform',
  description:
    'Generate blog posts, social content, emails, and product descriptions using state-of-the-art AI. Powered by GPT-4o and Gemini.',
};

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main className="relative overflow-hidden">
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <WorkflowSection />
        <TemplatesSection />
        <DashboardPreview />
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
