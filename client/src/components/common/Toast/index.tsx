import { useEffect } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { toastState } from 'states/atoms';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './Toast.module.scss';

const duration = 2.5;
const fadeInKeyframe = 0.2;

const variants = {
  enter: {
    bottom: ['0%', '5%', '5%'],
    opacity: [0, 1, 1],
    transition: { duration, times: [0, fadeInKeyframe, 1] },
  },

  exit: {
    opacity: 0,
    transition: { duration: duration * fadeInKeyframe },
  },
};

const Toast = () => {
  const message = useRecoilValue(toastState);
  const closeToast = useResetRecoilState(toastState);

  useEffect(() => {
    if (message) {
      setTimeout(closeToast, duration * 1000);
    }
  }, [message]);

  return (
    <AnimatePresence>
      {message && (
        <motion.p
          className={styles.message}
          variants={variants}
          animate="enter"
          exit="exit"
        >
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
};

export default Toast;
