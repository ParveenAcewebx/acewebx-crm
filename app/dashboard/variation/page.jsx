'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState([]);

  // Initial fallback data with unique names for each group
  const initialData = [
    {
      name: 'Group A',
      fields: [
        {
          fieldName: 'color',
          defaultValue: 'red',
          options: [
            { label: 'red', value: 'red' },
            { label: 'Liberty Aguilar', value: 'Liberty Aguilar' },
          ],
        },
        {
          fieldName: 'size',
          defaultValue: 'xxl',
          options: [
            { label: 'xxl', value: 'xxl' },
            { label: 'xxxl', value: 'xxxl' },
          ],
        },
      ],
    },
    {
      name: 'Group B',
      fields: [
        {
          fieldName: 'color',
          defaultValue: 'red',
          options: [
            { label: 'red', value: 'red' },
            { label: 'Liberty Aguilar', value: 'Liberty Aguilar' },
          ],
        },
        {
          fieldName: 'size',
          defaultValue: 'xxxl',
          options: [
            { label: 'xxl', value: 'xxl' },
            { label: 'xxxl', value: 'xxxl' },
          ],
        },
      ],
    },
    {
      name: 'Group C',
      fields: [
        {
          fieldName: 'color',
          defaultValue: 'Liberty Aguilar',
          options: [
            { label: 'red', value: 'red' },
            { label: 'Liberty Aguilar', value: 'Liberty Aguilar' },
          ],
        },
        {
          fieldName: 'size',
          defaultValue: 'xxl',
          options: [
            { label: 'xxl', value: 'xxl' },
            { label: 'xxxl', value: 'xxxl' },
          ],
        },
      ],
    },
    {
      name: 'Group D',
      fields: [
        {
          fieldName: 'color',
          defaultValue: 'Liberty Aguilar',
          options: [
            { label: 'red', value: 'red' },
            { label: 'Liberty Aguilar', value: 'Liberty Aguilar' },
          ],
        },
        {
          fieldName: 'size',
          defaultValue: 'xxxl',
          options: [
            { label: 'xxl', value: 'xxl' },
            { label: 'xxxl', value: 'xxxl' },
          ],
        },
      ],
    },
  ];

  // Load from localStorage or fallback to initial data
  useEffect(() => {
    const storedData = localStorage.getItem('formGroups');
    const parsedData = storedData ? JSON.parse(storedData) : [];

    if (parsedData.length === 0) {
      setData(initialData);
      localStorage.setItem('formGroups', JSON.stringify(initialData));
    } else {
      setData(parsedData);
    }
  }, []);

  // Keep localStorage updated
  useEffect(() => {
    localStorage.setItem('formGroups', JSON.stringify(data));
  }, [data]);

  // Delete group by index
  const handleDelete = (indexToDelete) => {
    setData(prevData => {
      const updatedData = [...prevData];  // Create a copy of the previous data
      updatedData.splice(indexToDelete, 1);  // Remove the group at the given index
      return updatedData;  // Return the new data array to update the state
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Stored Form Data</h1>

      {data.length === 0 ? (
        <p>No data available.</p>
      ) : (
        data.map((group, groupIndex) => (
          <div
            key={groupIndex}  // Use groupIndex as the unique key for each group
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '10px',
              marginBottom: '15px',
            }}
          >
            {/* Use group.name directly */}
            <h3>{group.name}</h3>

            {group.fields.map((field, fieldIndex) => (
              <div key={fieldIndex}>
                <strong>{field.fieldName}:</strong> {field.defaultValue}
              </div>
            ))}

            <button
              onClick={() => handleDelete(groupIndex)}  // Pass the index to delete
              style={{
                marginTop: '10px',
                padding: '6px 12px',
                backgroundColor: 'red',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}
