import { map } from 'rxjs/operators'
import { formatDate } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { DataService } from 'app/service/data.service';
import { Hour } from 'app/hour';
import { User } from 'app/user';
import jwt_decode from 'jwt-decode';
import { ActivatedRoute, Route } from '@angular/router';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      h3 {
        margin: 0 0 10px;
      }

      pre {
        background-color: #f5f5f5;
        padding: 15px;
      }
    `,
  ],
  templateUrl: 'calendar.component.html',
  template: `
  <input 
    type="text" 
    mwlFlatpickr 
    [(ngModel)]="selectedDate" 
    [altInput]="true" 
    [convertModelValue]="true">
`
})
export class CalendarComponent {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();
  users: any;
  user = new User();
  hourData: any;
  hours: any;
  hour = new Hour();
  data: any;
  token: any;
  id: any;
  userData: any;
  maDate: any;
  maDate1: any;
  form:FormGroup;
  submitted = false ;
  calendarData: any[] = [];
  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh = new Subject<void>();
  hrdb: any;
  date1 = new Date('17:30:00');
  dayClicked(action: string, { date, events }: { date: Date; events: CalendarEvent[] }): void {
    let actualHour = new Hour()
    this.modal.open(this.modalContent, { size: 'lg' });
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
      this.maDate = this.datePipe.transform(this.viewDate, 'yyyy-MM-ddThh:mm');
      this.maDate1 = this.datePipe.transform(this.viewDate, 'yyyy-MM-ddThh:mm');
    }

  }



  activeDayIsOpen: boolean = true;

  constructor(private modal: NgbModal, private router: Router, private Route: ActivatedRoute,
    private dataService: DataService, private datePipe: DatePipe,private formBuilder:FormBuilder) {

  }
  addForm(){
    this.form = this.formBuilder.group({
      user_id: ['', [Validators.required]],
      tache: ['', [Validators.required]]
    })
  }
  ngOnInit(): void {
    this.addForm();
    
    
    this.id = this.Route.snapshot.params['id'];
    this.getUserData();
    this.token = localStorage.getItem('token');
    this.userData = jwt_decode(this.token);
    //déja hay l fonction li tjiblek f data
    this.getHourData(this.id);
    this.hrdb = this.hour.date_debut;
    //this.getTasks();
    this.maDate = this.datePipe.transform(this.viewDate, 'yyyy-MM-ddThh:mm');
    this.maDate1 = this.datePipe.transform(this.viewDate, 'yyyy-MM-ddThh:mm');

  }
  get f() {
    return this.form.controls;
  }
  getHourData(id:any) {
    let Data: any[] = [];
    this.dataService.getHourData(this.userData.user.user_id).subscribe(res => {
      this.hours = res;
      //console.log(this.hours);
      //hedha l 'objet this.hours eli lezem n'affichiwh fel calendar

      //create calendarEvent Object based on results
      //initialise object
      //in case we have no data 
      if (this.hours.length > 0) {
        //loop through hoursdata and create new object 
        //for (let i = 0; i < this.hours.length; i++) {
        let that = this;
        this.hours.forEach((element: any) => {
          let obj = {
            start: new Date(element.date_debut),
            end: new Date(element.date_fin),
            title: (element.tache),
            color: colors.yellow,
            actions: '',
          };
          that.calendarData.push(obj)
        });
      }
    });

   // console.log(this.calendarData);
  }
  /*getTasks () {
    let hr = this.getHourData()
    console.log(hr);
    //fonction matnajemch ta3mel cnosole log l fonction
    
  }*/


  events: CalendarEvent[] = this.calendarData;
  /*[
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 5),
      //hedha objet ghalet hedheya objet li t3amer bih fel formulaire mte3 ajouter event
      title: this.hour.tache,
      color: colors.yellow,
      actions: this.actions,
    },
    
  ];*/
  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
    this.maDate = this.datePipe.transform(this.viewDate, 'yyyy-MM-ddThh:mm');
    this.maDate1 = this.datePipe.transform(this.viewDate, 'yyyy-MM-ddThh:mm');
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  insert() {
    this.hour.date_debut = this.maDate;
    this.hour.date_fin = this.maDate1;
    if (this.hour.date_debut > "17:00" && this.hour.date_fin < "22:00" && this.hour.date_fin > this.hour.date_debut && this.hour.tache != null && this.hour.user_id != null ) 
    {
      {
        this.dataService.insertHour(this.hour).subscribe(res => {
        this.data = res;
        });
      }
    }
    else {
      alert('Vérifiez Les Coordonnées');
    }
  }

  getUserData() {
    this.dataService.getData().subscribe(res => {
      this.users = res;
    }
    );
  }

}
