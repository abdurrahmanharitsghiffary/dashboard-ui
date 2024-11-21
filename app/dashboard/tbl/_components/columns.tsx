'use client';
import { CellAction } from '@/app/dashboard/tbl/_components/cell-action';
import { Checkbox } from '@/components/ui/checkbox';
import { ApiMeta } from '@/types/metadata/api-meta';
import { ColumnDef } from '@tanstack/react-table';

export const getColumns = (apiMetadata: ApiMeta): ColumnDef<any>[] => [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  ...apiMetadata.columns.map((column) => ({
    accessorKey: column.colModelName,
    header: column.colModelName.toUpperCase()
  })),
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
