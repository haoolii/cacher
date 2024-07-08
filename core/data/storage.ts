import { ReviewConfig, ReviewRecord, Storable, Work } from "./types";

export const Prefix = "CACHER";

export class LocalStorageService<T extends Storable> {
  private storageKey: string;

  constructor(storageKey: string) {
    console.log(`=== Create ${storageKey} ===`);
    this.storageKey = storageKey;
  }

  private getAll(): T[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  getAllItems(): T[] {
    return this.getAll();
  }

  getItemById(id: string): T | undefined {
    const items = this.getAll();
    return items.find((item) => item.id === id);
  }

  addItem(item: T): void {
    const items = this.getAll();
    items.push(item);
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }

  updateItem(updatedItem: T): void {
    const items = this.getAll();
    const index = items.findIndex((item) => item.id === updatedItem.id);
    if (index !== -1) {
      items[index] = updatedItem;
      localStorage.setItem(this.storageKey, JSON.stringify(items));
    }
  }

  deleteItemById(id: string): void {
    let items = this.getAll();
    items = items.filter((item) => item.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }
}

export const workStorage = new LocalStorageService<Work>(`${Prefix}_WORKS`);

export const reviewRecordStorage = new LocalStorageService<ReviewRecord>(
  `${Prefix}_REVIEW_RECORDS`
);

export const reviewConfigStorage = new LocalStorageService<ReviewConfig>(
  `${Prefix}_REVIEW_CONFIGS`
);

export const fulfillRecordStorage = new LocalStorageService<ReviewRecord>(
  `${Prefix}_FULFILL_RECORDS`
);
