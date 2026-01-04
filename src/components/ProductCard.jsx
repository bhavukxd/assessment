const ProductCard = ({ product, addToCart }) => {

  const inStock = product.stock > 0;

  return (

    <div className="product-card">

      <h3>{product.title}</h3>

      <p>Price: ${product.price}</p>

      <p>Category: {product.category}</p>

      <p>Stock: {inStock ? 'In stock' : 'Out of stock'}</p>

      <button onClick={() => addToCart(product)} disabled={!inStock}>

        Add to Cart

      </button>

    </div>

  );

};

export default ProductCard;