import { useDrag } from 'react-dnd'

import type { IDragItem, IDropItem } from '../../../interfaces/dnd';
import { ItemTypes } from '../../../constants';

import styles from "./styles.module.scss";

type IProps = {
    title: string;

    onClick: () => void;
    onMove: (listId: number) => void;
};

export const Card: React.FC<IProps> = ({ title, onClick, onMove }) => {
    const [{ isDragging }, dragRef] = useDrag<IDragItem, IDropItem, any>(() => ({
        type: ItemTypes.BOX,
        end: (_, monitor) => {
            const dropResult = monitor.getDropResult();
            if (!dropResult) {
                return;
            }

            onMove(dropResult.listId);
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }))

    const opacity = isDragging ? 0.4 : 1;

    return (
        <div
            ref={dragRef}
            class={styles.card}
            style={{ opacity }}
            onClick={onClick}>
            {title}
        </div>
    );
};
