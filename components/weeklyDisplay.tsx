import React, { Component } from 'react';
import * as R from 'ramda';
import { Layout, Calendar, Badge, Button, List, Card, DatePicker, Row, Col } from 'antd';
import moment from 'moment';
import { disconnect } from 'cluster';

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

const data = [
  {
    title: 'Monday',
  },
  {
    title: 'Tuesday',
  },
  {
    title: 'Wednesday',
  },
  {
    title: 'Thursday',
  },
  {
    title: 'Friday',
  },
  {
    title: 'Saturday',
  },
  {
    title: 'Sunday',
  },
];

class WeeklyDisplay extends Component {
  state = {
    collapsed: false,
    value: moment(),
    displayedYear: moment().format('YYYY'),
    displayedMonth: moment().format('MM')
  };

  onCollapse = (collapsed: boolean) => {
    this.setState({ collapsed });
  };

  goToday = () : void => {
    this.setState({
      value: moment()
    });
  }

  onChange = (date : moment.Moment | null, dateString : string) : void => {
    console.log(date, dateString);
    console.log(date?.format('YYYY-wo'));
    console.log(date?.format('YYYY-MM-DD'));
  }  
  
  render() {
    const { value } = this.state;
    return (
      <React.Fragment>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
          <Button onClick={this.goToday}>Today</Button>
          <DatePicker style={{margin: '12px 0'}} onChange={this.onChange} picker="week" />
        </div>
        <div style={{backgroundColor: '#ececec', padding: '30px'}}>
          <Row justify='space-around'>
            {
              R.map((item)=>{
                return (
                  <Col span={3} key={item.title}>
                    <Card title={item.title} bordered={false} headStyle={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                      Card content
                    </Card>
                  </Col>    
                );
              }, data)
            }
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

export default WeeklyDisplay;