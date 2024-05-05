import { useMemo } from "preact/hooks";

import { BoardCard, EmptyBoardCard } from "./components/board-card";
import styles from "./styles.module.scss";

export const BoardList = () => {
    const fakeList = useMemo(() =>
        Array.from({ length: 10 }).map((_, i) =>
            <BoardCard
                key={i}
                title="Board Name" />), []);
    return (
        <div class={styles.root}>
            <div class={styles.container}>
                <header>
                    <h1>Boards</h1>
                </header>
                <main class={styles.main}>
                    <section>
                        <EmptyBoardCard />
                        {fakeList}
                    </section>
                </main>
                <nav>
                    <div>List of Kanban Boards</div>
                    <div>
                        <button type="button" >
                            Create New Board
                        </button>
                    </div>
                </nav>
            </div>
        </div>
    );
};
