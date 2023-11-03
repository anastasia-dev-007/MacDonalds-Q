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

  //AICI TOT SA MODIFIC CA EL SA STEARGA INTREG GRUPUL
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
        </div>
      </div>

      <hr />

      <div>
        <h3>TRACKING ORDER</h3>

        <div className="trackingOrderInterface">
          <div className="pending">
            <h4>Pending</h4>
            {pendingOrders.length === 0 ?
              (
                <p>No pending orders. </p>
              ) : (
                <ol>
                  {pendingOrders.map((order) => (
                    <li key={order.id} onClick={() => moveToPreparing(order.id)}>
                      <p><b>Order {order.id} - ${order.totalPrice.toFixed(2)}</b></p>
                      <ul>
                        {Object.values(order.groupedItems).map((group) => (
                          <li key={group.firstItem.id}>
                            {group.firstItem.title} - {group.firstItem.currency} {group.firstItem.price} (x{group.count})
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ol>
              )}
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
                        {Object.values(order.groupedItems).map((group) => (
                          <li key={group.firstItem.id}>
                            {group.firstItem.title} - {group.firstItem.currency} {group.firstItem.price} (x{group.count})
                          </li>
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
                        {Object.values(order.groupedItems).map((group) => (
                          <li key={group.firstItem.id}>
                            {group.firstItem.title} - {group.firstItem.currency} {group.firstItem.price} (x{group.count})
                          </li>
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
