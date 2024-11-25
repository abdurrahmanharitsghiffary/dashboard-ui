import React from 'react';

import { Skeleton } from '@/components/ui/skeleton';

export default function FormSkeleton() {
  return (
    <div className="space-y-8">
      {/* Grid layout for form fields */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Name field */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" /> {/* Label */}
          <Skeleton className="h-10 w-full" /> {/* Input */}
        </div>

        {/* Country field */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" /> {/* Label */}
          <Skeleton className="h-10 w-full" /> {/* Select */}
        </div>

        {/* Email field */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" /> {/* Label */}
          <Skeleton className="h-10 w-full" /> {/* Input */}
        </div>

        {/* Company field */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" /> {/* Label */}
          <Skeleton className="h-10 w-full" /> {/* Input */}
        </div>
      </div>

      {/* Gender field */}
      <div className="space-y-3">
        <Skeleton className="h-4 w-24" /> {/* Label */}
        <div className="flex space-x-4">
          <Skeleton className="h-10 w-20" /> {/* Male */}
          <Skeleton className="h-10 w-20" /> {/* Female */}
        </div>
      </div>

      {/* Submit button */}
      <Skeleton className="h-10 w-28" />
    </div>
  );
}
