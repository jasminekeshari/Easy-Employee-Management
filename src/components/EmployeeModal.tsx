// Professional Employee Modal Component - Add/Edit/View employee details
import React, { useState, useEffect } from 'react';
import { X, Save, User, Mail, Briefcase, Calendar, FileText, Tag } from 'lucide-react';
import { Employee, AssessmentAnswers, TAG_CATEGORIES, ROLES } from '../types/employee';

interface EmployeeModalProps {
  employee: Employee | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (employeeData: Partial<Employee>) => void;
  isAddMode: boolean;
}

export const EmployeeModal: React.FC<EmployeeModalProps> = ({
  employee,
  isOpen,
  onClose,
  onSave,
  isAddMode
}) => {
  // Form state management
  const [formData, setFormData] = useState<Partial<Employee>>({
    name: '',
    email: '',
    role: '',
    assessmentSubmitted: false,
    tags: [],
    assessmentAnswers: undefined
  });

  const [activeTab, setActiveTab] = useState<'basic' | 'assessment' | 'tags'>('basic');
  const [assessmentAnswers, setAssessmentAnswers] = useState<Partial<AssessmentAnswers>>({});

  // Initialize form data when employee changes
  useEffect(() => {
    if (employee) {
      setFormData(employee);
      setAssessmentAnswers(employee.assessmentAnswers || {});
    } else if (isAddMode) {
      setFormData({
        name: '',
        email: '',
        role: '',
        assessmentSubmitted: false,
        tags: [],
        assessmentAnswers: undefined
      });
      setAssessmentAnswers({});
    }
  }, [employee, isAddMode]);

  // Handle keyboard events for accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const dataToSave: Partial<Employee> = {
      ...formData,
      assessmentAnswers: formData.assessmentSubmitted ? assessmentAnswers as AssessmentAnswers : undefined,
      submissionDate: formData.assessmentSubmitted && !employee?.assessmentSubmitted 
        ? new Date().toISOString() 
        : employee?.submissionDate
    };

    onSave(dataToSave);
  };

  // Handle tag toggle
  const toggleTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.includes(tag) 
        ? prev.tags.filter(t => t !== tag)
        : [...(prev.tags || []), tag]
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Modal Backdrop */}
      <div 
        className="absolute inset-0 modal-backdrop"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-4xl mx-4 max-h-[90vh] bg-card rounded-xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border bg-surface">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary rounded-lg">
              <User className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                {isAddMode ? 'Add New Employee' : `${employee?.name || 'Employee'} Details`}
              </h2>
              <p className="text-sm text-muted-foreground">
                {isAddMode ? 'Create a new employee profile' : 'View and edit employee information'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-border bg-surface overflow-x-auto">
          {['basic', 'assessment', 'tags'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`flex items-center px-4 md:px-6 py-3 text-sm font-medium capitalize transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? 'text-primary border-b-2 border-primary bg-card'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab === 'basic' && <User className="h-4 w-4 mr-1 md:mr-2" />}
              {tab === 'assessment' && <FileText className="h-4 w-4 mr-1 md:mr-2" />}
              {tab === 'tags' && <Tag className="h-4 w-4 mr-1 md:mr-2" />}
              {tab}
            </button>
          ))}
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 max-h-[60vh]">
          <form onSubmit={handleSubmit}>
            {/* Basic Information Tab */}
            {activeTab === 'basic' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="text"
                        required
                        value={formData.name || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="input-professional pl-10 w-full"
                        placeholder="Enter full name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="email"
                        required
                        value={formData.email || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="input-professional pl-10 w-full"
                        placeholder="Enter email address"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Role/Position *
                    </label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <select
                        required
                        value={formData.role || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                        className="input-professional pl-10 w-full"
                      >
                        <option value="">Select role</option>
                        {ROLES.map(role => (
                          <option key={role} value={role}>{role}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Assessment Status
                    </label>
                    <div className="flex items-center space-x-4 pt-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.assessmentSubmitted || false}
                          onChange={(e) => setFormData(prev => ({ 
                            ...prev, 
                            assessmentSubmitted: e.target.checked 
                          }))}
                          className="rounded border-border text-primary focus:ring-primary"
                        />
                        <span className="ml-2 text-sm text-foreground">Assessment Completed</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Assessment Tab */}
            {activeTab === 'assessment' && (
              <div className="space-y-6">
                {!formData.assessmentSubmitted ? (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">Assessment Not Submitted</h3>
                    <p className="text-muted-foreground">
                      Mark assessment as completed in the Basic tab to add assessment answers.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Key Assessment Questions */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Q1: What interests you about building AI-based products for HR technology?
                      </label>
                      <textarea
                        value={assessmentAnswers.q1 || ''}
                        onChange={(e) => setAssessmentAnswers(prev => ({ ...prev, q1: e.target.value }))}
                        className="input-professional w-full h-24 resize-none"
                        placeholder="Enter response..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Q14: What are your long-term career goals?
                      </label>
                      <textarea
                        value={assessmentAnswers.q14 || ''}
                        onChange={(e) => setAssessmentAnswers(prev => ({ ...prev, q14: e.target.value }))}
                        className="input-professional w-full h-24 resize-none"
                        placeholder="Enter response..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Q16: Do you actively learn new skills?
                      </label>
                      <textarea
                        value={assessmentAnswers.q16 || ''}
                        onChange={(e) => setAssessmentAnswers(prev => ({ ...prev, q16: e.target.value }))}
                        className="input-professional w-full h-24 resize-none"
                        placeholder="Enter response..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Q19: Work culture vs salary preference?
                      </label>
                      <textarea
                        value={assessmentAnswers.q19 || ''}
                        onChange={(e) => setAssessmentAnswers(prev => ({ ...prev, q19: e.target.value }))}
                        className="input-professional w-full h-24 resize-none"
                        placeholder="Enter response..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Q20: What is your biggest aspiration?
                      </label>
                      <textarea
                        value={assessmentAnswers.q20 || ''}
                        onChange={(e) => setAssessmentAnswers(prev => ({ ...prev, q20: e.target.value }))}
                        className="input-professional w-full h-24 resize-none"
                        placeholder="Enter response..."
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tags Tab */}
            {activeTab === 'tags' && (
              <div className="space-y-6">
                {Object.entries(TAG_CATEGORIES).map(([category, tags]) => (
                  <div key={category}>
                    <h3 className="text-sm font-semibold text-foreground mb-3 capitalize">
                      {category.replace('_', ' ').toLowerCase()}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {Object.values(tags).map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => toggleTag(tag)}
                          className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                            formData.tags?.includes(tag)
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-muted-foreground hover:bg-accent'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </form>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border bg-surface">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="btn-professional"
          >
            <Save className="h-4 w-4 mr-2" />
            {isAddMode ? 'Add Employee' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};