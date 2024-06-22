
export const setLocalStorage = (key: string, value: any): void => {
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error('Error setting localStorage:', error);
      }
    }
  };
  
  export const getLocalStorage = (key: string, defaultValue: any = null): any => {
    if (typeof window !== 'undefined') {
      try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
      } catch (error) {
        console.error('Error getting localStorage:', error);
        return defaultValue;
      }
    }
    return defaultValue;
  };