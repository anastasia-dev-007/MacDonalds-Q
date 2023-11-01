import React from 'react'

const Menu = ({menu, handleItemClick}) => { //Am gasit aceasta abordare in loc de props si mi-a parut mai comoda. E ok asa?
  return (
    <div className="menu">
    <h4>Menu</h4>
    <ul>
      {menu.map((item) => (
        <li key={item.id} onClick={() => handleItemClick(item)}>
          {item.title} - {item.currency} {item.price}
        </li>
      ))}
    </ul>
  </div>
  )
}

export default Menu;
