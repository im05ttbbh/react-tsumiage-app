import React from 'react';
import './App.css';
import AddTodoEntryForm from './components/AddTodoEntryForm';
import TodoList from './components/TodoList';

  const App = () => {

  return (
    <div className="App">
      <h2 className="mt-4 mb-4">#今日の積み上げ</h2>
      <AddTodoEntryForm />
      <TodoList />
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
