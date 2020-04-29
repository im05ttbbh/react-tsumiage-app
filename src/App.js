import React, { useState, useEffect } from 'react';
import './App.css';
import firebase from 'firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "reactstrap";
import TodoList from './components/TodoList';
import { app } from './base';
import { withRouter } from 'react-router';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import AddBoxIcon from '@material-ui/icons/AddBox';
import FormGroup from '@material-ui/core/FormGroup';

const useStyles = makeStyles((theme) => ({
  root: {
    '& label': {
      color: "#aaa",
    },
    '& label.Mui-focused': {
      color: '#61dafb',
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: '#aaa',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#61dafb',
    },
    '& > *': {
      margin: theme.spacing(1),
      width: '47ch',
    },
  },
  inputText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: "large",
  },
  addIcon: {
    width: "30px",
    fontSize: "xx-large",
    marginTop: "25px",
    marginRight: "-1px",
  }
}));

const App = ({ history }) => {
  const [todos, setTodos] = useState([])
  const [newText, setNewText] = useState("")
  const classes = useStyles();

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

  const onEnterCreate = e => {
    if (e.key === "Enter") {
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
  }

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
    <Button onClick={handleToLoginPage}>Sign out</Button>
      <Container maxWidth="sm">
        <FormGroup>
          <form className={classes.root} noValidate autoComplete="off">
          <AddBoxIcon className={classes.addIcon} onClick={e => onCreate(e)}/>
            <TextField
              value={newText}
              onChange={e => setNewText(e.target.value)}
              onKeyPress={e => onEnterCreate(e)}
              id="standard-secondary"
              label="新規タスクを入力"
              InputProps={{
                className: classes.inputText,
              }}
            />
          </form>
        </FormGroup>
        {todos.map(todo => (
          <TodoList todo={todo} key={todo.id} completed={todo.completed} />
        ))}
      </Container>
    </div>
  );
}

export default withRouter(App);
