'use client';
import { Button } from '../button';

interface DataTableResetFilterProps {
  isFilterActive: boolean;
  onReset: () => void;
}

export default function DataTableResetFilter({
  isFilterActive,
  onReset,
}: DataTableResetFilterProps) {
  return (
    <>
      {isFilterActive ? (
        <Button variant="outline" onClick={onReset}>
          Reset Filters
        </Button>
      ) : null}
    </>
  );
}
