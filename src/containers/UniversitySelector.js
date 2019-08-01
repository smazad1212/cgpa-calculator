import React, { Component } from 'react'
import { Spin } from 'antd'

import SelectDropdown from './../components/SelectDropdown/SelectDropdown'

class UniversitySelector extends Component {
  state = {
    options: [],
    selected: null,
    loading: true
  }

  componentDidMount() {
    this.setState({
      options: [
        {
          name: 'North South University',
          value: 'nsu'
        },
        {
          name: 'Other',
          value: 'other',
          disabled: true
        }
      ],
      selected: 'nsu',
      loading: false
    })
  }

  handleChange = value => {
    console.log(value)
  }

  render() {
    if (this.state.loading) return <Spin />
    let { options, selected } = this.state
    return (
      <SelectDropdown
        label="Select University"
        options={options}
        defaultSelected={selected}
        onChange={this.handleChange}
      />
    )
  }
}

export default UniversitySelector