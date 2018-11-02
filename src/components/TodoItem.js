import React from 'react'


const TodoItem = ({todo: {value, checked, id}}) => {
    return (
        <div>
            <span>
                {id}
            </span>
            <span>
                {value}
            </span>
            <span>
                {checked}
            </span>
        </div>
    )
}

export default TodoItem