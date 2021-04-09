import React from 'react';
import tw from 'twin.macro';

interface ButtonProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  type: 'primary';
  htmlType?: 'submit';
  block?: boolean;
}

export function Button(props: ButtonProps) {
  const { htmlType, type, block, ...rest } = props;
  return (
    <div>
      <button
        css={[
          tw`rounded-md px-4 py-2 transition-all`,
          tw`focus:( ring-indigo-400 outline-none ring-2 )`,
          block && tw`w-full`,
          type === 'primary' && [
            tw`text-white bg-indigo-500 `,
            tw`hover:( bg-indigo-600 )`,
            tw`focus:( focus:ring-offset-2 bg-indigo-600 )`,
          ],
        ]}
        type={htmlType}
        {...rest}
      />
    </div>
  );
}
