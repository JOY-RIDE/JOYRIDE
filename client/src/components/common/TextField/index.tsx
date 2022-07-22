import { Component } from 'react';
import styles from './TextField.module.scss';
import classNames from 'classnames/bind';

interface TextFieldProps {
  placeholder: string;
  [key: string]: any;
}

const cn = classNames.bind(styles);

class TextField extends Component<TextFieldProps> {
  render() {
    return <input className={cn('input')} {...this.props} />;
  }
}

export default TextField;
