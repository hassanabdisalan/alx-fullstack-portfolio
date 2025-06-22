import { BusinnessLeadStage } from "../state/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import React, { useState } from "react";
import { AddBusinassLead } from "../dialogs/business-lead/AddBusinassLead";
import { KanbanLeadsStageColum } from "./KanbanLeadsStageColum";
import { getTextColorFromHex } from "@/utils/color";
import { AddLeadStageColumnDialog } from "../dialogs/stages-columns/AddLeadStageColumnDialog";

interface NewKanbanColumnProps {
  column: BusinnessLeadStage;
  columnIdx: number;
  islastColumn?: boolean;
  updateColumn: (
    consoles: BusinnessLeadStage,
    onSuccess?: () => void,
  ) => React.ReactNode;
  deleteColumn: (
    consoles: BusinnessLeadStage,
    onSuccess?: () => void,
  ) => React.ReactNode;
}

export function NewKanbanColumn({
  column,
  columnIdx,
  islastColumn,
  updateColumn,
  deleteColumn,
}: NewKanbanColumnProps) {
  const [isAddStageOpen, setIsAddStaggeOpen] = useState(false);
  // const [isDeleteDialogOpen, setDeleteDialog] = useState(false);
  const [open, setOpen] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: column.id as string,
      disabled: true,
      data: {
        type: "kanban-column",
        columnId: column.id,
        currentStage: column.id,
        columnName: column.name,
        leadId: -1,
      },
    });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  if (!column || !column.id) {
    return null; // or handle the case where column.id is not defined
  }
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="mr-10 flex min-w-[290px] flex-1 flex-col gap-3"
    >
      <div className="relative flex w-full items-center justify-center gap-2">
        <div
          className="flex h-10 w-full items-center justify-between pr-2 pl-4"
          style={{
            backgroundColor: `${column.color}`,
            color: getTextColorFromHex(column.color),
            clipPath:
              "polygon(0 0, calc(100% - 15px) 0, 100% 50%, calc(100% - 15px) 100%, 0 100%)",
          }}
        >
          <div className="flex items-center max-w-[60%]">
            <span className="font-medium  truncate">{column.name}</span>
            <span className="ml-2 text-sm opacity-90">
              {/* {column.id} */}
            </span>
          </div>
          <div
            onPointerDown={(e) => e.stopPropagation()}
            className="flex items-center gap-1"
            data-no-dnd="true"
          >
            <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:text-primary/70 h-8 w-8 p-0"
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="bg-primary text-primary-foreground gap-2"
              >
                {updateColumn && updateColumn(column, () => setOpen(false))}
                <div className="h-[1px] w-full bg-white" />
                {deleteColumn && deleteColumn(column, () => setOpen(false))}
              </DropdownMenuContent>
            </DropdownMenu>
            <AddBusinassLead stageId={parseInt(column.id)} />
          </div>
        </div>
        {!islastColumn && (
          <div
            onPointerDown={(e) => {
              e.stopPropagation();
              setIsAddStaggeOpen(true);
              console.log("Add new stage clicked");
            }}
            className="absolute -right-12"
          >
            <AddLeadStageColumnDialog
              open={isAddStageOpen}
              columnIdx={columnIdx+1}
              setOpen={setIsAddStaggeOpen}
            />
          </div>
        )}
      </div>
      {column?.id && <KanbanLeadsStageColum stageId={parseInt(column.id)} stageName={column.name??""} />}
    </div>
  );
}
