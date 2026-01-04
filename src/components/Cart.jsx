const Cart = ({ cart, removeFromCart, updateQuantity, totalItems, totalPrice }) => {

  return (

    <div className="cart">

      <h2>Cart ({totalItems} items)</h2>

      {cart.length === 0 ? (

        <p>Empty cart</p>

      ) : (

        <>

          {cart.map(item => (

            <div key={item.id} className="cart-item">

              <h4>{item.title}</h4>

              <p>${item.price} x {item.quantity}</p>

              <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>

              <span>{item.quantity}</span>

              <button onClick={() => updateQuantity(item.id, item.quantity + 1)} disabled={item.quantity >= item.stock}>+</button>

              <button onClick={() => removeFromCart(item.id)}>Remove</button>

            </div>

          ))}

          <p>Total: ${totalPrice.toFixed(2)}</p>

        </>

      )}

    </div>

  );

};

export default Cart;