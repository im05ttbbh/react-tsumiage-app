import React, { useState, useEffect } from 'react';
import './App.css';
import firebase from 'firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import TodoList from './components/TodoList';
import { app } from './base';
import { withRouter } from 'react-router';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import AddBoxIcon from '@material-ui/icons/AddBox';
import FormGroup from '@material-ui/core/FormGroup';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import MediaQuery from "react-responsive";

const useStyles = makeStyles((theme) => ({
  pcForm: {
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
  phoneForm: {
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
  },
  list: {
    width: 250,
  },
  navbar: {
    flexGrow: 1,
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
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
      <div className={classes.navbar}>
        <AppBar position="relative" color="transparent">
          <Toolbar className={classes.toolbar}>
            <span>#今日の積み上げを呟こう！</span>
            <Button onClick={handleToLoginPage} color="inherit">
              ログアウト
            </Button>
          </Toolbar>
        </AppBar>
      </div>
      <Container maxWidth="sm">
        <MediaQuery query="(max-width: 767px)">
          <FormGroup>
            <form className={classes.phoneForm} noValidate autoComplete="off">
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
        </MediaQuery>
        <MediaQuery query="(min-width: 768px)">
          <FormGroup>
            <form className={classes.pcForm} noValidate autoComplete="off">
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
        </MediaQuery>
        {todos.map(todo => (
          <TodoList todo={todo} key={todo.id} completed={todo.completed} />
        ))}
      </Container>
    </div>
  );
}

export default withRouter(App);
