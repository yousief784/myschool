export interface StudentInterface {
  _id: string;
  classId: number;
  studentId: number;
  user: {
    _id: string;
    fullname: string;
    nationalID: string;
  };
  parent: {
    _id: string;
    parentPhone: string;
    user: {
      _id: string;
      parentName: string;
      nationalID: string;
    };
  };
}
