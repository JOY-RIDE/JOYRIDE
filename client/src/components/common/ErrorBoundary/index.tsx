import classNames from 'classnames/bind';
import React from 'react';
import styles from './ErrorBoundary.module.scss';
import { TbFaceIdError } from 'react-icons/tb';
import { Outlet } from 'react-router-dom';

const cn = classNames.bind(styles);

export default class ErrorBoundary extends React.Component<
  any,
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  // componentDidCatch(error, errorInfo) {
  //   this.setState({
  //     hasError: true,
  //   });
  // }

  render() {
    return this.state.hasError ? (
      <section className={cn('wrapper')}>
        <TbFaceIdError />
        <h1 className={cn('title')}>예기치 못한 오류가 발생했습니다.</h1>
        <p className={cn('content')}>
          문제가 지속될 시 관리자에게 문의해 주세요.
        </p>
      </section>
    ) : (
      <Outlet />
    );
  }
}
