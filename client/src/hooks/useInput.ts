import React, { useState } from 'react';

export const useInput = () => {
  const [value, setValue] = useState<string>('');
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  return [value, onChange];
};
