import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { FaMinus } from 'react-icons/fa';
import Title from 'components/Tasks/Title';
import PropTypes from 'prop-types';

const Tasks = ({ tasks, deleteTask }) =>
  tasks.map(task => (
    <Row key={task.id}>
      <Col>{task.id}</Col>
      <Col>
        <Title id={task.id} value={task.title} />
      </Col>
      <Col>{task.User.name}</Col>
      <Col>{task.createdAt}</Col>
      <FaMinus
        style={{ cursor: 'pointer' }}
        className="align-self-center"
        color="red"
        onClick={() => deleteTask(task.id)}
      />
    </Row>
  ));

Tasks.propTypes = {
  tasks: PropTypes.array,
  deleteTask: PropTypes.func,
};

export default Tasks;
