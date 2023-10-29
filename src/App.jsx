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
    },
    {
      id: 5,
      title: 'Happy-Meal'
    },
    {
      id: 6,
      title: 'Milkshake'
    },
  ];

  const [orders, setOrders] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleItemClick = (item) => {
      setSelectedItems([...selectedItems, item]);
  };

  const createOrder = () => {
    const time = Date.now(); 

    const newOrder = {
      id: orders.length + 1,
      menuItems: selectedItems,
      status: 'pending', 
      time: time,
    };

    setOrders([...orders, newOrder]);

    setSelectedItems([]);
  };

  const moveToPreparing = (orderId) => {
    const updatedOrders = orders.map((order) => {
      if (order.id === orderId) {
        return { ...order, status: 'preparing', timePreparing: Date.now() };
      }
      return order;
    });

    setOrders(updatedOrders);
  };

  const moveToDone = (orderId) => {
    const updatedOrders = orders.map((order) => {
      if (order.id === orderId) {
        return { ...order, status: 'done', timeDone: Date.now() };
      }
      return order;
    });

    setOrders(updatedOrders);
  };

  const pickUpOrder = (orderId) => {
    const updatedOrders = orders.filter((order) => order.id !== orderId);
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

        <button disabled = {selectedItems.length === 0} onClick={createOrder}>Finish Order</button>
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
                  <li key={order.id} onClick={() => moveToPreparing(order.id)}>
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
                  <li key={order.id}
                  onClick={() => moveToDone(order.id)}>
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
            {orders
                .filter((order) => order.status === 'done')
                .sort((a, b) => a.timeDone - b.timeDone) // Sort by the time they were marked as preparing
                .map((order) => (
                  <li key={order.id}>
                    <p>Order {order.id}</p>
                    {order.menuItems.map((item) => (
                      <ul>
                        <li key={item.id}>{item.title}</li>
                      </ul>
                    ))}
                    <button onClick={() => pickUpOrder(order.id)}>Pick-up</button>
                  </li>
                ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
