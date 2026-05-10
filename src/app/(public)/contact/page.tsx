'use client';

import type { Metadata } from 'next';
import { useState } from 'react';
import { Mail, MessageSquare, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const channels = [
  {
    icon: Mail,
    title: 'Email Support',
    description: 'Our team replies within 24 hours on business days.',
    value: 'support@jovial.ai',
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
  {
    icon: MessageSquare,
    title: 'Live Chat',
    description: 'Chat with us directly from the dashboard — average 5 min response.',
    value: 'Available in-app',
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
  },
  {
    icon: MapPin,
    title: 'Headquarters',
    description: 'We are a remote-first company with roots in San Francisco.',
    value: 'San Francisco, CA',
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
  },
  {
    icon: Clock,
    title: 'Business Hours',
    description: 'Monday–Friday, 9 AM – 6 PM PST.',
    value: 'Mon – Fri · 9–18 PST',
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
    toast.success('Message sent!', { description: "We'll get back to you within 24 hours." });
  };

  return (
    <div className="relative overflow-hidden">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-purple-500/5" />
        <div className="absolute top-0 right-0 h-[400px] w-[400px] rounded-full bg-purple-500/8 blur-[100px]" />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-3xl px-4 pt-28 pb-16 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
          <Mail className="h-3.5 w-3.5" /> Get In Touch
        </span>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          We&apos;d love to <span className="text-primary">hear from you</span>
        </h1>
        <p className="mt-5 text-muted-foreground text-lg">
          Questions, feedback, or enterprise inquiries — drop us a line and we&apos;ll respond fast.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Contact Form */}
          <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
            {submitted ? (
              <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
                  <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                </div>
                <h2 className="text-xl font-bold">Message Received!</h2>
                <p className="max-w-sm text-muted-foreground text-sm">
                  Thanks for reaching out. We&apos;ll get back to you within one business day.
                </p>
                <Button variant="outline" onClick={() => setSubmitted(false)}>
                  Send Another
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h2 className="text-xl font-bold mb-6">Send a Message</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="contact-name">Full Name</Label>
                    <Input id="contact-name" placeholder="Jane Smith" required />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="contact-email">Email Address</Label>
                    <Input id="contact-email" type="email" placeholder="jane@company.com" required />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="contact-subject">Subject</Label>
                  <Input id="contact-subject" placeholder="How can we help?" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="contact-message">Message</Label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    placeholder="Tell us everything..."
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  />
                </div>
                <Button type="submit" className="w-full gap-2" disabled={loading}>
                  {loading ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            )}
          </div>

          {/* Channels */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold mb-2">Other ways to reach us</h2>
            {channels.map(({ icon: Icon, title, description, value, color, bg }) => (
              <div
                key={title}
                className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/30"
              >
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${bg}`}>
                  <Icon className={`h-5 w-5 ${color}`} />
                </div>
                <div>
                  <p className="font-semibold text-sm">{title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
                  <p className={`text-sm font-medium mt-1 ${color}`}>{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
