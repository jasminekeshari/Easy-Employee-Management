// Professional Employee Card Component - Displays individual employee information
import React from 'react';
import { Mail, MapPin, Calendar, Award, TrendingUp } from 'lucide-react';
import { Employee } from '../types/employee';
import { calculateLearningScore } from '../data/mockEmployees';

interface EmployeeCardProps {
  employee: Employee;
  onClick: () => void;
}

export const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee, onClick }) => {
  const learningScore = calculateLearningScore(employee);
  
  // Get the most relevant tags to display (max 3)
  const displayTags = employee.tags.slice(0, 3);
  
  return (
    <div 
      className="card-professional p-6 cursor-pointer group"
      onClick={onClick}
    >
      {/* Header with Name and Status */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
            {employee.name}
          </h3>
          <p className="text-sm text-muted-foreground">{employee.role}</p>
        </div>
        <div className="flex items-center space-x-2">
          {employee.assessmentSubmitted ? (
            <span className="badge-success">
              Submitted
            </span>
          ) : (
            <span className="badge-warning">
              Pending
            </span>
          )}
        </div>
      </div>

      {/* Contact Information */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <Mail className="h-4 w-4 mr-2 text-primary" />
          <span className="truncate">{employee.email}</span>
        </div>
        
        {employee.submissionDate && (
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2 text-primary" />
            <span>Submitted {new Date(employee.submissionDate).toLocaleDateString()}</span>
          </div>
        )}
      </div>

      {/* Assessment Insights */}
      {employee.assessmentSubmitted && employee.assessmentAnswers && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Learning Score</span>
            <div className="flex items-center">
              <TrendingUp className="h-4 w-4 mr-1 text-primary" />
              <span className="text-sm font-semibold text-primary">{learningScore}/10</span>
            </div>
          </div>
          
          {/* Key Interest Preview */}
          <div className="text-xs text-muted-foreground">
            <p className="line-clamp-2">
              "{(employee.assessmentAnswers.q1 || '').substring(0, 100)}{employee.assessmentAnswers.q1 && employee.assessmentAnswers.q1.length > 100 ? '...' : ''}"
            </p>
          </div>
        </div>
      )}

      {/* Tags */}
      {displayTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {displayTags.map((tag, index) => (
            <span 
              key={index}
              className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
            >
              {tag}
            </span>
          ))}
          {employee.tags.length > 3 && (
            <span className="px-2 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-full">
              +{employee.tags.length - 3} more
            </span>
          )}
        </div>
      )}

      {/* Footer Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="text-xs text-muted-foreground">
          Updated {new Date(employee.updatedAt).toLocaleDateString()}
        </div>
        <div className="flex items-center text-sm text-primary font-medium">
          <span>View Details</span>
          <Award className="h-4 w-4 ml-1" />
        </div>
      </div>
    </div>
  );
};