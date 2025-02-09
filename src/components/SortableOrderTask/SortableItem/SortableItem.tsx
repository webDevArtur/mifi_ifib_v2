import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface SortableItemProps {
  id: string;
  value: string;
}

export function SortableItem({ id, value }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    border: '1px solid #ccc',
    padding: '10px',
    margin: '5px',
    backgroundColor: isDragging ? '#f0f0f0' : 'white',
    cursor: 'move',
    boxShadow: isDragging ? '0 4px 8px rgba(0, 0, 0, 0.1)' : 'none',
    opacity: isDragging ? 0.8 : 1,
    borderRadius: '4px',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {value}
    </div>
  );
}
