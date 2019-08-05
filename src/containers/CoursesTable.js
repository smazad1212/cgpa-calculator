import React, { Component } from 'react'
import { Input, Form, Popconfirm, Button } from 'antd'

import InputTable from '../components/InputTable/InputTable'
import CustomButton from '../components/CustomButton/CustomButton'

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
        {
          form.getFieldDecorator(dataIndex, {
            rules: [
              {
                required: (dataIndex === 'credit') || (dataIndex === 'grade'),
                message: `${title} is required.`,
              },
            ],
            initialValue: record[dataIndex],
          })(
            <Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)
        }
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
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
      width: '35%',
      editable: true,
    },
    {
      title: 'Course Code',
      dataIndex: 'code',
      width: '15%',
      editable: true,
    },
    {
      title: 'Credit',
      dataIndex: 'credit',
      width: '10%',
      editable: true,
    },
    {
      title: 'Grade',
      dataIndex: 'grade',
      width: '10%',
      editable: true,
    },
    {
      title: 'Grade Point',
      dataIndex: 'point',
      width: '10%',
    },
    {
      title: 'GPA',
      dataIndex: 'gpa',
      width: '10%',
    },
    {
      title: '',
      dataIndex: 'operation',
      width: '10%',
      render: (text, record, index) => {
        return (
          this.state.courses.length >= 1 ? (
            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(index)}>
              <Button type="link">Delete</Button>
            </Popconfirm>
          ) : null
        )
      }
    },
  ]

  state = {
    courses: [
      {
        title: '',
        code: '',
        credit: '',
        grade: '',
        point: '',
        gpa: 0
      },
    ],
  }

  handleDelete = index => {
    const courses = [...this.state.courses]
    this.setState({ courses: courses.filter((item, rowIndex) => rowIndex !== index) })
  }

  handleAdd = () => {
    const { courses } = this.state
    const newData = {
      title: '',
      credit: null,
      grade: null,
      point: 0,
    }
    this.setState({
      courses: [...courses, newData],
    })
  }

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
        <InputTable
          components={components}
          dataSource={courses}
          columns={columns}
        />
        <CustomButton onClick={this.handleAdd}>
          Add a row
        </CustomButton>
      </div>
    )
  }
}

export default EditableTable
