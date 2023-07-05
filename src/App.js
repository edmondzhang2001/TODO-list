import React, { useState, useEffect } from 'react';

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [newPriority, setNewPriority] = useState('');
  const [missingPriorities, setMissingPriorities] = useState([]);
  const [idCounter, setIdCounter] = useState(0);

  useEffect(() => {
    checkMissingPriorities(); // Update missing priorities on initial render
  }, [items]);

  const addItem = () => {
    if (newItem !== '' && newPriority !== '') {
      const newItemObj = {
        priority: parseInt(newPriority),
        text: newItem,
        id: idCounter
      };

      setItems([...items, newItemObj]);
      setNewItem('');
      setNewPriority('');
      setIdCounter(idCounter + 1);

      checkMissingPriorities(); // Update missing priorities after adding an item
    }
  };

  const deleteItem = (id) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);

    checkMissingPriorities(); // Update missing priorities after deleting an item
  };

  const checkMissingPriorities = () => {
    const allPriorities = items.map(item => item.priority);
    const maxPriority = Math.max(...allPriorities);
    const missing = [];

    for (let i = 1; i <= maxPriority; i++) {
      if (!allPriorities.includes(i)) {
        missing.push(i);
      }
    }

    setMissingPriorities(missing);
  };

  // Sort the items based on priority
  const sortedItems = items.slice().sort((a, b) => a.priority - b.priority);

  return (
    <div>
      <h1>TODO List</h1>
      <div>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Enter a new item"
        />
        <input
          type="number"
          value={newPriority}
          onChange={(e) => setNewPriority(e.target.value)}
          placeholder="Priority (positive integer)"
        />
        <button onClick={addItem}>Add Item</button>
      </div>
      <ul>
        {sortedItems.map(item => (
          <li key={item.id}>
          <strong>Item:</strong> {item.text} <strong>Priority:</strong> {item.priority} 
          <button onClick={() => deleteItem(item.id)}>Delete</button>
        </li>
        
        ))}
      </ul>
      {missingPriorities.length > 0 && (
        <div>
          <h3>Missing Priorities:</h3>
          <p>{missingPriorities.join(', ')}</p>
        </div>
      )}
    </div>
  );
}

export default App;
