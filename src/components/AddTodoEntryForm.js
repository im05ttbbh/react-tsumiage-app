import React, { useState } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, InputGroup, Input, InputGroupAddon, Button } from "reactstrap";
import { app } from '../base';
import firebase from 'firebase';

const AddTodoEntryForm = ({ history }) => {
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState([]);
  
  const handleSubmit = e => {      
    e.preventDefault();
    if (!value) return;

    firebase
      .firestore()
      .collection("TodoList")
      .add({
        value,
      })
      .then(() => {
        setValue("")
        setTodos([...todos, {text: value}])
        console.log(todos);
      })
  }

  // const addTodo = async (value) => {
  //   const newTodos = [...todos, {
  //     text,
  //     // completed: false,
  //     // editing: false
  //   }];
  //   if (!value) return;
  //   setTodos([...todos, {text: value}])
  //   console.log(newTodos);
  // }

  // const removeTodo = index => {
  //   const newTodos = [...todos]
  //   newTodos.splice(index, 1)
  //   setTodos(newTodos)
  //   console.log(newTodos);
  // }

  // const completeTodo = index => {
  //   const newTodos = [...todos]
  //   newTodos[index].completed = !newTodos[index].completed
  //   setTodos(newTodos)
  //   console.log(newTodos);
  // }

  // const editTodo = index => {
  //   const newTodos = [...todos]
  //   newTodos[index].editing = !newTodos[index].editing
  //   setTodos(newTodos)
  //   console.log(newTodos);
  // }

  const handleToLoginPage = () => {
    app.auth().signOut()
    history.push("/login");
  }


  return (
    <Container>
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
    )
}

export default AddTodoEntryForm;