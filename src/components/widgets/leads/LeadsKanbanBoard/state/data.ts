import { UserLeadsQuery } from "@/__generated__/graphql";
// import { faker } from "@faker-js/faker";
import { LeadKanbanColumn } from "./types";

// Source options for leads
// const LEAD_SOURCES = [
//   "Website",
//   "Referral",
//   "Event",
//   "Social Media",
//   "Cold Call",
//   "Email Campaign",
// ];

// // Stage options for leads
// const LEAD_STAGES = ["new", "contacted", "qualified", "proposal", "won", "lost"];

// /**
//  * Generates mock lead data for development and testing
//  * @param count Number of lead records to generate
//  * @returns Array of mock lead data
//  */
// export function generateMockLeads(count = 20): NonNullable<UserLeads> {
//   return Array.from({ length: count }).map(() => {
//     const firstName = faker.person.firstName();
//     const lastName = faker.person.lastName();

//     return {
//       __typename: "Lead",
//       id: faker.string.uuid(),
//       Fname: firstName,
//       Sname: lastName,
//       email: faker.internet.email({ firstName, lastName }),
//       phone: faker.phone.number(),
//       revenue: parseFloat(faker.finance.amount({ min: 1000, max: 50000, dec: 2 })),
//       source: faker.helpers.arrayElement(LEAD_SOURCES),
//       stage: faker.helpers.arrayElement(LEAD_STAGES),
//       salesRep: faker.datatype.boolean(1.0)
//         ? {
//             __typename: "Users",
//             Fname: faker.person.firstName(),
//             Sname: faker.person.lastName(),
//             image: faker.image.avatar(),
//           }
//         : null,
//     };
//   });
// }

// Column color mapping
const COLUMN_COLORS = {
  new: "#39A8EF",
  contacted: "#64B6AC",
  qualified: "#55D0E0",
  proposal: "#47E4C2",
  won: "#FFA900",
  lost: "#FF6B6B",
};

// Column label mapping
const COLUMN_LABELS = {
  New: "New",
  contacted: "Contacted",
  qualified: "Qualified",
  proposal: "Proposal/Quote Sent",
  won: "Won",
  lost: "Lost",
};

function randmNumber() {
  return Math.floor(Math.random() * 1000000);
}

/**
 * Converts raw lead data into formatted Kanban board columns
 */
export function convertLeadsToKanbanColumns(
  leads: NonNullable<UserLeadsQuery["userLeads"]>,
): LeadKanbanColumn[] {
  // Normalize keys with first letter capitalized to avoid duplicates
  const normalizeStage = (stage: string): string => {
    return stage.charAt(0).toUpperCase() + stage.slice(1).toLowerCase();
  };

  // Group leads by normalized stage
  // @ts-expect-error
  const groupedLeads = leads?.reduce(
    // @ts-expect-error
    (acc, lead) => {
      const normalizedStage = normalizeStage(lead.stage || "New");
      if (!acc[normalizedStage]) acc[normalizedStage] = [];
      acc[normalizedStage].push(lead);
      return acc;
    },
    {} as Record<string, typeof leads>,
  );

  // Create a mapping of normalized keys to original COLUMN_LABELS and COLORS
  const normalizedLabelMap: Record<string, string> = {};
  const normalizedColorMap: Record<string, string> = {};

  // Normalize existing label keys
  Object.entries(COLUMN_LABELS).forEach(([key, value]) => {
    normalizedLabelMap[normalizeStage(key)] = value;
  });

  // Normalize existing color keys
  Object.entries(COLUMN_COLORS).forEach(([key, value]) => {
    normalizedColorMap[normalizeStage(key)] = value;
  });

  // Find all unique normalized stages
  const allNormalizedStages = new Set([
    ...Object.keys(normalizedLabelMap),
    // @ts-expect-error
    ...leads.map((lead) => normalizeStage(lead.stage || "New")),
  ]);

  // Create columns from grouped leads
  return Array.from(allNormalizedStages).map((stageId) => {
    const stageLeads = groupedLeads[stageId] || [];

    // Use predefined label if available, otherwise use the normalized stage ID
    const label = normalizedLabelMap[stageId] || stageId;

    // Use predefined color if available, otherwise generate one
    const color =
      normalizedColorMap[stageId] ||
      `#${Math.floor(Math.random() * 0xffffff)
        .toString(16)
        .padStart(6, "0")}`;

    return {
      id: stageId.toLowerCase(), // Use lowercase IDs for consistency
      label,
      color,
      // @ts-expect-error
      leadCards: stageLeads.map((lead) => ({
        id:
          typeof lead.id === "number"
            ? lead.id
            : typeof lead.id === "string"
              ? parseInt(lead.id) || randmNumber()
              : randmNumber(),
        Fname: lead.Fname || "",
        Sname: lead.Sname || "",
        photo: lead.salesRep?.image || "",
        email: lead.email || "",
        phone: lead.phone || "",
        salesRep: {
          id: lead.salesRep?.id || "",
          Fname: lead.salesRep?.Fname || "",
          Sname: lead.salesRep?.Sname || "",
          image: lead.salesRep?.image || "",
        },
        name: lead.Fname || "",
        revenue: lead.revenue || 0,
        source: lead.source || "Unknown",
      })),
    };
  });
}

// Example usage:
// export const mockUserLeads = generateMockLeads(9);
// export const initialColumns= convertLeadsToKanbanColumns(mockUserLeads);
