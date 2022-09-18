import { RecoilValue, useRecoilRefresher_UNSTABLE } from 'recoil';

const useRecoilCacheRefresh = (state: RecoilValue<any>) => {
  const refresher = useRecoilRefresher_UNSTABLE(state);
  return refresher;
};

export default useRecoilCacheRefresh;
