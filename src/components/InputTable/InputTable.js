import React from 'react'
import { Table } from 'antd'

import './InputTable.css'


const InputTable = (
  {
    components,
    dataSource,
    columns
  }) => {
  return (
    <Table
      style={{marginBottom: 16}}
      components={components}
      rowClassName={() => 'editable-row'}
      rowKey={(record, index) => index}
      bordered
      dataSource={dataSource}
      columns={columns}
      pagination={false}
    />
  )
}

export default InputTable