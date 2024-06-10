import React, { } from "preact/compat";
import Markdown from 'marked-react';

import type { ICard } from "../../interfaces/card";

import styles from './styles.module.scss';

type IProps = {
    value: ICard;

    onEdit: () => void;
    onClose: () => void;
};

export const Content: React.FC<IProps> = ({ value, onEdit, onClose }) => {
    return (
        <figure class={styles.root}>
            <figcaption>{value.title}</figcaption>
            <div class={styles.container}>
                <div class={styles.sideBar}>
                    <button class="button primary" disabled>
                        Members
                    </button>
                    <button class="button primary" disabled>
                        Labels
                    </button>
                    <button class="button primary" disabled>
                        Checklist
                    </button>
                    <button class="button primary" disabled>
                        Dates
                    </button>
                    <button class="button primary" disabled>
                        Attachment
                    </button>
                    <button class="button primary" disabled>
                        Cover
                    </button>
                    <button class="button primary" onClick={onEdit}>
                        Edit
                    </button>
                    <button class="button primary" disabled>
                        Archive
                    </button>
                    <button class="button primary" onClick={onClose}>
                        Close
                    </button>
                </div>
                <p class={styles.content}>
                    <Markdown>
                        {value.content}
                    </Markdown>
                </p>
            </div>
        </figure>

    );
};
