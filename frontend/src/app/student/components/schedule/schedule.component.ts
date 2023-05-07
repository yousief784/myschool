import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import { CourseService } from 'src/app/admin/services/course/course.service';
import { StudentService } from '../../services/student/student.service';
import { StudentScheduleService } from '../../services/student/studentSchedule/student-schedule.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
})
export class ScheduleComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'timeGridWeek,timeGridDay', // user can switch between the two
    },
    plugins: [dayGridPlugin, timeGridPlugin],
    height: 580,
    initialView: 'timeGridWeek',
    slotMinTime: '08:00:00', // turn on
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
  colors = [
    '#FF0000',
    '#0000FF',
    '#008000',
    '#FFA500',
    '#800080',
    '#FFC0CB',
    '#A52A2A',
    '#FFFF00',
    '#808080',
    '#000000',
  ];
  coursesColors: any = [];
  classId: string = '';
  termStartDate: string = '';
  termEndDate: string = '';
  isFoundSchedule: boolean = true;

  constructor(
    private studentScheduleService: StudentScheduleService,
    private courseService: CourseService,
    private studentService: StudentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // get student data to get from it classid and send classid to course service and studentschedule service
    this.studentService.getStudentData().subscribe(
      (res: any) => {
        this.classId = res.data.class;
      },
      (errors) => {
        if (errors.error.status == 401) {
          localStorage.removeItem('token');
          this.router.navigate(['/']);
        }
      }
    );

    setTimeout(() => {
      this.courseService.getCoursesByClass(this.classId).subscribe(
        (res: any) => {
          res.data.map((item: any, index: number) => {
            this.coursesColors.push({
              course: item._id,
              color: this.colors[index],
            });
          });
        },
        (errors) => {
          if (errors.error.status == 401) {
            localStorage.removeItem('token');
            this.router.navigate(['/']);
          }
        }
      );

      this.studentScheduleService.getTermDate().subscribe(
        (res: any) => {
          this.termStartDate = res.data.startDate;
          this.termEndDate = res.data.endDate;
        },
        (errors: any) => {
          this.isFoundSchedule = false;
          if (errors.error.status == 401) {
            localStorage.removeItem('token');
            this.router.navigate(['/']);
          }
        }
      );

      this.studentScheduleService.getStudentSchedule(this.classId).subscribe(
        (res: any) => {
          if (res.status !== 200) {
            return;
          }

          this.calendarEvents = [];
          res.data.map((item: any, index: number) => {
            const courseColor = this.coursesColors.find(
              (c: any) => c.course === item.course._id
            );

            this.calendarEvents[index] = {
              title: item.course.courseName,
              startTime: item.startTime,
              endTime: item.endTime,
              allDay: false,
              recurringEvent: true,
              startRecur: this.termStartDate,
              endRecur: this.termEndDate,
              daysOfWeek: [this.daysOfWeek.indexOf(item.dayOfWeek)],
              backgroundColor: courseColor ? courseColor.color : '#000',
            };
          });
        },
        (errors) => {
          this.isFoundSchedule = false;
          if (errors.error.status == 401) {
            localStorage.removeItem('token');
            this.router.navigate(['/']);
          }
        }
      );
    }, 400);
  }
}
