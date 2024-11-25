'use client';

import React from 'react';

import DataTableFilterBox from '@/components/ui/table/data-table-filter-box';
import DataTableResetFilter from '@/components/ui/table/data-table-reset-filter';
import DataTableSearch from '@/components/ui/table/data-table-search';
import {
  GENDER_OPTIONS,
  useEmployeeTableFilters,
} from '@/features/employee/hooks/use-employee-table-filters';

export default function EmployeeTableAction() {
  const {
    genderFilter,
    setGenderFilter,
    isAnyFilterActive,
    resetFilters,
    searchQuery,
    setPage,
    setSearchQuery,
  } = useEmployeeTableFilters();

  return (
    <>
      <div className="flex flex-wrap items-center gap-4">
        <DataTableSearch
          searchKey="name"
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setPage={setPage}
        />
        <DataTableFilterBox
          filterKey="gender"
          title="Gender"
          options={GENDER_OPTIONS}
          setFilterValue={setGenderFilter}
          filterValue={genderFilter}
        />
        <DataTableResetFilter
          isFilterActive={isAnyFilterActive}
          onReset={resetFilters}
        />
      </div>
    </>
  );
}
