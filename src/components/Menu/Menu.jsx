import React from 'react'

const Menu = ({ menu, addMenuItemToOrder }) => {
  return (
    <div className="menu">
      <h4>Menu</h4>
      <ul>
        {menu.map((item) => (
          <li key={item.id} onClick={() => addMenuItemToOrder(item)}>
            {item.title} - {item.currency} {item.price}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Menu;
