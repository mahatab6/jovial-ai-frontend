'use client';

import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Loader2, Save, Sparkles, Settings } from 'lucide-react';
import { toast } from 'sonner';

import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

import { useAuthStore } from '@/store/authStore';
import api from '@/services/api';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email address'),
});

const preferencesSchema = z.object({
  defaultModel: z.string(),
  preferredTone: z.string(),
});

type ProfileForm = z.infer<typeof profileSchema>;
type PreferencesForm = z.infer<typeof preferencesSchema>;

export default function ProfilePage() {
  const { user, initialize } = useAuthStore();
  const [isProfileSaving, setProfileSaving] = useState(false);
  const [isPrefsSaving, setPrefsSaving] = useState(false);

  // Profile Form
  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    reset: resetProfile,
    formState: { errors: profileErrors },
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  });

  // Preferences Form
  const {
    control: prefsControl,
    handleSubmit: handlePrefsSubmit,
    reset: resetPrefs,
    formState: { errors: prefsErrors },
  } = useForm<PreferencesForm>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      defaultModel: 'gemini-2.5-flash',
      preferredTone: 'professional',
    },
  });

  // Load initial data
  useEffect(() => {
    if (user) {
      resetProfile({
        name: user.name || '',
        email: user.email || '',
      });
      // Assuming user object contains preferences or we fallback
      resetPrefs({
        defaultModel: 'gpt-4o-mini', // Update if backend provides preferences
        preferredTone: 'professional',
      });
    }
  }, [user, resetProfile, resetPrefs]);

  const onProfileSave = async (data: ProfileForm) => {
    try {
      setProfileSaving(true);
      // We only allow updating the name. Email is read-only.
      const { name } = data;
      await api.patch('/api/v1/users/me', { name });
      
      // Refresh global auth state to reflect new name in header/profile
      await initialize(); 
      
      toast.success('Profile updated successfully');
    } catch (err: any) {
      console.error('Profile update error:', err);
      const msg = err.response?.data?.message || 'Failed to update profile';
      toast.error('Update Failed', { description: msg });
    } finally {
      setProfileSaving(false);
    }
  };

  const onPrefsSave = async (data: PreferencesForm) => {
    try {
      setPrefsSaving(true);
      // Assuming preferences are patched to the same endpoint or a specific one
      await api.patch('/api/v1/users/me', { preferences: data });
      toast.success('Preferences updated successfully');
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Failed to update preferences';
      toast.error('Error', { description: msg });
    } finally {
      setPrefsSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-10 pb-12">
      <PageHeader
        title="Account Workspace"
        description="Personalize your AI experience and manage your professional identity."
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 shadow-inner">
          <Settings className="h-6 w-6 text-primary" />
        </div>
      </PageHeader>

      <div className="grid gap-8 lg:grid-cols-5">
        
        {/* Profile Navigation/Info Side */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-8 border-border/50 bg-card/50 backdrop-blur-md shadow-xl rounded-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <User className="h-20 w-20" />
            </div>
            
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="h-24 w-24 rounded-full bg-gradient-to-tr from-primary to-purple-500 p-1 shadow-lg mb-4">
                <div className="h-full w-full rounded-full bg-background flex items-center justify-center text-3xl font-bold text-primary capitalize">
                  {user?.name?.[0] || 'U'}
                </div>
              </div>
              <h2 className="text-2xl font-bold tracking-tight">{user?.name}</h2>
              <p className="text-sm text-muted-foreground font-medium mt-1">{user?.email}</p>
              
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                <Badge variant="secondary" className="rounded-full px-3 py-1 bg-primary/10 text-primary border-none font-bold">
                  {user?.role === 'ADMIN' ? 'Administrator' : 'Standard Member'}
                </Badge>
                <Badge variant="outline" className="rounded-full px-3 py-1 border-border/50 font-bold">
                  {user?.credits ?? 0} Credits
                </Badge>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-border/30 space-y-4 relative z-10">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground font-medium">Account Status</span>
                <span className="font-bold text-emerald-500 flex items-center gap-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Active
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground font-medium">Member Since</span>
                <span className="font-bold">May 2024</span>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-border/50 bg-primary/5 rounded-3xl border-dashed border-2">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-sm">Pro Tip</h4>
                <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                  Updating your preferred tone helps our AI engines generate more relevant content for your specific needs.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Forms Side */}
        <div className="lg:col-span-3 space-y-8">
          {/* Profile Card */}
          <Card className="p-8 border-border/50 bg-card/30 backdrop-blur-sm shadow-sm rounded-3xl border">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <User className="h-4 w-4 text-primary" />
              </div>
              <h3 className="text-xl font-bold tracking-tight">Personal Information</h3>
            </div>

            <form onSubmit={handleProfileSubmit(onProfileSave)} className="space-y-6">
              <div className="space-y-2.5">
                <Label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-muted-foreground/80 ml-1">Display Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  {...registerProfile('name')}
                  className={`h-12 rounded-xl bg-background/50 border-border/50 focus:border-primary/50 transition-all ${profileErrors.name ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                />
                {profileErrors.name && (
                  <p className="text-xs text-destructive font-medium ml-1">{profileErrors.name.message}</p>
                )}
              </div>

              <div className="space-y-2.5 opacity-80">
                <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-muted-foreground/80 ml-1">Email Identity</Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    disabled
                    {...registerProfile('email')}
                    className="h-12 rounded-xl bg-muted/20 text-muted-foreground border-dashed border-border/50 cursor-not-allowed pr-10"
                  />
                </div>
                <p className="text-[10px] text-muted-foreground/70 italic ml-1">Email address is managed by your authentication provider.</p>
              </div>

              <div className="pt-4">
                <Button type="submit" disabled={isProfileSaving} className="h-12 px-8 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all font-bold">
                  {isProfileSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                  Synchronize Profile
                </Button>
              </div>
            </form>
          </Card>

          {/* Preferences Card */}
          <Card className="p-8 border-border/50 bg-card/30 backdrop-blur-sm shadow-sm rounded-3xl border">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-8 w-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold tracking-tight">AI Engine Configuration</h3>
            </div>

            <form onSubmit={handlePrefsSubmit(onPrefsSave)} className="space-y-6">
              <div className="space-y-2.5">
                <Label htmlFor="defaultModel" className="text-xs font-bold uppercase tracking-widest text-muted-foreground/80 ml-1">Intelligence Engine</Label>
                <Controller
                  control={prefsControl}
                  name="defaultModel"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="h-12 rounded-xl bg-background/50 border-border/50 focus:border-primary/50 transition-all font-medium">
                        <SelectValue placeholder="Select a model" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-border/50 shadow-2xl">
                        <SelectItem value="gemini-2.5-flash">Gemini 2.5 Flash <span className="text-[10px] opacity-50 ml-2">(High Speed)</span></SelectItem>
                        <SelectItem value="gemini-2.5-pro">Gemini 2.5 Pro <span className="text-[10px] opacity-50 ml-2">(Maximum Accuracy)</span></SelectItem>
                        <SelectItem value="gemini-1.5-flash">Gemini 1.5 Flash <span className="text-[10px] opacity-50 ml-2">(Standard)</span></SelectItem>
                        <SelectItem value="gpt-4o-mini">GPT-4o Mini <span className="text-[10px] opacity-50 ml-2">(Legacy)</span></SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="space-y-2.5">
                <Label htmlFor="preferredTone" className="text-xs font-bold uppercase tracking-widest text-muted-foreground/80 ml-1">Natural Tone</Label>
                <Controller
                  control={prefsControl}
                  name="preferredTone"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="h-12 rounded-xl bg-background/50 border-border/50 focus:border-primary/50 transition-all font-medium">
                        <SelectValue placeholder="Select tone" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-border/50 shadow-2xl">
                        <SelectItem value="professional">Professional & Crisp</SelectItem>
                        <SelectItem value="casual">Friendly & Relatable</SelectItem>
                        <SelectItem value="enthusiastic">Energetic & Bright</SelectItem>
                        <SelectItem value="persuasive">Dynamic & Convincing</SelectItem>
                        <SelectItem value="humorous">Light-hearted & Fun</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="pt-4">
                <Button type="submit" disabled={isPrefsSaving} variant="secondary" className="h-12 px-8 rounded-xl font-bold bg-muted hover:bg-muted/80 transition-all border border-border/50">
                  {isPrefsSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                  Update Preferences
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
