import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { Icon } from '@iconify/react';
import pencilAlt from '@iconify/icons-fa-solid/pencil-alt';
import { TwitterShareButton } from 'react-share';
import { InputGroup, Input, Form } from "reactstrap";
import firebase from 'firebase';

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

  return (
    <tr key={todo.id}>
      {todo.editing ? // Trueで編集フォーム
        <td>
          <Form>
          <InputGroup size="sm">
            <Input
              type="text"
              value={editText}
              onChange={e => setEditText(e.target.value)}
              className="editForm"
            />
            <button type="submit" color="info" onClick={e => onUpdate(e)}>編集</button>
          </InputGroup>
          </Form>
        </td>
        :
        <td className="text-left ListItem">
          <span className="ml-2">
            <Input type="checkbox" onChange={onCompleted} />
          </span>
          <span className={`ml-2 todoScript + ${todo.completed ? "done" : ""}`}>
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
            onClick={onEditing}
          />
          <button onClick={onDelete} className="trashButton ml-3">
            <FontAwesomeIcon icon="trash" className="trashIcon" />
          </button>
        </div>
      </td>
    </tr>
  )
}

export default TodoList;