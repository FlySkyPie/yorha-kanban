import { useCallback, useMemo } from "preact/hooks";

import { useCreateBoardDialog } from "../../dialogs/use-create-board.dialog";

import { BoardCard, EmptyBoardCard } from "./components/board-card";
import styles from "./styles.module.scss";

export const BoardList = () => {
    const { dialogView, openDialog } = useCreateBoardDialog();
    const fakeList = useMemo(() =>
        Array.from({ length: 10 }).map((_, i) =>
            <BoardCard
                key={i}
                title="Board Name" />), []);

    const onCreateBoard = useCallback(async () => {
        const result = await openDialog();
        console.log(result)
    }, [openDialog]);

    return (
        <div class={styles.root}>
            <div class={styles.container}>
                <header>
                    <h1>Boards</h1>
                </header>
                <main class={styles.main}>
                    <section>
                        <EmptyBoardCard
                            onClick={onCreateBoard} />
                        {fakeList}
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
