import { useState, ReactNode, Fragment } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
  Table,
} from "@tanstack/react-table";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

interface SimpleFlowbizTableProps<T> {
  title?: string;
  data: T[];
  loading?: boolean;
  columns: ColumnDef<T, any>[];
  actions?: (table: Table<T>) => ReactNode[];
  enableRowSelection?: boolean;
  onRowSelectionChange?: (selection: Record<string, boolean>) => void;
  renderCustomControls?: (table: Table<T>) => ReactNode;
}

export function SimpleFlowbizTable<T>({
  title,
  data,
  loading,
  columns,
  actions = () => [],
  enableRowSelection = false,
  onRowSelectionChange,
  renderCustomControls,
}: SimpleFlowbizTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      rowSelection,
    },
    enableRowSelection,
    onSortingChange: setSorting,
    onRowSelectionChange: (updater) => {
      const newSelection =
        typeof updater === "function" ? updater(rowSelection) : updater;
      setRowSelection(newSelection);
      onRowSelectionChange?.(newSelection);
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const actionComponents = actions(table);

  return (
    <div className="border-foreground/20 bg-background/90 mb-12 flex h-full w-full flex-col rounded-md border p-4">
      {/* Header with title and table actions */}
      <div className="mb-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        {title && (
          <h3 className="text-foreground/80 text-lg font-medium">{title}</h3>
        )}

        {/* Action buttons */}
        {actionComponents.length > 0 && (
          <div className="flex gap-2">
            {actionComponents.map((action, index) => (
              <Fragment key={index}>{action}</Fragment>
            ))}
          </div>
        )}
      </div>

      {renderCustomControls && (
        <div className="mb-4">{renderCustomControls(table)}</div>
      )}

      {/* Table container */}
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-muted">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={`text-foreground border-muted border-b p-2 text-left text-sm font-medium ${
                      header.column.getIsSorted() ? "bg-primary/10" : ""
                    }`}
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={`flex items-center gap-2 ${
                          header.column.getCanSort()
                            ? "cursor-pointer select-none"
                            : ""
                        }`}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}

                        {header.column.getCanSort() && (
                          <div className="ml-1 flex flex-col">
                            <FiChevronUp
                              size={12}
                              strokeWidth={3}
                              className={` ${
                                header.column.getIsSorted() === "asc"
                                  ? "text-primary"
                                  : "text-foreground/80"
                              } `}
                            />
                            <FiChevronDown
                              strokeWidth={3}
                              size={12}
                              className={
                                header.column.getIsSorted() === "desc"
                                  ? "text-primary"
                                  : "text-foreground/80"
                              }
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-muted h-40 text-center"
                >
                  <div className="flex flex-col items-center justify-center">
                    <div className="border-muted mb-2 h-6 w-6 animate-spin rounded-full border-2 border-t-transparent"></div>
                    <span>Loading data...</span>
                  </div>
                </td>
              </tr>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-muted hover:bg-muted/70 border-b"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="text-foreground/80 p-2 text-sm"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-muted h-24 text-center"
                >
                  No data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
