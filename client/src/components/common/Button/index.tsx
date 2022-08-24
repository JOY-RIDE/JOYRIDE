import { memo } from 'react';
import { ClickHandler } from 'types/callback';
import styles from './Button.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

interface CommonProps {
  color: 'main' | 'whiteGrey' | 'whiteMain';
  size: 'md' | 'lg';
  content: string;
}
type ConditionalProps =
  | {
      type: 'button';
      onClick: ClickHandler<HTMLButtonElement>;
    }
  | {
      type: 'submit';
      onClick?: never;
    };

type ButtonProps = CommonProps & ConditionalProps;

const Button = memo(
  ({ type, color = 'main', size = 'md', content, onClick }: ButtonProps) => (
    <button type={type} className={cn('btn', color, size)} onClick={onClick}>
      {content}
    </button>
  )
);

export default Button;
