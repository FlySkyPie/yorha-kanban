import { useCallback, useMemo, useState } from 'preact/hooks';
import { nanoid } from 'nanoid';

import type { IBoard } from '../../interfaces/boards';

import { Content } from './content';
import styles from './styles.module.scss';

type IResult = { type: 'done', value: Omit<IBoard, 'id'> } | { type: 'close' };

type IDialogSession = {
    sessionId: string;
    resolve: (value: IResult) => void;
}

export const useCreateBoardDialog = () => {
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

    const openDialog = useCallback(() => new Promise<IResult>((resolve, reject) => {
        if (!element) {
            reject("No HTMLDialogElement found");
            return;
        }
        element.showModal();
        setSession({ resolve, sessionId: nanoid() });
    }), [element]);

    const dialogView = useMemo(() => {
        return (
            <dialog ref={setElement} class={styles.styledModal}>
                <Content
                    onSubmit={handleSubmit}
                    onClose={handleClose} />
            </dialog>
        );
    }, [handleClose, handleSubmit]);

    return { openDialog, dialogView };
};
