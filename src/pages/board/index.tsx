import { useNavigate, useParams } from "react-router-dom";
import { useMemo } from "preact/hooks";

import { CreateListColumn, ListColumn } from "./components/list-column";
import { useCreateListDialog } from "../../dialogs/use-create-list.dialog";
import { useListStore } from "../../storages/list.storage";
import { useBoard } from "../../storages/board.storage";
import { useEditListDialog } from "../../dialogs/use-edit-list.dialog";
import styles from './styles.module.scss';

export const Board: React.FC = () => {
    const { boardCode } = useParams();
    const board = useBoard(boardCode ?? "");
    const list = useListStore(board?.id ?? -1);
    const navigate = useNavigate();
    const { dialogView, openDialog } = useCreateListDialog();
    const { dialogView: editDialogView, openDialog: openEditDialog } = useEditListDialog();

    const listColumns = useMemo(() => {
        if (!list.list) {
            return null;
        }

        return list.list.map((value) =>
            <ListColumn
                key={value.id}
                value={value}
                onEdit={async () => {
                    const result = await openEditDialog(value.name);
                    if (result.type === 'close') {
                        return;
                    }
                    if (result.type === 'delete') {
                        list.remove(value.id);
                        return;
                    }
                    await list.update(value.id, result.value);
                }}
            />
        )
    }, [list, openEditDialog]);

    return (
        <div class={styles.root}>
            <div class={styles.container}>
                <header>
                    <h1>Board ({boardCode})</h1>
                </header>
                <main class={styles.main}>
                    <section class={styles.section}>
                        {listColumns}
                        <CreateListColumn
                            onCreate={async () => {
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
            {editDialogView}
        </div>
    );
};
