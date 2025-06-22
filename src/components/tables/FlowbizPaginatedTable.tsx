"use no memo"
import {
  ColumnDef,
  Table,
  OnChangeFn,
  SortingState,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Fragment, ReactNode, useState, useMemo } from "react";
import { FiChevronDown, FiChevronUp, FiSearch } from "react-icons/fi";
import { FlowBizPaginatiedPage } from "./FlowBizPaginatiedPage";

interface FlowbizPaginatedTableProps<T> {
  title?: string;
  data: T[] | undefined | null;
  loading?: boolean;
  columns: ColumnDef<T, any>[];
  searchPlaceholder?: string;
  actions?: (table: Table<T>) => ReactNode[];
  enableRowSelection?: boolean;
  onRowSelectionChange?: OnChangeFn<Record<string, boolean>>;
  pageSize?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  totalPages?: number;
  // New render prop for custom UI above table
  renderCustomControls?: (table: Table<T>) => ReactNode;
}

export function FlowbizPaginatedTable<T>({
  title,
  data = [],
  loading,
  columns,
  searchPlaceholder = "Search",
  actions = () => [],
  enableRowSelection = false,
  onRowSelectionChange,
  renderCustomControls,
  pageSize = 10,
  currentPage = 1,
  onPageChange,
  totalPages = 1,
}: FlowbizPaginatedTableProps<T>) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const tableData = data || [];
  
  // Get the paginated data manually instead of using TanStack's pagination
  const paginatedData = useMemo(() => {
    return tableData;
  }, [tableData]);

  const table = useReactTable({
    data: paginatedData,
    columns,
    state: {
      sorting,
      rowSelection,
      globalFilter,
    },
    enableRowSelection,
    onSortingChange: setSorting,
    onRowSelectionChange: (updater) => {
      setRowSelection(updater);
      onRowSelectionChange?.(updater);
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    // We're not using TanStack's pagination
    // getPaginationRowModel: getPaginationRowModel(),
  });
  const actionComponents = actions(table);
  const tableHeaderGroups = table.getHeaderGroups();
  const tableRows = table.getRowModel().rows;

  const handlePageChange = (page: number) => {
    if (onPageChange) {
      onPageChange(page);
    }
  };

  return (
    <div className="border-foreground/20 bg-background/90 flex h-full w-full flex-col rounded-md border p-4">
      {/* Header with search and actions */}
      <div className="mb-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        {title && (
          <h3 className="text-foreground/80 text-lg font-medium">{title}</h3>
        )}

        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
          {/* Search input */}
          <div className="relative w-full sm:w-auto">
            <div className="text-muted-foreground absolute top-1/2 left-2 -translate-y-1/2 transform">
              <FiSearch size={16} />
            </div>
            <input
              type="text"
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder={searchPlaceholder}
              className="border-muted-foreground focus:border-muted-foreground w-full rounded border py-1.5 pr-3 pl-8 text-sm focus:outline-none sm:w-44"
            />
          </div>

          {/* Action buttons */}
          {actionComponents.length > 0 && (
            <div className="flex gap-2">
              {actionComponents.map((action, index) => (
                <Fragment key={index}>{action}</Fragment>
              ))}
            </div>
          )}
        </div>
      </div>

      {renderCustomControls && (
        <div className="mb-4">{renderCustomControls(table)}</div>
      )}

      {/* Table container */}
      <div className="w-full flex-grow overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            {tableHeaderGroups.map((headerGroup, rox_idx) => (
              <tr key={headerGroup.id} className="bg-background">
                {headerGroup.headers.map((header, col_idx) => {
                  const headerCellidx =
                    rox_idx + "_" + header.id + "_" + col_idx;
                  const canSort = header.column.getCanSort();
                  // const isSorted = header.column.getIsSorted()
                  const isSorted = sorting.find((s) => s.id === header.id);
                  const handleSort = () => {
                    header.column.toggleSorting();
                  };
                  return (
                    <th
                      key={headerCellidx}
                      className={`text-foreground border-b p-2 text-left text-sm font-medium border-foreground/10${
                        isSorted ? "bg-primary/10" : ""
                      }`}
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          className={`flex items-center gap-2 ${
                            canSort ? "cursor-pointer select-none" : ""
                          }`}
                          onClick={handleSort}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}

                          {canSort && (
                            <div className="ml-1 flex flex-col">
                              <FiChevronUp
                                size={12}
                                strokeWidth={3}
                                className={` ${!isSorted?.desc ? "text-primary" : "text-foreground/80"} `}
                              />
                              <FiChevronDown
                                strokeWidth={3}
                                size={12}
                                className={
                                  isSorted?.desc
                                    ? "text-primary"
                                    : "text-foreground/80"
                                }
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-foreground/60 h-40 text-center"
                >
                  <div className="flex flex-col items-center justify-center">
                    <div className="border-foreground/60 mb-2 h-6 w-6 animate-spin rounded-full border-2 border-t-transparent"></div>
                    <span>Loading data...</span>
                  </div>
                </td>
              </tr>
            ) : tableRows?.length ? (
              tableRows.map((row, row_idx) => (
                <tr
                  key={row.id}
                  className="border-foreground/10 hover:bg-foreground/5 border-b"
                >
                  {row.getVisibleCells().map((cell, idx) => {
                    const cellKey = row_idx + "_" + cell.id + "_" + idx;
                    return (
                      <td key={cellKey} className="text-foreground p-2 text-sm">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-foreground/60 h-24 text-center"
                >
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="my-4 flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
        <div className="text-muted-foreground">
          Showing {Math.min((currentPage - 1) * pageSize + 1, tableData.length)} to {Math.min(currentPage * pageSize, tableData.length)} of {tableData.length} entries
        </div>

        <div className="w-full sm:w-auto">
          <FlowBizPaginatiedPage
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            disabled={loading}
          />
        </div>
      </div>
    </div>
  );
}
