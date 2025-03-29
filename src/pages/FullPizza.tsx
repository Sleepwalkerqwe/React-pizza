import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();

  const { id } = useParams();
  const navigate = useNavigate();

  console.log('id is - ', id);
  React.useEffect(() => {
    async function fetchPizzas() {
      try {
        const { data } = await axios.get(`https://67dc1e101fd9e43fe47746ea.mockapi.io/items/${id}`);
        setPizza(data);
      } catch (err) {
        alert('pizza not found');
        navigate('/');
      }
    }
    fetchPizzas();
  }, []);

  if (!pizza) {
    return 'Loading...';
  }
  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price}</h4>
    </div>
  );
};
