import { useSetRecoilState } from 'recoil';
import { RecoilState } from 'recoil';
import { OrderOption, OrderState } from 'types/common';
import OrderItem from '../OrderItem';
import styles from './OrderList.module.scss';

interface OrderListProps {
  options: OrderOption[];
  recoilState: RecoilState<OrderState>;
  close: () => void;
}

const OrderList = ({ options, recoilState, close }: OrderListProps) => {
  const setOrder = useSetRecoilState(recoilState);
  const handleClick = (name: string, content: string) => {
    setOrder({ name, content });
    close();
  };
  return (
    <ul className={styles.options}>
      {options.map(option => (
        <OrderItem
          key={option.name}
          name={option.name}
          content={option.content}
          sign={option.sign}
          onClick={handleClick}
        />
      ))}
    </ul>
  );
};

export default OrderList;
