import React from 'react';
import { useFormContext } from 'react-hook-form';

interface UseContextMethodsOptions {
  name: string;
}

export function useContextMethods(options: UseContextMethodsOptions) {
  const { name } = options;
  const { register, watch, setValue, formState } = useFormContext<any>();
  const { errors } = formState;
  React.useEffect(() => {
    register(name);
  }, []);
  const value = watch(name);
  const error = errors[name]?.message;
  const hasError =
    (formState.isSubmitted || formState.dirtyFields[name]) && !!error;
  const updateValue = (newValue: any) => {
    setValue(name, newValue, {
      shouldValidate: true,
    });
  };
  const blur = () => {
    setValue(name, value, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return {
    value,
    error,
    hasError,
    updateValue,
    blur,
  };
}
