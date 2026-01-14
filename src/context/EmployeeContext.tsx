import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Employee, EmployeeFormData, EmployeeFilters } from '@/types/employee';
import { STORAGE_KEYS, getItem, setItem } from '@/utils/localStorage';

interface EmployeeContextType {
  employees: Employee[];
  filteredEmployees: Employee[];
  filters: EmployeeFilters;
  addEmployee: (data: EmployeeFormData) => void;
  updateEmployee: (id: string, data: EmployeeFormData) => void;
  deleteEmployee: (id: string) => void;
  toggleEmployeeStatus: (id: string) => void;
  setFilters: (filters: Partial<EmployeeFilters>) => void;
  getEmployeeById: (id: string) => Employee | undefined;
  stats: {
    total: number;
    active: number;
    inactive: number;
  };
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

const generateId = (): string => {
  const num = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `EMP${num}`;
};

const SAMPLE_EMPLOYEES: Employee[] = [
  {
    id: 'EMP001',
    name: 'Rahul Sharma',
    gender: 'Male',
    dob: '1995-04-12',
    state: 'Maharashtra',
    image: '',
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'EMP002',
    name: 'Priya Patel',
    gender: 'Female',
    dob: '1992-08-25',
    state: 'Gujarat',
    image: '',
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'EMP003',
    name: 'Amit Kumar',
    gender: 'Male',
    dob: '1988-12-03',
    state: 'Delhi',
    image: '',
    active: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'EMP004',
    name: 'Sneha Reddy',
    gender: 'Female',
    dob: '1997-06-18',
    state: 'Telangana',
    image: '',
    active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const EmployeeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filters, setFiltersState] = useState<EmployeeFilters>({
    search: '',
    gender: '',
    status: '',
  });

  useEffect(() => {
    const savedEmployees = getItem<Employee[]>(STORAGE_KEYS.EMPLOYEES, []);
    if (savedEmployees.length === 0) {
      setEmployees(SAMPLE_EMPLOYEES);
      setItem(STORAGE_KEYS.EMPLOYEES, SAMPLE_EMPLOYEES);
    } else {
      setEmployees(savedEmployees);
    }
  }, []);

  const saveEmployees = useCallback((newEmployees: Employee[]) => {
    setEmployees(newEmployees);
    setItem(STORAGE_KEYS.EMPLOYEES, newEmployees);
  }, []);

  const addEmployee = useCallback((data: EmployeeFormData) => {
    const newEmployee: Employee = {
      ...data,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    saveEmployees([...employees, newEmployee]);
  }, [employees, saveEmployees]);

  const updateEmployee = useCallback((id: string, data: EmployeeFormData) => {
    const updated = employees.map(emp =>
      emp.id === id
        ? { ...emp, ...data, updatedAt: new Date().toISOString() }
        : emp
    );
    saveEmployees(updated);
  }, [employees, saveEmployees]);

  const deleteEmployee = useCallback((id: string) => {
    const filtered = employees.filter(emp => emp.id !== id);
    saveEmployees(filtered);
  }, [employees, saveEmployees]);

  const toggleEmployeeStatus = useCallback((id: string) => {
    const updated = employees.map(emp =>
      emp.id === id
        ? { ...emp, active: !emp.active, updatedAt: new Date().toISOString() }
        : emp
    );
    saveEmployees(updated);
  }, [employees, saveEmployees]);

  const setFilters = useCallback((newFilters: Partial<EmployeeFilters>) => {
    setFiltersState(prev => ({ ...prev, ...newFilters }));
  }, []);

  const getEmployeeById = useCallback((id: string): Employee | undefined => {
    return employees.find(emp => emp.id === id);
  }, [employees]);

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(filters.search.toLowerCase());
    const matchesGender = !filters.gender || emp.gender === filters.gender;
    const matchesStatus = !filters.status || 
      (filters.status === 'active' ? emp.active : !emp.active);
    
    return matchesSearch && matchesGender && matchesStatus;
  });

  const stats = {
    total: employees.length,
    active: employees.filter(emp => emp.active).length,
    inactive: employees.filter(emp => !emp.active).length,
  };

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        filteredEmployees,
        filters,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        toggleEmployeeStatus,
        setFilters,
        getEmployeeById,
        stats,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployees = (): EmployeeContextType => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error('useEmployees must be used within an EmployeeProvider');
  }
  return context;
};
