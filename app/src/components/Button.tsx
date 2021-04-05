import React from 'react';
import tw from 'twin.macro';
import { SpinnerBoarder } from './SpinnerBoarder';

interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  type: 'primary';
  htmlType?: 'submit';
  block?: boolean;
  icon?: React.ReactNode;
  loading?: boolean;
  size?: 'small';
}

export function Button(props: ButtonProps) {
  const {
    htmlType,
    type,
    block,
    loading,
    icon,
    children,
    disabled,
    size,
    ...rest
  } = props;

  const inner = (
    <>
      {(loading || icon) && (
        <div className="mr-3 flex items-center">
          {loading ? <SpinnerBoarder size="sm" /> : icon}
        </div>
      )}
      {children}
    </>
  );
  const isDisabled = loading || disabled;
  return (
    <button
      disabled={isDisabled}
      css={[
        tw`rounded-md px-4 py-2 transition-all inline-flex justify-center items-center`,
        tw`focus:( ring-indigo-400 outline-none ring-2 )`,
        block && tw`w-full`,
        isDisabled && tw`hover:cursor-default`,
        type === 'primary' && [
          tw`text-white bg-indigo-500 `,
          tw`hover:( bg-indigo-600 )`,
          tw`focus:( focus:ring-offset-2 bg-indigo-600 )`,
          isDisabled && tw`bg-indigo-400!`,
        ],
        size === 'small' && tw`text-sm px-2 py-1 rounded`,
      ]}
      type={htmlType}
      {...rest}
    >
      {inner}
    </button>
  );
}
