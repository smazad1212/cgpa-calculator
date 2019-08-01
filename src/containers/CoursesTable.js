import React, { Component } from 'react'
import { Table, Input, Button, Popconfirm, Form } from 'antd'

const EditableContext = React.createContext()

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
)

const EditableFormRow = Form.create()(EditableRow)

class EditableCell extends Component {
  state = {
    editing: false,
  }

  toggleEdit = () => {
    const editing = !this.state.editing
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus()
      }
    })
  }

  save = e => {
    const { record, handleSave } = this.props
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return
      }
      this.toggleEdit()
      handleSave({ ...record, ...values })
    })
  }

  renderCell = form => {
    this.form = form
    const { children, dataIndex, record, title } = this.props
    const { editing } = this.state
    return editing ? (
      <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: `${title} is required.`,
            },
          ],
          initialValue: record[dataIndex],
        })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={this.toggleEdit}
      >
        {children}
      </div>
    )
  }

  render() {
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      children,
      ...restProps
    } = this.props
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
          children
        )}
      </td>
    )
  }
}

class EditableTable extends Component {
  columns = [
    {
      title: 'Course Title',
      dataIndex: 'title',
      width: '40%',
      editable: true,
    },
    {
      title: 'Credit',
      dataIndex: 'credit',
    },
    {
      title: 'Grade',
      dataIndex: 'grade',
    },
    {
      title: 'Point',
      dataIndex: 'point',
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      // render: (text, record, index) => {
      //   return (
      //     this.state.courses.length >= 1 ? (
      //       <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(index)}>
      //         <a>Delete</a>
      //       </Popconfirm>
      //     ) : null
      //   )
      // }
      render: (text, record, index) => {
        return (
          <button onClick={() => this.handleDelete(index)}>x</button>
        )
      }
    },
  ]

  state = {
    courses: [
      // {
      //   title: 'test data',
      //   credit: null,
      //   grade: null,
      //   point: 0,
      // },
      // {
      //   title: '',
      //   credit: null,
      //   grade: null,
      //   point: 0,
      // },
    ],
  }

  handleDelete = index => {
    const courses = [...this.state.courses]
    this.setState({ courses: courses.filter((item, rowIndex) => rowIndex !== index) })
  }

  // handleAdd = () => {
  //   const { courses } = this.state
  //   const newData = {
  //     title: '',
  //     credit: null,
  //     grade: null,
  //     point: 0,
  //   }
  //   this.setState({
  //     courses: [...courses, newData],
  //   })
  // }

  handleSave = (row, index) => {
    const newData = [...this.state.courses]
    const item = newData[index]
    newData.splice(index, 1, {
      ...item,
      ...row,
    })
    this.setState({ courses: newData })
  }

  render() {
    const { courses } = this.state
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    }
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col
      }
      return {
        ...col,
        onCell: (record, index) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: (record) => this.handleSave(record, index),
        }),
      }
    })
    return (
      <div>
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          rowKey={(record, index) => index}
          bordered
          dataSource={courses}
          columns={columns}
          pagination={false}
        />
        {/*<Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>*/}
        {/*  Add a row*/}
        {/*</Button>*/}
      </div>
    )
  }
}

export default EditableTable
