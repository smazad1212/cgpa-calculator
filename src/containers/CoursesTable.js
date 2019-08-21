import React, { Component } from 'react'
import { Input, Popconfirm, Button, Spin } from 'antd'

import InputTable from '../components/InputTable/InputTable'
import CustomButton from '../components/CustomButton/CustomButton'
import SelectDropdown from '../components/SelectDropdown/SelectDropdown'
import GRADES from '../constants/Grades'
import CREDITS from '../constants/Credits'

class CoursesTable extends Component {
  columns = [
    {
      title: 'Course Title',
      dataIndex: 'title',
      width: '30%',
      render: (value, record, index) => {
        return (
          <Input onChange={e => this.handleChange(e.target.value, record, index, 'title')} value={value} />
        )
      }
    },
    {
      title: 'Course Code',
      dataIndex: 'code',
      width: '15%',
      render: (value, record, index) => {
        return (
          <Input onChange={e => this.handleChange(e.target.value, record, index, 'code')} value={value} />
        )
      }
    },
    {
      title: 'Credit',
      dataIndex: 'credit',
      width: '15%',
      render: (value, record, index) => {
        return (
          <SelectDropdown
            options={CREDITS}
            onChange={select => this.handleChange(select, record, index, 'credit')}
            defaultSelected={value}
          />
        )
      }
    },
    {
      title: 'Grade',
      dataIndex: 'grade',
      width: '15%',
      render: (value, record, index) => {
        return (
          <SelectDropdown
            options={GRADES}
            onChange={select => this.handleGradeChange(select, record, index)}
            defaultSelected={value}
          />
        )
      }
    },
    {
      title: 'Grade Point',
      dataIndex: 'gradePoint',
      width: '15%',
      render: (value, record) => record.gradePoint
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
    loading: true,
    courses: [
      {
        key: 1,
        title: '',
        code: '',
        credit: null,
        grade: null,
        point: null,
        gradePoint: null,
      },
    ],
    count: 2
  }

  componentDidMount() {
    let courses = JSON.parse(localStorage.getItem('courses') || '[]')
    if (courses.length) {
      this.setState({
        courses,
        count: courses[courses.length-1].key + 1,
        loading: false
      })
    }
    else {
      this.setState({ loading: false })
    }
  }

  handleDelete = (index) => {
    const newData = [...this.state.courses]
    newData.splice(index, 1)
    this.setState({ courses: newData }, () => {
      localStorage.setItem('courses', JSON.stringify(this.state.courses))
    })
  }

  handleChange = (value, record, index, property) => {
    const newData = [...this.state.courses]
    newData.splice(index, 1, {
      ...record,
      [property]: value,
      gradePoint: property === 'credit' ? parseFloat((value * record.point).toFixed(2)) : record.gradePoint
    })
    this.setState({ courses: newData }, () => {
      localStorage.setItem('courses', JSON.stringify(this.state.courses))
    })
  }

  handleGradeChange = (value, record, index) => {
    const newData = [...this.state.courses]
    const grade = value
    const point = GRADES.find(data => data.value === grade).point
    newData.splice(index, 1, {
      ...record,
      grade,
      point,
      gradePoint: parseFloat((point * record.credit).toFixed(2))
    })
    this.setState({ courses: newData }, () => {
      localStorage.setItem('courses', JSON.stringify(this.state.courses))
    })
  }

  handleAdd = () => {
    const { courses, count } = this.state
    const newData = {
      key: count,
      title: '',
      code: '',
      credit: null,
      grade: null,
      point: null,
      gradePoint: null,
    }
    this.setState({
      courses: [...courses, newData],
      count: count + 1
    }, () => {
      localStorage.setItem('courses', JSON.stringify(this.state.courses))
    })
  }

  getCgpa() {
    let totalGradePoints = this.state.courses.reduce((total, course) => {
      return total + course.gradePoint
    }, 0)
    let totalCredits = this.state.courses.reduce((total, course) => {
      if (course.point === null) {
        return total + 0
      }
      return total + course.credit
    }, 0)
    if (totalCredits === 0) return 0
    return (totalGradePoints/totalCredits).toFixed(2)
  }

  render() {
    if (this.state.loading) return <Spin />
    const { courses } = this.state
    return (
      <div>
        <InputTable
          dataSource={courses}
          columns={this.columns}
          rowKey={record => record.key}
        />
        <CustomButton onClick={this.handleAdd}>
          Add a row
        </CustomButton>
        <h1>Your CGPA is: {this.getCgpa()}</h1>
      </div>
    )
  }
}

export default CoursesTable
