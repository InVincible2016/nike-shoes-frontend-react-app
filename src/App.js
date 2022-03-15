import { useEffect, useState } from 'react';

const shoeDatabase = [
  {
    shoeId: '1',
    model: 'Nike Air Max 95 SE',
    minPrice: 120,
    maxPrice: 150,
  },
  {
    shoeId: '2',
    model: 'Nike Air Max 97 SE',
    minPrice: 5,
    maxPrice: 150,
  },
  {
    shoeId: '3',
    model: 'Nike Air Max Pre-Day',
    minPrice: 120,
    maxPrice: 160,
  },
  {
    shoeId: '4',
    model: 'Nike Air Max 270',
    minPrice: 100,
    maxPrice: 130,
  },
  {
    shoeId: '5',
    model: 'Nike Renew Ride 3',
    minPrice: 180,
    maxPrice: 200,
  },
  {
    shoeId: '6',
    model: 'Nike Air Max 90',
    minPrice: 120,
    maxPrice: 150,
  },
];

function App() {
  const [items, setItems] = useState({});

  useEffect(() => {
    const request = () =>
        shoeDatabase.map((eachShoe) => {
          fetch(`/api/shoe-price/${eachShoe.shoeId}`)
              .then((response) => response.json())
              .then((eachShoeResponse) =>
                  setItems((prevItems) => ({
                    ...prevItems,
                    [eachShoe.shoeId]: {
                      ...eachShoe,
                      ...eachShoeResponse,
                    },
                  }))
              );
        });

    // setInterval(request, 5000);

    request();
  }, []);

  return (
      <div>
        <h2>Shoes</h2>
        <table>
          <thead>
          <tr>
            <th align="left">Model</th>
            <th align="left">Price</th>
            <th align="left">State</th>
          </tr>
          </thead>
          <tbody>
          {Object.keys(items).map((itemKey) => (
              <tr key={items[itemKey].shoeId} >
                <td width={250}>{items[itemKey].model}</td>
                <td width={250}>{items[itemKey].shoePrice}</td>
                <td>
                  {items[itemKey].shoePrice <
                  items[itemKey].minPrice && <span>Best time to buy!</span>}
                  {items[itemKey].shoePrice >
                  items[itemKey].maxPrice && <span>Can wait for discount</span>}
                  {items[itemKey].shoePrice <=
                  items[itemKey].maxPrice &&
                  items[itemKey].shoePrice >=
                  items[itemKey].minPrice && <span>Moderate state, can buy now!</span>}
                </td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
  );
}

export default App;
