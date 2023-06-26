import * as React from 'react';

interface EmptyLayoutProps {
  children?: React.ReactNode;
}

function EmptyLayout(props: EmptyLayoutProps) {
  const { children } = props;

  return <>{children}</>;
}

export default EmptyLayout;
