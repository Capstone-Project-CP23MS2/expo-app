import { create } from 'zustand';

type Date = 'all' | 'today' | 'tomorrow' | 'this-week' | 'next-week' | 'this-month';
// starting soon', choose-date
type Time = 'all' | 'morning' | 'afternoon' | 'evening' | 'night';
// จังหวัด

type Filters = {
  categoryIds: string[],
  date?: Date,
  timeRangeStart?: string,
  timeRangeEnd?: string,
  distance?: number,
  sortBy?: 'relevance' | 'distance' | 'price' | 'rating',
};
const initialFilters = {
  categoryIds: [],
  date: 'all',
  timeRangeStart: '',
  timeRangeEnd: '',
  distance: 3,
  sortBy: 'relevance',
};

type FilterStore = {
  setting: any,
  count: number,
  inc: () => void,
};

const useFilterStore = create<FilterStore>((set) => ({
  setting: {
    category: 'all',
    price: 'all',
    rating: 'all',

  },
  count: 1,
  inc: () => set((state) => ({ count: state.count + 1 })),
}))

