import React, { useState, useCallback, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { SortableItem } from './SortableItem/SortableItem';
import { QuestTask } from "entities"; // Если у вас есть интерфейс QuestTask

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
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = useCallback(
    (event: { active: { id: string }; over: { id: string } }) => {
      const { active, over } = event;
      if (active.id !== over.id) {
        setOrderOptions((prevOptions) => {
          const oldIndex = prevOptions.findIndex((option) => option.id.toString() === active.id);
          const newIndex = prevOptions.findIndex((option) => option.id.toString() === over.id);
          const updatedOptions = arrayMove(prevOptions, oldIndex, newIndex);
          return updatedOptions;
        });
      }
    },
    []
  );

  useEffect(() => {
    // Обновляем inputValues при изменении порядка
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

      <button
        onClick={() => handleSubmit(quest.id)}
      >
        Отправить
      </button>
    </DndContext>
  );
};

export default SortableOrderTask;
