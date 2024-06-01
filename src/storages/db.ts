import type { Table } from "dexie";
import Dexie from "dexie";

import type { IBoard } from "../interfaces/boards";
import type { IList } from "../interfaces/list";
import type { ICard } from "../interfaces/card";
import { databaseName } from "../constants";

export class DexieDatabase extends Dexie {
    boards!: Table<IBoard>;

    lists!: Table<IList>;

    cards!: Table<ICard>;

    constructor() {
        super(databaseName);
        this.version(1).stores({
            boards: "id, code", // Primary key and indexed props
        });
    }
}

export const db = new DexieDatabase();
