import LinkButton from '../../ui/LinkButton';
import Button from '../../ui/Button';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCart } from './cartSlice';

function Cart() {
  // const cart = fakeCart;

  const cart = useSelector((state) => state.cart.pizzaObjects);
  const dispatch = useDispatch();

  const username = useSelector((state) => state.user.username);

  function handleClearCart() {
    dispatch(deleteCart());
  }

  if (cart.length === 0) {
    return (
      <div className="px-4 py-3">
        <LinkButton to="/menu">&larr; Back to menu</LinkButton>
        <p className="mt-8 font-bold">
          Your cart is still empty. Start adding some pizzas :)
        </p>
      </div>
    );
  }

  return (
    <div className="px-4 py-3 ">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold ">Your cart, {username}</h2>
      <ul className="mt-3 divide-y divide-stone-200 border-b">
        {cart.map((item) => (
          <CartItem item={item} key={item.key} />
        ))}
      </ul>

      <div className="mt-6 space-x-2">
        <Button to="/order/new" type="primary">
          Order pizzas
        </Button>
        <Button type="secondary" handleClick={handleClearCart}>
          Clear Cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
