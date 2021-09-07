import React from 'react';

export default function CartScreen(props) {
    const productId = props.match.params.id;
    // get the second element = the value of /cart/${productId}?qty=${qty}. If the quantity is 0 the is no option to add to cart
    const qty = props.location.search ? Number(props.location.search.split('=')[1])
    :1;
    return (
        <div>
            <h1>Cart Screen</h1>
            <p>
                ADD TO CART : ProductID: {productId} Qty: {qty}
            </p>
        </div>
    )
}
