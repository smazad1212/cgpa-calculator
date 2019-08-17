import React from 'react'
import { Select } from 'antd'

import dropdown from './SelectDropdown.module.css'

const { Option } = Select

const SelectDropdown = (
  {
    label,
    options = [], // array of objects { name: string, value: string }
    defaultSelected,
    onChange
  }) => {
  return (
    <div>
      <label>{label}</label>
      <Select className={dropdown.select} defaultValue={defaultSelected} onChange={onChange}>
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