import { ServerIRoads, CourseOrderName } from 'types/course';
import dayjs from 'dayjs';
import { MeetupOrderName, MeetupData } from 'types/meetup';

export function getMeetupsOrderedBy(
  name: MeetupOrderName,
  meetups: MeetupData[]
) {
  const newMeetups = [...meetups];
  switch (name) {
    case '-createdAt':
      return newMeetups.sort((a, b) => b.id - a.id);
    case 'meetingDate':
      return newMeetups.sort((a, b) => +dayjs(a[name]) - +dayjs(b[name]));
    case 'pathDifficulty':
      return newMeetups.sort((a, b) => a[name] - b[name]);
    case '-pathDifficulty':
      return newMeetups.sort((a, b) => b.pathDifficulty - a.pathDifficulty);
    case 'ridingSkill':
      return newMeetups.sort((a, b) => a[name] - b[name]);
    case '-ridingSkill':
      return newMeetups.sort((a, b) => b.ridingSkill - a.ridingSkill);
    case 'maxNumOfParticipants':
      return newMeetups.sort((a, b) => a.maxPeople - b.maxPeople);
    case '-maxNumOfParticipants':
      return newMeetups.sort((a, b) => b.maxPeople - a.maxPeople);
    case 'participationFee':
      return meetups.sort((a, b) => a[name] - b[name]);
    default:
      throw new Error();
  }
}

export function getCoursesOrderedBy(
  name: CourseOrderName,
  courses: ServerIRoads[]
) {
  const newMeetups = [...courses];
  switch (name) {
    case 'crsKorNm':
      return newMeetups.sort((a, b) => (a.crsKorNm < b.crsKorNm ? -1 : 1));
    case 'crsTotlRqrmHour':
      return newMeetups.sort((a, b) => a.crsTotlRqrmHour - b.crsTotlRqrmHour);
    case '-crsTotlRqrmHour':
      return newMeetups.sort((a, b) => b.crsTotlRqrmHour - a.crsTotlRqrmHour);
    case 'crsDstnc':
      return newMeetups.sort((a, b) => a.crsDstnc - b.crsDstnc);
    case '-crsDstnc':
      return newMeetups.sort((a, b) => b.crsDstnc - a.crsDstnc);
    case 'likeCount':
      return newMeetups.sort((a, b) => b.likeCount - a.likeCount);
    case 'rating':
      return newMeetups.sort((a, b) => b.rating - a.rating);
    default:
      throw new Error();
  }
}
