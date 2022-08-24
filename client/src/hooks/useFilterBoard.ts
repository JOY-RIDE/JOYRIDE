import { useCallback } from 'react';
import { useSetRecoilState, RecoilState, useResetRecoilState } from 'recoil';
import { FilterClickHandler, FiltersDispatch } from 'types/common';
import { MeetupFiltersState } from 'types/meetup';

type FiltersState = MeetupFiltersState; // TODO: 코스 state 추가
interface FiltersDispatches {
  choose: FiltersDispatch<FiltersState>;
  remove: FiltersDispatch<FiltersState>;
  toggle: FiltersDispatch<FiltersState>;
  clear: FiltersDispatch<FiltersState>;
}

export const useFilterBoard = (
  state: RecoilState<FiltersState>,
  { choose, remove, toggle, clear }: FiltersDispatches
) => {
  const setFilters = useSetRecoilState(state);
  const resetFilterBoard = useResetRecoilState(state);

  const chooseOption: FilterClickHandler = useCallback(
    payload => setFilters(filters => choose(filters, payload)),
    []
  );
  const removeOption: FilterClickHandler = useCallback(
    payload => setFilters(filters => remove(filters, payload)),
    []
  );
  const toggleOption: FilterClickHandler = payload =>
    setFilters(filters => toggle(filters, payload));
  const clearOptions: FilterClickHandler = useCallback(
    payload => setFilters(filters => clear(filters, payload)),
    []
  );

  return {
    chooseOption,
    removeOption,
    toggleOption,
    clearOptions,
    resetFilterBoard,
  };
};

export default useFilterBoard;
