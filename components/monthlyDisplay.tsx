import React, { Component } from 'react';
import * as R from 'ramda';
import { Layout, Calendar, Badge, Button } from 'antd';
import moment from 'moment';

const { Content, Sider } = Layout;

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

class MonthlyDisplay extends Component {
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
    let listData;
    switch (value.date()) {
      case 8:
        listData = [
          { type: statusType.warning, content: 'This is warning event.' },
          { type: statusType.success, content: 'This is usual event.' },
        ];
        break;
      case 10:
        listData = [
          { type: statusType.warning, content: 'This is warning event.' },
          { type: statusType.success, content: 'This is usual event.' },
          { type: statusType.error, content: 'This is error event.' },
        ];
        break;
      case 15:
        listData = [
          { type: statusType.warning, content: 'This is warning event' },
          { type: statusType.success, content: 'This is very long usual event。。....' },
          { type: statusType.error, content: 'This is error event 1.' },
          { type: statusType.error, content: 'This is error event 2.' },
          { type: statusType.error, content: 'This is error event 3.' },
          { type: statusType.error, content: 'This is error event 4.' },
        ];
        break;
      default:
    }
    return listData || [];
  }
  
  dateCellRender = (value : moment.Moment) : React.ReactNode => {
    const listData = this.getListData(value);
    return (
      <ul style={{padding: 0}}>
        {listData.map(item => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  }
  
  getMonthData = (value : moment.Moment) => {
    if (value.month() === 8) {
      return 1394;
    }
  }
  
  monthCellRender = (value : moment.Moment) : React.ReactNode => {
    const num = this.getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
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
    const { value } = this.state;
    return (
      <React.Fragment>
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
          <Button onClick={this.goToday}>Today</Button>
        </div>
        <Calendar
          value={value}
          dateCellRender={this.dateCellRender}
          monthCellRender={this.monthCellRender}
          disabledDate={this.disabledDate}
          onSelect={this.selectDate} />
      </React.Fragment>
    );
  }
}

export default MonthlyDisplay;