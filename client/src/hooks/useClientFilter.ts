import { useCallback } from 'react';
import { RecoilState, useResetRecoilState, useRecoilState } from 'recoil';
import { FilterClickHandler, FiltersDispatch } from 'types/common';
import { MeetupFiltersState } from 'types/meetup';

type FiltersState = MeetupFiltersState; // TODO: 코스 필터 state type 추가
interface FiltersDispatches {
  choose: FiltersDispatch<FiltersState>;
  remove: FiltersDispatch<FiltersState>;
  toggle: FiltersDispatch<FiltersState>;
  clear: FiltersDispatch<FiltersState>;
}

export const useClientFilter = (
  recoilState: RecoilState<FiltersState>,
  { choose, remove, toggle, clear }: FiltersDispatches
) => {
  const [filters, setFilters] = useRecoilState(recoilState);

  // const handleChoose = useRecoilTransaction_UNSTABLE(
  //   ({ get, set }) =>
  //     (payload: FiltersDispatchPayload) => {
  //       set(recoilState, result);
  //     }
  // );
  const handleChoose: FilterClickHandler = useCallback(
    payload => setFilters(filters => choose(filters, payload)),
    []
  );
  const handleRemove: FilterClickHandler = useCallback(
    payload => setFilters(filters => remove(filters, payload)),
    []
  );
  const handleToggle: FilterClickHandler = payload =>
    setFilters(filters => toggle(filters, payload));
  const handleClear: FilterClickHandler = useCallback(
    payload => setFilters(filters => clear(filters, payload)),
    []
  );
  const handleReset = useResetRecoilState(recoilState);

  return {
    filters,
    handleChoose,
    handleRemove,
    handleToggle,
    handleClear,
    handleReset,
  };
};

export default useClientFilter;
