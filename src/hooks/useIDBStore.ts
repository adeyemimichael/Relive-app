// hooks/useIDBStore.ts
import { useCallback, useEffect, useState } from 'react';
import { liveQuery, Table } from 'dexie';
import { db } from '../utils/indexedDB';


type TableNames = {
  [K in keyof typeof db]: typeof db[K] extends Table<any, any> ? K : never;
}[keyof typeof db];                


export function useIDBStore<T>(table: TableNames) {
  const tbl = db[table] as Table<T, any>;          // ← safely narrowed

  const [items, setItems] = useState<T[]>([]);

  
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
