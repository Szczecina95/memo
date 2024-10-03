export class LocalStorageManager {
  // Saves a new item to localStorage under the specified key
  static saveItemToLocalStorage<T>(key: string, item: T) {
    const items: T[] = this.loadItemsFromLocalStorage<T>(key); // Load existing items
    items.push(item); // Add the new item
    localStorage.setItem(key, JSON.stringify(items)); // Save back to localStorage
  }

  // Loads and returns all items from localStorage for the specified key
  static loadItemsFromLocalStorage<T>(key: string): T[] {
    return JSON.parse(localStorage.getItem(key) || "[]"); // Return parsed items or empty array if none
  }

  // Deletes an item from localStorage by its id
  static deleteFromLocalStorage<T extends { id: string }>(key: string, id: string) {
    const items: T[] = this.loadItemsFromLocalStorage<T>(key); // Load existing items
    const updatedItems = items.filter((item) => item.id !== id); // Filter out the item to be deleted
    localStorage.setItem(key, JSON.stringify(updatedItems)); // Save updated list
  }

  // Updates an existing item in localStorage
  static updateItemInLocalStorage<T extends { id: string }>(key: string, updatedItem: T) {
    const items: T[] = this.loadItemsFromLocalStorage<T>(key); // Load existing items
    const itemIndex = items.findIndex((item) => item.id === updatedItem.id); // Find the index of the item
    if (itemIndex !== -1) {
      items[itemIndex] = updatedItem; // Update the item if it exists
    }
    localStorage.setItem(key, JSON.stringify(items)); // Save updated list
  }
}