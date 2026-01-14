export interface Employee {
  id: string;
  name: string;
  gender: 'Male' | 'Female' | 'Other';
  dob: string;
  state: string;
  image: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface EmployeeFormData {
  name: string;
  gender: 'Male' | 'Female' | 'Other';
  dob: string;
  state: string;
  image: string;
  active: boolean;
}

export interface EmployeeFilters {
  search: string;
  gender: string;
  status: string;
}
