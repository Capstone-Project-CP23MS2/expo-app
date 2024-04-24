import { create } from 'zustand';

type CounterStore = {

  count: number,
  increase: (by: number) => void,
};

export const useCounterStore = create<CounterStore>((set) => ({

  count: 1,
  increase: (by) => {
    set((state) => ({ count: state.count + by }));
  },
}))

