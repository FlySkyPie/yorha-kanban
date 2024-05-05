import clsx from "clsx";
import { useState } from "preact/hooks";

import yorha from "../styles/styles.module.scss";
import { BoardList } from "../pages/board-list";

import styles from "./styles.module.scss";

export function App() {
  const [count, setCount] = useState(0);

  return (
    <div class={clsx(styles.root, yorha.yorha, yorha.background)}>
      <BoardList />
    </div>
  );
}
