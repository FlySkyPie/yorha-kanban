
import { useMemo } from "preact/hooks";

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
    name: string;

    onEdit: () => void;
};

export const ListColumn: React.FC<IProps> = ({ name, onEdit }) => {
    const mockCardsView = useMemo(() => Array.from({ length: 20 }).map((_, i) =>
        <div key={i} class={styles.card}>
            Test Card
        </div>), []);

    return (
        <figure class={styles.root}>
            <figcaption>
                {name}
            </figcaption>
            <div class={styles.boardCardContent}>
                <div class={styles.content}>
                    <div class={styles.cardContainer}>
                        {mockCardsView}

                    </div>
                </div>
                <p class={styles.actions}>
                    <button type="button" >
                        Add a card
                    </button>
                    <button
                        type="button"
                        onClick={onEdit}>
                        Edit list
                    </button>
                </p>
            </div>
        </figure>
    );
};
