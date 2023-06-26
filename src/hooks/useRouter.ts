import { useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

interface Router {
  push: (path: string) => void;
  replace: (path: string) => void;
  query: URLSearchParams;
  pathname: string;
  params: { [param: string]: string };
  search: string;
  hash: string;
}

const useRouter = (): Router => {
  const location = useLocation();
  const params = useParams<{ [param: string]: string }>();
  const navigate = useNavigate();

  return useMemo(() => {
    const push = (path: string) => navigate(path);
    const replace = (path: string) => navigate(path, { replace: true });
    const query = new URLSearchParams(location.search);

    return {
      push,
      replace,
      query,
      pathname: location.pathname,
      params,
      search: location.search,
      hash: location.hash,
    } as Router;
  }, [location, navigate, params]);
};

export default useRouter;
