import React, { useState, useContext, useEffect } from 'react';
import { TextInput, Button, Slider, Container, Title, Group, Center } from '@mantine/core';
import useForm from '../hooks/form';
import { v4 as uuid } from 'uuid';
import { SettingsContext } from '../Context/Settings';
import { LoginContext } from '../Context/LoginContext';
import List from './List';
import Auth from './Auth/Auth';

const Todo = () => {
  const { itemsPerPage, showCompleted, searchString, filterBySearch } = useContext(SettingsContext);
  const { user } = useContext(LoginContext);
  const [defaultValues] = useState({
    difficulty: 4,
  });
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  function addItem(item) {
    item.id = uuid();
    item.complete = false;
    setList([...list, item]);
  }

  useEffect(() => {
    let incompleteCount = list.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
  }, [list]);

  return (
    <Container style={{ marginBottom: '80px', color: '#f5f5f5' }}>
      <header data-testid="todo-header">
        <Center>
          <Title order={1} data-testid="todo-h1" style={{ marginTop: '20px', marginBottom: '20px', color: '#fff' }}>To Do List: {incomplete} items pending</Title>
        </Center>
      </header>

      <Auth capability="create">
        <form onSubmit={handleSubmit} style={{ marginBottom: '40px' }}>
          <Title order={2} style={{ color: '#fff' }}>Add To Do Item</Title>
          <TextInput
            label="To Do Item"
            placeholder="Item Details"
            name="text"
            onChange={handleChange}
            style={{ color: '#fff' }}
          />
          <TextInput
            label="Assigned To"
            placeholder="Assignee Name"
            name="assignee"
            onChange={handleChange}
            style={{ color: '#fff' }}
          />
          <Group direction="column" spacing="xs" grow>
            <label style={{ color: '#fff' }}>Difficulty</label>
            <Slider
              label={null}
              min={1}
              max={5}
              step={1}
              marks={[
                { value: 1, label: '1' },
                { value: 2, label: '2' },
                { value: 3, label: '3' },
                { value: 4, label: '4' },
                { value: 5, label: '5' },
              ]}
              name="difficulty"
              onChange={handleChange}
            />
          </Group>
          <Button type="submit" style={{ marginTop: '20px' }}>Add Item</Button>
        </form>
      </Auth>

      <List list={list} setList={setList} />
    </Container>
  );
};

export default Todo;
