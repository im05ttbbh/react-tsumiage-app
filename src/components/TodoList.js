import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
// import { Icon } from '@iconify/react';
// import pencilAlt from '@iconify/icons-fa-solid/pencil-alt';
import { TwitterShareButton } from 'react-share';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Table } from "reactstrap";
// import { Container, Form, InputGroup, Input, InputGroupAddon, Button, Table } from "reactstrap";
import { app } from './base';
import firebase from 'firebase';

// const TodoList = () => {
//   // useEffect(() => {
//   //   (async () => {
//   //     const resTodo = await db.collection("todoList").doc("todo").get();

//   //     setTodos(resTodo.data().tasks)
//   //   })()
//   // }, [db])

//   return (
//       <Container>
//       <Table responsive>
//         <tbody>
//           {todos && todos.map((todo) => (
//             <tr key={todo.id}>
//               {/* {todo.editing ? <EditTodo index={index} todo={todo} text={todo.text} /> : */}
//               <td className="text-left ListItem">
//                 {/* <span className="ml-2">
//                   <Input type="checkbox" checked={todo.completed} onChange={() => completeTodo(index)} />
//                 </span> */}
//                 <span className={`ml-2 todoScript + ${todo.completed ? "done" : ""}`} >
//                   {todo.text}
//                 </span>
//               </td>
//                 {/* } */}
//               <td className="text-right">
//                 <div className="icons">
//                   <TwitterShareButton
//                     url="dum"
//                     title={todo.text}
//                     hashtags={["今日の積み上げ"]}
//                     className="" >
//                     <FontAwesomeIcon icon={faTwitter} className="twitterIcon" />
//                   </TwitterShareButton>
//                   {/* <Icon
//                     icon={pencilAlt}
//                     className="pencilIcon ml-4"
//                     onClick={() => editTodo(index)}
//                   /> */}
//                   <button onClick={() => removeTodo()} className="trashButton ml-3">
//                     <FontAwesomeIcon icon="trash" className="trashIcon" />
//                   </button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </Container>
//   )
// }

// export default TodoList;