"use client";

import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { BucketItem, PromptItem } from "@/types";
import {
  ShoppingBag,
  Edit2,
  Trash2,
  ToggleLeft,
  ToggleRight,
  Star,
  StarOff,
} from "lucide-react";

interface BucketPanelProps {
  bucketItems: BucketItem[];
  promptItems: PromptItem[];
  onUpdateItem: (itemId: string, updates: Partial<BucketItem>) => void;
  onRemoveItem: (itemId: string) => void;
  onReorderItems: (newOrder: BucketItem[]) => void;
  onComposePrompt: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

export default function BucketPanel({
  bucketItems,
  promptItems,
  onUpdateItem,
  onRemoveItem,
  onReorderItems,
  onComposePrompt,
  isOpen,
  onToggle,
}: BucketPanelProps) {
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editIntent, setEditIntent] = useState("");

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(bucketItems);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    onReorderItems(items);
  };

  const startEditing = (item: BucketItem) => {
    setEditingItem(item.id);
    setEditIntent(item.intent);
  };

  const saveEdit = (itemId: string) => {
    if (editIntent.trim()) {
      onUpdateItem(itemId, { intent: editIntent.trim() });
    }
    setEditingItem(null);
    setEditIntent("");
  };

  const cancelEdit = () => {
    setEditingItem(null);
    setEditIntent("");
  };

  const getPromptItem = (bucketItem: BucketItem) => {
    return promptItems.find((p) => p.id === bucketItem.id);
  };

  return (
    <>
      {/* Bucket Toggle Button */}
      <button
        onClick={onToggle}
        className="fixed top-6 right-4 z-50 wire-button p-2 flex items-center space-x-2"
        aria-label="Toggle bucket panel"
      >
        <ShoppingBag className="h-5 w-5" />
        {bucketItems.length > 0 && (
          <span className="bg-wire-accent text-wire-bg px-2 py-1 text-xs font-bold rounded-full">
            {bucketItems.length}
          </span>
        )}
      </button>

      {/* Bucket Panel */}
      {isOpen && (
        <div className="fixed top-0 right-0 h-full w-96 bg-wire-bg border-l-2 border-wire-stroke z-40 animate-slide-in">
          <div className="p-4 border-b-2 border-wire-stroke">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-wire-stroke">Bucket</h2>
              <button
                onClick={onToggle}
                className="wire-button p-2"
                aria-label="Close bucket panel"
              >
                ×
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 bucket-panel">
            {bucketItems.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="h-12 w-12 text-wire-stroke/30 mx-auto mb-4" />
                <p className="text-wire-stroke/60 mb-4">
                  Add UI components to start composing
                </p>
                <p className="text-sm text-wire-stroke/40">
                  Click "Add" on any component card to add it to your bucket
                </p>
              </div>
            ) : (
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="bucket">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-3"
                    >
                      {bucketItems.map((item, index) => {
                        const promptItem = getPromptItem(item);
                        if (!promptItem) return null;

                        return (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`wire-card p-3 ${
                                  snapshot.isDragging
                                    ? "rotate-2 scale-105"
                                    : ""
                                } ${!item.enabled ? "opacity-50" : ""}`}
                              >
                                <div className="flex items-start justify-between mb-2">
                                  <div className="flex items-center space-x-2">
                                    <button
                                      onClick={() =>
                                        onUpdateItem(item.id, {
                                          primary: !item.primary,
                                        })
                                      }
                                      className="p-1"
                                      aria-label={
                                        item.primary
                                          ? "Remove primary"
                                          : "Set as primary"
                                      }
                                    >
                                      {item.primary ? (
                                        <Star className="h-4 w-4 text-wire-accent fill-current" />
                                      ) : (
                                        <StarOff className="h-4 w-4 text-wire-stroke/50" />
                                      )}
                                    </button>
                                    <h4 className="font-medium text-wire-stroke">
                                      {promptItem.title}
                                    </h4>
                                  </div>

                                  <div className="flex items-center space-x-1">
                                    <button
                                      onClick={() =>
                                        onUpdateItem(item.id, {
                                          enabled: !item.enabled,
                                        })
                                      }
                                      className="p-1"
                                      aria-label={
                                        item.enabled ? "Disable" : "Enable"
                                      }
                                    >
                                      {item.enabled ? (
                                        <ToggleRight className="h-4 w-4 text-wire-accent" />
                                      ) : (
                                        <ToggleLeft className="h-4 w-4 text-wire-stroke/50" />
                                      )}
                                    </button>
                                    <button
                                      onClick={() => onRemoveItem(item.id)}
                                      className="p-1 text-red-400 hover:text-red-300"
                                      aria-label="Remove item"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </button>
                                  </div>
                                </div>

                                {editingItem === item.id ? (
                                  <div className="space-y-2">
                                    <input
                                      type="text"
                                      value={editIntent}
                                      onChange={(e) =>
                                        setEditIntent(e.target.value)
                                      }
                                      className="wire-input w-full text-sm"
                                      autoFocus
                                    />
                                    <div className="flex space-x-2">
                                      <button
                                        onClick={() => saveEdit(item.id)}
                                        className="wire-button text-xs px-2 py-1"
                                      >
                                        Save
                                      </button>
                                      <button
                                        onClick={cancelEdit}
                                        className="wire-button text-xs px-2 py-1"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <div>
                                    <p className="text-sm text-wire-stroke/80 mb-2">
                                      {item.intent}
                                    </p>
                                    <button
                                      onClick={() => startEditing(item)}
                                      className="flex items-center space-x-1 text-xs text-wire-stroke/60 hover:text-wire-stroke"
                                    >
                                      <Edit2 className="h-3 w-3" />
                                      <span>Edit intent</span>
                                    </button>
                                  </div>
                                )}
                              </div>
                            )}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            )}
          </div>

          {bucketItems.length > 0 && (
            <div className="p-4 border-t-2 border-wire-stroke">
              <button
                onClick={onComposePrompt}
                className="wire-button w-full py-3 text-lg font-semibold"
              >
                Compose Prompt
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
