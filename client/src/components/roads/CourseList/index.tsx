import { ServerIRoads } from 'types/course';
import CourseItem from '../CourseItem';
import styles from './CourseList.module.scss';

interface CourseListProp {
  courses: ServerIRoads[];
}

const CourseList = ({ courses }: CourseListProp) => (
  <section className={styles.courses}>
    {/* {courses.map(course => (
      <CourseItem key={course.id} course={course} />
    ))} */}
  </section>
);

export default CourseList;
