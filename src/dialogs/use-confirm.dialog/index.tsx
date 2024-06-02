import { useCallback, useMemo, useState } from 'preact/hooks';
import { nanoid } from 'nanoid';

import { Content } from './content';
import styles from './styles.module.scss';

type IResult = { type: 'confirm', } | { type: 'close' };

type IDialogSession = {
    payload: {
        title: string;
        description: string;
        actionName: string;
    };
    sessionId: string;
    resolve: (value: IResult) => void;
}

export const useConfirmDialog = () => {
    const [session, setSession] = useState<IDialogSession>();
    const [element, setElement] = useState<HTMLDialogElement | null>(null);

    const handleClose = useCallback(() => {
        if (!session || !element) {
            return;
        }
        session.resolve({ type: 'close' });
        element.close();
    }, [element, session]);

    const handleSubmit = useCallback(() => {
        if (!session || !element) {
            return;
        }
        session.resolve({ type: 'confirm', });
        element.close();
    }, [element, session]);

    const openDialog = useCallback((title: string, description: string, actionName: string) =>
        new Promise<IResult>((resolve, reject) => {
            if (!element) {
                reject("No HTMLDialogElement found");
                return;
            }
            element.showModal();
            setSession({
                resolve,
                payload: {
                    title, description, actionName,
                },
                sessionId: nanoid()
            });
        }), [element]);

    const dialogView = useMemo(() => {
        return (
            <dialog ref={setElement} class={styles.styledModal}>
                {session &&
                    <Content
                        key={session.sessionId}
                        title={session.payload.title}
                        description={session.payload.description}
                        actionName={session.payload.actionName}
                        onSubmit={handleSubmit}
                        onClose={handleClose} />}
            </dialog>
        );
    }, [handleClose, handleSubmit, session]);

    return { openDialog, dialogView };
};
