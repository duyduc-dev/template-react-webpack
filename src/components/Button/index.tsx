import * as React from 'react';

interface MyButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

function MyButton(props: MyButtonProps) {
  const { children, ...restProps } = props;

  return (
    <div>
      <button {...restProps}>{children}</button>
    </div>
  );
}

export default MyButton;
