import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'number' | 'textarea' | 'select' | 'switch';
  required?: boolean;
  options?: string[];
  min?: number;
  max?: number;
}

interface FormComponentProps {
  fields: FormField[];
  initialData?: any;
  onSubmit: (data: any) => void;
  isLoading?: boolean;
  mode?: 'edit' | 'create';
}

export function FormComponent({ fields, initialData, onSubmit, isLoading, mode = 'create' }: FormComponentProps) {
  const [formData, setFormData] = useState(initialData || {});
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  useEffect(() => {
    console.log('FormComponent - initialData received:', initialData);
    console.log('FormComponent - fields:', fields);
    
    if (initialData) {
      const newData = { ...initialData };
      fields.forEach(f => {
        if (f.type === 'number' && typeof newData[f.name] === 'string') {
          newData[f.name] = Number(newData[f.name]);
        }
      });
      console.log('FormComponent - setting formData:', newData);
      setFormData(newData);
    } else {
      console.log('FormComponent - no initialData, setting empty formData');
      setFormData({});
    }
  }, [initialData, fields]);

  console.log('FormComponent - current formData:', formData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    let cleanData = { ...formData };
    if ('proficiency' in cleanData) {
      cleanData.proficiency = Number(cleanData.proficiency);
    }
    delete cleanData.id;
    delete cleanData.createdAt;
    console.log('Form submitted with data:', cleanData);
    onSubmit(cleanData);
  };

  const handleChange = (name: string, value: any) => {
    setFormData((prev: any) => {
      const fieldDef = fields.find(f => f.name === name);
      if (fieldDef && fieldDef.type === 'number') {
        return { ...prev, [name]: value === '' ? '' : Number(value) };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleFileChange = async (name: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingField(name);
    const formDataFile = new FormData();
    formDataFile.append("file", file);
    const res = await fetch("/api/upload/profile-photo", {
      method: "POST",
      body: formDataFile,
    });
    const data = await res.json();
    setFormData((prev: any) => ({ ...prev, [name]: data.url }));
    setUploadingField(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {fields.map((field) => {
        const isImageField = field.name.toLowerCase().includes('image') || field.name.toLowerCase().includes('photo');
        return (
          <div key={field.name} className="space-y-2">
            <Label htmlFor={field.name} className="text-foreground font-medium">
              {field.label}
              {field.required && <span className="text-destructive ml-1">*</span>}
            </Label>
            {isImageField ? (
              <>
                <input
                  type="file"
                  accept="image/*"
                  ref={el => fileInputRefs.current[field.name] = el}
                  onChange={e => handleFileChange(field.name, e)}
                  className="mt-2"
                  disabled={uploadingField === field.name}
                />
                {uploadingField === field.name && <span className="text-xs text-muted-foreground">Uploading...</span>}
                {formData[field.name] && (
                  <img src={formData[field.name]} alt="Preview" className="mt-2 rounded w-full max-h-48 object-contain border" />
                )}
              </>
            ) : field.type === 'textarea' ? (
              <Textarea
                id={field.name}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={(e) => handleChange(field.name, e.target.value)}
                required={field.required}
                className="form-input-solid placeholder:text-muted-foreground"
                autoComplete="off"
              />
            ) : field.type === 'select' ? (
              <Select value={formData[field.name] || ''} onValueChange={(value) => handleChange(field.name, value)}>
                <SelectTrigger id={field.name} name={field.name} className="form-input-solid">
                  <SelectValue placeholder={`Select ${field.label}`} />
                </SelectTrigger>
                <SelectContent className="form-input-solid">
                  {field.options?.map((option) => (
                    <SelectItem key={option} value={option} className="text-foreground hover:bg-gray-100 dark:hover:bg-gray-700">
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : field.type === 'switch' ? (
              <div className="flex items-center space-x-2">
                <Switch
                  id={field.name}
                  name={field.name}
                  checked={formData[field.name] || false}
                  onCheckedChange={(checked) => handleChange(field.name, checked)}
                />
                <Label htmlFor={field.name} className="text-sm text-muted-foreground">
                  {formData[field.name] ? 'Enabled' : 'Disabled'}
                </Label>
              </div>
            ) : (
              <Input
                id={field.name}
                name={field.name}
                type={field.type}
                value={formData[field.name] || ''}
                onChange={(e) => handleChange(field.name, field.type === 'number' ? Number(e.target.value) : e.target.value)}
                required={field.required}
                min={field.min}
                max={field.max}
                className="form-input-solid placeholder:text-muted-foreground"
                autoComplete="off"
              />
            )}
          </div>
        );
      })}
      
      <div className="flex justify-end space-x-2 pt-4 relative z-50">
        <Button 
          type="submit"
          disabled={isLoading} 
          className="bg-primary hover:bg-primary/90 text-primary-foreground relative z-50 cursor-pointer"
          style={{ 
            pointerEvents: 'auto',
            position: 'relative',
            zIndex: 9999,
            cursor: isLoading ? 'not-allowed' : 'pointer'
          }}
        >
          {isLoading ? 'Saving...' : (mode === 'edit' ? 'Update' : 'Create')}
        </Button>
      </div>
    </form>
  );
} 