import { useCallback, useMemo, useState } from 'preact/hooks';
import { nanoid } from 'nanoid';

import { Content } from './content';
import styles from './styles.module.scss';

type IResult = { type: 'done', value: string } | { type: 'close' } | { type: 'delete' };

type IDialogSession = {
    prevName: string;
    sessionId: string;
    resolve: (value: IResult) => void;
}

export const useEditListDialog = () => {
    const [session, setSession] = useState<IDialogSession>();
    const [element, setElement] = useState<HTMLDialogElement | null>(null);

    const handleClose = useCallback(() => {
        if (!session || !element) {
            return;
        }
        session.resolve({ type: 'close' });
        element.close();
    }, [element, session]);

    const handleDelete = useCallback(() => {
        if (!session || !element) {
            return;
        }
        session.resolve({ type: 'delete' });
        element.close();
    }, [element, session]);

    const handleSubmit = useCallback((value: string) => {
        if (!session || !element) {
            return;
        }
        session.resolve({ type: 'done', value });
        element.close();
    }, [element, session]);

    const openDialog = useCallback((prevName: string) => new Promise<IResult>((resolve, reject) => {
        if (!element) {
            reject("No HTMLDialogElement found");
            return;
        }
        element.showModal();
        setSession({ resolve, prevName, sessionId: nanoid() });
    }), [element]);

    const dialogView = useMemo(() => {
        return (
            <dialog ref={setElement} class={styles.styledModal}>
                {session &&
                    <Content
                        key={session.sessionId}
                        prevName={session.prevName}
                        onSubmit={handleSubmit}
                        onDelete={handleDelete}
                        onClose={handleClose} />}
            </dialog>
        );
    }, [handleClose, handleDelete, handleSubmit, session]);

    return { openDialog, dialogView };
};
