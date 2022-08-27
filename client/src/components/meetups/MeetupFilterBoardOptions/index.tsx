import CheckBox from 'components/common/CheckBox';
import styles from './MeetupFilterBoardOptions.module.scss';
import classNames from 'classnames/bind';
import {
  AGES,
  BICYCLE_TYPE_OPTIONS,
  GENDERS,
  LOCATIONS,
  MEETUP_PATH_DIFFICULTY_OPTIONS,
  RIDING_SKILL_OPTIONS,
} from 'utils/constants';
import OptionChip from 'components/common/OptionChip';
import {
  stringifyAge,
  stringifyDifficulty,
  stringifyGender,
} from 'utils/stringify';
import { useCallback, useEffect } from 'react';
import { FilterOptionData, FiltersReducerPayload } from 'types/common';
import { meetupBoardFiltersState } from 'states/meetup';
import { ChangeHandler, ClickHandler } from 'types/callback';
import PlusMinusButton from 'components/common/PlusMinusButton';
import useClientFilter from 'hooks/useClientFilter';
import { MEETUP_FILTERS_REDUCERS } from 'utils/filter';

const cn = classNames.bind(styles);

const IS_PARTICIPATION_FREE_PAYLOAD: FiltersReducerPayload = {
  key: 'isParticipationFree',
  value: true,
  content: '참가비 없는 모임만',
};

const MeetupFilterBoardOptions = () => {
  const {
    filters: boardFilters,
    handleChoose,
    handleRemove,
    handleToggle,
    handleClear,
  } = useClientFilter(meetupBoardFiltersState, MEETUP_FILTERS_REDUCERS);

  useEffect(() => {
    const min = boardFilters.minNumOfParticipants.value;
    if (min <= boardFilters.maxNumOfParticipants.value) return;
    handleChoose({
      key: 'maxNumOfParticipants',
      value: min,
      content: `${min}`,
    });
  }, [boardFilters.minNumOfParticipants.value]);

  const toggleSpecificOption = useCallback(
    (payload: FiltersReducerPayload) => () => handleToggle(payload),
    []
  );

  const handleNumOfParticipantsDecrease: ClickHandler<
    HTMLButtonElement
  > = e => {
    if (!(e.currentTarget instanceof HTMLButtonElement)) return;
    const { name: key } = e.currentTarget;
    if (key !== 'minNumOfParticipants' && key !== 'maxNumOfParticipants')
      return;

    const oldValue = boardFilters[key].value;
    if (!oldValue) return;
    handleChoose({
      key,
      value: oldValue - 1,
      content: `${oldValue - 1}`,
    });
  };

  const handleNumOfParticipantsIncrease: ClickHandler<
    HTMLButtonElement
  > = e => {
    if (!(e.currentTarget instanceof HTMLButtonElement)) return;
    const { name: key } = e.currentTarget;
    if (key !== 'minNumOfParticipants' && key !== 'maxNumOfParticipants')
      return;

    const oldValue = boardFilters[key].value;
    if (oldValue === 99) return;
    handleChoose({
      key,
      value: oldValue + 1,
      content: `${oldValue + 1}`,
    });
  };

  const handleNumOfParticipantsChange: ChangeHandler = e => {
    const { name: key, value, max } = e.target;
    if (key !== 'minNumOfParticipants' && key !== 'maxNumOfParticipants') {
      return;
    }
    const input = Number(value);
    if (Number(max) < input) return;

    e.target.value = '';
    handleChoose({
      key,
      value: input,
      content: `${input}`,
    });
  };

  return (
    <div className={cn('filters')}>
      <div className={cn('filter')}>
        <label className={cn('label')}>지역</label>
        <ul className={cn('options')}>
          <OptionChip
            type="all"
            filtersKey="location"
            content="전체"
            isActive={!boardFilters.location}
            onTextClick={handleClear}
          />
          {LOCATIONS.map(location => (
            <OptionChip
              key={location}
              type="default"
              filtersKey="location"
              value={location}
              content={location}
              isActive={location === boardFilters.location?.value}
              onTextClick={handleChoose}
              onXClick={handleRemove}
            />
          ))}
        </ul>
      </div>

      <div className={cn('filter')}>
        <label className={cn('label')}>코스 난이도</label>
        <ul className={cn('options')}>
          <OptionChip
            type="all"
            filtersKey="pathDifficulty"
            content="전체"
            isActive={!boardFilters.pathDifficulty}
            onTextClick={handleClear}
          />
          {MEETUP_PATH_DIFFICULTY_OPTIONS.map(option => (
            <OptionChip
              key={option.value}
              type="default"
              filtersKey="pathDifficulty"
              value={option.value}
              content={option.content}
              isActive={option.value === boardFilters.pathDifficulty?.value}
              onTextClick={handleChoose}
              onXClick={handleRemove}
            />
          ))}
        </ul>
      </div>

      <div className={cn('filter')}>
        <label className={cn('label')}>자전거 종류</label>
        <ul className={cn('options')}>
          <OptionChip
            type="all"
            filtersKey="bicycleTypes"
            content="전체"
            isActive={!boardFilters.bicycleTypes}
            onTextClick={handleClear}
          />
          {BICYCLE_TYPE_OPTIONS.map(option => (
            <OptionChip
              key={option.value}
              type="default"
              filtersKey="bicycleTypes"
              value={option.value}
              content={option.content}
              isActive={
                boardFilters.bicycleTypes &&
                boardFilters.bicycleTypes.some(
                  (data: FilterOptionData) => data.value === option.value
                )
              }
              onTextClick={handleChoose}
              onXClick={handleRemove}
            />
          ))}
        </ul>
      </div>

      <div className={cn('filter')}>
        <label className={cn('label')}>라이딩 실력</label>
        <ul className={cn('options')}>
          <OptionChip
            type="all"
            filtersKey="ridingSkill"
            content="전체"
            isActive={!boardFilters.ridingSkill}
            onTextClick={handleClear}
          />
          {RIDING_SKILL_OPTIONS.map(option => (
            <OptionChip
              key={option.value}
              type="default"
              filtersKey="ridingSkill"
              value={option.value}
              content={option.content}
              isActive={option.value === boardFilters.ridingSkill?.value}
              onTextClick={handleChoose}
              onXClick={handleRemove}
            />
          ))}
        </ul>
      </div>

      <div className={cn('filter')}>
        <label className={cn('label')}>성별</label>
        <ul className={cn('options')}>
          <OptionChip
            type="all"
            filtersKey="gender"
            content="전체"
            isActive={!boardFilters.gender}
            onTextClick={handleClear}
          />
          {GENDERS.map(gender => (
            <OptionChip
              key={gender}
              type="default"
              filtersKey="gender"
              value={gender}
              content={stringifyGender(gender)}
              isActive={gender === boardFilters.gender?.value}
              onTextClick={handleChoose}
              onXClick={handleRemove}
            />
          ))}
        </ul>
      </div>

      <div className={cn('filter')}>
        <label className={cn('label')}>연령대</label>
        <ul className={cn('options')}>
          <OptionChip
            type="all"
            filtersKey="ages"
            content="전체"
            isActive={!boardFilters.ages}
            onTextClick={handleClear}
          />
          {AGES.map(age => (
            <OptionChip
              key={age}
              type="default"
              filtersKey="ages"
              value={age}
              content={stringifyAge(age)}
              isActive={
                boardFilters.ages &&
                boardFilters.ages.some(
                  (data: FilterOptionData) => data.value === age
                )
              }
              onTextClick={handleChoose}
              onXClick={handleRemove}
            />
          ))}
        </ul>
      </div>

      <div className={cn('filter', 'participants')}>
        <label className={cn('label')}>인원</label>
        {/* // Range? */}
        <div className={cn('option')}>
          <OptionChip
            type="all"
            filtersKey="maxNumOfParticipants"
            content="전체"
            isActive={
              !(
                boardFilters.minNumOfParticipants.value ||
                boardFilters.maxNumOfParticipants.value
              )
            }
            onTextClick={handleClear}
          />
          <div className={cn('regulators')}>
            <div className={cn('regulator')}>
              <PlusMinusButton
                name="minNumOfParticipants"
                action="decrease"
                onDecrease={handleNumOfParticipantsDecrease}
              />
              <input
                type="number"
                name="minNumOfParticipants"
                min={0}
                max={99}
                value={boardFilters.minNumOfParticipants.value}
                onChange={handleNumOfParticipantsChange}
                className={cn('number')}
              />
              <PlusMinusButton
                name="minNumOfParticipants"
                action="increase"
                onIncrease={handleNumOfParticipantsIncrease}
              />
              <span>명</span>
            </div>

            <span className={cn('tilde')}>~</span>

            <div className={cn('regulator')}>
              <PlusMinusButton
                name="maxNumOfParticipants"
                action="decrease"
                onDecrease={handleNumOfParticipantsDecrease}
              />
              <input
                type="number"
                name="maxNumOfParticipants"
                min={0}
                max={99}
                value={boardFilters.maxNumOfParticipants.value}
                onChange={handleNumOfParticipantsChange}
                className={cn('number')}
              />
              <PlusMinusButton
                name="maxNumOfParticipants"
                action="increase"
                onIncrease={handleNumOfParticipantsIncrease}
              />
              <span>명</span>
            </div>
          </div>
        </div>
      </div>

      <div className={cn('filter', 'participation-fee-container')}>
        <label className={cn('label')}>참가비 여부</label>
        <div className={cn('option')}>
          <CheckBox
            id={cn('participation-fee')}
            shape="square"
            isChecked={Boolean(boardFilters.isParticipationFree)}
            onChange={toggleSpecificOption(IS_PARTICIPATION_FREE_PAYLOAD)}
          />
          <label htmlFor={cn('participation-fee')}>
            참가비 없는 모임만 보기
          </label>
        </div>
      </div>
    </div>
  );
};

export default MeetupFilterBoardOptions;
