import { useCallback, useMemo, useState } from 'preact/hooks';
import { nanoid } from 'nanoid';

import type { IBoard } from '../../interfaces/boards';

import { Content } from './content';
import styles from './styles.module.scss';

type IResult = { type: 'done', value: Omit<IBoard, 'id'> } | { type: 'close' };

type IDialogSession = {
    sessionId: string;
    prevValue?: Omit<IBoard, "id">;
    resolve: (value: IResult) => void;
}

export const useCreateOrUpdateBoardDialog = () => {
    const [session, setSession] = useState<IDialogSession>();
    const [element, setElement] = useState<HTMLDialogElement | null>(null);

    const handleClose = useCallback(() => {
        if (!session || !element) {
            return;
        }
        session.resolve({ type: 'close' });
        element.close();
    }, [element, session]);

    const handleSubmit = useCallback((value: Omit<IBoard, 'id'>) => {
        if (!session || !element) {
            return;
        }
        session.resolve({ type: 'done', value });
        element.close();
    }, [element, session]);

    const openDialog = useCallback((prevValue?: Omit<IBoard, 'id'>) => new Promise<IResult>((resolve, reject) => {
        if (!element) {
            reject("No HTMLDialogElement found");
            return;
        }
        element.showModal();
        setSession({ resolve, prevValue, sessionId: nanoid() });
    }), [element]);

    const dialogView = useMemo(() => {
        return (
            <dialog ref={setElement} class={styles.styledModal}>
                {session &&
                    <Content
                        key={session.sessionId}
                        prevValue={session.prevValue}
                        onSubmit={handleSubmit}
                        onClose={handleClose} />}
            </dialog>
        );
    }, [handleClose, handleSubmit, session]);

    return { openDialog, dialogView };
};
