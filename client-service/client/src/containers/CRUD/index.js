import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  fetchTasksRoutine,
  addTaskRoutine,
  updateTaskRoutine,
  deleteTaskRoutine,
} from 'store/ducks/task.duck';
import { logoutRoutine } from 'store/ducks/session.duck';
import Tasks from 'components/Tasks';
import AddButton from 'components/AddButton';
import AddModal from 'containers/CRUD/Modal';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Logout from 'components/Logout';
export const TaskContext = React.createContext();

const View = ({
  userId,
  logout,
  tasks,
  fetchTasks,
  addTask,
  updateTask,
  deleteTask,
}) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    fetchTasks();
  }, []);
  const toggleModal = () => setShow(true);
  return (
    <TaskContext.Provider value={{ updateTask }}>
      <Row className="justify-content-end m-2">
        <Logout userId={userId} logout={logout} />
      </Row>
      <Row
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
        }}
      >
        <Col className="mx-auto" xs={8}>
          <h1> Here is a tasks! </h1>
          <Tasks deleteTask={deleteTask} tasks={tasks} />
          <AddModal addTask={addTask} show={show} setShow={setShow} />
          <AddButton handleClick={toggleModal} />
        </Col>
      </Row>
    </TaskContext.Provider>
  );
};

View.propTypes = {
  fetchTasks: PropTypes.func,
  addTask: PropTypes.func,
  updateTask: PropTypes.func,
  deleteTask: PropTypes.func,
  tasks: PropTypes.array,
  userId: PropTypes.number,
  logout: PropTypes.func,
};
const mapStateToProps = store => ({
  tasks: store.task.data,
  userId: store.session.userId,
});

const mapDispatchToProps = {
  fetchTasks: fetchTasksRoutine.trigger,
  addTask: addTaskRoutine.trigger,
  updateTask: updateTaskRoutine.trigger,
  deleteTask: deleteTaskRoutine.trigger,
  logout: logoutRoutine.trigger,
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
