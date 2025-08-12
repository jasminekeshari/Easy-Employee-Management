// Professional Skeleton Loader Component - Loading states for better UX
import React from 'react';

export const SkeletonLoader: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {/* Generate 6 skeleton cards for realistic loading experience */}
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="card-professional p-6 animate-pulse">
          {/* Header skeleton */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="skeleton h-5 w-32 mb-2" />
              <div className="skeleton h-4 w-24" />
            </div>
            <div className="skeleton h-6 w-16 rounded-full" />
          </div>

          {/* Contact info skeleton */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center">
              <div className="skeleton h-4 w-4 mr-2" />
              <div className="skeleton h-4 w-48" />
            </div>
            <div className="flex items-center">
              <div className="skeleton h-4 w-4 mr-2" />
              <div className="skeleton h-4 w-32" />
            </div>
          </div>

          {/* Assessment insights skeleton */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="skeleton h-4 w-24" />
              <div className="skeleton h-4 w-12" />
            </div>
            <div className="skeleton h-12 w-full" />
          </div>

          {/* Tags skeleton */}
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="skeleton h-6 w-20 rounded-full" />
            <div className="skeleton h-6 w-16 rounded-full" />
            <div className="skeleton h-6 w-24 rounded-full" />
          </div>

          {/* Footer skeleton */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="skeleton h-3 w-20" />
            <div className="skeleton h-4 w-24" />
          </div>
        </div>
      ))}
    </div>
  );
};