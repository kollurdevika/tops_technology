// js/utils.js
export const StorageUtil = {
  getItem(key) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.error('Storage read error', e);
      return [];
    }
  },

  setItem(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data || []));
      return true;
    } catch (e) {
      console.error('Storage write error', e);
      return false;
    }
  },

  clear(key) {
    localStorage.removeItem(key);
  }
};
