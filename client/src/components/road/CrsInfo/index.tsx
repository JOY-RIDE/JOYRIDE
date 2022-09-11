import styles from './CrsInfo.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

interface CrsInfoProps {
  label: string;
  content: string | number | undefined;
}

const CrsInfo = ({ label, content }: CrsInfoProps) => {
  return (
    <div className={cn('info')}>
      <span className={cn('label')}>{label}</span>
      <span className={cn('content')}>{content}</span>
    </div>
  );
};

export default CrsInfo;
