import { ComponentGetter } from 'types/callback';
import styles from './ItemList.module.scss';

interface ItemListProps {
  items: any[];
  ItemComponent: ComponentGetter;
}

const ItemList = ({ items, ItemComponent }: ItemListProps) => (
  <ul className={styles.wrapper}>
    {items && items.map(item => <ItemComponent key={item.id} {...item} />)}
  </ul>
);

export default ItemList;
