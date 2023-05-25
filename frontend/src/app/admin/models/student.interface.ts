export interface IStudent {
  _id: string;
  studentId: number;
  studentImage?: string;
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
  class: {
    _id: string;
    className: string;
    classId: number;
  };
}
