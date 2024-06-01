import React, { useState } from "preact/compat";

import type { IBoard } from "../../interfaces/boards";

import styles from './styles.module.scss';

type IProps = {
    onSubmit: (value: Omit<IBoard, 'id'>) => void;
    onClose: () => void;
};

export const Content: React.FC<IProps> = ({ onSubmit, onClose }) => {
    const [values, setValues] = useState<Omit<IBoard, 'id'>>(() =>
        ({ code: "", description: "", name: "" }));

    return (
        <figure>
            <figcaption>Create New Board</figcaption>
            <div class={styles.conent}>
                <p>
                    <label>Name</label>
                    <input
                        style="width:100%;box-sizing: border-box;"
                        type="text"
                        value={values.name}
                        onInput={(e) => setValues(prev => ({ ...prev, name: e.currentTarget.value }))}
                    />
                </p>
                <p>
                    <label >Code</label>
                    <input
                        style="width:100%;box-sizing: border-box;"
                        type="text"
                        value={values.code}
                        onInput={(e) => setValues(prev => ({ ...prev, code: e.currentTarget.value }))}
                    />
                </p>
                <p>
                    <label >Description</label>
                    <textarea
                        style="width:100%;box-sizing: border-box;"
                        rows={8}
                        value={values.description}
                        onInput={(e) => setValues(prev => ({ ...prev, description: e.currentTarget.value }))}
                    ></textarea>
                </p>
                <p class={styles.actions}>
                    <button class="button primary" onClick={onClose}>
                        Cancel
                    </button>
                    <button class="button primary" onClick={() => onSubmit(values)}>
                        Create
                    </button>
                </p>
            </div>
        </figure>

    );
};
