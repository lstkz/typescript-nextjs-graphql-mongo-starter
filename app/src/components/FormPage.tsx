import React from 'react';
import 'twin.macro';

interface FormPageProps {
  title: string;
  children: React.ReactNode;
}

export function FormPage(props: FormPageProps) {
  const { title, children } = props;
  return (
    <div tw="max-w-sm mx-auto mt-20 border border-gray-300 rounded-lg p-8 my-auto">
      <div tw="text-center text-3xl text-gray-800 font-bold">{title}</div>
      {children}
    </div>
  );
}
