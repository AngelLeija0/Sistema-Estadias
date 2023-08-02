import { defineStore } from "pinia";

export const useFilterStore = defineStore('filterStorage', {
  state: () => ({
    filter: null,
  }),
  getters: {
    getFilter(state) {
      return state.filter
    }
  },
  actions: {
    setFilter(filter) {
      this.filter = filter;
    },
    clearFilter() {
      this.filter = null;
    },
  },
});
