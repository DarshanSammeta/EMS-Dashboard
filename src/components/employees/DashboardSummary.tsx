import React from 'react';
import { useEmployees } from '@/context/EmployeeContext';
import { Users, UserCheck, UserX } from 'lucide-react';

export const DashboardSummary: React.FC = () => {
  const { stats } = useEmployees();

  const cards = [
    {
      title: 'Total Employees',
      value: stats.total,
      icon: Users,
      className: 'stat-card-total',
      iconColor: 'text-primary',
    },
    {
      title: 'Active Employees',
      value: stats.active,
      icon: UserCheck,
      className: 'stat-card-active',
      iconColor: 'text-success',
    },
    {
      title: 'Inactive Employees',
      value: stats.inactive,
      icon: UserX,
      className: 'stat-card-inactive',
      iconColor: 'text-muted-foreground',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {cards.map((card, index) => (
        <div
          key={card.title}
          className={`p-6 rounded-xl border card-shadow bg-card transition-all hover:card-shadow-lg animate-fade-in-up`}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                {card.title}
              </p>
              <p className="text-3xl font-bold text-card-foreground">
                {card.value}
              </p>
            </div>
            <div className={`p-3 rounded-xl ${card.className}`}>
              <card.icon className={`w-6 h-6 ${card.iconColor}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
