'use client';

import { motion } from 'framer-motion';
import { 
  Bot, 
  Zap, 
  Shield, 
  Sparkles, 
  ArrowRight, 
  LayoutDashboard,
  MessageSquare,
  BarChart3
} from 'lucide-react';
import { GithubIcon } from '@/components/shared/github-icon';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 glass border-b border-border/40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Bot className="text-primary-foreground w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight">Jovial AI</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">Features</Link>
            <Link href="#solutions" className="text-sm font-medium hover:text-primary transition-colors">Solutions</Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">Pricing</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">Log in</Button>
            <Button size="sm" className="rounded-full px-6">Get Started</Button>
          </div>
        </div>
      </header>

      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse-slow" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px]" />
          </div>

          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="secondary" className="mb-6 rounded-full px-4 py-1 border-primary/20 bg-primary/5 text-primary">
                <Sparkles className="w-3 h-3 mr-2" />
                The Future of AI is here
              </Badge>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tighter"
              {...fadeInUp}
            >
              Unlock Unlimited <br />
              <span className="text-gradient">Potential with AI</span>
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
              {...fadeInUp}
              transition={{ delay: 0.1 }}
            >
              Jovial AI empowers modern teams with cutting-edge intelligence. 
              Automate complex workflows, generate content, and gain insights in seconds.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              {...fadeInUp}
              transition={{ delay: 0.2 }}
            >
              <Button size="lg" className="rounded-full px-8 h-14 text-base shadow-lg shadow-primary/20">
                Start for free <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-base glass">
                <GithubIcon className="mr-2 w-4 h-4" /> View on GitHub
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
              <p className="text-muted-foreground">Everything you need to scale your AI operations.</p>
            </div>

            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              <FeatureCard 
                icon={<Zap className="w-6 h-6 text-yellow-500" />}
                title="Lightning Fast"
                description="Our optimized infrastructure ensures sub-second response times for all AI tasks."
              />
              <FeatureCard 
                icon={<Shield className="w-6 h-6 text-blue-500" />}
                title="Enterprise Security"
                description="Bank-grade encryption and privacy-first data handling for your sensitive information."
              />
              <FeatureCard 
                icon={<Sparkles className="w-6 h-6 text-purple-500" />}
                title="Smart Automations"
                description="Build complex multi-step workflows that run on autopilot with our drag-and-drop builder."
              />
            </motion.div>
          </div>
        </section>

        {/* Mockup Section */}
        <section className="py-24 overflow-hidden">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="relative rounded-2xl border border-border bg-card shadow-2xl overflow-hidden"
            >
              <div className="h-12 border-b border-border bg-muted/50 flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                </div>
                <div className="flex-grow flex justify-center">
                  <div className="bg-background border border-border px-8 py-1 rounded text-[10px] text-muted-foreground w-1/3 text-center">
                    app.jovial.ai/dashboard
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-[200px_1fr] h-[500px]">
                <div className="border-r border-border bg-muted/20 p-4 space-y-4">
                  <div className="h-8 bg-primary/10 rounded-md animate-pulse" />
                  <div className="space-y-2">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="h-6 bg-muted rounded-md" />
                    ))}
                  </div>
                </div>
                <div className="p-8 space-y-8">
                  <div className="flex justify-between items-center">
                    <div className="h-10 w-48 bg-muted rounded-lg" />
                    <div className="h-10 w-32 bg-primary/20 rounded-lg" />
                  </div>
                  <div className="grid grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="h-32 bg-muted/50 rounded-xl border border-border/50" />
                    ))}
                  </div>
                  <div className="h-48 bg-muted/30 rounded-xl border border-dashed border-border" />
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Bot className="text-primary w-6 h-6" />
                <span className="font-bold text-lg">Jovial AI</span>
              </div>
              <p className="text-muted-foreground max-w-xs">
                Making artificial intelligence accessible and jovial for teams worldwide.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Features</li>
                <li>API</li>
                <li>Pricing</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>About</li>
                <li>Blog</li>
                <li>Privacy</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:row items-center justify-between pt-8 border-t border-border gap-4">
            <p className="text-sm text-muted-foreground">© 2026 Jovial AI. All rights reserved.</p>
            <div className="flex gap-6">
              <GithubIcon className="w-5 h-5 text-muted-foreground hover:text-foreground cursor-pointer" />
              <GithubIcon className="w-5 h-5 text-muted-foreground hover:text-foreground cursor-pointer" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div variants={fadeInUp}>
      <Card className="glass h-full hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 border-border/50">
        <CardContent className="pt-6">
          <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center mb-6">
            {icon}
          </div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground leading-relaxed">
            {description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
