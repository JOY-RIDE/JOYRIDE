import { useState } from 'react';
import { ChangeHandler } from 'typescript/types';

export const useInput = () => {
  const [value, setValue] = useState('');
  const onChange: ChangeHandler = e => setValue(e.target.value);
  const result: [string, ChangeHandler] = [value, onChange];
  return result;
};
