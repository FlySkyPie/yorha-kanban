import {
  createBrowserRouter,
} from "react-router-dom";

import { BoardList } from "../pages/board-list";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <BoardList />,
  },
  {
    path: "about",
    element: <div>About</div>,
  },
]);