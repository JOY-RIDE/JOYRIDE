import { Meetup, MeetupOrderName } from 'types/meetup';

export function getMeetupsOrderedBy(name: MeetupOrderName, meetups: Meetup[]) {
  const newMeetups = [...meetups];
  switch (name) {
    case '-createdAt':
      return newMeetups.sort((a, b) => b.id - a.id);
    case 'meetingDate':
      return newMeetups.sort((a, b) => Number(a[name]) - Number(b[name]));
    case 'pathDifficulty':
      return newMeetups.sort((a, b) => a[name] - b[name]);
    case '-pathDifficulty':
      return newMeetups.sort((a, b) => b.pathDifficulty - a.pathDifficulty);
    case 'minRidingSkill':
      return newMeetups.sort((a, b) => a[name] - b[name]);
    case '-minRidingSkill':
      return newMeetups.sort((a, b) => b.minRidingSkill - a.minRidingSkill);
    case 'maxNumOfParticipants':
      return newMeetups.sort((a, b) => a[name] - b[name]);
    case '-maxNumOfParticipants':
      return newMeetups.sort(
        (a, b) => b.maxNumOfParticipants - a.maxNumOfParticipants
      );
    case 'participationFee':
      return meetups.sort((a, b) => a[name] - b[name]);
    default:
      throw new Error();
  }
}
