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

  /* swertres */
     inputChange = (e) => {
    const results = []
    const newValue = e.target.value
    const value = e.target.value.split(/\s+/g)

    const polishedResults = value.filter((val, index) => {
      if (val.includes("/") || val.includes("-")) {
        return val
      }
    })

    while (polishedResults.length != 0) {
      let numbers, day, month, specDate, dateAsID
      const removed = polishedResults.splice(0,2)
      numbers = removed[0]

      dateAsID = removed[1].replace(/\//g, "-")

      day = moment(dateAsID).format("dddd")

      month = moment(dateAsID).format('MMMM')

      
      specDate = moment(removed[1]).date()

      const result = {
        numbers, day, month, specDate, dateAsID
      }
      results.push(result)
    }

    results.map((val, index) => {
      if(val.month == "October" && val.specDate == 17) {
        console.log("val", val)
        return val
      }
    })
    this.setState({ value: newValue })
  }

   /* per number  */
   /* inputChange = (e) => {
    const results = []
    const newValue = e.target.value
    const value = e.target.value.split(/\s+/g)

    const polishedResults = value.filter((val, index) => {
      if (val.includes("/") || val.includes("-")) {
        if (val !== "6/58") {
          return val
        }
      }
    })

    while (polishedResults.length != 0) {
      let numbers, day, month, specDate, year, dateAsID
      const removed = polishedResults.splice(0,2)
      numbers = removed[0].split("-")

      dateAsID = removed[1].replace(/\//g, "-")

      day = moment(dateAsID).format("dddd")

      month = moment(dateAsID).format('MMMM')
      
      year = moment(dateAsID).format('YYYY')
      
      specDate = moment(removed[1]).date()

      const result = {
        numbers, day, month, specDate, year, dateAsID
      }
      results.push(result)
    }
    let counter, matchingNum
    const val = [
      "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11",
      "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22",
      "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33",
      "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44",
      "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55",
      "56", "57", "58"
    ]
    const numCounts = []

    val.map((num, i)=>{
      counter = 0
      results.map(res => {
        if(res.year <= "2018" && res.day == "Sunday") {
          res.numbers.map(comp =>{
            if(num == comp) {
              counter++
            }
            return 0
          })
        }
        return 0
      })
      
      const count = {
        num,
        counter
      }
      numCounts.push(count)
      return 0;
    })

    numCounts.sort((a, b) =>{
      return a.counter - b.counter
    })
    console.log("counts", numCounts)
    this.setState({ value: newValue })
  }   */

  /* 6/58 */
   /* inputChange = (e) => {
    const results = []
    const newValue = e.target.value
    const value = e.target.value.split(/\s+/g)

    const polishedResults = value.filter((val, index) => {
      if (val.includes("/") || val.includes("-")) {
        if (val !== "6/58") {
          return val
        }
      }
    })

    while (polishedResults.length != 0) {
      let numbers, day, month, specDate, dateAsID
      const removed = polishedResults.splice(0,2)
      numbers = removed[0].split("-")

      dateAsID = removed[1].replace(/\//g, "-")

      day = moment(dateAsID).format("dddd")

      month = moment(dateAsID).format('MMMM')

      
      specDate = moment(removed[1]).date()

      const result = {
        numbers, day, month, specDate, dateAsID
      }
      results.push(result)
    }
    let counter, matchingNum
    let val = ["17", "18", "12", "27", "36", "54"]
    //results.map((val, index) => { 
      results.map((value, i)=>{
        counter = 0
        matchingNum = []
        val.map(num => {
          value.numbers.map(comp =>{
            if(num == comp) {
              counter++
              matchingNum.push(num)
            }
            return 0
          })
          return 0
        })
        if(counter >= 3 && value.dateAsID != val.dateAsID) {
          console.log("matched", val)
          console.log("matched with", value)
          console.log("count", counter, matchingNum)
        }
        return 0;
      })
      //return 0; 
    //}) 
    this.setState({ value: newValue })
  } */

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
