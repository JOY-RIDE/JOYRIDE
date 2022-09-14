import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './CourseList.module.scss';
import { ServerIRoads } from 'types/course';
import CourseItem from '../CourseItem';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
// import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

// const AccordionSummary = styled((props: AccordionSummaryProps) => (
//   <MuiAccordionSummary
//     expandIcon={<KeyboardArrowDownIcon sx={{ fontSize: '0.9rem' }} />}
//     {...props}
//   />
// ))(({ theme }) => ({
//   backgroundColor:
//     theme.palette.mode === 'dark'
//       ? 'rgba(255, 255, 255, .05)'
//       : 'rgba(0, 0, 0, .03)',
//   flexDirection: 'row-reverse',
//   '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
//     transform: 'rotate(180deg)',
//   },
//   '& .MuiAccordionSummary-content': {
//     marginLeft: theme.spacing(1),
//   },
// }));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(0),
  borderTop: '6px solid #22b573',
}));

interface CourseListProp {
  courses: ServerIRoads[];
}

const CourseList = ({ courses }: CourseListProp) => {
  const [expanded, setExpanded] = useState<string | false>('panel1');

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };
  return (
    <ul className={styles.courses}>
      {courses.map((course, index) => (
        <Accordion
          expanded={expanded === `panel${index + 1}`}
          onChange={handleChange(`panel${index + 1}`)}
        >
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon sx={{ fontSize: '3rem', color: '#bdbdbd' }} />
            }
            aria-controls={`panel${index + 1}d-content`}
            id={`panel${index + 1}d-header`}
          >
            <CourseItem key={course.id} course={course} index={index} />
          </AccordionSummary>
          <AccordionDetails>
            <Link to={`/roads/${course.crsKorNm}`}>
              <img src={course.image} width="100%" height="auto" alt="" />
            </Link>
          </AccordionDetails>
        </Accordion>
      ))}
    </ul>
  );
};

export default CourseList;
