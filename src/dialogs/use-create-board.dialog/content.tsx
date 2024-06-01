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
                    <label >Name</label>
                    <input
                        style="width:100%;box-sizing: border-box;"
                        type="text"
                    />
                </p>
                <p>
                    <label >Code</label>
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
                <p class={styles.actions}>
                    <button class="button primary" onClick={onClose}>Cancel</button>
                    <button class="button primary" onClick={onClose}>Create</button>
                </p>
            </div>
        </figure>

    );
};
