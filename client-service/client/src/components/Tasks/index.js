import React from 'react';
import { Row, Col } from 'react-bootstrap';
import TaskList from 'components/Tasks/List';
import PropTypes from 'prop-types';

const Tasks = ({ tasks, deleteTask }) => (
  <div className="m-3">
    <Row>
      <Col>id</Col>
      <Col>Title</Col>
      <Col>User Id</Col>
      <Col>Created At</Col>
    </Row>
    <TaskList deleteTask={deleteTask} tasks={tasks} />
  </div>
);

Tasks.propTypes = {
  tasks: PropTypes.array,
  deleteTask: PropTypes.func,
};

export default Tasks;
