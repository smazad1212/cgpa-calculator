import React from 'react'
import { Table } from 'antd'

import table from './InputTable.module.css'


const InputTable = (
  {
    components,
    dataSource,
    columns,
    rowKey
  }) => {
  return (
    <Table
      className={table.table}
      rowClassName={table.tableRow}
      components={components}
      rowKey={(record, index) => rowKey ? rowKey(record) : index}
      bordered
      dataSource={dataSource}
      columns={columns}
      pagination={false}
    />
  )
}

export default InputTable