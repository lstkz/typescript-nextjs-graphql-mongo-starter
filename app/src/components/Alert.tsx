import React from 'react';
import 'twin.macro';

interface AlertProps {
  children: React.ReactNode;
}

export function Alert(props: AlertProps) {
  const { children } = props;
  return (
    <div tw="rounded-md px-4 py-2 text-center bg-red-600 text-white">
      {children}
    </div>
  );
}
