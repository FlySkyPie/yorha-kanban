import { useLiveQuery } from "dexie-react-hooks";
import { useCallback } from "preact/hooks";

import { db } from "./db";

export const useListStore = (boardId: number) => {
    const list = useLiveQuery(() =>
        db.lists.where("boardId").equals(boardId).toArray(),
        [boardId]);

    const add = useCallback(async (name: string, boardId: number) => {
        await db.lists.add({
            id: undefined!,
            name,
            boardId,
        });
    }, []);

    const update = useCallback(async (
        id: number,
        name: string,
        order?: number) => {
        await db.lists.update(id, {
            name,
            order,
        });
    }, []);

    const remove = useCallback(async (id: number,) => {
        await db.lists.delete(id);
    }, []);

    return { list, add, update, remove };
};
