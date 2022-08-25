import { useSetRecoilState, RecoilState, useResetRecoilState } from 'recoil';
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
  const setFilters = useSetRecoilState(recoilState);

  const handleChoose: FilterClickHandler = payload =>
    setFilters(filters => choose(filters, payload));
  const handleRemove: FilterClickHandler = payload =>
    setFilters(filters => remove(filters, payload));
  const handleToggle: FilterClickHandler = payload =>
    setFilters(filters => toggle(filters, payload));
  const handleClear: FilterClickHandler = payload =>
    setFilters(filters => clear(filters, payload));
  const handleReset = useResetRecoilState(recoilState);

  return {
    handleChoose,
    handleRemove,
    handleToggle,
    handleClear,
    handleReset,
  };
};

export default useClientFilter;
