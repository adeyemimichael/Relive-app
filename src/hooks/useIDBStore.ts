// hooks/useIDBStore.ts
import { useCallback, useEffect, useState } from 'react';
import { liveQuery, Table } from 'dexie';
import { db } from '../utils/indexedDB';

/* ------------------------------------------------------------------ */
/* 1️⃣ — Pick only the keys on `db` that are actual Dexie tables       */
/* ------------------------------------------------------------------ */
type TableNames = {
  [K in keyof typeof db]: typeof db[K] extends Table<any, any> ? K : never;
}[keyof typeof db];                //  ▶︎ union of table names, e.g. "media" | "memories"

/* ------------------------------------------------------------------ */
/* 2️⃣ — Reusable hook                                                 */
/* ------------------------------------------------------------------ */
export function useIDBStore<T>(table: TableNames) {
  const tbl = db[table] as Table<T, any>;          // ← safely narrowed

  const [items, setItems] = useState<T[]>([]);

  /* Keep React state in sync with IndexedDB */
  useEffect(() => {
    const sub = liveQuery(() => tbl.toArray()).subscribe({
      next: setItems,
      error: console.error,
    });
    return () => sub.unsubscribe();
  }, [tbl]);

  /* CRUD helpers  */
  const add = useCallback((item: T) => tbl.add(item), [tbl]);

  const update = useCallback(
    (key: string, changes: Partial<T>) => tbl.update(key, changes),
    [tbl],
  );

  const remove = useCallback((key: string) => tbl.delete(key), [tbl]);

  return { items, add, update, remove };
}
