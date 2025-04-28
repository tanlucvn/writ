export const saveToLocalStorage = <T>(key: string, value: T): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const loadFromLocalStorage = <T>(key: string, defaultValue: T): T => {
  if (typeof window !== "undefined") {
    const savedValue = localStorage.getItem(key);
    if (savedValue) {
      return JSON.parse(savedValue) as T;
    }
  }
  return defaultValue;
};
