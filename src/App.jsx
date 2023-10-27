import './App.css';
import React, { useState } from 'react';

function App() {
  const [order, setOrder] = useState([]);
  const [pendingOrder, setPendingOrder] = useState([]);
  const [preparingOrder, setPreparingOrder] = useState([]);
  const [doneOrder, setDoneOrder] = useState([]);

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

  const addToOrder = (item) => {
    const newOrder = {
      ...item,
      status: 'pending',
    };
    setOrder([...order, newOrder]);
  };

  const finishOrder = () => {
    if (order.length > 0) {
      const updatedStatus = order.map(item => ({
        ...item,
        status: 'preparing',
      }));
      setPendingOrder([...pendingOrder, ...updatedStatus]);
      setOrder([]);
    }
  };

  const moveToPreparing = (order) => {
    if (pendingOrder.length > 0) {
      const updatedStatus = order.map(item => ({
        ...item,
        status: 'done',
      }));
      setPreparingOrder([...preparingOrder, ...updatedStatus]);
      setPendingOrder(pendingOrder.filter((pending) => pending !== order));
    }
  };

  const moveToDone = (order) => {
    if (preparingOrder.length > 0) {
      const updatedStatus = order.map(item => ({
        ...item,
        status: 'paid',
      }));
      setDoneOrder([...doneOrder, ...updatedStatus]);
      setPreparingOrder(preparingOrder.filter((done) => done !== order));
    }
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
                <li key={item.id}
                  onClick={() => addToOrder(item)}>
                  {item.title}
                </li>
              ))}
            </ul>
          </div>

          <div className="order">
            <h4>Order</h4>
            <ul>
              {order.length === 0 ? (
                <p>Please select items from the menu to create your order!</p>
              ) : (
                order.map(item => (
                  <li key={item.id}>
                    {item.title}
                  </li>
                )))}
            </ul>
          </div>
        </div>

        <button disabled={order.length === 0} onClick={() => finishOrder()}>Finish Order</button>
      </div>

      <hr />

      <div>
        <h3>Kitchen Interface</h3>

        <div className="kitchenInterface">
          <div className="pending">
            <h4>Pending</h4>

            <ol>
              {pendingOrder.length === 0 ? (
                <p>No pending orders yet!</p>
              ) : (
                pendingOrder
                  .filter(order => order.some(item => item.status === 'pending'))
                  .map((order, index) => (
                    <li key={index} onClick={() => moveToPreparing(order)}>
                      <h5>Order {index + 1}</h5>
                      <ul>
                        {order.map(item => (
                          <li key={item.id}>{item.title}</li>
                        ))}
                      </ul>
                    </li>
                  ))
              )}
            </ol>

          </div>

          <div className="preparing">
            <h4>Preparing</h4>
            <ol>
            {preparingOrder.length === 0 ? (
                <p>No preparing orders yet!</p>
              ) : (
              preparingOrder
                .filter(order => order.some(item => item.status === 'preparing'))
                .map((order, index) => (
                  <li key={index}
                    onClick={() => moveToDone(order)}>
                    <h5>Order {index + 1}</h5>
                    <ul>
                      {order.map(item =>
                        <li key={item.id}>{item.title}</li>)}
                    </ul>
                  </li>)))}
            </ol>

          </div>

          <div className="done">
            <h4>Done</h4>
            <ol>
            {doneOrder.length === 0 ? (
                <p>No done orders yet!</p>
              ) : (
              doneOrder
                .filter(order => order.some(item => item.status === 'done'))
                .map((order, index) => (
                  <li key={index}>
                    <h5>Order {index + 1}</h5>
                    <ul>
                      {order.map(item =>
                        <li key={item.id}>{item.title}</li>)}
                    </ul>
                  </li>
                )))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
