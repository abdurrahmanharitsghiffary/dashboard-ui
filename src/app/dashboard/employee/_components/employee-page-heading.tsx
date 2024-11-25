import { Plus } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { cn } from '@/lib/utils';

export default function EmployeePageHeading() {
  return (
    <div className="flex items-start justify-between">
      <Heading
        title={`Employee`}
        description="Manage employees (Server side table functionalities.)"
      />

      <Link
        href={'/dashboard/employee/new'}
        className={cn(buttonVariants({ variant: 'default' }))}
      >
        <Plus className="mr-2 size-4" /> Add New
      </Link>
    </div>
  );
}
