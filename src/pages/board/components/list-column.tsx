import { useCallback, useMemo } from "preact/hooks";
import { useDrop } from "react-dnd";

import type { IList } from "../../../interfaces/list";
import type { ICollectedProps, IDragItem, IDropItem } from "../../../interfaces/dnd";
import { ItemTypes } from "../../../constants";
import { useCardStore } from "../../../storages/card.storage";
import { useCreateOrUpdateCardDialog } from "../../../dialogs/use-create-or-update-card.dialog";
import { useCardDetailDialog } from "../../../dialogs/use-card-detail.dialog";

import { Card } from "./card";
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
    const cradStore = useCardStore(boardId, id);
    const { dialogView: cardDialogView, openDialog: openCardDialog } = useCreateOrUpdateCardDialog();
    const { dialogView: cardDetailView, openDialog: openCardDetail } = useCardDetailDialog();

    const [{ isOver, canDrop }, dropRef] = useDrop<IDragItem, IDropItem, ICollectedProps>({
        accept: ItemTypes.BOX,
        drop: () => ({ listId: id }),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    const cardsView = useMemo(() => {
        if (!cradStore.list) {
            return null;
        }

        return cradStore.list.map((cardValue) => {
            const { id, title } = cardValue;
            return (
                <Card
                    key={id}
                    title={title}
                    onClick={async () => {
                        const result1 = await openCardDetail(cardValue);
                        if (result1.type === 'close') {
                            return;
                        }
                        const result2 = await openCardDialog(cardValue);
                        if (result2.type === 'close') {
                            return;
                        }

                        await cradStore.update(id, {
                            ...cardValue,
                            ...result2.value,
                        });
                    }}
                    onMove={async (listId) => {
                        await cradStore.move(id, listId);
                    }}
                />
            );
        });
    }, [cradStore, openCardDetail, openCardDialog]);

    const handleCreate = useCallback(async () => {
        const result = await openCardDialog();
        if (result.type === 'close') {
            return;
        }

        await cradStore.add(boardId, id, {
            ...result.value,
        });
    }, [boardId, cradStore, id, openCardDialog]);

    return (
        <figure
            ref={dropRef}
            class={styles.root}>
            <figcaption>
                {name}
            </figcaption>
            <div class={styles.boardCardContent}>
                <div class={styles.content}>
                    <div class={styles.cardContainer}>
                        {cardsView}
                        {isOver && canDrop &&
                            <div class={styles.emptyCard} />}
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
            {cardDetailView}
        </figure>
    );
};
