export interface ICourse {
  _id: string;
  courseId: number;
  courseName: string;
  classId: {
    _id: string;
    className: string;
  };
}
