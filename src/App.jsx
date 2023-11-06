import './App.css';
import React, { useState } from 'react';
import Menu from './components/Menu/Menu';
import Order from './components/Order/Order';
import Track from './components/Track';
import Orders from './components/Orders/Orders';

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

  const addMenuItemToOrder = (item) => {
    setSelectedItems([...selectedItems, item]);
  };

  const removeAllMenuItemsById = (item) => {
    const updatedSelectedItems = selectedItems.filter((selectedItem) => selectedItem.id !== item.id);

    setSelectedItems(updatedSelectedItems);
  };

  //simplified by Radu
  const removeMenuItemFromOrder = (itemToRemove) => {
    const index = selectedItems.findIndex((item) => item.id === itemToRemove.id);// Find the index of the item to be removed in the copySelectedItems array

    if (index !== -1) {
      selectedItems.splice(index, 1);// If the count is 1, remove the item from the array
    }
    setSelectedItems([...selectedItems]); //update state
  };

  const createOrder = () => {
    const time = Date.now();

    const totalOrderPrice = selectedItems.reduce(
      (total, item) => total + item.price, 0
    );

    // Create groupedItems object
    const groupedItems = selectedItems.reduce((acc, item) => {
      const { id } = item;

      if (!acc[id]) {
        acc[id] = {
          count: 0,
          firstItem: item,
        };
      }

      acc[id].count++;

      return acc;
    }, {});

    const newOrder = {
      id: orders.length + 1,
      menuItems: selectedItems,
      status: 'pending',
      time: time,
      totalPrice: totalOrderPrice,
      groupedItems: Object.values(groupedItems),//added
    };

    setOrders([...orders, newOrder]);

    setSelectedItems([]);

    setOrderConfirmation(newOrder.id);// Show the confirmation message with order ID

    setTimeout(() => {    // Hide the confirmation message after 2 seconds
      setOrderConfirmation(null);
    }, 5000);
  };

  const moveToPreparing = ({ id }) => {//am scos id din order
    const index = orders.findIndex(item =>
      item.id === id)
    orders[index].status = 'preparing';
    orders[index].timePreparing = Date.now();

    setOrders([...orders]);
  };

  const moveToDone = ({ id }) => {//am scos id din order
    const index = orders.findIndex(item => item.id === id);
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

          <Menu
            menu={menu}
            addMenuItemToOrder={addMenuItemToOrder} />

          <Order
            selectedItems={selectedItems}
            removeMenuItemFromOrder={removeMenuItemFromOrder}
            addItem={addMenuItemToOrder}
            removeAllMenuItemsById={removeAllMenuItemsById}
            createOrder={createOrder}
            orderConfirmation={orderConfirmation} />
        </div>
      </div>

      <hr />

      <div>
        <h3>TRACKING ORDER</h3>

        <div className="trackingOrderInterface">
          <Orders orders={pendingOrders} type="Pending" handleOnClick={moveToPreparing} />
          <Orders orders={preparingOrders} type="Preparing" handleOnClick={moveToDone} />
          <Orders orders={doneOrders} type="Done" handleOnClick={pickUpOrder} />
        </div>
      </div>
    </div>
  );
}

export default App;
