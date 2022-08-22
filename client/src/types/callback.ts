import { ReactElement } from 'react';

export type ChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => void;
export type ClickHandler<T extends HTMLElement> = (
  e: React.MouseEvent<T, MouseEvent>
) => void;

export type ComponentGetter = (props?: any) => ReactElement;
