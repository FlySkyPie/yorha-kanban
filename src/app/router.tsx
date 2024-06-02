import {
  createBrowserRouter,
} from "react-router-dom";

import { BoardList } from "../pages/board-list";
import { Board } from "../pages/board";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <BoardList />,
  }, {
    path: "/board/:boardCode",
    element: <Board />,
  },
]);