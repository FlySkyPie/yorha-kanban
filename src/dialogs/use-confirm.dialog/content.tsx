import React, { } from "preact/compat";

import styles from './styles.module.scss';

type IProps = {
    title: string;
    description: string;
    actionName: string;

    onSubmit: () => void;
    onClose: () => void;
};

export const Content: React.FC<IProps> = ({
    title, description, actionName, onSubmit, onClose }) => {

    return (
        <figure>
            <figcaption>
                {title}
            </figcaption>
            <div class={styles.conent}>
                <p>
                    {description}
                </p>
                <p class={styles.actions}>
                    <button class="button primary" onClick={onClose}>
                        Cancel
                    </button>
                    <button class="button primary" onClick={onSubmit}>
                        {actionName}
                    </button>
                </p>
            </div>
        </figure>
    );
};
