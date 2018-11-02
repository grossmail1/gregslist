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

const H1 = styled.h1`

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

  ::placeholder { 
    color: #ededed;
  }
`

const App = () => {
    const [name, setName] = useState('Greg')
    const [todoText, setTodoText] = useState('')
    const [todos, setTodos] = useState({})

   const onNameChange = (e) => {
      setName(e.target.value)
    }

    const onTodoTextChange = (e) => {
      setTodoText(e.target.value)
    }

    const onKeyDownHandler = event => {
      if (event.keyCode === 13) {
        addTodo({
          value: todoText,
          checked: false,
          id: uuidv4()
        })
      }
    }

    const addTodo = todo => {
      setTodoText('')
      setTodos({
        ...todos,
        [todo.id]: todo
      })
    }

    const renderTodos = () => (
      Object.keys(todos).map(id => <TodoItem key={id} todo={todos[id]}/>)
    )

    return (


      <BodyWrapper>
        <header>
          <H1>
            <NameInput type="text" value={name} onChange={onNameChange} />'s List
          </H1>
        </header>
        <TodoSection>
          <TodoInput type="text" value={todoText} onChange={onTodoTextChange} onKeyDown={onKeyDownHandler} placeholder="Add items to list here"/> 
          <div>
            {renderTodos()}
          </div>
        </TodoSection>
      </BodyWrapper>
    );
}

export default App;
