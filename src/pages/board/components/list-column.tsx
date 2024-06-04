import { useCallback, useMemo } from "preact/hooks";

import type { IList } from "../../../interfaces/list";
import { useCardStore } from "../../../storages/card.storage";
import { useCreateOrUpdateCardDialog } from "../../../dialogs/use-create-or-update-card.dialog";

import styles from "./styles.module.scss";

type ICreateListColumnProps = {
    onCreate: () => void;
};

export const CreateListColumn: React.FC<ICreateListColumnProps> = ({ onCreate }) => {

    return (
        <figure class={styles.root}>
            <div class={styles.boardCardContent}>
                <div class={styles.content}>
                    <p class={styles.actions}>
                        <button type="button" onClick={onCreate}>
                            Create List
                        </button>
                    </p>
                </div>
            </div>
        </figure>
    );
};

type IProps = {
    value: IList;

    onEdit: () => void;
};

export const ListColumn: React.FC<IProps> = ({ value: { boardId, id, name }, onEdit }) => {
    const crad = useCardStore(boardId, id);
    const { dialogView: cardDialogView, openDialog: openCardDialog } = useCreateOrUpdateCardDialog();

    const cardsView = useMemo(() => {
        if (!crad.list) {
            return null;
        }

        return crad.list.map(({ id, title }) =>
            <div key={id} class={styles.card}>
                {title}
            </div>);
    }, [crad.list]);

    const handleCreate = useCallback(async () => {
        const result = await openCardDialog();
        if (result.type === 'close') {
            return;
        }

        await crad.add(boardId, id, {
            ...result.value,
        });
    }, [boardId, crad, id, openCardDialog]);

    return (
        <figure class={styles.root}>
            <figcaption>
                {name}
            </figcaption>
            <div class={styles.boardCardContent}>
                <div class={styles.content}>
                    <div class={styles.cardContainer}>
                        {cardsView}

                    </div>
                </div>
                <p class={styles.actions}>
                    <button
                        type="button"
                        onClick={handleCreate}>
                        Add a card
                    </button>
                    <button
                        type="button"
                        onClick={onEdit}>
                        Edit list
                    </button>
                </p>
            </div>
            {cardDialogView}
        </figure>
    );
};
