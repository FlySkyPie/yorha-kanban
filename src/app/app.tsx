import clsx from "clsx";
import { useState } from "preact/hooks";

import yorha from "../styles/styles.module.scss";

import styles from "./styles.module.scss";

export function App() {
  const [count, setCount] = useState(0);

  return (
    <div class={clsx(styles.root, yorha.yorha, yorha.background)}>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          {/* <img src={viteLogo} class="logo" alt="Vite logo" /> */}
        </a>
        <a href="https://preactjs.com" target="_blank">
          {/* <img src={preactLogo} class="logo preact" alt="Preact logo" /> */}
        </a>
      </div>
      <h1>Vite + Preact</h1>
      <div class="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/app.tsx</code> and save to test HMR
        </p>
      </div>
      <p class="read-the-docs">
        Click on the Vite and Preact logos to learn more
      </p>
    </div>
  );
}
