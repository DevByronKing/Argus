import { Question } from './types';

export interface QuestionsCatalogPayload {
  source: 'supabase' | 'catalog_fallback';
  count: number;
  questions: Question[];
}

interface QuestionsCacheEntry {
  payload: QuestionsCatalogPayload;
  expiresAt: number;
}

export const QUESTIONS_CACHE_TTL_MS = 5 * 60 * 1000;
const MAX_QUESTIONS_CACHE_ENTRIES = 100;

const questionsL1Cache = new Map<string, QuestionsCacheEntry>();

/**
 * Monta chave determinística de cache por filtro de banca, matéria e limite.
 */
export function buildQuestionsCacheKey(
  banca: string | null,
  subject: string | null,
  limit: number
): string {
  const normBanca = (banca || 'todas').trim().toLowerCase() || 'todas';
  const normSubject = (subject || 'todas').trim().toLowerCase() || 'todas';
  return `${normBanca}:${normSubject}:${limit}`;
}

export function getCachedQuestionsCatalog(
  key: string,
  now = Date.now()
): QuestionsCatalogPayload | null {
  const entry = questionsL1Cache.get(key);
  if (!entry) return null;

  if (now >= entry.expiresAt) {
    questionsL1Cache.delete(key);
    return null;
  }

  return entry.payload;
}

export function setCachedQuestionsCatalog(
  key: string,
  payload: QuestionsCatalogPayload,
  now = Date.now(),
  ttlMs = QUESTIONS_CACHE_TTL_MS
): void {
  if (questionsL1Cache.size >= MAX_QUESTIONS_CACHE_ENTRIES && !questionsL1Cache.has(key)) {
    const oldestKey = questionsL1Cache.keys().next().value;
    if (oldestKey !== undefined) {
      questionsL1Cache.delete(oldestKey);
    }
  }

  questionsL1Cache.set(key, {
    payload,
    expiresAt: now + ttlMs,
  });
}

export function clearQuestionsCatalogCache(): void {
  questionsL1Cache.clear();
}
