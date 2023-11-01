import React from 'react'

const Orders = ({selectedItems, removeSelectedItem, orderConfirmation, createOrder}) => { //Am gasit aceasta abordare in loc de props si mi-a parut mai comoda. E ok asa?
  return (
    <div className="order">
    <h4>Order</h4>
    {selectedItems.length === 0 ?
      <p>Please select products from menu, and when you're ready, click "Finish Order." You can track status of your order on displays in the restaurant. </p> : (
        <ul>
          {selectedItems.map((item) => (
            <li key={item.id}>{item.title} - {item.currency} {item.price}
              <button onClick={() => removeSelectedItem(item)}>Remove</button>
              <button>-</button>x1<button>+</button>
            </li>
          ))}
        </ul>
      )}

    <button disabled={selectedItems.length === 0} onClick={createOrder}>Finish Order</button>

    <h4 style={{ color: 'green' }}>
      {/* Display the order confirmation message */}
      {orderConfirmation && (
        <p>ORDER No.{orderConfirmation}. Follow its progress on displays in the restaurant.</p>
      )}
    </h4>
  </div>
  )
}

export default Orders;
