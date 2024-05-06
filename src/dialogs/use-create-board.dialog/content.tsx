import React from "preact/compat";

import styles from './styles.module.scss';

type IProps = {
    onClose: () => void;
};

export const Content: React.FC<IProps> = ({ onClose }) => {
    return (
        <figure>
            <figcaption>Create New Board</figcaption>
            <div class={styles.conent}>
                <p>
                    <label >Title</label>
                    <input
                        style="width:100%;box-sizing: border-box;"
                        type="text"
                    />
                </p>

                <p>
                    <label >Description</label>
                    <textarea
                        style="width:100%;box-sizing: border-box;"
                        rows={8}
                    ></textarea>
                </p>

                <button class="button primary" onClick={onClose}>Create</button>
            </div>
        </figure>

    );
};
