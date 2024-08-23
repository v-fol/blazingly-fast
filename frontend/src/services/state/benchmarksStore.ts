import { create } from "zustand"

type Filters = {
    testType: string
    metrics: string
}

type BenchmarkFilters = {
    filters: Filters
    setFilters: (filters: Filters) => void
};

export const useBenchmarkFilters = create<BenchmarkFilters>((set) => ({
    filters: {
        testType: 'all',
        metrics: 'combinedScore'
    },
    setFilters: (filters: Filters) => set({ filters })
}));