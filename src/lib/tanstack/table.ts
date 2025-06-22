import { Table } from "@tanstack/react-table";

export function getSelectedRows<T>(table: Table<T>) {
  const selectedRows = table.getSelectedRowModel().flatRows;
  const allSelectedRows = selectedRows.map((row) => row.original);
  if (allSelectedRows.length === 0) {
    return table.getRowModel().rows.map((row) => row.original);
  }
  return allSelectedRows;
}
