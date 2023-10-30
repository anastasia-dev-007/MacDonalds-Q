import './App.css';
import React, { useState } from 'react';

function App() {
  const menu = [
    {
      id: 1,
      title: 'Coca-Cola',
      currency: '$',
      price: 3.19,
    },
    {
      id: 2,
      title: 'Cheesburger',
      currency: '$',
      price: 4.49,
    },
    {
      id: 3,
      title: 'Fries',
      currency: '$',
      price: 2.99,
    },
    {
      id: 4,
      title: 'Ice-Cream',
      currency: '$',
      price: 3.09,
    },
    {
      id: 5,
      title: 'Happy-Meal',
      currency: '$',
      price: 10.99,
    },
    {
      id: 6,
      title: 'Milkshake',
      currency: '$',
      price: 6.99,
    },
    {
      id: 7,
      title: 'Shrimps',
      currency: '$',
      price: 7.99,
    },
    {
      id: 8,
      title: 'McCrispy',
      currency: '$',
      price: 16.99,
    },
    {
      id: 9,
      title: 'Chicken Wrap',
      currency: '$',
      price: 8.49,
    },
    {
      id: 10,
      title: 'Vanila donut',
      currency: '$',
      price: 5.79,
    },
  ];

  const [orders, setOrders] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [orderConfirmation, setOrderConfirmation] = useState(null);
  const pendingOrders = orders.filter((order) => order.status === 'pending');
  const preparingOrders = orders.filter((order) => order.status === 'preparing').sort((a, b) => a.timePreparing - b.timePreparing); // Sort by the time they were marked as preparing

  const doneOrders = orders.filter((order) => order.status === 'done').sort((a, b) => a.timeDone - b.timeDone); // Sort by the time they were marked as preparing


  const handleItemClick = (item) => {
    //added unique id by Radu's reco. Otherwise it had deleted incorrectly items
    const uniqueId = selectedItems.length > 0 ? selectedItems[selectedItems.length - 1].id + 1 : 1;
    const selectedItem = { ...item, id: uniqueId }
    setSelectedItems([...selectedItems, selectedItem]);
  };

  const removeSelectedItem = (item) => {
    const updatedSelectedItems = selectedItems.filter((selectedItem) => selectedItem.id !== item.id);

    setSelectedItems(updatedSelectedItems);
  };


  const createOrder = () => {
    const time = Date.now();

    const totalOrderPrice = selectedItems.reduce(
      (total, item) => total + item.price, 0
    );

    const newOrder = {
      id: orders.length + 1,
      menuItems: selectedItems,
      status: 'pending',
      time: time,
      totalPrice: totalOrderPrice,
    };

    setOrders([...orders, newOrder]);

    setSelectedItems([]);

    // Show the confirmation message with order ID
    setOrderConfirmation(newOrder.id);

    // Hide the confirmation message after 2 seconds
    setTimeout(() => {
      setOrderConfirmation(null);
    }, 5000);
  };

  const moveToPreparing = (orderId) => {
    const index = orders.findIndex(item =>
      item.id === orderId)
    orders[index].status = 'preparing';
    orders[index].timePreparing = Date.now();

    setOrders([...orders]);
  };

  const moveToDone = (orderId) => {
    const index = orders.findIndex(item => item.id === orderId);
    orders[index].status = 'done';
    orders[index].timeDone = Date.now();


    setOrders([...orders]);
  };

  const pickUpOrder = (order) => {
    const confirmed = window.confirm(`Your total is $${order.totalPrice}. Press "OK" to proceed with payment!`);
    if (confirmed) {
      const updatedOrders = orders.filter((item) => item.id !== order.id);
      setOrders(updatedOrders);

      return window.alert('Thank you for choosing us! Enjoy your meal!');
    } else {
      return window.alert('Proceed with payment to pick-up your order!');
    }
  };

  return (
    <div>
      <div>
        <h3>PLACING ORDER</h3>

        <div className="placingOrderInterface">
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

          <div className="order">
            <h4>Order</h4>
            {selectedItems.length === 0 ?
              <p>Please select products from menu, and when you're ready, click "Finish Order." You can track status of your order on displays in the restaurant. </p> : (
                <ul>
                  {selectedItems.map((item) => (
                    <li key={item.id}>{item.title} - {item.currency} {item.price}
                      <button onClick={() => removeSelectedItem(item)}>Remove</button></li>
                  ))}
                </ul>
              )}
          </div>
        </div>

        <button disabled={selectedItems.length === 0} onClick={createOrder}>Finish Order</button>

        <h4 style={{ color: 'green' }}>
          {/* Display the order confirmation message */}
          {orderConfirmation && (
            <p>Your order number is: Order no.{orderConfirmation}. Follow its progress on displays in the restaurant.</p>
          )}
        </h4>
      </div>


      <hr />

      <div>
        <h3>TRACKING ORDER</h3>

        <div className="trackingOrderInterface">
          <div className="pending">
            <h4>Pending</h4>
            {pendingOrders.length === 0 ?
              <p>No pending orders. </p> : (
                <ol>
                  {pendingOrders.map((order) => (
                    <li key={order.id} onClick={() => moveToPreparing(order.id)}>
                      <p><b>Order {order.id} - ${order.totalPrice}</b></p>
                      <ul>
                        {order.menuItems.map((item) => (
                          <li key={item.id}>{item.title}</li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ol>)}
          </div>

          <div className="preparing">
            <h4>Preparing</h4>
            {preparingOrders.length === 0 ?
              <p>No preparing orders. </p> : (
                <ol>
                  {preparingOrders.map((order) => (
                    <li key={order.id}
                      onClick={() => moveToDone(order.id)}>
                      <p><b>Order {order.id} - ${order.totalPrice}</b></p>
                      <ul>
                        {order.menuItems.map((item) => (
                          <li key={item.id}>{item.title}</li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ol>)}
          </div>

          <div className="done">
            <h4>Done</h4>
            {doneOrders.length === 0 ?
              <p>No done orders. </p> : (
                <ol>
                  {doneOrders.map((order) => (
                    <li key={order.id}>
                      <p><b>Order {order.id}  - ${order.totalPrice}</b></p>
                      <ul>
                        {order.menuItems.map((item) => (
                          <li key={item.id}>{item.title}</li>
                        ))}
                      </ul>
                      <button
                        onClick={() => pickUpOrder(order)}>Pick-up</button>
                    </li>
                  ))}
                </ol>)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
