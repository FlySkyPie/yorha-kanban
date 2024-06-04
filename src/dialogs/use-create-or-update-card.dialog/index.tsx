import { useCallback, useMemo, useState } from 'preact/hooks';
import { nanoid } from 'nanoid';

import type { ICard } from '../../interfaces/card';

import { Content } from './content';
import styles from './styles.module.scss';

type IValue = Pick<ICard, 'title' | 'content'>

type IResult = { type: 'done', value: IValue } | { type: 'close' };

type IDialogSession = {
    sessionId: string;
    prevValue?: IValue;
    resolve: (value: IResult) => void;
}

export const useCreateOrUpdateCardDialog = () => {
    const [session, setSession] = useState<IDialogSession>();
    const [element, setElement] = useState<HTMLDialogElement | null>(null);

    const handleClose = useCallback(() => {
        if (!session || !element) {
            return;
        }
        session.resolve({ type: 'close' });
        element.close();
    }, [element, session]);

    const handleSubmit = useCallback((value: IValue) => {
        if (!session || !element) {
            return;
        }
        session.resolve({ type: 'done', value });
        element.close();
    }, [element, session]);

    const openDialog = useCallback((prevValue?: IValue) => new Promise<IResult>((resolve, reject) => {
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
