import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import { StudentScheduleService } from '../../services/schedule/student-schedule.service';
import { CourseService } from 'src/app/admin/services/course/course.service';
import { StudentService } from '../../services/student/student.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
})
export class ScheduleComponent {
  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'timeGridWeek,timeGridDay', // user can switch between the two
    },
    plugins: [
      dayGridPlugin,
      timeGridPlugin
    ],
    height: 580,
    initialView: 'timeGridWeek',
    slotMinTime: '08:00:00',
    slotMaxTime: '15:00:00',
    slotDuration: '01:00:01',
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

  constructor(
    private studentScheduleSerivce: StudentScheduleService,
    private courseService: CourseService,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    // get student data to get from it classid and send classid to course service and studentschedule service
    this.studentService.getStudentData().subscribe((res: any) => {
      this.classId = res.data.class;
    });

    setTimeout(() => {
      console.log(this.classId);
      this.courseService
        .getCoursesByClass(this.classId)
        .subscribe((res: any) => {
          res.data.map((item: any, index: number) => {
            this.coursesColors.push({
              course: item._id,
              color: this.colors[index],
            });
          });
        });

      this.studentScheduleSerivce
        .getSchedule(this.classId)
        .subscribe((res: any) => {
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
              startRecur: '2023-02-08',
              endRecur: '2023-05-07',
              daysOfWeek: [this.daysOfWeek.indexOf(item.dayOfWeek)],
              backgroundColor: courseColor ? courseColor.color : '#000',
            };
          });
        });
    }, 400);
  }
}
