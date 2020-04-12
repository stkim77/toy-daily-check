import { CalendarOutlined, ScheduleOutlined } from '@ant-design/icons';

export const HEADER_MENU : string[] = ['calendar', 'setting', 'statistics'];
export const CALENDAR_SIDE_MENU : string[] = ['Month', 'Week'];

export interface weekTitleObj {
  title : string,
  color : string
}

export const WEEK_TITLE : weekTitleObj[] = [
  {
    title : 'Monday',
    color : '#000000'
  },
  {
    title : 'Tuesday',
    color : '#000000'
  },
  {
    title : 'Wednesday',
    color : '#000000'
  },
  {
    title : 'Thursday',
    color : '#000000'
  },
  {
    title : 'Friday',
    color : '#000000'
  },
  {
    title : 'Saturday',
    color : '#0000FF'
  },
  {
    title : 'Sunday',
    color : '#FF0000'
  },
];

// export const CALENDAR_SIDE_MENU : Array<{ name: string, icon: any }> = Array(
//   {
//     name : 'Month',
//     icon : CalendarOutlined
//   },
//   {
//     name : 'Week',
//     icon : ScheduleOutlined
//   }
// );