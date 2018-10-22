import React, { Component } from 'react'
import { Row, Col, Divider, Input, Button, Card, Modal, Icon} from 'antd'
import moment from 'moment'

class InputOptions extends Component {
    state = {
        modalVisible: false,
        selectedInput: 0,
        inputValue: "",
        loading: false,
        results: []
    }

    showModal = (input) => {
        this.setState({modalVisible: true, selectedInput: input })
    }

    formatInput = (e) => {
        this.setState({loading: true})
        let polishedResults
        const results = []
        const newValue = e.target.value
        const value = e.target.value.split(/\s+/g)

        if(this.props.selectedInput === "six"){
            polishedResults = value.filter((val, index) => {
                if (val.includes("/") || val.includes("-")) {
                    if (val !== "6/58") {
                        return val
                    }
                }
                return 0
            })
        } else {
            polishedResults = value.filter((val, index) => {
                if (val.includes("/") || val.includes("-")) {
                    return val
                }
                return 0
            })
        }

        while (polishedResults.length !== 0) {
        let numbers, day, month, specDate, dateAsID
        const removed = polishedResults.splice(0,2)
        numbers = removed[0]

        dateAsID = removed[1].replace(/\//g, "-")

        day = moment(dateAsID).format("dddd")

        month = moment(dateAsID).format('MMMM')

        
        specDate = moment(removed[1]).date()

        const result = {
            numbers, day, month, specDate, dateAsID, draw: this.state.selectedInput
        }
        results.push(result)
            if(polishedResults.length === 0) {
                this.setState({loading:false})
            }
        }
        this.setState({ inputValue: newValue, results })
    }
    
    handleOk = () => {
        const { selectedInput, results } = this.state
        console.log("submitted", selectedInput, results)
        this.props.addToFirebase(selectedInput, results)
        this.setState({modalVisible: false, inputValue: ""})
    }

    handleCancel = () => {
        this.setState({modalVisible: false, inputValue: ""})
    }


    render() {
        const { modalVisible, loading } = this.state
        return(
            <div style={{ background:"grey", padding: "20px"}}>
                <Modal
                    title="Add Result"
                    visible={modalVisible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Input
                        onPressEnter={this.handleOk}
                        onChange={this.formatInput}
                        value={this.state.inputValue}
                    />
                    { loading && <p><Icon type="sync" theme="outlined" spin/> Formatting input ...</p> }
                </Modal>
                <Row gutter={16}>
                    <Col span={8}>
                        <Card title="6/58 Input Option:">
                            <Button onClick={this.showModal.bind(this, "six")}>Add 6/58 Results</Button>
                        </Card>
                    </Col>
                    <Col span={16}>
                        <Card title="Swertres Input Options:">
                            <Button onClick={this.showModal.bind(this, "eleven")}>Add 11PM Results</Button>
                            <Divider type="vertical"></Divider>
                            <Button onClick={this.showModal.bind(this, "four")}>Add 4PM Results</Button>
                            <Divider type="vertical"></Divider>
                            <Button onClick={this.showModal.bind(this, "nine")}>Add 9PM Results</Button>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default InputOptions;