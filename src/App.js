import React, { Component } from 'react';
import { Input, Button, Card, Select } from 'antd'
import moment from 'moment'
import fire from './fire'
import 'antd/dist/antd.css';

class App extends Component {
  state = {
    inputValue: "",
    value: "",
    results: [],
    numbers: [],
    day: null,
    month: null,
    specDate: null
  }

  inputChange = (e) => {
    let inputValue, value, numbers, day, month, specDate
    const newValue = e.target.value
    if(e.target.value.length === 27) {
      inputValue = e.target.value

      //To split the entered set of numbers from date
      value = e.target.value.split(/\s+/g)
      
      //To split the set of numbers and remove "-" sign
      numbers = value[0].split("-")
      
      //0 = Sunday, 2 = Tuesday, 5 = Friday
      day = moment(value[1]).day()

      //Months starts at 0 such as January is to 0 December is to 11
      month = moment(value[1]).month()
      specDate = moment(value[1]).date()
      this.setState({numbers, day, month, specDate, inputValue})
    }
    this.setState({value: newValue})
  }

  handleSave = () => {
    const {results, numbers, day, month, specDate, inputValue } = this.state
    const result = {
      numbers, day, month, specDate, inputValue
    }
    if(results.length === 0) {
      results.push(result)
      this.setState({value: ""})
    } else {
      results.map((val, index) => {
        if(val.inputValue == inputValue) {
          console.log('duplicate!')
        } else {
          results.push(result)
          
          this.setState({value: ""})
        }
      })
    }
    fire.database().ref("results").set("test")
    console.log("results", results)
  }

  render() {
    const Option = Select.Option
    return (
      <Card>
        <Input size="small" onChange={this.inputChange} value={this.state.value}/>
        <Button type="primary" onClick={this.handleSave}> Save </Button>
        <p>{this.state.newValue}</p>

        Day: 
        <Select defaultValue="Select day">
          <Option value="0">Sunday</Option>
          <Option value="2">Tuesday</Option>
          <Option value="5">Friday</Option>
        </Select>
      </Card>
    );
  }
}

export default App;
