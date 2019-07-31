import React from 'react'
import { Select } from 'antd'

import dropdown from './SelectDropdown.module.css'

const { Option } = Select

const SelectDropdown = (
  {
    label,
    options = [],
    defaultSelected,
    onChange
  }) => {
  return (
    <div>
      <label className={dropdown.label}>{label}</label>
      <Select defaultValue={defaultSelected} onChange={onChange}>
        {
          options.map((option, index) => (
            <Option
              key={index}
              value={option.value}
              disabled={option.disabled}
            >
              {option.name}
            </Option>
          ))
        }
      </Select>
    </div>
  )
}

export default SelectDropdown