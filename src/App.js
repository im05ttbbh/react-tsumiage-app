import React, { useState, useEffect } from 'react';
import './App.css';
import firebase from 'firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, InputGroup, Input, Button, Table } from "reactstrap";
import TodoList from './components/TodoList';
import { app } from './base';
import { withRouter } from 'react-router';
import Container from '@material-ui/core/Container';

  const App = ({ history }) => {
    const [todos, setTodos] = useState([])
    const [newText, setNewText] = useState("")

    useEffect(() => {
        const db = firebase.firestore()
        const fetchData = db
          .collection("TodoList")
          .orderBy("createdAt", "asc")
          .onSnapshot((snapshot) => {
            const todosData = []
            snapshot.forEach(doc => todosData.push(({...doc.data(), id: doc.id})))
            setTodos(todosData)
        })

        return fetchData
    }, []);

    const onCreate = e => {
      e.preventDefault()
      if (!newText) return;
      setNewText("")
      const db = firebase.firestore()
      db.collection("TodoList").add({
        text: newText,
        completed: false,
        editing: false,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      console.log(todos);
    }

    const handleToLoginPage = () => {
      app.auth().signOut()
      history.push("/login");
    }

    return (
      <div className="App">
        <Container maxWidth="sm">
          <h2 className="mt-4 mb-4">#今日の積み上げ</h2>
          <Button onClick={handleToLoginPage}>Sign out</Button>
          <Form>
            <InputGroup>
              <Input
                value={newText}
                onChange={e => setNewText(e.target.value)}
              />
              <Button type="submit" color="info" onClick={onCreate}>追加</Button>
            </InputGroup>
          </Form>
          <Table responsive>
            <tbody>
              {todos.map(todo => (
                <TodoList todo={todo} key={todo.id} completed={todo.completed} />
              ))}
            </tbody>
          </Table> 
        </Container>
      </div>
    );
}

export default withRouter(App);
