import { useState, type ChangeEvent } from "react";

export function useForm<T>(initialState: T) {
  const [values, setValues] = useState<T>(initialState);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleValueChange = (name: keyof T, value: any) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return {
    values,
    setValues,
    handleInputChange,
    handleValueChange,
    isSubmitting,
    setIsSubmitting,
  };
}
