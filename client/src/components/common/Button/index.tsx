import { PropsWithChildren } from 'react';
import { ClickHandler } from 'typescript/types';
import styles from './Button.module.scss';
import classNames from 'classnames/bind';

interface Button {
  color: 'main' | 'white';
  size: 'md' | 'lg';
  onClick?: ClickHandler;
}

const cn = classNames.bind(styles);

const Button = ({
  children,
  color = 'main',
  size = 'md',
  onClick,
}: PropsWithChildren<Button>) => (
  <button className={cn('btn', color, size)} onClick={onClick}>
    {children}
  </button>
);

export default Button;
