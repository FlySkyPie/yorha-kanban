import React from "preact/compat";

import styles from "./styles.module.scss";

type IProps = {
    onClick?: () => void;
};

export const EmptyBoardCard: React.FC<IProps> = ({ onClick }) => {
    return (
        <figure class={styles.empty}>
            <figcaption>
                NO DATA
            </figcaption>
            <div class={styles.boardCardContent}>
                <aside class={styles.imagePlaceholder} />
                <div class={styles.content}>
                    <p>
                        There's no Kanban Board available at the moment.
                    </p>
                    <p>
                        <button type="button" style="width:100%;" onClick={onClick}>
                            Create New Board
                        </button>
                    </p>
                </div>
            </div>
        </figure>
    );
}

type IBoardCardProps = {
    title: string;
    children?: React.ReactNode;

    onEdit?: () => void;
    onView?: () => void;
};

export const BoardCard: React.FC<IBoardCardProps> = ({ title, children, onEdit, onView }) => {
    return (
        <figure >
            <figcaption>
                {title}
            </figcaption>
            <div class={styles.boardCardContent}>
                <aside class={styles.imagePlaceholder} />
                <div class={styles.content}>
                    {children ?? <p>No description.</p>}
                    <p class={styles.actions}>
                        <button type="button" onClick={onEdit}>
                            Edit
                        </button>
                        <button type="button" onClick={onView}>
                            View
                        </button>
                    </p>
                </div>
            </div>
        </figure>
    );
};
