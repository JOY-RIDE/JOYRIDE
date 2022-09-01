import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import TextInput from '../TextInput';
import styles from './DateTimePicker.module.scss';
import classNames from 'classnames/bind';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const cn = classNames.bind(styles);

interface DateTimePickerProps {
  placeholder?: string;
}

function compareTwoDates(first: Date, second: Date) {
  const isYearSame = first.getFullYear() === second.getFullYear();
  const isMonthSame = first.getMonth() === second.getMonth();
  const isDaySame = first.getDate() === second.getDate();
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

const DateTimePicker = ({ placeholder }: DateTimePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  return (
    <DatePicker
      showTimeSelect
      selected={selectedDate}
      onChange={(date: Date) => setSelectedDate(date)}
      locale={ko}
      dateFormat="yyyy년 MM월 dd일 aa h:mm"
      minDate={new Date()}
      timeCaption="시간"
      timeIntervals={15}
      customInput={<TextInput />}
      calendarClassName={cn('calendar')}
      dayClassName={date => {
        if (!selectedDate) return cn('normal-day');
        return compareTwoDates(date, selectedDate)
          ? cn('normal-day', 'selected-day')
          : cn('normal-day');
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
            className={cn('month-btn')}
            disabled={nextMonthButtonDisabled}
            onClick={increaseMonth}
          >
            <ArrowForwardIosIcon />
          </button>
        </header>
      )}
      placeholderText={placeholder}
      popperPlacement="auto"
      showPopperArrow={false}
      disabledKeyboardNavigation
    />
  );
};

export default DateTimePicker;
