import styles from './SectionTitle.module.scss';

interface SectionTitleProps {
  title: string;
  count?: number;
}

const SectionTitle = ({ title, count }: SectionTitleProps) => (
  <h2 className={styles.title}>
    {title}
    <span>{count}</span>
  </h2>
);

export default SectionTitle;
