import React, { useState } from "preact/compat";

import styles from './styles.module.scss';
import { useConfirmDialog } from "../use-confirm.dialog";

type IProps = {
    prevName: string

    onSubmit: (value: string) => void;
    onDelete: () => void;
    onClose: () => void;
};

export const Content: React.FC<IProps> = ({ prevName, onSubmit, onDelete, onClose }) => {
    const { dialogView, openDialog } = useConfirmDialog();
    const [name, setName] = useState(() => prevName);

    return (
        <figure>
            <figcaption>
                Edit List
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
                    <button
                        class="button primary"
                        onClick={async () => {
                            const result = await openDialog(
                                "Warning",
                                "Are you sure going delete the list?",
                                "Delete");
                            if (result.type === 'close') {
                                return;
                            }
                            onDelete();
                        }}>
                        Delete
                    </button>
                </p>
                <p class={styles.actions}>
                    <button class="button primary" onClick={onClose}>
                        Cancel
                    </button>
                    <button class="button primary" onClick={() => onSubmit(name)}>
                        Update
                    </button>
                </p>
            </div>
            {dialogView}
        </figure>
    );
};
