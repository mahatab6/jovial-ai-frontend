import { create } from 'zustand';

interface GenerationJob {
  jobId: string;
  status: 'queued' | 'active' | 'completed' | 'failed';
  progress: number;
  type: string;
  prompt: string;
  result?: any;
  error?: string;
}

interface AIGenerationState {
  currentJob: GenerationJob | null;
  history: GenerationJob[];
  isGenerating: boolean;
  setCurrentJob: (job: GenerationJob | null) => void;
  updateJobProgress: (jobId: string, progress: number, status?: GenerationJob['status']) => void;
  addToHistory: (job: GenerationJob) => void;
  setGenerating: (isGenerating: boolean) => void;
  reset: () => void;
}

export const useAIGenerationStore = create<AIGenerationState>((set) => ({
  currentJob: null,
  history: [],
  isGenerating: false,
  setCurrentJob: (job) => set({ currentJob: job, isGenerating: !!job }),
  updateJobProgress: (jobId, progress, status) =>
    set((state) => {
      if (state.currentJob?.jobId === jobId) {
        return {
          currentJob: {
            ...state.currentJob,
            progress,
            status: status || state.currentJob.status,
          },
        };
      }
      return state;
    }),
  addToHistory: (job) =>
    set((state) => ({
      history: [job, ...state.history],
    })),
  setGenerating: (isGenerating) => set({ isGenerating }),
  reset: () => set({ currentJob: null, isGenerating: false }),
}));
