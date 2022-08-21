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
  ridingLevel: number[]; // TODO
  bicycleType: string[];
  numberOfParticipants: number; // TODO
  maxNumberOfParticipants: number;
  courseName: null | string;
  path: string;
  location: string;
  gender: string;
  age: number[];
  participationFee: number;
}
