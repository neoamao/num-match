import React, { Component } from 'react';
import InputOptions from './InputOptions'
import TableFilter from './TableFilter';
import fire from './fire'
import 'antd/dist/antd.css';
  
class App extends Component {
  state = {
    value: "",
    dateAsID: "",
    numbers: [],
    day: null,
    month: null,
    specDate: null,
    results: [],
    ultraResults: null,
    tresResults: null
  }

  componentDidMount() {
    let ultraResults, tresResults
    const firebaseUltraRef = fire
      .database()
      .ref("ultra")
      .orderByKey();

    firebaseUltraRef.on("value", snapshot => {
      const data = snapshot.val()
      ultraResults = data
      this.setState({ ultraResults})
    });

    const firebaseTresRef = fire
      .database()
      .ref("tres")
      .orderByKey();

      firebaseTresRef.on("value", snapshot => {
        const data = snapshot.val()
        tresResults = data
        this.setState({ tresResults})
    });
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

  addToFirebase = (selectedInput, results) => {
    if(selectedInput === "six") {
      fire.database().ref(`${"ultra"}`).set(results)
    } else {
      fire.database().ref(`${"tres"}/${selectedInput}`).set(results)
    }
  }

  render() {
    const { ultraResults, tresResults } = this.state
    return (
      <div>
        <InputOptions addToFirebase={this.addToFirebase}/>
        <TableFilter
          ultraResults={ultraResults}
          tresResults={tresResults}
        />
      </div>
    );
  }
}

export default App;
