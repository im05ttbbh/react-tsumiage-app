import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { Icon } from '@iconify/react';
import pencilAlt from '@iconify/icons-fa-solid/pencil-alt';
import { TwitterShareButton } from 'react-share';
import { Input } from "reactstrap";
import firebase from 'firebase';

export const TodoList = ({ todo }) => {
  // const [text, setText] = useState(todo.text);

  // const onUpdate = e => {
  //   e.preventDefault()
  //   const db = firebase.firestore()
  //   db.collection("TodoList").doc(todo.id).set({...todo, text})
  // }

  const onDelete = e => {
    e.preventDefault()
    const db = firebase.firestore()
    db.collection("TodoList").doc(todo.id).delete()
  }

  return (
    <tr key={todo.id}>
      <td className="text-left ListItem">
        <span className="ml-2">
          <Input type="checkbox" />
        </span>
        <span className="ml-2 todoScript">
          {todo.text}
          {/* <AddTodoEntryForm todo={todo} /> */}
        </span>
      </td>
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



// import React, { useState, useEffect } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTwitter } from '@fortawesome/free-brands-svg-icons'
// // import { Icon } from '@iconify/react';
// // import pencilAlt from '@iconify/icons-fa-solid/pencil-alt';
// import { TwitterShareButton } from 'react-share';
// import '../App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Container, Table } from "reactstrap";
// // import { Container, Form, InputGroup, Input, InputGroupAddon, Button, Table } from "reactstrap";
// import { app } from '../base';
// import firebase from 'firebase';

//   function useTodoList() {
//     const [todos, setTodos] = useState([])

//     useEffect(() => {    
//       const DataList = firebase
//         .firestore()
//         .collection("TodoList")
//         .onSnapshot((snapshot) => {
//           const newTodos = snapshot.docs.map((doc) => ({
//             id: doc.id,
//             ...doc.data()
//           }))

//           setTodos(newTodos)
//         })

//       return () => DataList()
//     }, [])

//     return todos
//   }

//   const TodoList = () => {
//     const todos = useTodoList()

//     return (
//       <Container>
//         <Table responsive>
//           <tbody>
//             {todos && todos.map((todo) => (
//               <tr key={todo.id}>
//                 {/* {todo.editing ? <EditTodo index={index} todo={todo} text={todo.text} /> : */}
//                 <td className="text-left ListItem">
//                   {/* <span className="ml-2">
//                     <Input type="checkbox" checked={todo.completed} onChange={() => completeTodo(index)} />
//                   </span> */}
//                   <span className={`ml-2 todoScript + ${todo.completed ? "done" : ""}`} >
//                     {todo.text}
//                   </span>
//                 </td>
//                   {/* } */}
//                 <td className="text-right">
//                   <div className="icons">
//                     <TwitterShareButton
//                       url="dum"
//                       title={todo.text}
//                       hashtags={["今日の積み上げ"]}
//                       className="" >
//                       <FontAwesomeIcon icon={faTwitter} className="twitterIcon" />
//                     </TwitterShareButton>
//                     {/* <Icon
//                       icon={pencilAlt}
//                       className="pencilIcon ml-4"
//                       onClick={() => editTodo(index)}
//                     /> */}
//                     {/* <button onClick={() => removeTodo()} className="trashButton ml-3">
//                       <FontAwesomeIcon icon="trash" className="trashIcon" />
//                     </button> */}
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </Container>
//     )
//   }

// export default TodoList;