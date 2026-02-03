const KEY = 'likedMovies:v1';

export function loadLikedMovies<T = any>(): T[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveLikedMovies<T>(items: T[]): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(items ?? []));
  } catch (error) {
    console.error('Error saving liked movies to localStorage:', error);
  }
}
