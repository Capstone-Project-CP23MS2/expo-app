import { create } from 'zustand';

type Date = 'all' | 'today' | 'tomorrow' | 'this-week' | 'next-week' | 'this-month';
// starting soon', choose-date
type Time = 'all' | 'morning' | 'afternoon' | 'evening' | 'night';
// จังหวัด

type Filters = {
  categoryIds?: number[],
  date?: Date,
  timeRangeStart?: string,
  timeRangeEnd?: string,
  distance?: number,
  sortBy?: 'relevance' | 'distance' | 'price' | 'rating',
};
const initialFilters: Filters = {
  categoryIds: [],
  date: 'all',
  timeRangeStart: '',
  timeRangeEnd: '',
  distance: 5,
  sortBy: 'relevance',
};

type FilterStore = {
  filters: Filters,
  count: number,
  inc: () => void,
  setFilters: (filters: Filters) => void,
  reset: () => void,
};

export const useFilterStore = create<FilterStore>((set) => ({
  filters: { ...initialFilters },
  count: 1,
  inc: () => set((state) => ({ count: state.count + 1 })),
  setFilters: (filters) => set(() => ({ filters })),
  reset: () => set(() => ({ filters: initialFilters })),
}))

