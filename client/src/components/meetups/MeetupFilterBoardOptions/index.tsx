import CheckBox from 'components/common/CheckBox';
import styles from './MeetupFilterBoardOptions.module.scss';
import classNames from 'classnames/bind';
import {
  AGES,
  BICYCLE_TYPES,
  GENDERS,
  LOCATIONS,
  MEETUP_PATH_DIFFICULTIES,
  RIDING_SKILLS,
} from 'utils/constants';
import OptionChip from 'components/common/OptionChip';
import { useRecoilValue } from 'recoil';
import {
  stringifyAge,
  stringifyDifficulty,
  stringifyGender,
  stringifyRidingSkill,
} from 'utils/stringify';
import { useCallback, useEffect } from 'react';
import { FilterOptionData, FiltersDispatchPayload } from 'types/common';
import { meetupBoardFiltersState } from 'states/meetup';
import { ChangeHandler, ClickHandler } from 'types/callback';
import PlusMinusButton from 'components/common/PlusMinusButton';
import useClientFilter from 'hooks/useClientFilter';
import { MEETUP_FILTERS_DISPATCHES } from 'utils/filter';

const cn = classNames.bind(styles);

const IS_PARTICIPATION_FREE_PAYLOAD: FiltersDispatchPayload = {
  key: 'isParticipationFree',
  value: true,
  content: '참가비 없는 모임만',
};

const MeetupFilterBoardOptions = () => {
  const boardFilters = useRecoilValue(meetupBoardFiltersState);
  const { handleChoose, handleRemove, handleToggle, handleClear } =
    useClientFilter(meetupBoardFiltersState, MEETUP_FILTERS_DISPATCHES);

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
    (payload: FiltersDispatchPayload) => () => handleToggle(payload),
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
            value="all"
            content="전체"
            isChosen={!boardFilters.location}
            onTextClick={handleClear}
          />
          {LOCATIONS.map(location => (
            <OptionChip
              key={location}
              type="normal"
              filtersKey="location"
              value={location}
              content={location}
              isChosen={location === boardFilters.location?.value}
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
            value="all"
            content="전체"
            isChosen={!boardFilters.pathDifficulty}
            onTextClick={handleClear}
          />
          {MEETUP_PATH_DIFFICULTIES.map(difficulty => (
            <OptionChip
              key={difficulty}
              type="normal"
              filtersKey="pathDifficulty"
              value={difficulty}
              content={stringifyDifficulty(difficulty)}
              isChosen={difficulty === boardFilters.pathDifficulty?.value}
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
            value="all"
            content="전체"
            isChosen={!boardFilters.bicycleTypes}
            onTextClick={handleClear}
          />
          {BICYCLE_TYPES.map(type => (
            <OptionChip
              key={type.toString()}
              type="normal"
              filtersKey="bicycleTypes"
              value={type}
              content={type}
              isChosen={
                boardFilters.bicycleTypes &&
                boardFilters.bicycleTypes.some(
                  (data: FilterOptionData) => data.value === type
                )
              }
              onTextClick={handleChoose}
              onXClick={handleRemove}
            />
          ))}
        </ul>
      </div>

      <div className={cn('filter')}>
        <label className={cn('label')}>최소 라이딩 실력</label>
        <ul className={cn('options')}>
          <OptionChip
            type="all"
            filtersKey="minRidingSkill"
            value="all"
            content="전체"
            isChosen={!boardFilters.minRidingSkill}
            onTextClick={handleClear}
          />
          {RIDING_SKILLS.map(skill => (
            <OptionChip
              key={skill}
              type="normal"
              filtersKey="minRidingSkill"
              value={skill}
              content={stringifyRidingSkill(skill)}
              isChosen={skill === boardFilters.minRidingSkill?.value}
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
            value="all"
            content="전체"
            isChosen={!boardFilters.gender}
            onTextClick={handleClear}
          />
          {GENDERS.map(gender => (
            <OptionChip
              key={gender}
              type="normal"
              filtersKey="gender"
              value={gender}
              content={stringifyGender(gender)}
              isChosen={gender === boardFilters.gender?.value}
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
            filtersKey="age"
            value="all"
            content="전체"
            isChosen={!boardFilters.age}
            onTextClick={handleClear}
          />
          {AGES.map(age => (
            <OptionChip
              key={age}
              type="normal"
              filtersKey="age"
              value={age}
              content={stringifyAge(age)}
              isChosen={
                boardFilters.age &&
                boardFilters.age.some(
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
            value={0}
            content="전체"
            isChosen={
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
