import { useCallback, useMemo } from "preact/hooks";

import { useBoardStore } from "../../storages/board.storage";
import { useCreateOrUpdateBoardDialog } from "../../dialogs/use-create-or-update-board.dialog";

import { BoardCard, EmptyBoardCard } from "./components/board-card";
import styles from "./styles.module.scss";

export const BoardList = () => {
    const board = useBoardStore();

    const { dialogView, openDialog } = useCreateOrUpdateBoardDialog();

    const onCreateBoard = useCallback(async () => {
        const result = await openDialog();
        if (result.type === 'close') {
            return;
        }

        const { name, code, description } = result.value;
        board.add(name, code, description);
    }, [board, openDialog]);

    const cardsView = useMemo(() => {
        if (!board.list || board.list.length === 0) {
            return (
                <EmptyBoardCard
                    onClick={onCreateBoard} />
            );
        }
        return board.list.map((value) =>
            <BoardCard
                key={value.id}
                value={value}
                onEdit={async () => {
                    const result = await openDialog(value);
                    if (result.type === 'close') {
                        return;
                    }

                    const { name, code, description } = result.value;
                    await board.update(value.id, name, code, description)
                }} />
        )
    }, [board, onCreateBoard, openDialog]);

    return (
        <div class={styles.root}>
            <div class={styles.container}>
                <header>
                    <h1>Boards</h1>
                </header>
                <main class={styles.main}>
                    <section>
                        {cardsView}
                    </section>
                </main>
                <nav>
                    <div>List of Kanban Boards</div>
                    <div>
                        <button
                            type="button"
                            onClick={onCreateBoard}>
                            Create New Board
                        </button>
                    </div>
                </nav>
            </div>
            {dialogView}
        </div>
    );
};
