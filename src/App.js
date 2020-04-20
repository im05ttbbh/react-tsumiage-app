import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, InputGroup, Input, InputGroupAddon, Button, Table } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { Icon } from '@iconify/react';
import pencilAlt from '@iconify/icons-fa-solid/pencil-alt';
import { TwitterShareButton } from 'react-share';
import { app } from './base';
import firebase from 'firebase';
import "firebase/fire";

  const App = ({ history }) => {
    const [value, setValue] = useState("");
    const [todos, setTodos] = useState([]);

    const handleSubmit = e => {
      e.preventDefault();
      addTodo(value)
      setValue("")
    }

  const addTodo = text => {
    const newTodos = [...todos, {
      text,
      completed: false,
      editing: false
    }];
    if (!text) return;
    setTodos(newTodos)
    console.log(newTodos);
  }

  const removeTodo = index => {
    const newTodos = [...todos]
    newTodos.splice(index, 1)
    setTodos(newTodos)
    console.log(newTodos);
  }

  const completeTodo = index => {
    const newTodos = [...todos]
    newTodos[index].completed = !newTodos[index].completed
    setTodos(newTodos)
    console.log(newTodos);
  }

  const editTodo = index => {
    const newTodos = [...todos]
    newTodos[index].editing = !newTodos[index].editing
    setTodos(newTodos)
    console.log(newTodos);
  }

  const handleToLoginPage = () => {
    app.auth().signOut()
    history.push("/login");
  }

  return (
    <div className="App">
      <Container>
        <h2 className="mt-4 mb-4">#今日の積み上げ</h2>
        <Button onClick={handleToLoginPage}>Sign out</Button>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Input
              type="text"
              value={value}
              onChange={e => setValue(e.target.value)}
            />
            <InputGroupAddon addonType="append">
              <Button type="submit" color="info">追加</Button>
            </InputGroupAddon>
          </InputGroup>
        </Form>
      </Container>
      <Container>
        <Table responsive>
          <tbody>
            {todos && todos.map((todo, index) => (
              <tr key={index}>
                {todo.editing ? <EditTodo index={index} todo={todo} text={todo.text} /> :
                <td className="text-left ListItem">
                  <span className="ml-2">
                    <Input type="checkbox" checked={todo.completed} onChange={() => completeTodo(index)} />
                  </span>
                  <span className={`ml-2 todoScript + ${todo.completed ? "done" : ""}`} >
                    {todo.text}
                  </span>
                </td>
                  }
                <td className="text-right">
                  <div className="icons">
                    <TwitterShareButton
                      url="dum"
                      title={todo.text}
                      hashtags={["今日の積み上げ"]}
                      className="" >
                      <FontAwesomeIcon icon={faTwitter} className="twitterIcon" />
                    </TwitterShareButton>
                    <Icon
                      icon={pencilAlt}
                      className="pencilIcon ml-4"
                      onClick={() => editTodo(index)}
                    />
                    <button onClick={() => removeTodo(index)} className="trashButton ml-3">
                      <FontAwesomeIcon icon="trash" className="trashIcon" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

function EditTodo(todo, text, index) {
  const [value, setValue] = useState(todo.text);
  const [todos, setTodos] = useState([]);

  const handleUpdateTodoText = e => {
    if (e.which === 13) {
      // e.preventDefault();
      const newTodos = [...todos, {
        text: value,
        completed: false,
        editing: false
      }];
      if (!text) return;
      // if (todo.length === 0) {
        setTodos(newTodos)
        console.log(newTodos);
        console.log("クリック");
      // }
    }
  }

  return (
    <td>
      <InputGroup size="sm">
        <Input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          className="editForm"
          onKeyPress={e => handleUpdateTodoText(e)}
        />
      </InputGroup>
    </td>
  );
}

export default App;
