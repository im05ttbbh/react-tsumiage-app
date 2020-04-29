import React, { useState } from 'react'
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { Icon } from '@iconify/react';
import pencilAlt from '@iconify/icons-fa-solid/pencil-alt';
import { TwitterShareButton } from 'react-share';
import firebase from 'firebase';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import AutorenewIcon from '@material-ui/icons/Autorenew';

const useStyles = makeStyles(() => ({
  root: {
    width: '90%',
    margin: "5px auto",
    backgroundColor: "#34414f",
    borderRadius: "5px",
    // backgroundColor: theme.palette.background.paper,
  },
  textFieldColor: {
    color: "#61dafb",
    fontWeight: "bold",
    fontSize: "large"
  },
}));

export const TodoList = ({ todo }) => {
  const [editText, setEditText] = useState(todo.text);

  const onEditing = () => {
    const db = firebase.firestore()
    db.collection("TodoList").doc(todo.id).update({editing: !todo.editing})
  }

  const onUpdate = e => {
    e.preventDefault()
    const db = firebase.firestore()
    db.collection("TodoList").doc(todo.id).update({
      ...todo, 
      text: editText, 
      editing: !todo.editing
    })
  }

  const onDelete = () => {
    const db = firebase.firestore()
    db.collection("TodoList").doc(todo.id).delete()
  }

  const onCompleted = () => {
    if (todo.editing === false) {
      const db = firebase.firestore()
      db.collection("TodoList").doc(todo.id).update({completed: !todo.completed})  
    }
  }

  const classes = useStyles();

  return (
    <List className={classes.root}>
      <ListItem 
        key={todo.id} 
        dense
        button
        onClick={(e) => onCompleted(e)}
      >
        <ListItemIcon>
          <Checkbox
            edge="start"
            type="checkbox"
            checked={todo.completed}
            style ={{
              color: "#f48fb1",
            }}
            />
        </ListItemIcon>
      {todo.editing ? // Trueで編集フィールド表示
        <TextField
          style={{
            marginLeft: "-20px",
          }}
          InputProps={{
            className: classes.textFieldColor,
            startAdornment: (
              <InputAdornment position="start">
                <AutorenewIcon onClick={e => onUpdate(e)} />
              </InputAdornment>
            ),
          }}
          value={editText}
          onChange={e => setEditText(e.target.value)}
        />
        :
        <ListItemText
           disableTypography
           primary={todo.text}
           className={`todoScript + ${todo.completed ? "done" : ""}`}
         />
      }
        <ListItemSecondaryAction>
          <TwitterShareButton
              url="dum"
              title={todo.text}
              hashtags={["今日の積み上げ"]}
              className="" >
              <FontAwesomeIcon icon={faTwitter} className="twitterIcon" />
            </TwitterShareButton>
            <Icon
              icon={pencilAlt}
              className="pencilIcon ml-4 mb-2"
              onClick={onEditing}
            />
            <button onClick={onDelete} className="trashButton ml-3">
              <FontAwesomeIcon icon="trash" className="trashIcon" />
            </button>
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  )
}

export default TodoList;