import { StorageKey, SaveStorage } from "../types/interfaces";

// Helper functions for localStorage
export function getStorageKey({ userEmail, key }: StorageKey): string {
  return `chat_${userEmail}_${key}`;
}

export function saveToStorage({ userEmail, key, data }: SaveStorage): void {
  try {
    localStorage.setItem(getStorageKey({ userEmail, key }), JSON.stringify(data));
  } catch (error) {
    console.warn('Failed to save to localStorage:', error);
  }
}

export function loadFromStorage<T>({ userEmail, key, defaultValue }: StorageKey & { defaultValue: T }): T {
  try {
    const stored = localStorage.getItem(getStorageKey({ userEmail, key }));
    return stored ? JSON.parse(stored) : defaultValue;
  } catch (error) {
    console.warn('Failed to load from localStorage:', error);
    return defaultValue;
  }
}
