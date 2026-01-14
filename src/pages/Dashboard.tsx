import React from 'react';
import { Header } from '@/components/layout/Header';
import { DashboardSummary } from '@/components/employees/DashboardSummary';
import { Filters } from '@/components/employees/Filters';
import { EmployeeList } from '@/components/employees/EmployeeList';
import { EmployeeProvider } from '@/context/EmployeeContext';

const Dashboard: React.FC = () => {
  return (
    <EmployeeProvider>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground mb-1">Dashboard</h1>
            <p className="text-muted-foreground">
              Manage and monitor your employee records
            </p>
          </div>

          <DashboardSummary />
          <Filters />
          <EmployeeList />
        </main>
      </div>
    </EmployeeProvider>
  );
};

export default Dashboard;
