import * as React from 'react';

import MyButton from '~/components/Button';
import Router from '~/constants/router';
import useRouter from '~/hooks/useRouter';

const Content: React.FC = () => {
  const router = useRouter();
  return (
    <div>
      Content
      <MyButton onClick={() => router.push(Router.HOME)}>Home</MyButton>
    </div>
  );
};

export default Content;
