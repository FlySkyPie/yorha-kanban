
import styles from "./styles.module.scss";

type IProps = {
    name: string
};

export const ListColumn: React.FC<IProps> = ({ name }) => {

    return (
        <figure class={styles.root}>
            <figcaption>
                {name}
            </figcaption>
            <div class={styles.boardCardContent}>
                <div class={styles.content}>
                    <p class={styles.actions}>
                        <button type="button" >
                            Add a card
                        </button>
                        <button type="button" >
                            Edit list
                        </button>
                    </p>
                </div>
            </div>
        </figure>
    );
}