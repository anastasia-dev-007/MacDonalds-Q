import React from 'react'

const Orders = ({ orders, type, handleOnClick, totalPrice }) => {
    return (
        <div>
            <h4>{type}</h4>
            {orders.length === 0 ?
                (
                    <p>No orders. </p>
                ) : (
                    <ol>
                        {orders.map((order) => (
                            <li key={order.id} onClick={() => handleOnClick(order)}>
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
    )
}

export default Orders;