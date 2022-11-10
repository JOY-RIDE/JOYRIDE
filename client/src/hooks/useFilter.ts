import { useCallback } from 'react';
import { RecoilState, useResetRecoilState, useRecoilState } from 'recoil';
import { FiltersDispatch, FiltersReducer } from 'types/common';
import { MeetupFiltersState } from 'types/meetup';
import { CourseFiltersState } from 'types/course';

// TODO
type FiltersState = MeetupFiltersState & CourseFiltersState;
interface FiltersReducers {
  choose: FiltersReducer<FiltersState>;
  remove: FiltersReducer<FiltersState>;
  toggle: FiltersReducer<FiltersState>;
  clear: FiltersReducer<FiltersState>;
}

export const useFilter = (
  recoilState: RecoilState<FiltersState>,
  { choose, remove, toggle, clear }: FiltersReducers
) => {
  const [filters, setFilters] = useRecoilState(recoilState);

  // const handleChoose = useRecoilTransaction_UNSTABLE(
  //   ({ get, set }) =>
  //     (payload: FiltersReducerPayload) => {
  //       set(recoilState, result);
  //     }
  // );
  const handleChoose: FiltersDispatch = useCallback(
    payload => setFilters(filters => choose(filters, payload)),
    []
  );
  const handleRemove: FiltersDispatch = useCallback(
    payload => setFilters(filters => remove(filters, payload)),
    []
  );
  const handleToggle: FiltersDispatch = payload =>
    setFilters(filters => toggle(filters, payload));
  const handleClear: FiltersDispatch = useCallback(
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

export default useFilter;
