import * as R from 'ramda';
import moment from 'moment';
import { calendarType, habitType } from '../config/constant';

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

const getData = (date : moment.Moment) => {
  const year = date.year();
  const month = date.month();
  const requestedData : object | undefined = R.path<object>([year, month], habitData);
  if (!R.isNil(requestedData)) {
    const result = [];
    for (let i = 0 ; i<32 ; i++) {
      const tempData = R.path<habitType[]>([i], requestedData);
      if (R.isNil(tempData)) {
        result.push([]);
      } else {
        result.push(tempData);
      }
    }
    return result;
  }
  return [];
};

export default {
  getData
}