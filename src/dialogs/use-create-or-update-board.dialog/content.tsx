import React, { useMemo, useState } from "preact/compat";

import type { IBoard } from "../../interfaces/boards";

import styles from './styles.module.scss';

type IProps = {
    prevValue?: Omit<IBoard, "id">;

    onSubmit: (value: Omit<IBoard, 'id'>) => void;
    onClose: () => void;
};

export const Content: React.FC<IProps> = ({ prevValue, onSubmit, onClose }) => {
    const [values, setValues] = useState<Omit<IBoard, 'id'>>(() =>
        prevValue ?? ({ code: "", description: "", name: "" }));

    const title = useMemo(() => {
        if (prevValue) {
            return "Edit Board";
        }
        return "Create New Board";
    }, [prevValue]);

    return (
        <figure>
            <figcaption>{title}</figcaption>
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
                        {prevValue ?
                            "Update" :
                            "Create"}
                    </button>
                </p>
            </div>
        </figure>

    );
};
