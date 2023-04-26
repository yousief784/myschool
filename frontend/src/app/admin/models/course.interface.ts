export interface ICourse {
  _id: string;
  courseId: number;
  courseName: string;
  numberOfTimesPerWeek: number;
  classId: {
    _id: string;
    className: string;
  };
  teacher: {
    _id: string;
    user: {
      _id: string;
      fullname: string;
    };
  };
}
