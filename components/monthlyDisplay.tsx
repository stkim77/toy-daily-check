import React, { Component } from 'react';
import * as R from 'ramda';
import { Layout, Calendar, Badge, Button } from 'antd';
import { calendarType, habitType } from '../config/constant';
import moment from 'moment';
import { rmdir } from 'fs';

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

const getYearAndMonth = (value : moment.Moment) : { year : string, month : string} => {
  return {
    year : value.format('YYYY'),
    month : value.format('MM')
  }
};

class MonthlyDisplay extends Component<calendarType> {
  state = {
    collapsed: false,
    value: moment(),
    displayedYear: moment().format('YYYY'),
    displayedMonth: moment().format('MM')
  };

  onCollapse = (collapsed: boolean) => {
    this.setState({ collapsed });
  };

  getListData = (value : moment.Moment) : listType[] => {
    const { data } = this.props;
    const nowMonth = value.month() + 1;
    const nowDate = value.date();

    const nowData = R.path([nowMonth, nowDate], data);
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

    return [];
  }
  
  dateCellRender = (value : moment.Moment) : React.ReactNode => {
    const listData = this.getListData(value);
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
  }
  
  selectDate = (value: moment.Moment) : void => {
    const { displayedYear, displayedMonth } = this.state;
    const { year: selectedYear, month: selectedMonth} = getYearAndMonth(value);

    if (displayedYear===selectedYear && displayedMonth===selectedMonth) {
      alert(`Want to input Data : ${value.format('YYYY-MM-DD')}`);
      this.setState({
        value
      });
      // TODO : show modal
    } else {
      alert(`Want to change Calendar`);
      this.setState({
        displayedYear: selectedYear,
        displayedMonth: selectedMonth,
        value
      });
    }
  }

  disabledDate = (currentDate: moment.Moment) : boolean => {
    const { displayedYear, displayedMonth } = this.state;
    const { year: currentYear, month: currentMonth} = getYearAndMonth(currentDate);

    if (displayedYear===currentYear && displayedMonth===currentMonth) {
      return false;
    }
    return true;
  }

  goToday = () : void => {
    this.setState({
      value: moment()
    });
  }
  
  render() {
    console.log(this.props.data)
    const { value } = this.state;
    return (
      <React.Fragment>
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
          <Button onClick={this.goToday}>Today</Button>
        </div>
        <Calendar
          value={value}
          dateCellRender={this.dateCellRender}
          disabledDate={this.disabledDate}
          onSelect={this.selectDate} />
      </React.Fragment>
    );
  }
}

export default MonthlyDisplay;