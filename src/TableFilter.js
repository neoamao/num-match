import React, { Component } from 'react'
import { Row, Col, Card, Select, DatePicker, Popover} from 'antd'
import moment from 'moment'
import ResultTable from './ResultTable'

class TableFilter extends Component {
  state = {
      tresResults: {},
      filteredEleven: [],
      filteredFour: [],
      filteredNine: []
  }

  componentDidMount() {
    this.setState({ tresResults: this.props.tresResults})
}

  componentWillReceiveProps(nextProps) {
      this.setState({ tresResults: nextProps.tresResults})
  }

  handleDaySelect = (e, a) => {
    console.log("day selected", e, a)
  }

  handleDateSelect = (object, date) => {
    let filteredEleven = [], filteredFour = [], filteredNine = []
    const { eleven, four, nine } = this.state.tresResults
    const specDate = moment(date).date()
    const month = moment(date).format("MMMM")
    if(specDate && month && eleven && four && nine) {
        eleven.map((res) => {
            if(res.month === month && res.specDate === specDate){
                const tableData = {
                    date: moment(res.dateAsID).format("MMMM DD, YYYY"),
                    result: res.numbers
                }
                filteredEleven.push(tableData)
            }
            return 0
        })
        four.map((res) => {
            if(res.month === month && res.specDate === specDate){
                const tableData = {
                    date: moment(res.dateAsID).format("MMMM DD, YYYY"),
                    result: res.numbers
                }
                filteredFour.push(tableData)
            }
            return 0
        })
        nine.map((res) => {
            if(res.month === month && res.specDate === specDate){
                const tableData = {
                    date: moment(res.dateAsID).format("MMMM DD, YYYY"),
                    result: res.numbers
                }
                filteredNine.push(tableData)
            }
            return 0
        })
    } 
    this.setState({ filteredEleven, filteredFour, filteredNine })
  }

  render() {
    const Option = Select.Option
    const { filteredEleven, filteredFour, filteredNine } = this.state
      return (
          <div style={{ background:"grey", padding: "20px"}}>
            <Row gutter={16}>
              <Col span={8}>
                <Card bordered={false}>
                  <span>Day: </span>
                  <span> 
                  <Select defaultValue="Select day" onChange={this.handleDaySelect}>
                    <Option value="">Select day</Option>
                    <Option value="Sunday">Sunday</Option>
                    <Option value="Monday">Moday</Option>
                    <Option value="Tuesday">Tuesday</Option>
                    <Option value="Wednesday">Wednesday</Option>
                    <Option value="Thursday">Thursday</Option>
                    <Option value="Friday">Friday</Option>
                  </Select>
                  </span>
                </Card>
              </Col>                 
              <Col span={16}>
                <Card bordered={false}>
                  <span>Select Date: </span>
                  <span>
                    <Popover 
                      content={<p>Selecting a date will use the <strong> month </strong>
                      and the <strong> specific date </strong> as filters.
                      <strong> Day and year</strong> will not be included</p>}
                    >
                      <DatePicker onChange={this.handleDateSelect}/>
                    </Popover>
                  </span>
                </Card>
              </Col>
            </Row>
            <Row>
                <ResultTable
                    eleven={filteredEleven}
                    four={filteredFour}
                    nine={filteredNine}
                />
            </Row>
          </div>
        )
    }
}

export default TableFilter