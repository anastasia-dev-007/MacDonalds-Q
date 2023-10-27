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
    setOrder([...order, item]);
  };

  const finishOrder = () => {
    if (order.length > 0) {
      setPendingOrder([...pendingOrder, order]);
      setOrder([]);
    }
  };

  const moveToPreparing = (order) => {
    if (pendingOrder.length > 0) {
      setPreparingOrder([...preparingOrder, order]);
      setPendingOrder(pendingOrder.filter((pending) => pending !== order));
    }
  };

  const moveToDone = (order) => {
    if (preparingOrder.length > 0) {
      setDoneOrder([...doneOrder, order]);
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
              {order.map(item => (
                <li key={item.id}>
                  {item.title}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <button onClick={() => finishOrder()}>Finish Order</button>
      </div>

      <hr />

      <div>
        <h3>Kitchen Interface</h3>

        <div className="kitchenInterface">
          <div className="pending">
            <h4>Pending</h4>

            <ol>
              {pendingOrder.map((order, index) => (
                <li key={index}
                  onClick={() => moveToPreparing(order)}>
                  <h5>Order {index + 1}</h5>
                  <ul>
                    {order.map(item =>
                      <li key={item.id}>{item.title}</li>)}
                  </ul>
                </li>
              ))}
            </ol>
          </div>

          <div className="preparing">
            <h4>Preparing</h4>
            <ol>
              {preparingOrder.map((order, index) => (
                <li key={index}
                onClick={() => moveToDone(order)}>
                  <h5>Order {index + 1}</h5>
                  <ul>
                    {order.map(item =>
                      <li key={item.id}>{item.title}</li>)}
                  </ul>
                </li>))}
            </ol>

          </div>

          <div className="done">
            <h4>Done</h4>
            <ol>
              {doneOrder.map((order, index) => (
                <li key={index}>
                  <h5>Order {index + 1}</h5>
                  <ul>
                    {order.map(item =>
                      <li key={item.id}>{item.title}</li>)}
                  </ul>
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
