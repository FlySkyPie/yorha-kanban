import clsx from "clsx";
import { StrictMode } from "preact/compat";
import { RouterProvider, } from "react-router-dom";
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

import yorha from "../styles/styles.module.scss";

import { router } from "./router";
import styles from "./styles.module.scss";

export function App() {
  return (
    <StrictMode>
      <DndProvider backend={HTML5Backend}>
        <div class={clsx(styles.root, yorha.yorha, yorha.background)}>
          <RouterProvider router={router} />
        </div>
      </DndProvider>
    </StrictMode>
  );
}
