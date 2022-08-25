import { useState, useRef } from 'react';
import { useOnClickOutside } from 'hooks/useOnClickOutside';

const useToggle = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggle = () => setIsOpen(isOpen => !isOpen);
  const close = () => setIsOpen(false);
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, close);
  return { isOpen, toggle, close, ref };
};

export default useToggle;
