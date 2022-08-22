import { ReactElement } from 'react';

export type ChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => void;
export type ClickHandler = (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>
) => void;

export type GetComponent = (props?: any) => ReactElement;
