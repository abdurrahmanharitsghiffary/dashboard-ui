'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ApiMeta, ApiMetaCol, FormType } from '@/types/metadata/api-meta';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/components/ui/select';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z, ZodObject, ZodType } from 'zod';
import { Button } from '@/components/ui/button';

interface CreateFormProps {
  apiMeta: ApiMeta;
}

function generateZodSchema(apiMeta: ApiMeta): ZodObject<any> {
  const fields: Record<string, ZodType<any>> = {};
  console.log(apiMeta.columns, 'COLS');
  for (const column of apiMeta.columns) {
    let schema: ZodType<any> = z.string(); // Default to `string`, can be adapted for other types

    fields[column.colName] = schema;
  }
  console.log(fields, 'FIELDS');

  return z.object(fields);
}

export default function CreateForm({ apiMeta }: CreateFormProps) {
  console.log(apiMeta, 'METADATA');
  const formSchema = generateZodSchema(apiMeta);
  const form = useForm({
    resolver: zodResolver(formSchema)
  });

  console.log(form.getValues(), 'VALUES');

  function onSubmit(values: any) {
    console.log(values);
  }

  const renderField = (col: ApiMetaCol) => {
    const { colName, colModelName, formType, selectOptions } = col;

    switch (formType) {
      case FormType.INPUT:
        return (
          <FormField
            key={colModelName}
            control={form.control}
            name={colModelName}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{colName}</FormLabel>
                <FormControl>
                  <Input placeholder={`Enter ${colName}`} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      case FormType.TEXTAREA:
        return (
          <FormField
            key={colModelName}
            control={form.control}
            name={colModelName}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{colName}</FormLabel>
                <FormControl>
                  <textarea
                    placeholder={`Enter ${colName}`}
                    {...field}
                    className="w-full rounded border p-2"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      case FormType.SELECT:
        return (
          <FormField
            key={colModelName}
            control={form.control}
            name={colModelName}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{colName}</FormLabel>
                <Select>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={`Select ${colName}`} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {selectOptions?.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      case FormType.NONE:
      default:
        return null;
    }
  };

  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle className="text-left text-2xl font-bold">
          {apiMeta.modelName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* <Form {...form}> */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {apiMeta.columns.map((col) => renderField(col))}
          </div>
          <Button type="submit">Submit</Button>
        </form>
        {/* </Form> */}
      </CardContent>
    </Card>
  );
}
