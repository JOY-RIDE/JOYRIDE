import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import classNames from 'classnames/bind';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { stringifyRidingSkill } from 'utils/stringify';
import styles from './RidingSkills.module.scss';

const cn = classNames.bind(styles);

const skills = [
  { name: stringifyRidingSkill(1), ftp: '2.0 ~ 2.6' },
  { name: stringifyRidingSkill(2), ftp: '2.6 ~ 3.2' },
  { name: stringifyRidingSkill(3), ftp: '3.2 ~ 3.6' },
  { name: stringifyRidingSkill(4), ftp: '3.6 ~ 4.2' },
  { name: stringifyRidingSkill(5), ftp: '4.2 ~' },
];

interface RidingSkillsProp {
  placement: 'left' | 'right';
}

const RidingSkills = ({ placement }: RidingSkillsProp) => {
  return (
    <div className={cn('wrapper')}>
      <button type="button" className={cn('btn')}>
        <IoMdInformationCircleOutline />
      </button>

      <div className={cn('container', placement)}>
        <p>* 실력 판단이 어려울 경우 참고해 주세요.</p>
        <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
          <Table
            size="small"
            aria-label="라이딩 실력 등급표"
            sx={{ '& th, & tr': { padding: '0.5rem 1rem' } }}
          >
            <TableHead>
              <TableRow>
                <TableCell align="center">등급</TableCell>
                <TableCell align="center">FTP/kg (체중당 파워)</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {skills.map(skill => (
                <TableRow
                  key={skill.name}
                  sx={{
                    '& th, & td': { border: 'none' },
                  }}
                >
                  <TableCell component="th" scope="row" align="center">
                    {skill.name}
                  </TableCell>
                  <TableCell align="center">{skill.ftp}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default RidingSkills;
