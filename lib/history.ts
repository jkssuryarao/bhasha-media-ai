export interface HistoryItem {
  id: string;
  topic: string;
  language: string;
  generatedText: string;
  audioUrl: string;
  timestamp: number;
}

const HISTORY_STORAGE_KEY = 'bhasha-media-history';

export function getHistory(): HistoryItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (!stored) return [];
    const items: HistoryItem[] = JSON.parse(stored);
    return items.sort((a, b) => b.timestamp - a.timestamp);
  } catch {
    return [];
  }
}

export function addToHistory(item: Omit<HistoryItem, 'id'>): void {
  if (typeof window === 'undefined') return;
  const history = getHistory();
  const newItem: HistoryItem = {
    ...item,
    id: `gen-${Date.now()}-${Math.random().toString(36).slice(2)}`,
  };
  history.unshift(newItem);
  // Keep last 100 items
  const trimmed = history.slice(0, 100);
  localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(trimmed));
}

export function clearHistory(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(HISTORY_STORAGE_KEY);
}
