import React, { useContext, useState } from 'react';
import { SettingsContext } from '../../Context/Settings';
import { Pagination } from '@mantine/core';

const List = ({ list, setList }) => {
  const { itemsPerPage, hideCompleted, sortWord } = useContext(SettingsContext);
  const [currentPage, setCurrentPage] = useState(1);

  function deleteItem(id) {
    const items = list.filter(item => item.id !== id);
    setList(items);
  }

  function toggleComplete(id) {
    const items = list.map(item => {
      if (item.id === id) {
        item.complete = !item.complete;
      }
      return item;
    });

    setList(items);
  }

  const filteredList = hideCompleted ? list.filter(item => !item.complete) : list;
  const sortedList = filteredList.sort((a, b) => (a[sortWord] > b[sortWord] ? 1 : -1));
  const paginatedList = sortedList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(sortedList.length / itemsPerPage);

  return (
    <>
      {paginatedList.map(item => (
        <div key={item.id}>
          <p>{item.text}</p>
          <p><small>Assigned to: {item.assignee}</small></p>
          <p><small>Difficulty: {item.difficulty}</small></p>
          <div onClick={() => toggleComplete(item.id)}>Complete: {item.complete.toString()}</div>
          <button onClick={() => deleteItem(item.id)}>Delete</button>
          <hr />
        </div>
      ))}

      <Pagination total={totalPages} page={currentPage} onChange={setCurrentPage} />
    </>
  );
};

export default List;
