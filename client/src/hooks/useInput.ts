import { useState } from 'react';
import { OnChangeType } from 'typescript/types';

export const useInput = () => {
  const [value, setValue] = useState('');
  const onChange: OnChangeType = e => setValue(e.target.value);
  const result: [string, OnChangeType] = [value, onChange];
  return result;
};
