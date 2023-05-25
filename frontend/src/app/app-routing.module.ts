import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminDashboardComponent } from './admin/components/admin-dashboard/admin-dashboard.component';
import { ParentDashboardComponent } from './parent/components/parent-dashboard/parent-dashboard.component';
import { StudentDashboardComponent } from './student/components/student-dashboard/student-dashboard.component';
import { AuthGuard } from './guard/auth/auth.guard';
import { NoPermissionComponent } from './no-permission/no-permission.component';
import { AdminGuard } from './guard/admin/admin.guard';
import { ParentGuard } from './guard/parent/parent.guard';
import { StudentGuard } from './guard/student/student.guard';
import { CheckAuthLoginPageGuard } from './guard/checkAuthLoginPage/check-auth-login-page.guard';
import { AdminCourseComponent } from './admin/components/course/admin-course/admin-course.component';
import { AdminStudentComponent } from './admin/components/student/admin-student/admin-student.component';
import { AdmniTeacherComponent } from './admin/components/teacher/admni-teacher/admni-teacher.component';
import { ScheduleComponent } from './student/components/schedule/schedule.component';
import { TermDateComponent } from './admin/components/term-date/term-date.component';
import { TeacherGuard } from './guard/teacher/teacher.guard';
import { TeacherDashboardComponent } from './teacher/components/teacher-dashboard/teacher-dashboard.component';
import { TeacherScheduleComponent } from './teacher/components/teacher-schedule/teacher-schedule.component';
import { TeacherAttendanceDashboardComponent } from './teacher/components/attendance/teacher-attendance-dashboard/teacher-attendance-dashboard.component';
import { SetResultDashboardComponent } from './admin/components/result/setResult/set-result-dashboard/set-result-dashboard.component';
import { ShowResultDashboardComponent } from './admin/components/result/showResult/show-result-dashboard/show-result-dashboard.component';
import { ParentShowResultComponent } from './parent/components/parent-show-result/parent-show-result.component';
import { StudentResultComponent } from './student/components/student-result/student-result.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [CheckAuthLoginPageGuard],
  },
  {
    path: 'admin',
    children: [
      { path: '', component: AdminDashboardComponent },
      { path: 'student/:classId', component: AdminStudentComponent },
      { path: 'teacher', component: AdmniTeacherComponent },
      { path: 'course', component: AdminCourseComponent },
      { path: 'set-term-schedule', component: TermDateComponent },
      {
        path: 'result/:classId',
        children: [
          { path: '', component: ShowResultDashboardComponent },
          { path: 'set', component: SetResultDashboardComponent },
        ],
      },
    ],
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'parent',
    children: [
      { path: '', component: ParentDashboardComponent },
      { path: 'result/:studentId', component: ParentShowResultComponent },
    ],
    canActivate: [ParentGuard],
  },
  {
    path: 'teacher',
    children: [
      { path: '', component: TeacherDashboardComponent },
      { path: 'schedule', component: TeacherScheduleComponent },
      {
        path: 'attendance',
        component: TeacherAttendanceDashboardComponent,
      },
    ],
    canActivate: [TeacherGuard],
  },

  {
    path: 'student',
    children: [
      { path: '', component: StudentDashboardComponent },
      { path: 'schedule', component: ScheduleComponent },
      { path: 'result', component: StudentResultComponent },
    ],
    canActivate: [AuthGuard, StudentGuard],
  },
  {
    path: 'no-permission',
    component: NoPermissionComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
