'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import api from '@/services/api';
import { QUERY_KEYS } from '@/constants';
import { Navbar } from '@/components/layouts/Navbar';
import { Footer } from '@/components/layouts/Footer';
import { TemplateCard } from '@/components/templates/TemplateCard';
import { PageLoader } from '@/components/shared/Loader';
import { motion } from 'framer-motion';
import {
  Star,
  ArrowLeft,
  Sparkles,
  Zap,
  ShieldCheck,
  Clock,
  ChevronRight,
  MessageSquare,
  Info,
  Layout
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

export default function TemplateDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const { data: template, isLoading } = useQuery({
    queryKey: QUERY_KEYS.TEMPLATE_DETAIL(id as string),
    queryFn: async () => {
      const res = await api.get(`/api/v1/templates/${id}`);
      return res.data?.data;
    },
  });

  const handleUseTemplate = () => {
    toast.success('Template selected!', { description: `Starting generator with ${template?.name}` });
    router.push(`/dashboard/generate?template=${template?.id}`);
  };

  if (isLoading) return <PageLoader />;

  if (!template) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <h1 className="text-2xl font-bold">Template not found</h1>
        <Button onClick={() => router.push('/templates')}>Back to Explore</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">

      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => router.push('/templates')}
            className="mb-8 hover:bg-primary/10 transition-colors group"
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Explore
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Content Column */}
            <div className="lg:col-span-2 space-y-10">
              {/* Hero Section */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 px-3 py-1 text-xs font-bold tracking-wider">
                    {template.category}
                  </Badge>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs font-bold">
                    <Star className="h-4 w-4 fill-amber-500" />
                    {template.rating} ({template.reviewCount} Reviews)
                  </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6 leading-[1.1]">
                  {template.name}
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {template.description}
                </p>
              </motion.div>

              {/* Description Section */}
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-xl font-bold border-b border-border pb-4">
                  <Layout className="h-5 w-5 text-primary" />
                  Overview & Capabilities
                </div>
                <Card className="border-border/40 bg-card/40 backdrop-blur-sm">
                  <CardContent className="pt-6">
                    <p className="text-muted-foreground whitespace-pre-wrap leading-loose">
                      {template.previewText}
                      {"\n\n"}
                      This advanced AI template leverages the latest large language models to provide context-aware, highly relevant outputs. Whether you're drafting professional communications or creative content, Jovial AI ensures consistency and quality at every step.
                    </p>
                  </CardContent>
                </Card>
              </section>

              {/* Specifications Section */}
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-xl font-bold border-b border-border pb-4">
                  <Info className="h-5 w-5 text-emerald-500" />
                  Technical Specifications
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border-border/40 bg-muted/20">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4 text-primary" /> Security & Privacy
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                      Enterprise-grade encryption for all inputs and generated outputs. No data is used for model training.
                    </CardContent>
                  </Card>
                  <Card className="border-border/40 bg-muted/20">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                        <Zap className="h-4 w-4 text-amber-500" /> Speed & Performance
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                      Real-time streaming generation. Average completion time under 15 seconds for most complex requests.
                    </CardContent>
                  </Card>
                </div>
                <Card className="border-border/40 bg-card/40 backdrop-blur-sm">
                  <CardContent className="pt-6">
                    <pre className="text-sm text-muted-foreground font-mono bg-background/50 p-6 rounded-xl border border-border/50 whitespace-pre-wrap">
                      {template.specifications}
                    </pre>
                  </CardContent>
                </Card>
              </section>

              {/* Reviews Section */}
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-xl font-bold border-b border-border pb-4">
                  <MessageSquare className="h-5 w-5 text-purple-500" />
                  Community Reviews
                </div>
                <div className="space-y-4">
                  {template.reviews?.map((review: any) => (
                    <Card key={review.id} className="border-border/40 bg-card/30">
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`h-3.5 w-3.5 ${i < review.rating ? 'fill-amber-500 text-amber-500' : 'text-muted-foreground opacity-30'}`} />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground ml-2">{review.created}</span>
                        </div>
                        <p className="text-sm leading-relaxed">{review.reviewText}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Action Sidebar */}
            <div className="space-y-8">
              <div className="sticky top-32 space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card className="overflow-hidden border-primary/20 shadow-2xl shadow-primary/10">
                    <div className="h-2 bg-gradient-to-r from-primary to-emerald-500" />
                    <CardHeader>
                      <CardTitle className="text-2xl font-bold">Use Template</CardTitle>
                      <CardDescription>
                        Deploy this AI engine to your workspace and start generating.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Credits per use</span>
                          <span className="font-bold flex items-center gap-1">5 <Zap className="h-3 w-3 text-amber-500 fill-amber-500" /></span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Est. Time</span>
                          <span className="font-bold flex items-center gap-1">~10s <Clock className="h-3 w-3 text-primary" /></span>
                        </div>
                      </div>
                      <Button
                        size="lg"
                        className="w-full h-14 text-lg font-bold shadow-xl shadow-primary/20 group"
                        onClick={handleUseTemplate}
                      >
                        Generate Content <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Related Templates */}
                {template.relatedTemplates?.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-4"
                  >
                    <h3 className="text-lg font-bold flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-primary" /> Related Engines
                    </h3>
                    <div className="grid gap-4">
                      {template.relatedTemplates.map((related: any) => (
                        <TemplateCard key={related.id} template={related} />
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>


    </div>
  );
}
