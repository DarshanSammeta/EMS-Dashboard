import React from 'react';
import { Employee } from '@/types/employee';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Edit, Trash2, Printer, User } from 'lucide-react';
import { format } from 'date-fns';

interface EmployeeRowProps {
  employee: Employee;
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
  onToggleStatus: (id: string) => void;
  onPrint: (employee: Employee) => void;
}

export const EmployeeRow: React.FC<EmployeeRowProps> = ({
  employee,
  onEdit,
  onDelete,
  onToggleStatus,
  onPrint,
}) => {
  return (
    <tr className="hover:bg-muted/50 transition-colors">
      <td className="px-4 py-3 text-sm font-medium text-muted-foreground">
        {employee.id}
      </td>
      <td className="px-4 py-3">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-muted flex items-center justify-center">
          {employee.image ? (
            <img
              src={employee.image}
              alt={employee.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="w-5 h-5 text-muted-foreground" />
          )}
        </div>
      </td>
      <td className="px-4 py-3">
        <p className="font-medium text-card-foreground">{employee.name}</p>
      </td>
      <td className="px-4 py-3 text-sm text-muted-foreground">
        {employee.gender}
      </td>
      <td className="px-4 py-3 text-sm text-muted-foreground">
        {format(new Date(employee.dob), 'MMM dd, yyyy')}
      </td>
      <td className="px-4 py-3 text-sm text-muted-foreground">
        {employee.state}
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <Switch
            checked={employee.active}
            onCheckedChange={() => onToggleStatus(employee.id)}
            className="data-[state=checked]:bg-success"
          />
          <span className={`text-xs font-medium ${
            employee.active ? 'text-success' : 'text-muted-foreground'
          }`}>
            {employee.active ? 'Active' : 'Inactive'}
          </span>
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(employee)}
            className="h-8 w-8 text-muted-foreground hover:text-primary"
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(employee)}
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onPrint(employee)}
            className="h-8 w-8 text-muted-foreground hover:text-primary"
          >
            <Printer className="w-4 h-4" />
          </Button>
        </div>
      </td>
    </tr>
  );
};
