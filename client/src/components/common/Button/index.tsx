import { memo } from 'react';
import { ClickHandler } from 'typescript/types';
import styles from './Button.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

interface ButtonProps {
  color: 'main' | 'white';
  size: 'md' | 'lg';
  text: string;
  onClick?: ClickHandler;
}

const Button = memo(
  ({ color = 'main', size = 'md', text, onClick }: ButtonProps) => (
    <button className={cn('btn', color, size)} onClick={onClick}>
      {text}
    </button>
  )
);

export default Button;
