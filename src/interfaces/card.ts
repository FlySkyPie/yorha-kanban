export interface ICard {
    id: number;

    title: string;

    content: string;

    boardId: number;

    /**
     * Set to null when it's archived.
     */
    listId: number | null;
}