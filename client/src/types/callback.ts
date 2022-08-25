import { ReactElement } from 'react';

export type ChangeHandler = React.ChangeEventHandler<HTMLInputElement>;
export type ClickHandler<E extends HTMLElement> = React.MouseEventHandler<E>;
export type SubmitHandler = React.FormEventHandler<HTMLFormElement>;

export type ComponentGetter = (props?: any) => ReactElement;
