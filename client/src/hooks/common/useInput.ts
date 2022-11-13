import { useState } from 'react';
import { ChangeHandler } from 'types/callback';

export const useInput = () => {
  const [value, setValue] = useState<string>('');
  const onChange: ChangeHandler = e => setValue(e.target.value);
  const result: [string, ChangeHandler] = [value, onChange];
  return result;
};
