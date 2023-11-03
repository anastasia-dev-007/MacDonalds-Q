import './App.css';
import React, { useState } from 'react';
import Menu from './components/Menu/Menu';
import Orders from './components/Orders/Orders';
import Track from './components/Track';

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

  //groupedItems will be an object where the keys are id of menu items, and the values are arrays of menu items. 
  const groupedItems = selectedItems.reduce((acc, item) => {
    const { id } = item;//This line extracts the id property from the "item" object using destructuring and allows to access the id property further

    if (!acc[id]) {// Check if an array for the current ID already exists in the accumulator
      acc[id] = {
        count: 0,
        firstItem: null,
      }; // If not, create an empty array for the ID
    }

    acc[id].count++;
    if (!acc[id].firstItem) {
      acc[id].firstItem = item;
    }

    return acc;
  }, {});

  console.log(groupedItems);

  const handleItemClick = (item) => {
    // //added unique id by Radu's reco. Otherwise it had deleted incorrectly items
    // const uniqueId = selectedItems.length > 0 ? selectedItems[selectedItems.length - 1].id + 1 : 1;
    // const selectedItem = { ...item, id: uniqueId }

    setSelectedItems([...selectedItems, item]);
  };

  const removeSelectedItem = (item) => {
    const updatedSelectedItems = selectedItems.filter((selectedItem) => selectedItem.id !== item.id);

    setSelectedItems(updatedSelectedItems);
  };

  const removeItem = (itemToRemove) => {
    const copySelectedItems = [...selectedItems]; //this is the copy of the selectedItems array to avoid directly modifying the state

    const index = copySelectedItems.findIndex((item) => item.id === itemToRemove.id);// Find the index of the item to be removed in the copySelectedItems array

    if (index !== -1) {
      if (copySelectedItems[index].count > 1) { // If the item is found and its count is greater than 1, decrease its count by 1
        copySelectedItems[index].count -= 1;
      } else {
        copySelectedItems.splice(index, 1);// If the count is 1, remove the item from the array
      }
      setSelectedItems(copySelectedItems); //update state
    }
  };

  //now we do exactly the same to the addItem
  const addItem = (itemToAdd) => {
    const copySelectedItems = [...selectedItems]; 

    const index = copySelectedItems.findIndex((item) => item.id === itemToAdd.id);

    if (index !== -1) {
      if (copySelectedItems[index].count > 1) { 
        copySelectedItems[index].count += 1;
      } else {
        copySelectedItems.push(itemToAdd);// now push it
      }
      setSelectedItems(copySelectedItems); //update state
    }
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

          <Menu
          menu={menu}
          handleItemClick={handleItemClick}>
          </Menu>

         <Orders
         selectedItems={selectedItems}
         groupedItems={groupedItems}
         removeItem={removeItem}
         addItem={addItem}
         removeSelectedItem={removeSelectedItem}
         createOrder={createOrder}
         orderConfirmation={orderConfirmation}
         ></Orders>
        </div>
      </div>

      <hr />

      <div>
        <h3>TRACKING ORDER</h3>

        <Track
        pendingOrders={pendingOrders}
        preparingOrders={preparingOrders}
        doneOrders={doneOrders}
        moveToPreparing={moveToPreparing}
        moveToDone={moveToDone}
        pickUpOrder={pickUpOrder}
        >
        </Track>
      </div>
    </div>
  );
}

export default App;
