import { useNavigate, useParams } from "react-router-dom";

import { CreateListColumn, ListColumn } from "./components/list-column";
import { useCreateListDialog } from "../../dialogs/use-create-list.dialog";
import { useListStore } from "../../storages/list.storage";
import { useBoard } from "../../storages/board.storage";
import styles from './styles.module.scss';
import { useMemo } from "preact/hooks";

export const Board: React.FC = () => {
    const { boardCode } = useParams();
    const board = useBoard(boardCode ?? "");
    const list = useListStore(board?.id ?? -1);
    const navigate = useNavigate();
    const { dialogView, openDialog } = useCreateListDialog();

    const listColumns = useMemo(() => {
        if (!list.list) {
            return null;
        }

        return list.list.map((value) =>
            <ListColumn
                key={value.id}
                name={value.name}
            />
        )
    }, [list.list]);

    return (
        <div class={styles.root}>
            <div class={styles.container}>
                <header>
                    <h1>Board ({boardCode})</h1>
                </header>
                <main class={styles.main}>
                    <section class={styles.section}>
                        {listColumns}
                        <CreateListColumn onCreate={async () => {
                            if (!board) {
                                return;
                            }
                            const result = await openDialog();
                            if (result.type === 'close') {
                                return;
                            }

                            await list.add(result.value, board.id);

                        }} />
                    </section>
                </main>
                <nav>
                    <div>Kanban of "PLACEHOLDER"</div>
                    <div>
                        <button
                            type="button"
                            onClick={() => navigate(`/`)}
                        >
                            Back to Board List
                        </button>
                    </div>
                </nav>
            </div>
            {dialogView}
        </div>
    );
};
