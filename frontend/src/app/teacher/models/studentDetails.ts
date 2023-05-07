export interface IStudent {
  _id: string;
  studentId: number;
  class: {
    _id: string;
    className: string;
  };
  user: {
    _id: string;
    fullname: string;
  };
}
