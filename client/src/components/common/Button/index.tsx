import { PropsWithChildren } from 'react';
import { ClickHandler } from 'typescript/types';
import styles from './Button.module.scss';
import classNames from 'classnames/bind';

interface ButtonProps {
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
}: PropsWithChildren<ButtonProps>) => (
  <button className={cn('btn', color, size)} onClick={onClick}>
    {children}
  </button>
);

export default Button;
