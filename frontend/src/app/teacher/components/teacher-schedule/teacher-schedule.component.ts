import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import { TeacherService } from '../../services/teacher.service';
import { StudentScheduleService } from 'src/app/student/services/student/studentSchedule/student-schedule.service';
import { TeacherScheduleService } from '../../services/teacher/teacherSchedule/teacher-schedule.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-schedule',
  templateUrl: './teacher-schedule.component.html',
  styleUrls: ['./teacher-schedule.component.css'],
})
export class TeacherScheduleComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'timeGridWeek,timeGridDay', // user can switch between the two
    },
    plugins: [dayGridPlugin, timeGridPlugin],
    height: 580,
    initialView: 'timeGridWeek',
    slotMinTime: '08:00:00',
    slotMaxTime: '15:00:00',
    slotDuration: '01:00:01',
    hiddenDays: [5, 6],
  }; // import calendar plugins
  calendarEvents: EventInput[] = []; // initialize empty events array
  daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  teacherId: string = '';
  termStartDate: string = '';
  termEndDate: string = '';

  constructor(
    private teacherServices: TeacherService,
    private studentScheduleService: StudentScheduleService,
    private teacherScheduleService: TeacherScheduleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.teacherServices.getTeacherData().subscribe(
      (res: any) => {
        this.teacherId = res.data._id;
      },
      (errors) => {
        if (errors.error.status == 401) {
          localStorage.removeItem('token');
        }
      }
    );

    setTimeout(() => {
      this.studentScheduleService.getTermDate().subscribe(
        (res: any) => {
          if (res.status !== 200) return;
          this.termStartDate = res.data.startDate;
          this.termEndDate = res.data.endDate;
        },
        (errors) => {
          if (errors.error.status == 401) {
            localStorage.removeItem('token');
            this.router.navigate(['/']);
          }
        }
      );

      this.teacherScheduleService.getTeacherSchedule(this.teacherId).subscribe(
        (res: any) => {
          this.calendarEvents = [];
          res.data.map((item: any, index: number) => {
            console.log(item);

            this.calendarEvents[index] = {
              title: item.course.courseName,
              startTime: item.startTime,
              endTime: item.endTime,
              allDay: false,
              recurringEvent: true,
              startRecur: this.termStartDate,
              endRecur: this.termEndDate,
              daysOfWeek: [this.daysOfWeek.indexOf(item.dayOfWeek)],
              backgroundColor: '#000',
            };
          });
        },
        (errors) => {
          if (errors.error.status == 401) {
            localStorage.removeItem('token');
            this.router.navigate(['/']);
          }
        }
      );
    }, 400);
  }
}
