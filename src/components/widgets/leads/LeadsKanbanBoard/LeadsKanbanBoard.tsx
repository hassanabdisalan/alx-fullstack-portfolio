import {
  closestCorners,
  DndContext,
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import { BusinnessLeadStage } from "./state/types";
import {
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import React, { forwardRef, useState } from "react";
import { NewKanbanColumn } from "./kanban-column/KanbanColumn";
import { MOVE_LEAD_TO_STAGE } from "@/graphql/business-leads";
import { useMutation } from "@apollo/client";
import {
  handleLeadDragEndCacheUpdate,
  handleLeadDragEndfailureCacheUpdate,
} from "./utils/lead-cache-manipulation";
import { toast } from "sonner";
import { UpdateLeadStageColumnDialog } from "./dialogs/stages-columns/UpdateLeadStageColumnDialog";
import { DeleteLeadStageColumnDialog } from "./dialogs/stages-columns/DeleteLeadStageColumnDialog";

import {
  UpdateLeadToCustomer,
  UpdateLeadToLostCustomer,
} from "./dialogs/business-lead/UpdateLeadToCustomer";
import { invalidateLeadsCache } from "./utils/cache-stuff";

interface LeadsKanbanBoardProps {
  columns: BusinnessLeadStage[];
}
interface UpdateLeadStagePayload {
  activeLeadId: number;
  activeLeadIdx: number;
  overLeadIdx: number;
  oldStageInt: number;
  newStageInt: number;
}

export function LeadsKanbanBoard({ columns }: LeadsKanbanBoardProps) {
  const [updateLeadPayload, setUpdateLeadPayload] =
    useState<UpdateLeadStagePayload>({
      activeLeadId: -1,
      activeLeadIdx: -1,
      overLeadIdx: -1,
      oldStageInt: -1,
      newStageInt: -1,
    });

  const [customerConversionIsOpen, setCustomerConversionIsOpen] =
    useState(false);
  const [lostLeadsOpen, setLostLeadsOpen] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [dropZoneRect, setDropZoneRect] = useState<
    { top: string; left: string } | undefined
  >(undefined);
  const filterredColuns = columns
    .filter((col) => col.id && col.id !== null)
    .sort((a, b) => {
      if (!a?.position || !b?.position) {
        return 0;
      }
      return a.position - b.position;
    });

  // Custom sensor to prevent dragging from restricted stages
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Require 8px of movement before starting drag
      },
    }),
  );

  const [moveLead] = useMutation(MOVE_LEAD_TO_STAGE);
  function updateLeadStage({
    activeLeadId,
    activeLeadIdx,
    overLeadIdx,
    oldStageInt,
    newStageInt,
  }: UpdateLeadStagePayload) {
    handleLeadDragEndCacheUpdate({
      activeLeadId,
      oldStageId: oldStageInt,
      overLeadIdx,
      newStageId: newStageInt,
    });
    return moveLead({
      variables: {
        leadId: activeLeadId,
        stageId: newStageInt,
      },
      onCompleted(data) {
        if (data?.moveLead?.status !== "Success") {
          toast.error(data?.moveLead?.message || "Failed to update lead");
          handleLeadDragEndfailureCacheUpdate({
            activeLeadId,
            activeLeadIdx,
            oldStageId: oldStageInt,
            newStageId: newStageInt,
          });
        }
      },
      refetchQueries: (result) => {
        const updatedStageId = result?.data?.moveLead?.lead;
        if (updatedStageId) {
          return invalidateLeadsCache();
        }
        return [];
      },

      onError() {
        toast.error("Failed to update lead stage");
        handleLeadDragEndfailureCacheUpdate({
          activeLeadId,
          activeLeadIdx,
          oldStageId: oldStageInt,
          newStageId: newStageInt,
        });
      },
    });
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      {" "}
      <UpdateLeadToCustomer
        open={customerConversionIsOpen}
        onOpenChange={setCustomerConversionIsOpen}
        updateLead={() => {
          return updateLeadStage({
            activeLeadId: updateLeadPayload.activeLeadId,
            activeLeadIdx: updateLeadPayload.activeLeadIdx,
            overLeadIdx: updateLeadPayload.overLeadIdx,
            oldStageInt: updateLeadPayload.oldStageInt,
            newStageInt: updateLeadPayload.newStageInt,
          });
        }}
      />{" "}
      <UpdateLeadToLostCustomer
        updateLead={() => {
          return updateLeadStage({
            activeLeadId: updateLeadPayload.activeLeadId,
            activeLeadIdx: updateLeadPayload.activeLeadIdx,
            overLeadIdx: updateLeadPayload.overLeadIdx,
            oldStageInt: updateLeadPayload.oldStageInt,
            newStageInt: updateLeadPayload.newStageInt,
          });
        }}
        open={lostLeadsOpen}
        onOpenChange={setLostLeadsOpen}
      />{" "}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={(e) => {
          const activeStage = e.active.data.current?.currentStage as string;
          const oldStageName = e.active.data.current?.columnName as string;
          if (!activeStage) {
            return;
          }
          const activeLeadId = e.active.data.current?.leadId as number;
          if (!activeLeadId) {
            return;
          }
          // Check if trying to drag from restricted stages - prevent drag entirely
          if (oldStageName === "Closed Won") {
            toast.error("You cannot move leads from Closed stages.");
            // Don't set activeCard, this prevents the drag from continuing
            return;
          }

          setActiveCard(activeLeadId);
        }}
        onDragCancel={() => {
          setActiveCard(null);
          requestAnimationFrame(() => setDropZoneRect(undefined));
        }}
        onDragEnd={(e) => {
          const oldStage = e.active.data.current?.currentStage as string;
          const newStage = e.over?.data.current?.currentStage as string;
          const oldStageName = e.active.data.current?.columnName as string;
          const newStageName = e.over?.data.current?.columnName as string;
          // const overLeadId = e.over?.data.current?.leadId as number;
          const overLeadIdx = e.over?.data.current?.leadIdx as number;
          const activeLeadId = e.active.data.current?.leadId as number;
          const activeLeadIdx = e.active.data.current?.leadIdx as number;

          const oldStageInt = parseInt(oldStage);
          const newStageInt = parseInt(newStage);
          setUpdateLeadPayload({
            activeLeadId,
            activeLeadIdx,
            overLeadIdx,
            oldStageInt,
            newStageInt,
          });

          if (e.over?.id) {
            setDropZoneRect({
              top: `${e.over.rect.top}px`,
              left: `${e.over.rect.left}px`,
            });
          }

          if (newStageName === "Closed Won" && oldStageName !== "Closed Won") {
            setCustomerConversionIsOpen(true);
            setActiveCard(null);
            requestAnimationFrame(() => setDropZoneRect(undefined));
            return;
          }

          if (!oldStage || !newStage || !activeLeadId) {
            setActiveCard(null);
            requestAnimationFrame(() => setDropZoneRect(undefined));
            return;
          }

          if (oldStage === newStage) {
            setActiveCard(null);
            requestAnimationFrame(() => setDropZoneRect(undefined));
            return;
          }
          updateLeadStage({
            activeLeadId,
            activeLeadIdx,
            overLeadIdx,
            oldStageInt,
            newStageInt,
          });
          setActiveCard(null);
          requestAnimationFrame(() => setDropZoneRect(undefined));
        }}
      >
        <div className="flex w-full max-w-[90vw] items-start gap-8 overflow-y-hidden p-4">
          <SortableContext
            items={filterredColuns.map((col) => col.id as string)}
            strategy={horizontalListSortingStrategy}
          >
            {filterredColuns.map((column, index) => {
              return (
                <React.Fragment key={column.id}>
                  <NewKanbanColumn
                    column={column}
                    columnIdx={index}
                    islastColumn={index >= filterredColuns.length - 1}
                    updateColumn={(col, onSuccess) => {
                      return (
                        <UpdateLeadStageColumnDialog
                          column={col}
                          onSuccess={onSuccess}
                        />
                      );
                    }}
                    deleteColumn={(col, onSuccess) => {
                      return (
                        <DeleteLeadStageColumnDialog
                          column={col}
                          onSuccess={onSuccess}
                        />
                      );
                    }}
                  />
                  {/* {index === columns.length - 2 && <AddLeadStageColumnDialog />} */}
                </React.Fragment>
              );
            })}
          </SortableContext>
        </div>

        <DragOverlay
          dropAnimation={{
            keyframes: (resolver) => {
              return [
                {
                  transform: `translate3d(${resolver.transform.initial.x}px, ${resolver.transform.initial.y}px, 0)`,
                },
                {
                  ...(dropZoneRect
                    ? { position: "fixed", top: "0", left: "0" }
                    : {}),
                  transform: dropZoneRect
                    ? `translate3d(${dropZoneRect.left}, ${dropZoneRect.top}, 0)`
                    : `translate3d(${resolver.transform.final.x}px, ${resolver.transform.final.y}px, 0)`,
                },
              ];
            },
          }}
        >
          {activeCard && <DragOverlayComponent leadId={activeCard} />}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

interface DragOverlayProps {
  leadId: number;
}

const DragOverlayComponent = forwardRef<HTMLDivElement, DragOverlayProps>(
  ({ leadId, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className="bg-card border-border w-64 rounded-md border p-4 opacity-50 shadow-md"
        {...props}
      >
        {import.meta.env.DEV && (
          <div className="text-sm font-medium">Lead ID: {leadId}</div>
        )}
        <div className="bg-muted/30 mt-2 h-12 w-full rounded-sm"></div>
        <div className="bg-muted/30 mt-2 h-8 w-3/4 rounded-sm"></div>
      </div>
    );
  },
);

DragOverlayComponent.displayName = "DragOverlayComponent";
