import { useLiveQuery } from "dexie-react-hooks";
import { useCallback } from "preact/hooks";

import type { ICard } from "../interfaces/card";

import { db } from "./db";

type IValue = Pick<ICard, 'title' | 'content'>;

export const useCardStore = (boardId: number, listId: number) => {
    const list = useLiveQuery(() =>
        db.cards
            .where({ boardId, listId })
            .toArray(),
        [boardId]);

    const add = useCallback(async (boardId: number, listId: number, card: IValue) => {
        await db.cards.add({
            id: undefined!,
            listId,
            boardId,
            ...card,
        });
    }, []);

    const update = useCallback(async (
        id: number, card: ICard) => {
        await db.cards.update(id, {
            ...card,
        });
    }, []);

    const remove = useCallback(async (id: number,) => {
        await db.cards.delete(id);
    }, []);

    return { list, add, update, remove };
};
