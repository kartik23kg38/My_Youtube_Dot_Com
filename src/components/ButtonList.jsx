import React from 'react'
import Button from './Button'

const ButtonList = () => {
  const list = ["All", "Live", "Soccer", "Songs", "Podcasts", "Cricket", "Dance", "Cricket", "Mixes", "Concerts", "Action Thrillers", "Data Structure", "Presentations", "Recently Uploaded", "Watched", "News", "Fitness", "Tech"];

  return (
    <div className='flex overflow-x-auto flex-nowrap space-x-2 px-2 h-14 scrollbar-hide'>
      {list.map((item, index) => (
        <Button key={`${item}-${index}`} name={item}/>
      ))}
      
    </div>
  )
}

export default ButtonList