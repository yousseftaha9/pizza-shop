import { useEffect, useRef, useState } from 'react';
import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart,
  decreaseQuantity,
  deleteFromCart,
  increaseQuantity,
  isItemInCart,
} from '../cart/cartSlice';

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const [quantity, setQuantity] = useState(1);
  const [isInCart, setIsInCart] = useState(false);
  const dispatch = useDispatch();
  const pizzaObjects = useSelector((state) => state.cart.pizzaObjects);

  useEffect(
    function () {
      const obj = pizzaObjects.find((obj) => obj.id === id);
      if (obj) {
        setIsInCart(true);
        setQuantity(obj.quantity);
      }
    },
    [id, pizzaObjects],
  );

  function handleAddToCart() {
    const totalPrice = unitPrice * quantity;
    const pizzaObject = {
      id,
      name,
      unitPrice,
      quantity,
      totalPrice,
    };
    dispatch(addToCart(pizzaObject));
    setIsInCart(true);
  }

  function handleIncrement() {
    setQuantity((quantity) => quantity + 1);
    dispatch(increaseQuantity(id));
  }

  function handleDecrement() {
    if (quantity === 1) {
      handleDeleteFromCart();
      return;
    }
    setQuantity((quantity) => quantity - 1);
    dispatch(decreaseQuantity(id));
  }
  function handleDeleteFromCart() {
    setIsInCart(false);
    setQuantity(1);
    dispatch(deleteFromCart(id));
  }

  return (
    <li className="flex gap-4 py-2 ">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''} `}
      />
      <div className="pt-o.5 flex grow flex-col">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {' '}
          {ingredients.join(', ')}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}
          {soldOut ? (
            ''
          ) : isInCart ? (
            <div className="space-x-5">
              <Button type="verySmall" handleClick={handleDecrement}>
                -
              </Button>
              <span>{quantity}</span>
              <Button type="verySmall" handleClick={handleIncrement}>
                +
              </Button>
              <Button type="small" handleClick={handleDeleteFromCart}>
                Delete
              </Button>
            </div>
          ) : (
            <Button type="small" handleClick={handleAddToCart}>
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
