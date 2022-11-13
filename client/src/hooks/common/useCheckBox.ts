import { Dispatch, SetStateAction, useState } from 'react';

const useCheckBox = () => {
  const [value, setValue] = useState<boolean>(false);
  const toggleValue = () => setValue(value => !value);
  const result: [boolean, Dispatch<SetStateAction<boolean>>, () => void] = [
    value,
    setValue,
    toggleValue,
  ];
  return result;
};

export default useCheckBox;
