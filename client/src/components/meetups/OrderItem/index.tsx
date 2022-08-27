import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { OrderOption } from 'types/common';
import styles from './OrderItem.module.scss';

const cn = classNames.bind(styles);

interface OrderItemProps extends OrderOption {
  onClick: (name: string, content: string) => void;
}

const OrderItem = ({ name, content, sign, onClick }: OrderItemProps) => {
  const handleClick = () => onClick(name, content);
  return (
    <li className={cn('option')} onClick={handleClick}>
      {content}
      <span className={cn('sign')}>{sign}</span>
    </li>
  );
};

export default OrderItem;
