import React, { useMemo, useState } from "preact/compat";

import type { ICard } from "../../interfaces/card";

import styles from './styles.module.scss';

type IValue = Pick<ICard, 'title' | 'content'>;

type IProps = {
    prevValue?: IValue;

    onSubmit: (value: IValue) => void;
    onClose: () => void;
};

export const Content: React.FC<IProps> = ({ prevValue, onSubmit, onClose }) => {
    const [values, setValues] = useState<IValue>(() =>
        prevValue ?? ({ title: "", content: "" }));

    const title = useMemo(() => {
        if (prevValue) {
            return "Edit Card";
        }
        return "Create New Card";
    }, [prevValue]);

    return (
        <figure>
            <figcaption>{title}</figcaption>
            <div class={styles.conent}>
                <p>
                    <label>Title</label>
                    <input
                        style="width:100%;box-sizing: border-box;"
                        type="text"
                        value={values.title}
                        onInput={({ currentTarget }) =>
                            setValues(prev => ({ ...prev, title: currentTarget.value }))}
                    />
                </p>
                <p>
                    <label >Content</label>
                    <textarea
                        style="width:100%;box-sizing: border-box;"
                        rows={8}
                        value={values.content}
                        onInput={({ currentTarget }) =>
                            setValues(prev => ({ ...prev, content: currentTarget.value }))}
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
