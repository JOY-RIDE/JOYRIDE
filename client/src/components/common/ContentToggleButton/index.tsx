import useToggle from 'hooks/useToggle';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import styles from './ContentToggleButton.module.scss';
import classNames from 'classnames/bind';
import { ReactElement } from 'react';

const cn = classNames.bind(styles);

interface ContentProp {
  close: () => void;
}
interface ContentToggleButtonProps {
  title: string;
  Content: ({ close }: ContentProp) => ReactElement;
}

const ContentToggleButton = ({ title, Content }: ContentToggleButtonProps) => {
  const { isOpen, toggle, close, ref } = useToggle();
  return (
    <div className={cn('boundary')} ref={ref}>
      <button className={cn('toggle-btn')} onClick={toggle}>
        <span>{title}</span>
        {isOpen ? <AiOutlineUp /> : <AiOutlineDown />}
      </button>
      <div className={cn('content-container', { hidden: !isOpen })}>
        <Content close={close} />
      </div>
    </div>
  );
};

export default ContentToggleButton;
