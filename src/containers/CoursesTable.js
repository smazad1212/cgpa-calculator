import React, { Component } from 'react'
import { Input, Form, Popconfirm, Button } from 'antd'

import InputTable from '../components/InputTable/InputTable'
import CustomButton from '../components/CustomButton/CustomButton'
import SelectDropdown from '../components/SelectDropdown/SelectDropdown'
import GRADES from '../constants/Grades'

class CoursesTable extends Component {
  columns = [
    {
      title: 'Course Title',
      dataIndex: 'title',
      width: '30%',
      render: (value, record, index) => {
        return (
          <Input onChange={e => this.handleChange(e.target.value, record, index, 'title')} value={value}/>
        )
      }
    },
    {
      title: 'Course Code',
      dataIndex: 'code',
      width: '15%',
      render: (value, record, index) => {
        return (
          <Input onChange={e => this.handleChange(e.target.value, record, index, 'code')} value={value}/>
        )
      }
    },
    {
      title: 'Credit',
      dataIndex: 'credit',
      width: '15%',
      editable: true,
    },
    {
      title: 'Grade',
      dataIndex: 'grade',
      width: '15%',
      editable: true,
    },
    {
      title: 'Grade Point',
      dataIndex: 'point',
      width: '15%',
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
        title: 'qwe',
        code: '',
        credit: null,
        grade: null,
        point: 0,
      },
    ],
  }

  componentDidMount() {
    let courses = JSON.parse(localStorage.getItem('courses') || '[]')
    if (courses.length) {
      this.setState({ courses })
    }
  }

  handleDelete = index => {
    const courses = [...this.state.courses]
    this.setState({ courses: courses.filter((item, rowIndex) => rowIndex !== index) })
  }

  handleChange = (value, record, index, property) => {
    const newData = [...this.state.courses]
    newData.splice(index, 1, {
      ...record,
      [property]: value
    })
    this.setState({ courses: newData }, () => {
      localStorage.setItem('courses', JSON.stringify(this.state.courses))
    })
  }
  handleAdd = () => {
    const { courses } = this.state
    const newData = {
      title: '',
      code: '',
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
    localStorage.setItem('courses', JSON.stringify(newData))
  }

  render() {
    const { courses } = this.state
    return (
      <div>
        <InputTable
          dataSource={courses}
          columns={this.columns}
        />
        <CustomButton onClick={this.handleAdd}>
          Add a row
        </CustomButton>
      </div>
    )
  }
}

export default CoursesTable
