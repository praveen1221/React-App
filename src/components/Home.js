import React, { useEffect, useState } from "react";
import { Table, Card, CardBody } from "reactstrap";
import { useNavigate } from 'react-router-dom';

const Home = (props) => {

  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const storedInventory = sessionStorage.getItem('inventory');
    if (storedInventory) {
      setInventory(JSON.parse(storedInventory));
    } else {
      const initialData = [
        { id: 1, name: 'Sample Item 1', quantity: 5 ,deleted:0},
        { id: 2, name: 'Sample Item 2', quantity: 3 ,deleted:0},
        { id: 3, name: 'Sample Item 3', quantity: 10 ,deleted:0}
      ];
      setInventory(initialData);
      sessionStorage.setItem('inventory', JSON.stringify(initialData));
    }
  }, []);

  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/lists');
  };

  return (
    <div>
      <h2 className="App-header mb-3">Inventory List</h2>
      <div className="d-flex justify-content-center">
        <Card className="w-50">
          <CardBody>
            <Table striped className="">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Item Name</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((item, index) => (
                  <tr key={item.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <button className="btn btn-primary" onClick={handleClick}>Edit List</button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
export { Home };
