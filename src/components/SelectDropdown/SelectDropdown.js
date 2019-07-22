import React, { PureComponent } from 'react'
import { Select } from 'antd'

const { Option } = Select

class SelectDropdown extends PureComponent {
  state = {

  }

  handleChange = value => {
    console.log("You selected:", value)
  }

  render() {
    return (
      <div>
        <label>Select University</label>
        <Select defaultValue="nsu" onChange={this.handleChange}>
          <Option value="nsu">North South University</Option>
          <Option value="brac" disabled>BRAC University</Option>
        </Select>
      </div>
    )
  }
}

export default SelectDropdown