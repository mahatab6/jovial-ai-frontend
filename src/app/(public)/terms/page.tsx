import type { Metadata } from 'next';
import Link from 'next/link';
import { Scale, AlertCircle, CreditCard, Ban, RefreshCcw, FileText, Shield, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service — Jovial AI',
  description:
    'Jovial AI Terms of Service — the rules and responsibilities governing your use of the platform.',
};

const sections = [
  {
    icon: FileText,
    id: 'acceptance',
    title: '1. Acceptance of Terms',
    content: [
      'By creating an account or using any Jovial AI service, you agree to these Terms of Service and our Privacy Policy.',
      'If you do not agree, you must not access or use the platform.',
      'We may update these terms at any time. Continued use after notification of changes constitutes acceptance.',
    ],
  },
  {
    icon: Globe,
    id: 'use-of-service',
    title: '2. Use of the Service',
    content: [
      'You must be at least 18 years old (or the age of majority in your jurisdiction) to use Jovial AI.',
      'You are responsible for all content generated using your account and ensuring it complies with applicable laws.',
      'You may not use the platform to generate illegal content, spam, hate speech, or content that infringes third-party intellectual property.',
      'Automated scraping or bulk misuse of the API beyond your plan limits is prohibited.',
    ],
  },
  {
    icon: CreditCard,
    id: 'billing',
    title: '3. Billing & Credits',
    content: [
      'Free tier accounts receive 50 complimentary credits on registration, with no credit card required.',
      'Paid plans are billed monthly or annually as selected at checkout. All fees are non-refundable except as stated in Section 5.',
      'Credits are consumed per generation based on model and content length. Credits do not roll over between billing periods.',
      'We reserve the right to change pricing with 30 days\' advance notice.',
    ],
  },
  {
    icon: Shield,
    id: 'intellectual-property',
    title: '4. Intellectual Property',
    content: [
      'You retain full ownership of the content you generate using Jovial AI.',
      'By using the service, you grant Jovial AI a limited licence to process and store your prompts and outputs solely to provide the service.',
      'The Jovial AI platform, branding, and underlying technology are proprietary and protected by copyright and trademark law.',
      'You may not reverse-engineer, copy, or resell any part of the Jovial AI platform.',
    ],
  },
  {
    icon: RefreshCcw,
    id: 'refunds',
    title: '5. Cancellations & Refunds',
    content: [
      'You may cancel your subscription at any time. Cancellation takes effect at the end of the current billing period.',
      'We offer a 7-day money-back guarantee for first-time paid plan purchases. Contact support within 7 days of payment.',
      'Refunds are not issued for partial months, unused credits, or accounts suspended for Terms violations.',
    ],
  },
  {
    icon: Ban,
    id: 'termination',
    title: '6. Termination',
    content: [
      'We reserve the right to suspend or terminate accounts that violate these Terms, with or without notice.',
      'Upon termination, your access to generated content history will be revoked after 30 days.',
      'You may request deletion of your data at any time as described in our Privacy Policy.',
    ],
  },
  {
    icon: AlertCircle,
    id: 'disclaimer',
    title: '7. Disclaimer & Limitation of Liability',
    content: [
      'Jovial AI is provided "as is" without warranties of any kind, express or implied.',
      'AI-generated content may be inaccurate, incomplete, or inappropriate for specific uses. You are responsible for reviewing content before publication.',
      'To the maximum extent permitted by law, Jovial AI\'s liability for any claim arising out of use of the service is limited to the amount you paid in the 3 months preceding the claim.',
    ],
  },
  {
    icon: Scale,
    id: 'governing-law',
    title: '8. Governing Law',
    content: [
      'These Terms are governed by the laws of the State of California, United States, without regard to conflict of law principles.',
      'Any disputes shall be resolved by binding arbitration in San Francisco, CA, except where prohibited by law.',
    ],
  },
];

export default function TermsPage() {
  const lastUpdated = 'May 10, 2026';

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-3xl px-4 pt-28 pb-10 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
          <Scale className="h-3.5 w-3.5" /> Legal
        </span>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Terms of Service</h1>
        <p className="mt-4 text-sm text-muted-foreground">Last updated: {lastUpdated}</p>
        <p className="mt-5 text-muted-foreground max-w-xl mx-auto">
          Please read these terms carefully before using the Jovial AI platform.
          They define your rights and responsibilities as a user.
        </p>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-24">
        <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
          {/* Sticky TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-xl border border-border bg-card p-5 space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                Contents
              </p>
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="block text-sm text-muted-foreground hover:text-foreground py-1 transition-colors"
                >
                  {s.title}
                </a>
              ))}
            </div>
          </aside>

          {/* Sections */}
          <div className="space-y-8">
            {sections.map(({ icon: Icon, id, title, content }) => (
              <div
                key={id}
                id={id}
                className="rounded-2xl border border-border bg-card p-7 scroll-mt-24"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <h2 className="font-bold text-lg">{title}</h2>
                </div>
                <ul className="space-y-2.5">
                  {content.map((line, i) => (
                    <li key={i} className="flex gap-2 text-sm text-muted-foreground leading-relaxed">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-7 text-center">
              <p className="font-semibold">Legal questions?</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Email{' '}
                <a href="mailto:legal@jovial.ai" className="text-primary hover:underline">
                  legal@jovial.ai
                </a>{' '}
                or visit our{' '}
                <Link href="/contact" className="text-primary hover:underline">
                  Contact page
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
