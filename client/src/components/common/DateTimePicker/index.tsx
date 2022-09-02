import { forwardRef, ReactElement } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import styles from './DateTimePicker.module.scss';
import classNames from 'classnames/bind';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const cn = classNames.bind(styles);

interface DateTimePickerProps {
  selectedDate: null | Date;
  onChange: any;
  CustomInput: ReactElement;
  minDate?: Date;
  placeholder?: string;
  [key: string]: any;
}

function filterPassedTimes(date: Date) {
  const currentMilliSeconds = new Date().getTime();
  const targetMilliSeconds = new Date(date).getTime();
  return currentMilliSeconds < targetMilliSeconds;
}
function checkIfTwoDatesAreSame(firstDate: Date, secondDate: Date) {
  const isYearSame = firstDate.getFullYear() === secondDate.getFullYear();
  const isMonthSame = firstDate.getMonth() === secondDate.getMonth();
  const isDaySame = firstDate.getDate() === secondDate.getDate();
  return isYearSame && isMonthSame && isDaySame;
}

const YEARS = [new Date().getFullYear(), new Date().getFullYear() + 1];
const MONTHS = [
  '1월',
  '2월',
  '3월',
  '4월',
  '5월',
  '6월',
  '7월',
  '8월',
  '9월',
  '10월',
  '11월',
  '12월',
];

const DateTimePicker = forwardRef<HTMLElement, DateTimePickerProps>(
  (props, ref) => {
    const {
      selectedDate,
      onChange,
      CustomInput,
      minDate = new Date(),
      placeholder,
      ...others
    } = props;
    return (
      <DatePicker
        showTimeSelect
        selected={selectedDate}
        onChange={onChange}
        locale={ko}
        dateFormat="yyyy년 MM월 dd일 aa h:mm"
        minDate={minDate}
        filterTime={date => filterPassedTimes(date)}
        timeCaption="시간"
        timeIntervals={15}
        customInput={CustomInput}
        calendarClassName={cn('calendar')}
        dayClassName={date => {
          if (!selectedDate) return cn('day');
          return checkIfTwoDatesAreSame(date, selectedDate)
            ? cn('day', 'selected-day')
            : cn('day');
        }}
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <header className={cn('header')}>
            <button
              type="button"
              className={cn('month-btn')}
              disabled={prevMonthButtonDisabled}
              onClick={decreaseMonth}
            >
              <ArrowBackIosNewIcon />
            </button>
            <select
              value={date.getFullYear()}
              onChange={({ target: { value } }) => changeYear(Number(value))}
            >
              {YEARS.map(year => (
                <option key={year} value={year}>
                  {year}년
                </option>
              ))}
            </select>
            <select
              value={MONTHS[date.getMonth()]}
              onChange={({ target: { value } }) =>
                changeMonth(MONTHS.indexOf(value))
              }
            >
              {MONTHS.map(month => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
            <button
              type="button"
              className={cn('month-btn')}
              disabled={nextMonthButtonDisabled}
              onClick={increaseMonth}
            >
              <ArrowForwardIosIcon />
            </button>
          </header>
        )}
        placeholderText={placeholder}
        popperPlacement="bottom"
        fixedHeight
        closeOnScroll
        showPopperArrow={false}
        disabledKeyboardNavigation
        {...others}
      />
    );
  }
);

export default DateTimePicker;
