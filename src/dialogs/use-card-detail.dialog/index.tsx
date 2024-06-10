import { useCallback, useMemo, useState } from 'preact/hooks';
import { nanoid } from 'nanoid';

import type { ICard } from '../../interfaces/card';

import { Content } from './content';
import styles from './styles.module.scss';

type IResult = { type: 'edit' } | { type: 'close' };

type IDialogSession = {
    sessionId: string;
    value?: ICard;
    resolve: (value: IResult) => void;
}

export const useCardDetailDialog = () => {
    const [session, setSession] = useState<IDialogSession>();
    const [element, setElement] = useState<HTMLDialogElement | null>(null);

    const handleClose = useCallback(() => {
        if (!session || !element) {
            return;
        }
        session.resolve({ type: 'close' });
        element.close();
    }, [element, session]);

    const handleEdit = useCallback(() => {
        if (!session || !element) {
            return;
        }
        session.resolve({ type: 'edit' });
        element.close();
    }, [element, session]);

    const openDialog = useCallback((value: ICard) => new Promise<IResult>((resolve, reject) => {
        if (!element) {
            reject("No HTMLDialogElement found");
            return;
        }
        element.showModal();
        setSession({ resolve, value, sessionId: nanoid() });
    }), [element]);

    const dialogView = useMemo(() => {
        return (
            <dialog ref={setElement} class={styles.styledModal}>
                {session && session.value &&
                    <Content
                        key={session.sessionId}
                        value={session.value}
                        onEdit={handleEdit}
                        onClose={handleClose} />}
            </dialog>
        );
    }, [handleClose, session]);

    return { openDialog, dialogView };
};
