import React, { useState } from 'react'
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { Icon } from '@iconify/react';
import pencilAlt from '@iconify/icons-fa-solid/pencil-alt';
import { TwitterShareButton } from 'react-share';
import { InputGroup, Input, Form } from "reactstrap";
import firebase from 'firebase';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';

const useStyles = makeStyles(() => ({
  root: {
    width: '90%',
    // maxWidth: 360,
    margin: "5px auto",
    backgroundColor: "#34414f;",
    borderRadius: "5px",
    // backgroundColor: theme.palette.background.paper,
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
    const db = firebase.firestore()
    db.collection("TodoList").doc(todo.id).update({completed: !todo.completed})
  }

  const classes = useStyles();

  return (
    <List className={classes.root}>
      <ListItem key={todo.id} dense button>
        <ListItemIcon>
          <Checkbox
            edge="start"
            disableRipple
            type="checkbox"
            style ={{
              color: "#f48fb1",
            }}
            checked={todo.completed}
            onChange={(e) => onCompleted(e)}
            />
        </ListItemIcon>
        <ListItemText
           disableTypography 
           primary={todo.text} 
           className={`mb-1 todoScript + ${todo.completed ? "done" : ""}`}
         />
        {/* <td className="text-right">
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
              onClick={onEditing}
            />
            <button onClick={onDelete} className="trashButton ml-3">
              <FontAwesomeIcon icon="trash" className="trashIcon" />
            </button>
          </div>
        </td> */}
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="comments">
            <CommentIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </List>

    // <tr key={todo.id}>
    //   {todo.editing ? // Trueで編集フォーム
    //     <td>
    //       <Form>
    //       <InputGroup size="sm">
    //         <Input
    //           type="text"
    //           value={editText}
    //           onChange={e => setEditText(e.target.value)}
    //           className="editForm"
    //         />
    //         <button type="submit" color="info" onClick={e => onUpdate(e)}>編集</button>
    //       </InputGroup>
    //       </Form>
    //     </td>
    //     :
    //     <td className="text-left ListItem">
    //       <label>
    //         <span className="ml-2">
    //           <Checkbox
    //             type="checkbox"
    //             color="primary"
    //             checked={todo.completed}
    //             onChange={(e) => onCompleted(e)}
    //            />
    //         </span>
    //         <span className={`ml-2 todoScript + ${todo.completed ? "done" : ""}`}>
    //           {todo.text}
    //         </span>
    //       </label>
    //     </td>
    //   }
    //   <td className="text-right">
    //     <div className="icons">
    //       <TwitterShareButton
    //         url="dum"
    //         title={todo.text}
    //         hashtags={["今日の積み上げ"]}
    //         className="" >
    //         <FontAwesomeIcon icon={faTwitter} className="twitterIcon" />
    //       </TwitterShareButton>
    //       <Icon
    //         icon={pencilAlt}
    //         className="pencilIcon ml-4"
    //         onClick={onEditing}
    //       />
    //       <button onClick={onDelete} className="trashButton ml-3">
    //         <FontAwesomeIcon icon="trash" className="trashIcon" />
    //       </button>
    //     </div>
    //   </td>
    // </tr>
  )
}

export default TodoList;