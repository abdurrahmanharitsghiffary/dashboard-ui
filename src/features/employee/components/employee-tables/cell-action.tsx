'use client';
import { Edit, Eye, MoreHorizontal, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { AlertModal } from '@/components/modal/alert-modal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useDeleteEmployee } from '@/features/employee/api/delete-employee';
import type { Employee } from '@/types/schema/employee';

interface CellActionProps {
  data: Employee;
}

export function CellAction({ data }: CellActionProps) {
  const { mutate, isPending } = useDeleteEmployee();

  const [open, setOpen] = useState(false);
  const router = useRouter();

  const onConfirm = () => {
    mutate({ id: data?.id });
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={isPending}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => router.push(`/dashboard/employee/${data.id}`)}
          >
            <Eye className="mr-2 size-4" /> View
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/dashboard/employee/${data.id}/edit`)}
          >
            <Edit className="mr-2 size-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 size-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
