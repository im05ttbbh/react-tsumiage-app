import React, { useState, useEffect } from 'react';
import './App.css';
import firebase from 'firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, InputGroup, Input, Button, Table } from "reactstrap";
import TodoList from './components/TodoList';

  function App() {
    const [todos, setTodos] = useState([])
    const [newText, setNewText] = useState("")

    useEffect(() => {
        const db = firebase.firestore()
        const fetchData = db.collection("TodoList").onSnapshot((snapshot) => {
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
        editing: false
      })
    }

    return (
      <div className="App">
        <Container>
          <h2 className="mt-4 mb-4">#今日の積み上げ</h2>
          {/* <Button onClick={handleToLoginPage}>Sign out</Button> */}
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
                <TodoList todo={todo} key={todo.id} />
              ))}
            </tbody>
          </Table> 
        </Container>
      </div>
    );
}

export default App;
