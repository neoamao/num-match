import React, { Component } from 'react'
import { Row, Col, Card, Table} from 'antd'

class ResultTable extends Component {
  state = {
    eleven: [],
    four: [],
    nine: []
  }

  componentDidMount(nextProps) {
    const { eleven, four, nine } = this.props
    this.setState({ eleven, four, nine })
}

  componentWillReceiveProps(nextProps) {
      const { eleven, four, nine } = nextProps
      this.setState({ eleven, four, nine })
  }

  render() {
    const { eleven, four, nine } = this.state
    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date'
        },
        {
            title: 'Result',
            dataIndex: 'result',
            key: 'result'
        }
    ]
    return (
        <div style={{ background:"grey", padding: "20px"}}>
            <Row gutter={16}>
                <Col span={8}>
                    <Card title="11PM Results">
                      <Table pagination={false} columns={columns} dataSource={eleven} />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="4PM Results">
                      <Table pagination={false} columns={columns} dataSource={four} />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="9PM Results">
                      <Table pagination={false} columns={columns} dataSource={nine} />
                    </Card>
                </Col>
            </Row>
        </div>
        
    )
 }
}

export default ResultTable