import clsx from "clsx";
import { RouterProvider, } from "react-router-dom";

import yorha from "../styles/styles.module.scss";

import { router } from "./router";
import styles from "./styles.module.scss";

export function App() {
  return (
    <div class={clsx(styles.root, yorha.yorha, yorha.background)}>
      <RouterProvider router={router} />
    </div>
  );
}
