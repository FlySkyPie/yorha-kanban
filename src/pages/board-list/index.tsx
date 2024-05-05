import { useMemo } from "preact/hooks";
import styles from "./styles.module.scss";

export const BoardList = () => {
    const fakeList = useMemo(() =>
        Array.from({ length: 10 }).map((_, i) =>
            <figure key={i}>
                <figcaption>Bare Fists</figcaption>
                <div>
                    <p>Unarmed.</p>
                    <hr />
                    <p>Attack: 0 - 0</p>
                    <p>Combo: Lt 0 Hv 0</p>
                    <ul>
                        <li>-</li>
                        <li>-</li>
                    </ul>
                </div>
            </figure>), []);
    return (
        <div class={styles.root}>
            <div class={styles.container}>
                <header>
                    <h1>Boards</h1>
                </header>
                <main class={styles.main}>
                    <section>
                        <figure>
                            <figcaption>
                                Board Name
                            </figcaption>
                            <div class={styles.boardCardContent}>
                                <aside class={styles.imagePlaceholder} />
                                <div>
                                    <p>Unarmed.</p>
                                    <hr />
                                    <p>Attack: 0 - 0</p>
                                    <p>Combo: Lt 0 Hv 0</p>
                                    <ul>
                                        <li>-</li>
                                        <li>-</li>
                                    </ul>
                                </div>
                            </div>
                        </figure>
                        {fakeList}
                    </section>
                </main>
                <nav>
                    <div>List of Kanban Boards</div>
                    <div><kbd>A</kbd> Move</div>
                    <div><kbd>S</kbd> Rotate</div>
                    <div><kbd>D</kbd> Reset Position</div>
                    <div><kbd>Page Up</kbd> Zoom In</div>
                    <div><kbd>Page Down</kbd> Zoom Out</div>
                    <div><kbd>Enter</kbd> Place Marker</div>
                    <div><kbd>Ecs</kbd> Back</div>
                </nav>
            </div>
        </div>
    );
};
