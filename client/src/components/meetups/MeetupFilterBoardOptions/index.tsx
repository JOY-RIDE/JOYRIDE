import CheckBox from 'components/common/CheckBox';
import styles from './MeetupFilterBoardOptions.module.scss';
import classNames from 'classnames/bind';
import {
  AGES,
  BICYCLE_TYPE_OPTIONS,
  LOCATIONS,
  MEETUP_GENDER_OPTIONS,
  MEETUP_PATH_DIFFICULTY_OPTIONS,
  RIDING_SKILL_OPTIONS,
} from 'utils/constants';
import { stringifyAge } from 'utils/stringify';
import { useCallback, useEffect } from 'react';
import { FiltersReducerPayload } from 'types/common';
import { meetupBoardFiltersState } from 'states/meetup';
import { ChangeHandler, ClickHandler } from 'types/callback';
import PlusMinusButton from 'components/common/PlusMinusButton';
import useFilter from 'hooks/useFilter';
import { MEETUP_FILTERS_REDUCERS } from 'utils/filter';
import FilterOptionChip from 'components/common/FilterOptionChip';
import RidingSkills from 'components/common/RidingSkills';

const cn = classNames.bind(styles);

const IS_PARTICIPATION_FREE_PAYLOAD: FiltersReducerPayload = {
  key: 'participationFee',
  value: 0,
  content: '참가비 없는 모임만',
};

const MeetupFilterBoardOptions = () => {
  const {
    filters: boardFilters,
    handleChoose,
    handleRemove,
    handleToggle,
    handleClear,
  } = useFilter(meetupBoardFiltersState, MEETUP_FILTERS_REDUCERS);

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
        <label className={cn('label')}>
          <h4>지역</h4>
        </label>
        <ul className={cn('options')}>
          <FilterOptionChip
            type="all"
            filtersKey="location"
            content="전체"
            isActive={!boardFilters.location}
            onTextClick={handleClear}
          />
          {LOCATIONS.map(location => (
            <FilterOptionChip
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
        <label className={cn('label')}>
          <h4>코스 난이도</h4>
        </label>
        <ul className={cn('options')}>
          <FilterOptionChip
            type="all"
            filtersKey="pathDifficulty"
            content="전체"
            isActive={!boardFilters.pathDifficulty}
            onTextClick={handleClear}
          />
          {MEETUP_PATH_DIFFICULTY_OPTIONS.map(option => (
            <FilterOptionChip
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
        <label className={cn('label')}>
          <h4>자전거 종류</h4>
          {/* <span className={cn('multiple')}>(다중 선택)</span> */}
        </label>
        <ul className={cn('options')}>
          <FilterOptionChip
            type="all"
            filtersKey="bicycleTypes"
            content="전체"
            isActive={!boardFilters.bicycleTypes}
            onTextClick={handleClear}
          />
          {BICYCLE_TYPE_OPTIONS.map(option => (
            <FilterOptionChip
              key={option.value}
              type="default"
              filtersKey="bicycleTypes"
              value={option.value}
              content={option.content}
              isActive={option.value === boardFilters.bicycleTypes?.value}
              onTextClick={handleChoose}
              onXClick={handleRemove}
            />
          ))}
        </ul>
      </div>

      <div className={cn('filter')}>
        <label className={cn('label')}>
          <h4>성별</h4>
        </label>
        <ul className={cn('options')}>
          <FilterOptionChip
            type="all"
            filtersKey="gender"
            content="전체"
            isActive={!boardFilters.gender}
            onTextClick={handleClear}
          />
          {MEETUP_GENDER_OPTIONS.map(gender => (
            <FilterOptionChip
              key={gender.value}
              type="default"
              filtersKey="gender"
              value={gender.value}
              content={gender.content}
              isActive={gender.value === boardFilters.gender?.value}
              onTextClick={handleChoose}
              onXClick={handleRemove}
            />
          ))}
        </ul>
      </div>

      <div className={cn('filter')}>
        <label className={cn('label')}>
          <h4>나이</h4>
          {/* <span className={cn('multiple')}>(다중 선택)</span> */}
        </label>
        <ul className={cn('options')}>
          <FilterOptionChip
            type="all"
            filtersKey="age"
            content="전체"
            isActive={!boardFilters.age}
            onTextClick={handleClear}
          />
          {AGES.map(age => (
            <FilterOptionChip
              key={age}
              type="default"
              filtersKey="age"
              value={age}
              content={stringifyAge(age)}
              isActive={age === boardFilters.age?.value}
              onTextClick={handleChoose}
              onXClick={handleRemove}
            />
          ))}
        </ul>
      </div>

      <div className={cn('filter', 'riding-skill')}>
        <label className={cn('label')}>
          <h4>라이딩 실력</h4>
          <RidingSkills placement="right" />
        </label>
        <ul className={cn('options')}>
          <FilterOptionChip
            type="all"
            filtersKey="ridingSkill"
            content="전체"
            isActive={!boardFilters.ridingSkill}
            onTextClick={handleClear}
          />
          {RIDING_SKILL_OPTIONS.map(option => (
            <FilterOptionChip
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

      <div className={cn('filter', 'participants')}>
        <label className={cn('label')}>
          <h4>인원</h4>
        </label>
        {/* // Range? */}
        <div className={cn('option')}>
          <FilterOptionChip
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
                color="grey"
                size="sm"
                name="minNumOfParticipants"
                label="최소 인원 감소 버튼"
                action="decrease"
                onDecrease={handleNumOfParticipantsDecrease}
              />
              <input
                type="number"
                className={cn('number')}
                name="minNumOfParticipants"
                min={0}
                max={99}
                value={boardFilters.minNumOfParticipants.value}
                onChange={handleNumOfParticipantsChange}
              />
              <PlusMinusButton
                color="grey"
                size="sm"
                name="minNumOfParticipants"
                label="최소 인원 증가 버튼"
                action="increase"
                onIncrease={handleNumOfParticipantsIncrease}
              />
              <span>명</span>
            </div>

            <span className={cn('tilde')}>~</span>

            <div className={cn('regulator')}>
              <PlusMinusButton
                color="grey"
                size="sm"
                name="maxNumOfParticipants"
                label="최대 인원 감소 버튼"
                action="decrease"
                onDecrease={handleNumOfParticipantsDecrease}
              />
              <input
                type="number"
                className={cn('number')}
                name="maxNumOfParticipants"
                min={0}
                max={99}
                value={boardFilters.maxNumOfParticipants.value}
                onChange={handleNumOfParticipantsChange}
              />
              <PlusMinusButton
                color="grey"
                size="sm"
                name="maxNumOfParticipants"
                label="최대 인원 증가 버튼"
                action="increase"
                onIncrease={handleNumOfParticipantsIncrease}
              />
              <span>명</span>
            </div>
          </div>
        </div>
      </div>

      <div className={cn('filter', 'participation-fee-container')}>
        <label className={cn('label')}>
          <h4>참가비 여부</h4>
        </label>
        <div className={cn('option')}>
          <CheckBox
            id={cn('participation-fee')}
            shape="square"
            isChecked={!!boardFilters.participationFee}
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
