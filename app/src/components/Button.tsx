import React from 'react';
import tw from 'twin.macro';

interface ButtonProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  type: 'primary';
  htmlType?: 'submit';
}

export function Button(props: ButtonProps) {
  const { htmlType, type, ...rest } = props;
  return (
    <div>
      <button
        css={[
          tw`rounded-md px-4 py-2`,
          type === 'primary' && [
            tw`text-white bg-blue-600 transition-all`,
            tw`hover:( bg-blue-700 )`,
            tw`focus:( bg-blue-800 outline-none ring-2 ring-blue-400 )`,
          ],
        ]}
        type={htmlType}
        {...rest}
      />
    </div>
  );
}
