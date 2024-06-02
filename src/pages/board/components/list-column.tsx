
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

    return (
        <figure class={styles.root}>
            <figcaption>
                {name}
            </figcaption>
            <div class={styles.boardCardContent}>
                <div class={styles.content}>
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
            </div>
        </figure>
    );
};
