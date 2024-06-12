// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from 'react';
import { Paper, Text, Button, Container, Divider } from '@mantine/core';
import { SettingsContext } from './Settings';
import { Pagination } from '@mantine/core';

const List = ({ list, setList }) => {
  const { itemsPerPage, showCompleted, searchString, filterBySearch } = useContext(SettingsContext);
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

  const filteredList = showCompleted ? list : list.filter(item => !item.complete);
  const finalList = filterBySearch
    ? filteredList.filter(item => {
        return Object.values(item).some(value => 
          value.toString().toLowerCase().includes(searchString.toLowerCase())
        );
      })
    : filteredList;

  const paginatedList = finalList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(finalList.length / itemsPerPage);

  return (
    <Container>
      {paginatedList.map(item => (
        <Paper key={item.id} withBorder shadow="md" padding="md" style={{ backgroundColor: '#2a2a2a', color: '#f5f5f5' }}>
          <Text>{item.text}</Text>
          <Text><small>Assigned to: {item.assignee}</small></Text>
          <Text><small>Difficulty: {item.difficulty}</small></Text>
          <Button onClick={() => toggleComplete(item.id)}>
            Complete: {item.complete.toString()}
          </Button>
          <Button color="red" onClick={() => deleteItem(item.id)}>Delete</Button>
          <Divider my="sm" />
        </Paper>
      ))}

      <Pagination total={totalPages} page={currentPage} onChange={setCurrentPage} />
    </Container>
  );
};

export default List;
