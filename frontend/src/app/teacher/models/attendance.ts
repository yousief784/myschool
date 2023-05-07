export interface IAttendance {
  _id: string;
  studentId: number;
  class: string;
  user: {
    _id: string;
    fullname: string;
  };
}
