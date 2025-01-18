import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, FormGroup, Input, Label, Table } from "reactstrap";

const Lists = (props) => {

  const [inventory, setInventory] = useState([]);

  const [addItem, setAddItem] = useState({ name: "", quantity: "1" })

  const [toggleIcon, setToggleIcon] = useState(false);

  useEffect(() => {
    const storedInventory = sessionStorage.getItem('inventory');
    if (storedInventory) {
      let data = JSON.parse(storedInventory)
      setInventory(data);
    }
  }, []);

  useEffect(() => {
    inventory.length && sessionStorage.setItem('inventory', JSON.stringify(inventory));
  }, [inventory]);

  const handleRemoveItem = (id) => {
    let data = inventory.map(i => i.id === id ? { ...i, deleted: 1 } : i)

    setInventory(data);
  }

  const handleClearAll = () => {
    setInventory([])
    sessionStorage.setItem('inventory', JSON.stringify([]));
  }

  const handleAdd = () => {
    if(addItem.name == ""){
      alert("Please Enter Item Name")
      return;
    }
    setInventory([...inventory, { id: Date.now(), name: addItem.name, quantity: addItem.quantity, deleted: 0 }]);
    setAddItem({ name: "", quantity: "1" })
  }

  const handleRestoreItem = (id) => {
    let data = inventory.map(i => i.id === id ? { ...i, deleted: 0 } : i)

    setInventory(data);
  }

  const handleQuantityChange = (e,id) => {
    let data = inventory.map(i => i.id === id ? { ...i, quantity: e.target.value } : i)

    setInventory(data);
  }

  return (
    <div>
      <h2 className="App-header">Edit List</h2>
      <div className="d-flex justify-content-center">
        <Card className="w-50">
          <CardHeader>
            <div className="d-flex">
                Item Name *: <input value={addItem.name} data-testid="itemName" onChange={(e) => setAddItem(prev => ({ ...prev, name: e.target.value }))} />
                {inventory.filter(i => i.deleted == 0).length == 0 && <span>To get started, add 1 or more items</span>}
                Quantity *: <input value={addItem.quantity} type="number" min="1" onChange={(e) => setAddItem(prev => ({ ...prev, quantity: e.target.value }))} /><button className="btn btn-primary" data-testid="addBtn" onClick={handleAdd}>Add</button>

            </div>
          </CardHeader>
          <CardBody>
            Inventory List
            <Table className="">
              <tbody>
                {inventory.map((item) => {

                  if (item.deleted == 0) {

                    return (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>Quantity:<input className="w-20" type="number" min="1" value={item.quantity} onChange={(e) => handleQuantityChange(e,item.id)}/></td>
                        <td><button data-testid="deleteBtn" className="delete-x-icon" onClick={() => handleRemoveItem(item.id)}>&times;</button></td>
                      </tr>
                    )
                  }
                  else if (toggleIcon) {
                    return (
                      <tr key={item.id} className="deleted-row">
                        <td>{item.name}</td>
                        <td>Quantity:<input className="w-20" disabled type="number" min="1" value={item.quantity} /></td>
                        <td><button className="delete-x-icon" onClick={() => handleRestoreItem(item.id)}>&#x21bb;</button>
                        </td>
                      </tr>
                    )
                  }

                })}
              </tbody>
            </Table>
            <button className="btn btn-secondary" data-testid="clearAllBtn" onClick={handleClearAll}>Clear All</button>
            <FormGroup switch className='d-flex'>
              <Input
                type="switch"
                checked={toggleIcon} onChange={() => setToggleIcon(prev => !prev)}
              />View Deleted

            </FormGroup>

          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export { Lists };
