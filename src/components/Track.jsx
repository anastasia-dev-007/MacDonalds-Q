import React from 'react'

const Track = ({pendingOrders,preparingOrders, doneOrders, moveToPreparing,moveToDone, pickUpOrder}) => {
  return (
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
  )
}

export default Track;
