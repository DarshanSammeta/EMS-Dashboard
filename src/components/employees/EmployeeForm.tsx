import React, { useState, useEffect } from 'react';
import { Employee, EmployeeFormData } from '@/types/employee';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { INDIAN_STATES, GENDERS } from '@/utils/constants';
import { Upload, User } from 'lucide-react';

interface EmployeeFormProps {
  employee?: Employee | null;
  onSubmit: (data: EmployeeFormData) => void;
  onCancel: () => void;
}

export const EmployeeForm: React.FC<EmployeeFormProps> = ({
  employee,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<EmployeeFormData>({
    name: '',
    gender: 'Male',
    dob: '',
    state: '',
    image: '',
    active: true,
  });
  const [imagePreview, setImagePreview] = useState<string>('');

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name,
        gender: employee.gender,
        dob: employee.dob,
        state: employee.state,
        image: employee.image,
        active: employee.active,
      });
      setImagePreview(employee.image);
    }
  }, [employee]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setFormData(prev => ({ ...prev, image: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Image Upload */}
      <div className="flex flex-col items-center">
        <div className="relative w-24 h-24 mb-3">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-full rounded-full object-cover border-2 border-primary/20"
            />
          ) : (
            <div className="w-full h-full rounded-full bg-muted flex items-center justify-center border-2 border-dashed border-border">
              <User className="w-8 h-8 text-muted-foreground" />
            </div>
          )}
          <label
            htmlFor="image-upload"
            className="absolute bottom-0 right-0 p-2 bg-primary rounded-full cursor-pointer hover:bg-primary/90 transition-colors"
          >
            <Upload className="w-3 h-3 text-primary-foreground" />
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
        <p className="text-xs text-muted-foreground">Upload profile photo</p>
      </div>

      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name">Full Name *</Label>
        <Input
          id="name"
          type="text"
          placeholder="Enter full name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          required
        />
      </div>

      {/* Gender */}
      <div className="space-y-2">
        <Label>Gender *</Label>
        <div className="flex gap-4">
          {GENDERS.map(gender => (
            <label
              key={gender}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition-colors ${
                formData.gender === gender
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <input
                type="radio"
                name="gender"
                value={gender}
                checked={formData.gender === gender}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  gender: e.target.value as typeof formData.gender 
                }))}
                className="sr-only"
              />
              <span className="text-sm font-medium">{gender}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Date of Birth */}
      <div className="space-y-2">
        <Label htmlFor="dob">Date of Birth *</Label>
        <Input
          id="dob"
          type="date"
          value={formData.dob}
          onChange={(e) => setFormData(prev => ({ ...prev, dob: e.target.value }))}
          max={new Date().toISOString().split('T')[0]}
          required
        />
      </div>

      {/* State */}
      <div className="space-y-2">
        <Label>State *</Label>
        <Select
          value={formData.state}
          onValueChange={(value) => setFormData(prev => ({ ...prev, state: value }))}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Select state" />
          </SelectTrigger>
          <SelectContent>
            {INDIAN_STATES.map(state => (
              <SelectItem key={state} value={state}>{state}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Active Status */}
      <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
        <div>
          <Label htmlFor="active" className="text-sm font-medium">
            Active Status
          </Label>
          <p className="text-xs text-muted-foreground mt-0.5">
            Set employee as active or inactive
          </p>
        </div>
        <Switch
          id="active"
          checked={formData.active}
          onCheckedChange={(checked) => setFormData(prev => ({ ...prev, active: checked }))}
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button type="submit" className="flex-1">
          {employee ? 'Update Employee' : 'Add Employee'}
        </Button>
      </div>
    </form>
  );
};
