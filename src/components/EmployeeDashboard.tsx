// Main Employee Dashboard Component - Central hub for all HR management features
import React, { useState, useMemo, useEffect } from 'react';
import { Search, Filter, Download, Plus, Users, Award, TrendingUp, Clock } from 'lucide-react';
import { Employee, FilterOptions, SortOptions, TAG_CATEGORIES, ROLES } from '../types/employee';
import { mockEmployees, calculateLearningScore } from '../data/mockEmployees';
import { EmployeeCard } from './EmployeeCard';
import { EmployeeModal } from './EmployeeModal';
import { FilterPanel } from './FilterPanel';
import { StatsCards } from './StatsCards';
import { SkeletonLoader } from './SkeletonLoader';
import { useToast } from '../hooks/use-toast';

export const EmployeeDashboard: React.FC = () => {
  // State management for dashboard functionality
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  const { toast } = useToast();

  // Filter and sort state
  const [filters, setFilters] = useState<FilterOptions>({
    assessmentStatus: 'all',
    role: '',
    interestArea: '',
    longTermGoals: '',
    workCulturePreference: '',
    learningAttitude: '',
    searchQuery: ''
  });

  const [sortOptions, setSortOptions] = useState<SortOptions>({
    field: 'name',
    direction: 'asc'
  });

  // Initialize data - Simulating API call with loading state
  useEffect(() => {
    const loadEmployees = async () => {
      setLoading(true);
      try {
        // Simulate API delay for realistic loading experience
        await new Promise(resolve => setTimeout(resolve, 1500));
        setEmployees(mockEmployees);
        toast({
          title: "Dashboard loaded successfully",
          description: `Found ${mockEmployees.length} employees`,
        });
      } catch (error) {
        toast({
          title: "Error loading employees",
          description: "Please try again later",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadEmployees();
  }, [toast]);

  // Filtered and sorted employees based on current filters and sort options
  const filteredAndSortedEmployees = useMemo(() => {
    let filtered = employees.filter(employee => {
      // Filter by assessment status
      if (filters.assessmentStatus === 'submitted' && !employee.assessmentSubmitted) return false;
      if (filters.assessmentStatus === 'not-submitted' && employee.assessmentSubmitted) return false;

      // Filter by role
      if (filters.role && employee.role !== filters.role) return false;

      // Filter by tags (interest area, goals, culture, learning attitude)
      if (filters.interestArea && !employee.tags.includes(filters.interestArea)) return false;
      if (filters.longTermGoals && !employee.tags.includes(filters.longTermGoals)) return false;
      if (filters.workCulturePreference && !employee.tags.includes(filters.workCulturePreference)) return false;
      if (filters.learningAttitude && !employee.tags.includes(filters.learningAttitude)) return false;

      // Search filter - checks name, email, and assessment answers
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const matchesBasicInfo = employee.name.toLowerCase().includes(query) ||
                                employee.email.toLowerCase().includes(query) ||
                                employee.role.toLowerCase().includes(query);
        
        const matchesAnswers = employee.assessmentAnswers ? 
          Object.values(employee.assessmentAnswers).some(answer => 
            answer.toLowerCase().includes(query)
          ) : false;

        if (!matchesBasicInfo && !matchesAnswers) return false;
      }

      return true;
    });

    // Sort the filtered results
    filtered.sort((a, b) => {
      let comparison = 0;

      switch (sortOptions.field) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'submissionDate':
          const dateA = a.submissionDate ? new Date(a.submissionDate).getTime() : 0;
          const dateB = b.submissionDate ? new Date(b.submissionDate).getTime() : 0;
          comparison = dateA - dateB;
          break;
        case 'learningScore':
          comparison = calculateLearningScore(a) - calculateLearningScore(b);
          break;
      }

      return sortOptions.direction === 'desc' ? -comparison : comparison;
    });

    return filtered;
  }, [employees, filters, sortOptions]);

  // Handle employee selection for detailed view
  const handleEmployeeClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsAddMode(false);
    setShowEmployeeModal(true);
  };

  // Handle adding new employee
  const handleAddEmployee = () => {
    setSelectedEmployee(null);
    setIsAddMode(true);
    setShowEmployeeModal(true);
  };

  // Handle saving employee (add or edit)
  const handleSaveEmployee = (employeeData: Partial<Employee>) => {
    try {
      // Basic validation
      if (!employeeData.name?.trim() || !employeeData.email?.trim() || !employeeData.role?.trim()) {
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields (name, email, role)",
          variant: "destructive",
        });
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(employeeData.email)) {
        toast({
          title: "Invalid Email",
          description: "Please enter a valid email address",
          variant: "destructive",
        });
        return;
      }

      if (isAddMode) {
        // Check for duplicate email
        const existingEmployee = employees.find(emp => 
          emp.email.toLowerCase() === employeeData.email.toLowerCase()
        );
        if (existingEmployee) {
          toast({
            title: "Duplicate Email",
            description: "An employee with this email already exists",
            variant: "destructive",
          });
          return;
        }

        // Add new employee
        const newEmployee: Employee = {
          id: `emp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          name: employeeData.name.trim(),
          email: employeeData.email.toLowerCase().trim(),
          role: employeeData.role,
          assessmentSubmitted: employeeData.assessmentSubmitted || false,
          tags: employeeData.tags || [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          ...employeeData
        };
        setEmployees(prev => [...prev, newEmployee]);
        toast({
          title: "Employee added successfully",
          description: `${newEmployee.name} has been added to the system`,
        });
      } else if (selectedEmployee) {
        // Check for duplicate email (excluding current employee)
        const existingEmployee = employees.find(emp => 
          emp.id !== selectedEmployee.id && 
          emp.email.toLowerCase() === employeeData.email.toLowerCase()
        );
        if (existingEmployee) {
          toast({
            title: "Duplicate Email",
            description: "Another employee with this email already exists",
            variant: "destructive",
          });
          return;
        }

        // Update existing employee
        const updatedEmployee: Employee = {
          ...selectedEmployee,
          ...employeeData,
          name: employeeData.name?.trim() || selectedEmployee.name,
          email: employeeData.email?.toLowerCase().trim() || selectedEmployee.email,
          updatedAt: new Date().toISOString()
        };
        setEmployees(prev => prev.map(emp => emp.id === selectedEmployee.id ? updatedEmployee : emp));
        toast({
          title: "Employee updated successfully",
          description: `${updatedEmployee.name}'s information has been updated`,
        });
      }
      setShowEmployeeModal(false);
    } catch (error) {
      console.error('Error saving employee:', error);
      toast({
        title: "Error saving employee",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  // Export filtered data to CSV with professional formatting
  const handleExportCSV = () => {
    try {
      const csvHeaders = [
        'Name', 'Email', 'Role', 'Assessment Status', 'Submission Date',
        'Tags', 'Learning Score', 'Key Interests', 'Long-term Goals'
      ];

      const csvData = filteredAndSortedEmployees.map(emp => [
        emp.name,
        emp.email,
        emp.role,
        emp.assessmentSubmitted ? 'Submitted' : 'Not Submitted',
        emp.submissionDate || 'N/A',
        emp.tags.join('; '),
        calculateLearningScore(emp).toString(),
        emp.assessmentAnswers?.q1 || 'N/A',
        emp.assessmentAnswers?.q14 || 'N/A'
      ]);

      const csvContent = [csvHeaders, ...csvData]
        .map(row => row.map(field => `"${String(field || '').replace(/"/g, '""')}"`).join(','))
        .join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `employees_export_${new Date().toISOString().split('T')[0]}.csv`;
      link.click();

      toast({
        title: "Export successful",
        description: `Exported ${filteredAndSortedEmployees.length} employee records`,
      });
    } catch (error) {
      toast({
        title: "Export failed",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Professional Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary rounded-lg">
                <Users className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Employee Dashboard</h1>
                <p className="text-sm text-muted-foreground">HR Management & Assessment System</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 md:space-x-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center btn-professional text-sm md:text-base px-3 md:px-6 py-2 md:py-3"
              >
                <Filter className="h-4 w-4 mr-1 md:mr-2" />
                <span className="hidden sm:inline">Filters</span>
              </button>
              <button
                onClick={handleExportCSV}
                className={`flex items-center px-3 md:px-4 py-2 bg-secondary text-secondary-foreground rounded-lg transition-colors text-sm md:text-base ${
                  filteredAndSortedEmployees.length === 0 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:bg-secondary-hover'
                }`}
                disabled={filteredAndSortedEmployees.length === 0}
              >
                <Download className="h-4 w-4 mr-1 md:mr-2" />
                <span className="hidden sm:inline">Export</span>
              </button>
              <button
                onClick={handleAddEmployee}
                className="flex items-center btn-professional text-sm md:text-base px-3 md:px-6 py-2 md:py-3"
              >
                <Plus className="h-4 w-4 mr-1 md:mr-2" />
                <span className="hidden sm:inline">Add</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Statistics Cards */}
        <StatsCards employees={employees} loading={loading} />

        {/* Search and Filter Section */}
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search employees, roles, or keywords..."
              value={filters.searchQuery}
              onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
              className="input-professional pl-10 w-full"
            />
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <FilterPanel
              filters={filters}
              onFiltersChange={setFilters}
              sortOptions={sortOptions}
              onSortChange={setSortOptions}
            />
          )}

          {/* Results Summary */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm text-muted-foreground">
            <span>
              Showing {filteredAndSortedEmployees.length} of {employees.length} employees
            </span>
            <span className="text-xs sm:text-sm">
              Sorted by {sortOptions.field} ({sortOptions.direction === 'asc' ? 'ascending' : 'descending'})
            </span>
          </div>
        </div>

        {/* Employee Grid */}
        {loading ? (
          <SkeletonLoader />
        ) : filteredAndSortedEmployees.length === 0 ? (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No employees found</h3>
            <p className="text-muted-foreground mb-4">
              {employees.length === 0 
                ? "No employees in the system yet." 
                : "Try adjusting your filters or search query."}
            </p>
            {employees.length === 0 && (
              <button onClick={handleAddEmployee} className="flex items-center btn-professional">
                <Plus className="h-4 w-4 mr-2" />
                Add First Employee
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {filteredAndSortedEmployees.map((employee) => (
              <EmployeeCard
                key={employee.id}
                employee={employee}
                onClick={() => handleEmployeeClick(employee)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Employee Modal for Add/Edit/View */}
      {showEmployeeModal && (
        <EmployeeModal
          employee={selectedEmployee}
          isOpen={showEmployeeModal}
          onClose={() => setShowEmployeeModal(false)}
          onSave={handleSaveEmployee}
          isAddMode={isAddMode}
        />
      )}
    </div>
  );
};