import React, { useState, useEffect } from 'react';
import './App.css';
import AddTodoEntryForm from './components/AddTodoEntryForm';
// import TodoList from './components/TodoList';
import firebase from 'firebase';

  function App() {
    const [todos, setTodos] = useState([])
    const [newText, setNewText] = useState()

    useEffect(() => {
        const db = firebase.firestore()
        const unsubscribe = db.collection("TodoList").onSnapshot((snapshot) => {
          const todosData = []
          snapshot.forEach(doc => todosData.push(({...doc.data(), id: doc.id})))
          setTodos(todosData)
        })

        return unsubscribe
    }, []);

    const onCreate = () => {
      const db = firebase.firestore()
      db.collection("TodoList").add({text: newText})
    }

    return (
      <div className="App">
        <h2 className="mt-4 mb-4">#今日の積み上げ</h2>
        <ul>
          <input value={newText} onChange={(e) => setNewText(e.target.value)} />
          <button onClick={onCreate}>Create</button>
          {todos.map(todo => (
            <li key={todo.id}>
              <AddTodoEntryForm todo={todo} />
            </li>
          ))}
        </ul>
        {/* <AddTodoEntryForm /> */}
        {/* <TodoList /> */}
      </div>
    );
}

// function EditTodo(todo, text, index) {
//   const [value, setValue] = useState(todo.text);
//   const [todos, setTodos] = useState([]);

//   const handleUpdateTodoText = e => {
//     if (e.which === 13) {
//       // e.preventDefault();
//       const newTodos = [...todos, {
//         text: value,
//         completed: false,
//         editing: false
//       }];
//       if (!text) return;
//       // if (todo.length === 0) {
//         setTodos(newTodos)
//         console.log(newTodos);
//         console.log("クリック");
//       // }
//     }
//   }

//   return (
//     <td>
//       <InputGroup size="sm">
//         <Input
//           type="text"
//           value={value}
//           onChange={e => setValue(e.target.value)}
//           className="editForm"
//           onKeyPress={e => handleUpdateTodoText(e)}
//         />
//       </InputGroup>
//     </td>
//   );
// }

export default App;
