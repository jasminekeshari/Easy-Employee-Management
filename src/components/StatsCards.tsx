// Professional Statistics Cards Component - Dashboard overview metrics
import React from 'react';
import { Users, CheckCircle, Clock, TrendingUp, Award, Target } from 'lucide-react';
import { Employee } from '../types/employee';
import { calculateLearningScore } from '../data/mockEmployees';

interface StatsCardsProps {
  employees: Employee[];
  loading: boolean;
}

export const StatsCards: React.FC<StatsCardsProps> = ({ employees, loading }) => {
  // Calculate statistics from employee data
  const stats = React.useMemo(() => {
    if (loading || employees.length === 0) {
      return {
        totalEmployees: 0,
        assessmentSubmitted: 0,
        assessmentPending: 0,
        averageLearningScore: 0,
        topPerformers: 0,
        completionRate: 0
      };
    }

    const submitted = employees.filter(emp => emp.assessmentSubmitted);
    const pending = employees.filter(emp => !emp.assessmentSubmitted);
    
    const learningScores = submitted.map(emp => calculateLearningScore(emp));
    const averageScore = learningScores.length > 0 
      ? learningScores.reduce((sum, score) => sum + score, 0) / learningScores.length 
      : 0;
    
    const topPerformers = learningScores.filter(score => score >= 8).length;
    const completionRate = (submitted.length / employees.length) * 100;

    return {
      totalEmployees: employees.length,
      assessmentSubmitted: submitted.length,
      assessmentPending: pending.length,
      averageLearningScore: Math.round(averageScore * 10) / 10,
      topPerformers,
      completionRate: Math.round(completionRate)
    };
  }, [employees, loading]);

  // Stat card configuration
  const statCards = [
    {
      title: 'Total Employees',
      value: stats.totalEmployees,
      icon: Users,
      color: 'bg-primary',
      description: 'Active employees in system'
    },
    {
      title: 'Assessments Submitted',
      value: stats.assessmentSubmitted,
      icon: CheckCircle,
      color: 'bg-success',
      description: 'Completed assessments'
    },
    {
      title: 'Pending Assessments',
      value: stats.assessmentPending,
      icon: Clock,
      color: 'bg-warning',
      description: 'Awaiting submission'
    },
    {
      title: 'Avg Learning Score',
      value: `${stats.averageLearningScore}/10`,
      icon: TrendingUp,
      color: 'bg-primary',
      description: 'Based on assessment responses'
    },
    {
      title: 'Top Performers',
      value: stats.topPerformers,
      icon: Award,
      color: 'bg-success',
      description: 'Learning score ≥ 8'
    },
    {
      title: 'Completion Rate',
      value: `${stats.completionRate}%`,
      icon: Target,
      color: 'bg-primary',
      description: 'Assessment completion percentage'
    }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        
        return (
          <div key={index} className="card-professional p-6">
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                </div>
                {loading ? (
                  <div className="skeleton h-8 w-16 mt-2" />
                ) : (
                  <p className="text-2xl font-bold text-foreground mt-1">
                    {stat.value}
                  </p>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};