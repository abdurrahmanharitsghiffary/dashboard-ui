'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Edit } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { buttonVariants } from '@/components/ui/button';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useSuspenseFetchEmployee } from '@/features/employee/api/fetch-employee';
import {
  updateEmployeeSchema,
  useUpdateEmployee,
  type UpdateEmployeeSchema,
} from '@/features/employee/api/update-employee';
import { cn } from '@/lib/utils';

export default function EmployeeViewForm() {
  const params = useParams();
  const employeeId = params?.employeeId?.toString() ?? '';

  const { data } = useSuspenseFetchEmployee({ id: employeeId });
  const employee = data?.data;
  const { mutate } = useUpdateEmployee();

  const form = useForm<UpdateEmployeeSchema>({
    resolver: zodResolver(updateEmployeeSchema),
    values: {
      company: employee?.company ?? '',
      name: employee?.name ?? '',
      country: employee?.country ?? 'USA',
      email: employee?.email ?? '',
      gender: employee?.gender ?? 'MALE',
    },
  });

  function onSubmit(values: UpdateEmployeeSchema) {
    mutate(
      { ...values, id: employeeId },
      {
        onSuccess() {
          toast('Employee successfully updated.');
        },
      },
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input disabled placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <Select
                  disabled
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ID">Indonesia</SelectItem>
                    <SelectItem value="USA">United States</SelectItem>
                    <SelectItem value="ENG">English</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input disabled placeholder="Enter your company" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Gender</FormLabel>
              <FormControl>
                <RadioGroup
                  disabled
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex space-x-4"
                >
                  <FormItem className="flex items-center gap-2 space-x-2">
                    <FormControl>
                      <RadioGroupItem value="MALE" />
                    </FormControl>
                    <FormLabel className="!m-0 font-normal">Male</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center gap-2 space-x-2">
                    <FormControl>
                      <RadioGroupItem value="FEMALE" />
                    </FormControl>
                    <FormLabel className="!m-0 font-normal">Female</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Link
          className={cn(buttonVariants(), 'flex w-fit items-center gap-2')}
          href={`/dashboard/employee/${employeeId}/edit`}
        >
          <Edit className="size-4" />
          Edit
        </Link>
      </form>
    </Form>
  );
}
