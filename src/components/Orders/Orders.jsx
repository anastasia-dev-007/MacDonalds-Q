import React from 'react'

const Orders = ({selectedItems, groupedItems, removeItem, addItem, removeSelectedItem, createOrder,orderConfirmation }) => {
  return (
    <div className="order">
      <h4>Order</h4>
      {selectedItems.length === 0 ?
        <p>Please select products from menu, and when you're ready, click "Finish Order." You can track status of your order on displays in the restaurant. </p> : (
          <ul>
            {Object.entries(groupedItems).map(([id, { count, firstItem }]) => (
              <li key={id}>
                {firstItem.title} - {firstItem.currency} {firstItem.price}
                <button onClick={() => removeItem(firstItem)}>-</button>
                {/** Why paramtere is "firstItem" instead of just "item". Because When you click the "Remove" button for a group, it should remove one instance of that specific item. If you were to use item without specifying which one, you might remove all instances of that item with the same id. By passing firstItem as a parameter to the removeItem function, you are explicitly specifying which item to remove, ensuring that only one instance of that item is removed from the list of selected items. */}
                (x{count})
                <button onClick={() => addItem(firstItem)}>+</button>
                <button onClick={() => removeSelectedItem(firstItem)}>Remove</button>
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
