import React from 'react'

const Button = ({name}) => {
  return (
    <button className="bg-gray-300 px-3 py-1 my-3 mx-2 rounded-lg flex-shrink-0 whitespace-nowrap">
      {name}
    </button>
  )
}

export default Button