import { HiOutlineStar } from 'react-icons/hi';
import { IoStarOutline } from 'react-icons/io5';
import { MdOutlineStar } from 'react-icons/md';

interface Props {
  fillColor: string;
}

const StarIcon = ({ fillColor = '#eeeeee' }: Props) => {
  return (
    <div>
      <MdOutlineStar style={{ marginRight: '3px' }} fill={fillColor} />
    </div>
  );
};

export default StarIcon;
