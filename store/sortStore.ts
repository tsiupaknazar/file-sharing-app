import { create } from 'zustand';

interface SortState {
    sortKey: string;
    setSortKey: (key: string) => void;
}

const useSortStore = create<SortState>((set) => ({
    sortKey: 'name-asc', 
    setSortKey: (key) => set({ sortKey: key }),
}));

export default useSortStore;