import React, {useState} from 'react';
import styled from 'styled-components'
import uuidv4 from 'uuid/v4'
import TodoItem from './TodoItem'


const BodyWrapper = styled.div`
  width: 90%;
  max-width: 980px;
  margin: 0 auto;
  text-align: center;
`

const NameInput = styled.input`
  border: none;
  border-bottom: 2px solid #fff;
  background-color: transparent;
  font-size: inherit;
  font-weight: inherit;
  color: inherit;
  display: inline-block;
  height: 100%;
  width: 200px;
  text-align: right;
`

const TodoSection = styled.div`
  margin: 50px 0;
`

const TodoInput = styled.input`
  border: none;
  border-bottom: 2px solid #fff;
  background-color: #3B9175;
  color: #fff;
  width: 80%;
  margin: 0 auto;
  font-size: 1.5rem;
  padding: 10px;
  margin-bottom: 20px;

  ::placeholder { 
    color: #ededed;
  }
`

const CompletedSection = styled.div`
  font-size: 1.5rem;
  margin-top: 15px;
`

const gregsList = {
  1: {
    value: 'Create a super cool todolist',
    checked: true,
  },
  2: {
    value: 'Add an item to the checklist',
    checked: true,
  },
  3: {
    value: 'Mark an item as complete on the checklist',
    checked: true,
  },
  4: {
    value: 'Delete an item from the checklist',
    checked: false,
  }
}
const localState = localStorage.getItem('localState')
const initialState = localState ? JSON.parse(localState) : {}

const App = () => {
    const [name, setName] = useState(initialState.name ? initialState.name : 'Greg')
    const [todoText, setTodoText] = useState('')
    const [todos, setTodos] = useState(initialState.todos ? initialState.todos : gregsList)

   const onNameChange = (e) => {
     const name = e.target.value
      setName(name)
      saveState({
        name,
        todos
      })
    }

    const onTodoTextChange = (e) => {
      setTodoText(e.target.value)
    }

    const saveState = state => {
      localStorage.setItem('localState', JSON.stringify(state))
    }

    const onKeyDownHandler = event => {
      if (event.keyCode === 13) {
        addTodo({
          value: todoText,
          checked: false,
        })
        
      }
    }

    const addTodo = todo => {
      setTodoText('')
      const newTodos = {
        ...todos,
        [uuidv4()]: todo
      }
      setTodos(newTodos)
      saveState({
        name, 
        todos: newTodos,
      })
    }

    const todoChecked = id => {
      const todo = todos[id]

      const newTodos = {
        ...todos,
        [id]: {
          ...todo,
          checked: !todo.checked,
        }
      }

      setTodos(newTodos)
      saveState({
        name, 
        todos: newTodos,
      })
    }
    

    const deleteTodo = id => {
      const {[id]: removed, ...newTodos} = todos
      setTodos(newTodos)
      saveState({
        name,
        todos: newTodos
      })
    }

    const todoKeys = Object.keys(todos)
    const completedTodos = todoKeys.map(id => todos[id].checked).filter(todo => todo)
    console.log(completedTodos)
    const renderTodos = () => (
      todoKeys.map(id => <TodoItem key={id} idx={id} todo={todos[id]} onItemChecked={todoChecked} onDeleteClick={deleteTodo}/>)
    )

    return (
      <BodyWrapper>
        <header>
          <h1>
            <NameInput type="text" value={name} onChange={onNameChange} />'s List
          </h1>
        </header>
        <TodoSection>
          <TodoInput
           type="text"
           value={todoText}
           onChange={onTodoTextChange}
           onKeyDown={onKeyDownHandler}
           placeholder="Add items to list here"
           /> 
          <div>
            {renderTodos()}
          </div>
          <CompletedSection>
            <b>{completedTodos.length} - {todoKeys.length}</b> items completed
          </CompletedSection>
        </TodoSection>
      </BodyWrapper>
    );
}

export default App;
