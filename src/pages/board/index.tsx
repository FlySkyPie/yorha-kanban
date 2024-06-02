import { useNavigate, useParams } from "react-router-dom";

import { ListColumn } from "./components/list-column";
import styles from './styles.module.scss';

export const Board: React.FC = () => {
    const navigate = useNavigate();
    const { boardCode } = useParams();

    return (
        <div class={styles.root}>
            <div class={styles.container}>
                <header>
                    <h1>Board ({boardCode})</h1>
                </header>
                <main class={styles.main}>
                    <section class={styles.section}>
                        <ListColumn name="Todo" />
                        <ListColumn name="In Progress" />
                        <ListColumn name="Done" />
                    </section>
                </main>
                <nav>
                    <div>Kanban of "PLACEHOLDER"</div>
                    <div>
                        <button
                            type="button"
                            onClick={() => navigate(`/`)}
                        >
                            Back to Board List
                        </button>
                    </div>
                </nav>
            </div>
            {/* {dialogView} */}
        </div>
    );
}