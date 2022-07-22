import { Component } from 'react';
import styles from './TextInput.module.scss';
import classNames from 'classnames/bind';

interface TextInputProps {
  placeholder: string;
  [key: string]: any;
}

const cn = classNames.bind(styles);

class TextInput extends Component<TextInputProps> {
  render() {
    return <input className={cn('input')} {...this.props} />;
  }
}

export default TextInput;
