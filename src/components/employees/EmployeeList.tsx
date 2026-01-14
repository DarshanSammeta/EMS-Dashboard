import React, { useState, useRef } from 'react';
import { useEmployees } from '@/context/EmployeeContext';
import { Employee, EmployeeFormData } from '@/types/employee';
import { EmployeeRow } from './EmployeeRow';
import { EmployeeForm } from './EmployeeForm';
import { Modal } from '@/components/common/Modal';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { Button } from '@/components/ui/button';
import { Plus, Printer, Users } from 'lucide-react';
import { format } from 'date-fns';

export const EmployeeList: React.FC = () => {
  const { 
    filteredEmployees, 
    addEmployee, 
    updateEmployee, 
    deleteEmployee,
    toggleEmployeeStatus 
  } = useEmployees();
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [deletingEmployee, setDeletingEmployee] = useState<Employee | null>(null);
  const printRef = useRef<HTMLDivElement>(null);

  const handleAddClick = () => {
    setEditingEmployee(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (employee: Employee) => {
    setEditingEmployee(employee);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (employee: Employee) => {
    setDeletingEmployee(employee);
  };

  const handleFormSubmit = (data: EmployeeFormData) => {
    if (editingEmployee) {
      updateEmployee(editingEmployee.id, data);
    } else {
      addEmployee(data);
    }
    setIsFormOpen(false);
    setEditingEmployee(null);
  };

  const handleDeleteConfirm = () => {
    if (deletingEmployee) {
      deleteEmployee(deletingEmployee.id);
      setDeletingEmployee(null);
    }
  };

  const handlePrintSingle = (employee: Employee) => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Employee Details - ${employee.name}</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 40px; }
              .header { text-align: center; margin-bottom: 30px; }
              .avatar { width: 100px; height: 100px; border-radius: 50%; object-fit: cover; margin: 0 auto 20px; display: block; }
              .details { max-width: 400px; margin: 0 auto; }
              .row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
              .label { font-weight: bold; color: #666; }
              .status { padding: 4px 12px; border-radius: 20px; font-size: 12px; }
              .active { background: #dcfce7; color: #16a34a; }
              .inactive { background: #f3f4f6; color: #6b7280; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>Employee Details</h1>
            </div>
            ${employee.image ? `<img src="${employee.image}" class="avatar" alt="${employee.name}">` : ''}
            <div class="details">
              <div class="row"><span class="label">ID:</span><span>${employee.id}</span></div>
              <div class="row"><span class="label">Name:</span><span>${employee.name}</span></div>
              <div class="row"><span class="label">Gender:</span><span>${employee.gender}</span></div>
              <div class="row"><span class="label">Date of Birth:</span><span>${format(new Date(employee.dob), 'MMM dd, yyyy')}</span></div>
              <div class="row"><span class="label">State:</span><span>${employee.state}</span></div>
              <div class="row"><span class="label">Status:</span><span class="status ${employee.active ? 'active' : 'inactive'}">${employee.active ? 'Active' : 'Inactive'}</span></div>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const handlePrintAll = () => {
    window.print();
  };

  return (
    <>
      <div className="bg-card rounded-xl border card-shadow animate-fade-in">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-card-foreground">Employees</h2>
              <p className="text-sm text-muted-foreground">
                {filteredEmployees.length} {filteredEmployees.length === 1 ? 'record' : 'records'} found
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handlePrintAll}
              className="no-print"
            >
              <Printer className="w-4 h-4 mr-2" />
              Print All
            </Button>
            <Button onClick={handleAddClick} className="no-print">
              <Plus className="w-4 h-4 mr-2" />
              Add Employee
            </Button>
          </div>
        </div>

        {filteredEmployees.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="p-4 rounded-full bg-muted mb-4">
              <Users className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-card-foreground mb-1">
              No employees found
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Try adjusting your filters or add a new employee
            </p>
            <Button onClick={handleAddClick} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add First Employee
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto" ref={printRef}>
            <table className="w-full print-table">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Photo
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Gender
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    DOB
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    State
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider no-print">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredEmployees.map((employee) => (
                  <EmployeeRow
                    key={employee.id}
                    employee={employee}
                    onEdit={handleEditClick}
                    onDelete={handleDeleteClick}
                    onToggleStatus={toggleEmployeeStatus}
                    onPrint={handlePrintSingle}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingEmployee(null);
        }}
        title={editingEmployee ? 'Edit Employee' : 'Add New Employee'}
        size="lg"
      >
        <EmployeeForm
          employee={editingEmployee}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingEmployee(null);
          }}
        />
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deletingEmployee}
        onClose={() => setDeletingEmployee(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Employee"
        message={`Are you sure you want to delete ${deletingEmployee?.name}? This action cannot be undone.`}
        confirmText="Delete"
        variant="danger"
      />
    </>
  );
};
