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