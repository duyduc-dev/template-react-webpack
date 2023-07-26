import * as React from 'react';

import MyButton from '@/components/Button';
import Router from '@/constants/router';
import useRouter from '@/hooks/useRouter';

const Home: React.FC = () => {
  const router = useRouter();

  return (
    <div>
      Home
      <MyButton onClick={() => router.push(Router.CONTENT)}>Navigate</MyButton>
    </div>
  );
};

export default Home;
