export interface SignupStepControls {
  decreaseStep: () => void;
  increaseStep: () => void;
}

export interface Meetup {
  id: number;
  title: string;
  image: string;
  meetingDate: Date;
  dueDate: Date;
  courseLevel: number;
  ridingLevels: number[];
  bicycleTypes: string[];
  currentParticipants: {}[]; // TODO
  maxNumOfParticipants: number;
  courseName: null | string;
  ridingPath: string;
  location: string;
  gender: string;
  ages: number[];
  participationFee: number;
}
