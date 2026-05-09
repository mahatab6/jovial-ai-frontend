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
      defaultModel: 'gpt-4o-mini',
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
      await api.patch('/api/v1/users/me', data);
      await initialize(); // Refresh global auth state
      toast.success('Profile updated successfully');
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Failed to update profile';
      toast.error('Error', { description: msg });
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
    <div className="mx-auto max-w-4xl space-y-8 pb-8">
      <PageHeader
        title="Profile Settings"
        description="Manage your account details and AI generation preferences."
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <User className="h-5 w-5 text-primary" />
        </div>
      </PageHeader>

      <div className="grid gap-8 md:grid-cols-2">
        
        {/* Profile Card */}
        <Card className="p-6 border-border shadow-sm">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border">
            <User className="h-5 w-5 text-muted-foreground" />
            <h3 className="text-lg font-semibold">Personal Information</h3>
          </div>

          <form onSubmit={handleProfileSubmit(onProfileSave)} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                {...registerProfile('name')}
                className={profileErrors.name ? 'border-destructive focus-visible:ring-destructive' : ''}
              />
              {profileErrors.name && (
                <p className="text-xs text-destructive">{profileErrors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                disabled
                {...registerProfile('email')}
                className="bg-muted/50 text-muted-foreground cursor-not-allowed"
              />
              <p className="text-[10px] text-muted-foreground">Email address cannot be changed.</p>
            </div>

            <Button type="submit" disabled={isProfileSaving} className="w-full sm:w-auto mt-4">
              {isProfileSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              Save Changes
            </Button>
          </form>
        </Card>

        {/* Preferences Card */}
        <Card className="p-6 border-border shadow-sm">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border">
            <Settings className="h-5 w-5 text-muted-foreground" />
            <h3 className="text-lg font-semibold">AI Preferences</h3>
          </div>

          <form onSubmit={handlePrefsSubmit(onPrefsSave)} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="defaultModel">Default Model</Label>
              <Controller
                control={prefsControl}
                name="defaultModel"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt-4o-mini">GPT-4o Mini (Fast)</SelectItem>
                      <SelectItem value="gpt-4o">GPT-4o (High Quality)</SelectItem>
                      <SelectItem value="gemini-1.5-flash">Gemini 1.5 Flash</SelectItem>
                      <SelectItem value="gemini-1.5-pro">Gemini 1.5 Pro</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {prefsErrors.defaultModel && (
                <p className="text-xs text-destructive">{prefsErrors.defaultModel.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="preferredTone">Preferred Tone</Label>
              <Controller
                control={prefsControl}
                name="preferredTone"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select tone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="casual">Casual & Friendly</SelectItem>
                      <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                      <SelectItem value="persuasive">Persuasive</SelectItem>
                      <SelectItem value="humorous">Humorous</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <Button type="submit" disabled={isPrefsSaving} variant="secondary" className="w-full sm:w-auto mt-4">
              {isPrefsSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
              Save Preferences
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
