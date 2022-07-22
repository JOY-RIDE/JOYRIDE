import styles from './TextField.module.scss';
import classNames from 'classnames/bind';

interface Props {
  value: string;
  placeholder: string;
}

const cn = classNames.bind(styles);

const TextField = ({ value, placeholder }: Props) => (
  <input className={cn('input')} value={value} placeholder={placeholder} />
);

export default TextField;
