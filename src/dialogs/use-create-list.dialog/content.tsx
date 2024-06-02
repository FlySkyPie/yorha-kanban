import React, { useState } from "preact/compat";

import styles from './styles.module.scss';

type IProps = {

    onSubmit: (value: string) => void;
    onClose: () => void;
};

export const Content: React.FC<IProps> = ({ onSubmit, onClose }) => {
    const [name, setName] = useState("");

    return (
        <figure>
            <figcaption>
                Create New List
            </figcaption>
            <div class={styles.conent}>
                <p>
                    <label>Name</label>
                    <input
                        style="width:100%;box-sizing: border-box;"
                        type="text"
                        value={name}
                        onInput={({ currentTarget }) => setName(currentTarget.value)}
                    />
                </p>
                <p class={styles.actions}>
                    <button class="button primary" onClick={onClose}>
                        Cancel
                    </button>
                    <button class="button primary" onClick={() => onSubmit(name)}>
                        Create
                    </button>
                </p>
            </div>
        </figure>

    );
};
