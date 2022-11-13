import { useTheme } from '@emotion/react';
import { useMediaQuery } from '@mui/material';
import { useState } from 'react';

const useDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handlePopupOpen = () => setIsOpen(true);
  const handlePopupClose = () => setIsOpen(false);
  const theme = useTheme();
  const isFullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  return { isOpen, handlePopupOpen, handlePopupClose, isFullScreen };
};

export default useDialog;
