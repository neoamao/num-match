import React, { Component } from 'react';
import { Input, Button, Card, Select } from 'antd'
import moment from 'moment'
import fire from './fire'
import 'antd/dist/antd.css';

let ultraResult
const firebaseUltraRef = fire
  .database()
  .ref("ultra")
  .orderByKey();

firebaseUltraRef.on("value", snapshot => {
  const data = snapshot.val()
  ultraResult = data
});
class App extends Component {
  state = {
    value: "",
    dateAsID: "",
    numbers: [],
    day: null,
    month: null,
    specDate: null
  }

  inputChange = (e) => {
    let value, numbers, day, month, specDate, dateAsID
    const newValue = e.target.value
    value = e.target.value.split(/\s+/g)

    //console.log('val', value)

    const test = value.filter((val, index) => {
      if (val.includes("/") || val.includes("-")) {
        if (val !== "6/58") {
          return val
        }
      }
    })

    console.log("test", test)

    if (e.target.value.length === 27) {

      //To split the entered set of numbers from date
      value = e.target.value.split(/\s+/g)

      console.log('val', value)

      //To split the set of numbers and remove "-" sign
      numbers = value[0].split("-")

      //0 = Sunday, 2 = Tuesday, 5 = Friday
      day = moment(value[1]).day()

      //Months starts at 0 such as January is to 0 December is to 11
      month = moment(value[1]).month()
      specDate = moment(value[1]).date()

      dateAsID = value[1].replace(/\//g, "-")
      this.setState({ numbers, day, month, specDate, dateAsID })
    }
    this.setState({ value: newValue })
  }

  handleSave = () => {
    /* let dupChecker = false
    const { numbers, day, month, specDate, dateAsID } = this.state
    const result = {
      numbers, day, month, specDate
    }

    console.log(dupChecker)

    for (let index in ultraResult) {
      if (dateAsID == index) {
        dupChecker = true
      }
    } */

    //fire.database().ref(`${"ultra"}/${dateAsID}`).set(result)

    /* console.log(dupChecker)

    if (dupChecker) {
      console.log("duplicate!")
    } else {
      fire.database().ref(`${"ultra"}/${dateAsID}`).set(result)
      this.setState({ value: "" })
    } */
  }

  render() {
    const Option = Select.Option
    return (
      <Card>
        {this.state.ultraResult}
        <Input size="small" onChange={this.inputChange} value={this.state.value} />
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
