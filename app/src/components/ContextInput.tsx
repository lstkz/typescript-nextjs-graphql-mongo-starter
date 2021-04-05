import React from 'react';
import tw from 'twin.macro';
import { useContextMethods } from '../hooks/useContextMethods';
import { Input, InputProps } from './Input';

interface ContextInputProps extends InputProps {
  name: string;
}

export function ContextInput(props: ContextInputProps) {
  const { name, ...rest } = props;
  const { value, error, hasError, updateValue, blur } = useContextMethods({
    name,
  });
  return (
    <div className="w-full">
      <Input
        {...rest}
        name={name}
        value={value?.toString() ?? ''}
        onBlur={blur}
        onChange={e => {
          updateValue(e.target.value);
        }}
      />
      {hasError && (
        <div css={tw`text-red-500 mt-1 text-sm font-medium`}>{error}</div>
      )}
    </div>
  );
}
