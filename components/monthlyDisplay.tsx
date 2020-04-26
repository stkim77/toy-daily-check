import React, { Component, useState } from 'react';
import * as R from 'ramda';
import Router, { useRouter } from 'next/router';
import { Layout, Calendar, Badge, Button } from 'antd';
import { calendarType, habitType } from '../config/constant';
import moment from 'moment';
import { rmdir } from 'fs';
import { ParsedUrlQuery } from 'querystring';


enum statusType {
  success = 'success',
  processing = 'processing',
  default = 'default',
  error = 'error',
  warning = 'warning'
}

type listType = {
  type: statusType,
  content: string,
};

const compareEqualYearAndMonth = (fromDate:moment.Moment, toDate:moment.Moment) : boolean => {
  const { year: fromYear, month: fromMonth} = getYearAndMonth(fromDate);
  const { year: toYear, month: toMonth} = getYearAndMonth(toDate);

  if (fromYear===toYear && fromMonth===toMonth) {
    return true;
  }
  return false;
};

const getYearAndMonth = (value : moment.Moment) : { year : string, month : string} => {
  return {
    year : value.format('YYYY'),
    month : value.format('MM')
  }
};

const getDate = (query : ParsedUrlQuery) : moment.Moment => {
  if (!R.isNil(query.date)) {
    return moment(query.date);
  }
  return moment();
}

const getListData = (displayDate : moment.Moment , value : moment.Moment, data : habitType[][]) : listType[] => {
  if (compareEqualYearAndMonth(displayDate, value)) {
    const month = value.month();
    const day = value.date();
    console.log(`${month} : ${day}`);
  
    const nowData = R.path<habitType[]>([day], data);
    if (!R.isNil(nowData)) {
      return R.map((obj : habitType) : listType => {
        const { title, result } = obj;
        return (
          {
            type: result ? statusType.success : statusType.error,
            content: title
          }
      );
      }, nowData);
    }  
  }

  return [];
}


function MonthlyDisplay ({data} : calendarType) {
  const { query } = useRouter();
  const displayDate : moment.Moment = getDate(query);
  const [value, setValue] = useState<moment.Moment>(getDate(query));
    
  return (
    <React.Fragment>
      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        <Button onClick={()=>{
          const now = moment();
            setValue(now); 
            if (!compareEqualYearAndMonth(now, displayDate)) {
              Router.push(`/calendar?menu=MONTH&date=${now.format('YYYY-MM-DD')}`);
            }
          }}
        >Today</Button>
      </div>
      <Calendar
        mode='month'
        value={value}
        disabledDate={currentDate => {
          return !compareEqualYearAndMonth(currentDate, displayDate);
        }}
        dateCellRender={value=>{
          const listData = getListData(displayDate, value, data);
          return (
            <div>
              <ul style={{padding: 0}}>
                {listData.map((item, index) => (
                  <li key={index}>
                    <Badge status={item.type} text={item.content} />
                  </li>
                ))}
              </ul>
            </div>
          );
        }}
        onSelect={selectDate => {
          setValue(selectDate);
          if (!compareEqualYearAndMonth(selectDate, displayDate)) {
            Router.push(`/calendar?menu=MONTH&date=${selectDate.format('YYYY-MM-DD')}`);
          }
        }}
      />

    </React.Fragment>
  );
}

export default MonthlyDisplay;