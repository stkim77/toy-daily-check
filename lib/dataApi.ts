import * as R from 'ramda';
import moment from 'moment';
import { calendarType, habitType } from '../config/constant';

const habitList: string[] = [
  'read book', 'go to gim', 'study English'
];
let loadData = false;
let temporaryData:habitType[][][] = [];

const initCalendarData = () => {
  const thisYear = moment().year();
  const firstDate = moment(`${thisYear}-01-01`);
  loadData = true;
  while(thisYear === firstDate.year()) {
    temporaryData.push(makeMonthData(moment(firstDate)));
    firstDate.add(1, 'month');
  }
};


const makeMonthData = (date: moment.Moment) : habitType[][] => {
  let monthData: habitType[][] = [];
  const thisMonth = date.month();
  while(thisMonth === date.month()) {
    monthData.push(makeDayData());
    date.add(1, 'day');
  }
  return monthData;
};

const makeDayData = () : habitType[] => {
  let dayData: habitType[] = [];
  for (const title of habitList) {
    const result = R.gte(Math.floor(Math.random() * 10), 5);
    dayData.push({title, result});
  }
  return dayData;
};

const updateCalendarData = () => {};

const habitData = {
  2020 : {
    0 : {},
    1 : {},
    2 : {},
    3 : {
      1 : [
        { title: 'habit01', result: true},
        { title: 'habit02', result: false}
      ],
      5 : [
        { title: 'habit03', result: true},
        { title: 'habit04', result: false}
      ]
    },
    4 : {
      1 : [
        { title: 'habit01', result: true},
        { title: 'habit02', result: false}
      ],
      5 : [
        { title: 'habit03', result: true},
        { title: 'habit04', result: false}
      ]
    },
    5 : {},
    6 : {},
    7 : {},
    8 : {},
    9 : {},
    10 : {},
    11 : {}
  }
};

if (loadData===false) {
  initCalendarData();
}

const getData = (date : moment.Moment) : habitType[][] => {
  const month = date.month();
  const requestedData : habitType[][] | undefined = R.path<habitType[][]>([month], temporaryData);

  if (R.isNil(requestedData)) {
    return [];
  }
  return requestedData;
};

export default {
  getData
}