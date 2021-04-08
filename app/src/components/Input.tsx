import React from 'react';
import tw from 'twin.macro';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input(props: InputProps) {
  const { ...rest } = props;
  return (
    <div>
      <input
        type="text"
        css={[
          tw`border border-gray-300 rounded py-2 px-4 w-full text-gray-600 placeholder-gray-400`,
          tw`focus:( outline-none ring-2 ring-indigo-400 shadow-lg focus:ring-offset-2)`,
        ]}
        {...rest}
      />
    </div>
  );
}
