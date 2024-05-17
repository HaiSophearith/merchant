import { storageFactory } from "storage-factory";
import superjson from "superjson";

const storage = storageFactory(() => localStorage);

const PREFIX = "ps_";

export function setLocalStorage<T>(key: string, value: T) {
  storage.setItem(PREFIX + key, superjson.stringify(value));
}

export function getLocalStorage<T>(key: string, initialValue?: T) {
  const value = storage.getItem(PREFIX + key);
  if (!value) return initialValue;
  return superjson.parse<T>(value);
}

export const removeLocalStorage = (key: string) => {
  storage.removeItem(PREFIX + key);
};
