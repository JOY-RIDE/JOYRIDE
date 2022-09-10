import styles from './CrsDesc.module.scss';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

interface CrsDescProps {
  label: string;
  contents: string | undefined;
}

const CrsDesc = ({ label, contents }: CrsDescProps) => {
  const contentsArr = (contents || '')
    .replace(/\- /g, '')
    .replace(/<br><br>/g, '<br>')
    .trim()
    .split('<br>');
  if (contentsArr[contentsArr.length - 1] === '') {
    contentsArr.pop();
  }
  return (
    <div className={cn('desc')}>
      <h4 className={cn('label')}>{label}</h4>
      <ul className={cn('contents')}>
        {contentsArr.map(content => (
          <li className={cn('content')}>
            <span className={cn('li-disc')}>·</span> {content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CrsDesc;
