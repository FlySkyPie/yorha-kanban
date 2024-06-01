import { useLiveQuery } from "dexie-react-hooks";
import { useCallback } from "preact/hooks";

import { db } from "./db";

export const useBoardStore = () => {
    const list = useLiveQuery(() => db.boards.toArray());
    const add = useCallback(async (name: string, code: string, description: string) => {
        await db.boards.add({
            id: undefined!,
            name,
            code,
            description,
        });
    }, []);

    const update = useCallback(async (
        id: number,
        name: string,
        code: string,
        description: string) => {
        await db.boards.update(id, {
            name,
            code,
            description,
        });
    }, []);

    return { list, add, update };
};
