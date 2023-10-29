import './App.css';
import React, { useState } from 'react';

function App() {
  const menu = [
    {
      id: 1,
      title: 'Coca-Cola'
    },
    {
      id: 2,
      title: 'Cheesburger'
    },
    {
      id: 3,
      title: 'Potatoes Fri'
    },
    {
      id: 4,
      title: 'Ice-Cream'
    }
  ];

  const [orders, setOrders] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleItemClick = (item) => {
      setSelectedItems([...selectedItems, item]);
  };

  const createOrder = () => {
    const time = Date.now(); // Get the current timestamp

    const newOrder = {
      id: orders.length + 1,
      menuItems: selectedItems,
      status: 'pending', // Set the initial status to 'pending'
      time: time,
    };

    console.log(newOrder);

    // Add the new order to the orders array
    setOrders([...orders, newOrder]);

    // Clear the selected items for the next order
    setSelectedItems([]);
  };

  const markOrderAsPreparing = (orderId) => {
    // Find the order by its ID and update its status to 'preparing'
    const updatedOrders = orders.map((order) => {
      if (order.id === orderId) {
        return { ...order, status: 'preparing', timePreparing: Date.now() };
      }
      return order;
    });

    // Update the orders in the state
    setOrders(updatedOrders);
  };

  return (
    <div>
      <div>
        <h3>Client Interface</h3>

        <div className="clientInterface">
          <div className="menu">
            <h4>Menu</h4>
            <ul>
              {menu.map((item) => (
                <li key={item.id} onClick={() => handleItemClick(item)}>
                  {item.title}
                </li>
              ))}
            </ul>
          </div>

          <div className="order">
            <h4>Order</h4>
            <ul>
              {selectedItems.map((item) => (
                <li key={item.id}>{item.title}</li>
              ))}
            </ul>
          </div>
        </div>

        <button onClick={createOrder}>Finish Order</button>
      </div>


      <hr />

      <div>
        <h3>Kitchen Interface</h3>

        <div className="kitchenInterface">
          <div className="pending">
            <h4>Pending</h4>
            <ol>
              {orders
                .filter((order) => order.status === 'pending')
                .map((order) => (
                  <li key={order.id} onClick={() => markOrderAsPreparing(order.id)}>
                    <p>Order {order.id}</p>
                    {order.menuItems.map((item) => (
                      <ul>
                        <li key={item.id}>{item.title}</li>
                      </ul>
                    ))}
                  </li>
                ))}
            </ol>
          </div>

          <div className="preparing">
            <h4>Preparing</h4>
            <ol>
              {orders
                .filter((order) => order.status === 'preparing')
                .sort((a, b) => a.timePreparing - b.timePreparing) // Sort by the time they were marked as preparing
                .map((order) => (
                  <li key={order.id}>
                    <p>Order {order.id}</p>
                    {order.menuItems.map((item) => (
                      <ul>
                        <li key={item.id}>{item.title}</li>
                      </ul>
                    ))}
                  </li>
                ))}
            </ol>
          </div>

          <div className="done">
            <h4>Done</h4>
            <ol>
              {/* Add done orders here */}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
