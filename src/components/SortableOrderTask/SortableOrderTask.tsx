import React, { useState, useCallback, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { SortableItem } from './SortableItem/SortableItem';
import { QuestTask } from "entities";
import styles from "./SortableOrderTask.module.scss"

interface SortableOrderTaskProps {
  quest: QuestTask;
  inputValues: { [key: number]: string };
  setInputValues: React.Dispatch<React.SetStateAction<{ [key: number]: string }>>;
  handleSubmit: (questId: number) => void;
}

const SortableOrderTask: React.FC<SortableOrderTaskProps> = ({
  quest,
  inputValues,
  setInputValues,
  handleSubmit,
}) => {
  const [orderOptions, setOrderOptions] = useState(quest.orderOptions || []);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (active.id !== over?.id) {
        setOrderOptions((prevOptions) => {
          const oldIndex = prevOptions.findIndex((option) => option.id.toString() === active.id.toString());
          const newIndex = prevOptions.findIndex((option) => option.id.toString() === over?.id.toString());
          const updatedOptions = arrayMove(prevOptions, oldIndex, newIndex);
          return updatedOptions;
        });
      }
    },
    []
  );

  useEffect(() => {
    const updatedOrder = orderOptions.map(option => option.id);
    setInputValues((prevValues) => ({
      ...prevValues,
      [quest.id]: updatedOrder.join(","),
    }));
  }, [orderOptions, quest.id, setInputValues]);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={orderOptions.map((option) => option.id.toString())}
        strategy={verticalListSortingStrategy}
      >
        <div>
          {orderOptions.map((option) => (
            <SortableItem key={option.id} id={option.id.toString()} value={option.value} />
          ))}
        </div>
      </SortableContext>

      <button className={styles.submitButton} onClick={() => handleSubmit(quest.id)}>
        Отправить
      </button>
    </DndContext>
  );
};

export default SortableOrderTask;
