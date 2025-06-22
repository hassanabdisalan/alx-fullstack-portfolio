import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { LeadKanbanCard } from "../state/types";
import { valuesCannotBeEmpty } from "@/utils/nullable";
import { CallKanbancardLead } from "../dialogs/CallKanbancardLead";
import { EmailLeadDialog } from "../dialogs/EmailLeadDialog";
import { FaWhatsapp } from "react-icons/fa6";
import { EditBusinessLeadDialog } from "../dialogs/business-lead/EditBusinessLeadDialog";
import { DeleteBusinessLeadDialog } from "../dialogs/business-lead/DeleteBusinessLeadDialog";
import { getUserInitials } from "@/utils/string";

interface KanbanLeadsCardProps {
  card: LeadKanbanCard;
  stageId: number;
  stageName: string; // The name of the stage, if needed for display
  idx?: number; // optional index for additional functionality
}

export function KanbanLeadsCard({ card, stageId, stageName, idx }: KanbanLeadsCardProps) {
  const isDisabled = stageName === "Closed Won"
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    isOver,
  } = useSortable({
    id: card?.id!, // unique identifier
    disabled: isDisabled,
    data: {
      type: "kanban-card",
      
      leadId: card.id,
      currentStage: stageId,
      leadIdx: idx,
      columnName: stageName, // name of the stage for better context
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : isOver ? 0.7 : 1,
    scale: isOver ? "0.9" : "1",
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      data-disabled={isDisabled}
      className="group border-muted w-full cursor-grab border py-2 transition-shadow select-none hover:shadow-md active:cursor-grabbing data-[disabled=true]:cursor-not-allowed data-[disabled=true]:brightness-75"
    >
      <CardContent className="flex w-full flex-col gap-4 px-2">
        {/* sales rep section */}
        <div className="flex w-full items-center gap-6">
          <span className="line-clamp-1 text-[11px] font-medium">
            Sales Person
          </span>
          <div className="flex items-center gap-2 text-[13px]">
            {card?.salesRep?.image && (
              <Avatar>
                <AvatarImage src={card?.salesRep?.image} alt="support" />
                <AvatarFallback>
                  {getUserInitials({
                    Fname: card?.salesRep?.Fname,
                    Sname: card?.salesRep?.Sname,
                  })}
                </AvatarFallback>
              </Avatar>
            )}
            <span className="line-clamp-1 text-sm">
              {card?.salesRep?.Fname} {card?.salesRep?.Sname}
            </span>
          </div>
        </div>

        <div className="flex w-full flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="mr-2 text-[13px] font-medium">Name</span>
            <span className="text-[13px]">
              {card.Fname} {card.Sname}
            </span>
            {/* <FaPhoneAlt className=" ml-2 h-4 w-4" /> */}
            {valuesCannotBeEmpty(card.Fname, card.phone) && (
              <CallKanbancardLead
                customerData={{ firstName: card.Fname!, phone: card.phone! }}
              />
            )}
          </div>

          <div
            className="flex w-full items-center justify-between"
            onPointerDown={(e) => e.stopPropagation()}
          >
            <span className="mr-2 text-[13px] font-medium">Expected Rev</span>
            <span className="text-[13px]">{card.revenue}</span>
            {/* <IoMdMail className=" ml-2 h-4 w-4" /> */}
            {card?.email && (
              <EmailLeadDialog
                email={card.email}
                name={`${card.Fname} ${card.Sname}`}
              />
            )}
          </div>

          {card.phone && (
            <div className="flex w-full items-center justify-between">
              <span className="mr-2 text-[13px] font-medium">Source</span>
              <span className="text-[13px]">{card.source}</span>
              <a
                onPointerDown={(e) => e.stopPropagation()}
                className="cursor-pointer"
                href={`https://api.whatsapp.com/send?phone=${card.phone?.replace("+", "")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp className="ml-2 h-4 w-4" />
              </a>
            </div>
          )}

          <div
            className="flex w-full gap-3 px-2 pt-2"
            onPointerDown={(e) => e.stopPropagation()}
          >
            <EditBusinessLeadDialog card={card} currentStageId={stageId} />
            <DeleteBusinessLeadDialog card={card} currentStageId={stageId} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
