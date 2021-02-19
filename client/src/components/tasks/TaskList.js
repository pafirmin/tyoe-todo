import React, { useMemo } from 'react';
import Task from './Task';
import filterTasks from '../../helpers/filters';
import { useMediaQuery } from 'react-responsive';
import { endOfToday, isToday, parseISO, startOfTomorrow } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '../shared';
import styled from 'styled-components';
import { newTaskWithDate } from '../../actions/sidebar';
import { setFilter, removeFilter } from '../../actions/filters';

const ListWrapper = styled.div`
  margin: 0 auto;
  max-width: ${props => (props.isMobile ? '100%' : '60%')};

  h3 {
    font-size: 1.4em;
    margin: 1.4rem 0 0.8rem 0;
  }
`;

const AddTaskBtn = styled(Button)`
  display: block;
  margin: 1rem auto;
  width: 12rem;
  border-radius: 15px;
`;

const TaskList = () => {
  const tasks = useSelector(state => filterTasks(state.tasks, state.filters));
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ maxWidth: 600 });
  const todayTasks = useMemo(
    () => tasks.filter(task => isToday(parseISO(task.dueDate))),
    [tasks]
  );
  const futureTasks = useMemo(
    () => tasks.filter(task => parseISO(task.dueDate) > startOfTomorrow()),
    [tasks]
  );

  const handleAddTask = () => {
    dispatch(newTaskWithDate(endOfToday()));
  };

  const handleFilter = e => {
    dispatch(
      e.target.checked
        ? setFilter(e.target.value)
        : removeFilter(e.target.value)
    );
  };

  return (
    <ListWrapper isMobile={isMobile}>
      <label htmlFor="urgent-only">
        <input
          id="urgent-only"
          type="checkbox"
          value="URGENT_ONLY"
          onChange={handleFilter}
        />
        Urgent only
      </label>
      <label htmlFor="hide-complete">
        <input
          id="hide-complete"
          type="checkbox"
          value="HIDE_DONE"
          onChange={handleFilter}
        />
        Hide complete
      </label>
      <AddTaskBtn onClick={handleAddTask}>Add a task</AddTaskBtn>
      <h3>Today</h3>
      {todayTasks.length === 0 && (
        <p style={{ margin: '1rem 2rem' }}>All clear!</p>
      )}
      <ul>
        {todayTasks.map(task => (
          <Task key={task._id} task={task} />
        ))}
      </ul>
      <h3>Upcoming</h3>
      <ul>
        {futureTasks.map(task => (
          <Task key={task._id} task={task} />
        ))}
      </ul>
    </ListWrapper>
  );
};

export default TaskList;
