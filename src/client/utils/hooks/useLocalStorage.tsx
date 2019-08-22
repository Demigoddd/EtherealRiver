import { useState } from 'react';

export type setValueCallback = (value: string | ((previousValue: string) => string)) => void;

export const useLocalStorage = (key: string, initialValue: string = ''): [string, setValueCallback] => {
  const [storedValue, setStoredValue] = useState<string>(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      if (item) {
        return JSON.parse(item);
      } else {
        window.localStorage.setItem(key, JSON.stringify(initialValue));
        return initialValue;
      }
    } catch (error) {
      // If error also return initialValue
      console.error(error);
      return initialValue;
    }
  });

  const setValue: setValueCallback = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = (value instanceof Function) ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.error(error);
    }
  };

  return [storedValue, setValue];
}
