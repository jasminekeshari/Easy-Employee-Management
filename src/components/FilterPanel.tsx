// Advanced Filter Panel Component - Professional filtering interface
import React from 'react';
import { ChevronDown, RotateCcw, ArrowUpDown } from 'lucide-react';
import { FilterOptions, SortOptions, TAG_CATEGORIES, ROLES } from '../types/employee';

interface FilterPanelProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  sortOptions: SortOptions;
  onSortChange: (sortOptions: SortOptions) => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFiltersChange,
  sortOptions,
  onSortChange
}) => {
  // Reset all filters to default state
  const resetFilters = () => {
    onFiltersChange({
      assessmentStatus: 'all',
      role: '',
      interestArea: '',
      longTermGoals: '',
      workCulturePreference: '',
      learningAttitude: '',
      searchQuery: filters.searchQuery // Keep search query when resetting
    });
  };

  // Handle individual filter changes
  const updateFilter = <K extends keyof FilterOptions>(key: K, value: FilterOptions[K]) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  // Handle sort changes
  const updateSort = (field: SortOptions['field']) => {
    const direction = sortOptions.field === field && sortOptions.direction === 'asc' ? 'desc' : 'asc';
    onSortChange({ field, direction });
  };

  return (
    <div className="card-professional p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Advanced Filters</h3>
        <button
          onClick={resetFilters}
          className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <RotateCcw className="h-4 w-4 mr-1" />
          Reset Filters
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {/* Assessment Status Filter */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Assessment Status
          </label>
          <select
            value={filters.assessmentStatus}
            onChange={(e) => updateFilter('assessmentStatus', e.target.value as FilterOptions['assessmentStatus'])}
            className="input-professional w-full"
          >
            <option value="all">All Status</option>
            <option value="submitted">Submitted</option>
            <option value="not-submitted">Not Submitted</option>
          </select>
        </div>

        {/* Role Filter */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Role/Position
          </label>
          <select
            value={filters.role}
            onChange={(e) => updateFilter('role', e.target.value)}
            className="input-professional w-full"
          >
            <option value="">All Roles</option>
            {ROLES.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>

        {/* Interest Area Filter */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Interest Area
          </label>
          <select
            value={filters.interestArea}
            onChange={(e) => updateFilter('interestArea', e.target.value)}
            className="input-professional w-full"
          >
            <option value="">All Interests</option>
            {Object.values(TAG_CATEGORIES.INTEREST_AREA).map(interest => (
              <option key={interest} value={interest}>{interest}</option>
            ))}
          </select>
        </div>

        {/* Long-term Goals Filter */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Long-term Goals
          </label>
          <select
            value={filters.longTermGoals}
            onChange={(e) => updateFilter('longTermGoals', e.target.value)}
            className="input-professional w-full"
          >
            <option value="">All Goals</option>
            {Object.values(TAG_CATEGORIES.LONG_TERM_GOALS).map(goal => (
              <option key={goal} value={goal}>{goal}</option>
            ))}
          </select>
        </div>

        {/* Work Culture Preference Filter */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Culture Preference
          </label>
          <select
            value={filters.workCulturePreference}
            onChange={(e) => updateFilter('workCulturePreference', e.target.value)}
            className="input-professional w-full"
          >
            <option value="">All Preferences</option>
            {Object.values(TAG_CATEGORIES.WORK_CULTURE).map(culture => (
              <option key={culture} value={culture}>{culture}</option>
            ))}
          </select>
        </div>

        {/* Learning Attitude Filter */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Learning Attitude
          </label>
          <select
            value={filters.learningAttitude}
            onChange={(e) => updateFilter('learningAttitude', e.target.value)}
            className="input-professional w-full"
          >
            <option value="">All Attitudes</option>
            {Object.values(TAG_CATEGORIES.LEARNING_ATTITUDE).map(attitude => (
              <option key={attitude} value={attitude}>{attitude}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Sort Options */}
      <div className="border-t border-border pt-6">
        <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center">
          <ArrowUpDown className="h-4 w-4 mr-2" />
          Sort Options
        </h4>
        <div className="flex flex-wrap gap-2">
          {[
            { field: 'name' as const, label: 'Name' },
            { field: 'submissionDate' as const, label: 'Submission Date' },
            { field: 'learningScore' as const, label: 'Learning Score' }
          ].map(({ field, label }) => (
            <button
              key={field}
              onClick={() => updateSort(field)}
              className={`flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
                sortOptions.field === field
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              }`}
            >
              {label}
              {sortOptions.field === field && (
                <ChevronDown 
                  className={`h-4 w-4 ml-1 transition-transform ${
                    sortOptions.direction === 'desc' ? 'rotate-180' : ''
                  }`} 
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Active Filters Summary */}
      <div className="border-t border-border pt-4">
        <div className="flex flex-wrap gap-2">
          {Object.entries(filters).map(([key, value]) => {
            if (!value || value === 'all' || key === 'searchQuery') return null;
            
            return (
              <span
                key={key}
                className="inline-flex items-center px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
              >
                {value}
                <button
                  onClick={() => updateFilter(key as keyof FilterOptions, key === 'assessmentStatus' ? 'all' : '')}
                  className="ml-1 hover:text-primary-foreground"
                >
                  ×
                </button>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};