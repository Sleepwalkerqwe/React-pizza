import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { addPizza, CartItem } from '../../redux/slices/cartSlice';
const pizzaTypes = ['тонкое', 'традиционное'];
const pizzaSizes = ['26см', '30см', '40см'];

type PizzaBlockProps = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  types: number[];
  sizes: number[];
  rating: number[];
};

const PizzaBlock: React.FC<PizzaBlockProps> = ({ id, title, price, imageUrl, types, sizes, rating }) => {
  const dispatch = useDispatch();

  const cartItem = useSelector((state: { cart: { items: any } }) => state.cart.items.find((obj: { id: string }) => obj.id === id));

  const [pizzaCount, setPizzaCount] = React.useState(0);

  const [pizzaSize, setPizzaSize] = React.useState<number>(0);

  const [activeType, setActiveType] = React.useState(0);
  const [activeSize, setActiveSize] = React.useState(0);

  const addedCount = cartItem ? cartItem.count : 0;

  const onClickAddButton = () => {
    setPizzaCount(pizzaCount + 1);
  };

  const onClickAdd = () => {
    const item: CartItem = {
      id,
      title,
      price,
      imageUrl,
      type: pizzaTypes[activeType],
      size: pizzaSizes[activeSize],
      count: 0,
    };
    onClickAddButton();
    dispatch(addPizza(item));
  };

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <Link key={id} to={`/pizza/${id}`}>
          <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
          <h4 className="pizza-block__title">{title}</h4>
        </Link>

        <div className="pizza-block__selector">
          <ul>
            {types.map((types, i) => (
              <li key={i} onClick={() => setActiveType(i)} className={activeType === i ? 'active' : ''}>
                {pizzaTypes[i]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((sizes, i) => (
              <li key={i} onClick={() => setPizzaSize(i)} className={pizzaSize === i ? 'active' : ''}>
                {pizzaSizes[i]}
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} Euro</div>
          <button onClick={onClickAdd} className="button button--outline button--add">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {addedCount > 0 && <i> {addedCount}</i>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;
