import React, { Component } from 'react';
import * as R from 'ramda';
import { Layout, Calendar, Badge, Button, List, Card, DatePicker, Row, Col } from 'antd';
import ko_locale from 'antd/es/date-picker/locale/ko_KR';
import moment from 'moment';
import { WEEK_TITLE, weekTitleObj } from '../config/constant';

moment.updateLocale("en", { week: {
  dow: 1, // First day of week is Monday
  doy: 4  // First week of year must contain 4 January (7 + 1 - 4)
}});

interface titleObj {
  title : string,
  color : string,
  date : string
}

class WeeklyDisplay extends Component {
  state = {
    collapsed: false,
    selectedDate: moment(),
    weekData: [],
    displayedYear: moment().format('YYYY'),
    displayedMonth: moment().format('MM')
  };

  goToday = () : void => {
    this.setState({
      selectedDate: moment()
    });
  }

  onChange = (date : moment.Moment | null, dateString : string) : void => {
    if (!R.isNil(date)) {
      this.setState({
        selectedDate: date
      });
      // console.log(date, dateString);
      // console.log(date.format('YYYY-wo'));
      // console.log(date.format('YYYY-MM-DD'));
      // console.log(date.startOf('isoWeek').format('YYYY-MM-DD'));  
    }
  }

  addDateToWeekTitle = () : titleObj[] => {
    const { selectedDate } = this.state;
    const monday = moment(selectedDate).startOf('week');
    return WEEK_TITLE.map(
      (item, index) => {
        return { ...item,
          date: moment(monday).add(index, 'day').format('YYYY-MM-DD')
        };
      }
    );
  };

  makeTitleNode = (item : titleObj) : React.ReactNode => (
    <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
      <div>{item.title}</div>
      <div style={{fontSize: '12px'}}>({item.date})</div>
    </div>
  );
  
  render() {
    const { selectedDate } = this.state;
    const weekData = this.addDateToWeekTitle();
    return (
      <React.Fragment>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
          <Button onClick={this.goToday}>Today</Button>
          <DatePicker style={{margin: '12px 0'}} onChange={this.onChange} picker="week" value={selectedDate} />
        </div>
        <div style={{backgroundColor: '#ececec', padding: '30px'}}>
          <Row justify='space-around'>
            {
              R.map((item)=>{
                const titleStyle : React.CSSProperties = {
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  color: item.color
                }
                return (
                  <Col span={3} key={item.title}>
                    <Card title={this.makeTitleNode(item)} bordered={false} headStyle={titleStyle}>
                      Card content
                    </Card>
                  </Col>    
                );
              }, weekData)
            }
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

export default WeeklyDisplay;