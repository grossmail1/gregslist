import React from 'react'
import styled from 'styled-components'
import {CheckSquare as Checked} from 'styled-icons/fa-regular/CheckSquare'
import {Square as Unchecked} from 'styled-icons/fa-regular/Square'
import {TrashAlt as Trash} from 'styled-icons/fa-solid/TrashAlt'



const Value = styled.span`
    font-size: 2rem;
    width: 100%;
    text-align: left;
    padding: 0 5px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    text-decoration: ${props => props.checked && 'line-through'};
`

const Row = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0; 
    border-bottom: 2px solid #fff;
`

const Button = styled.button`
    border:none;
    background-color: transparent;
    color: #fff;
    cursor: pointer;
    padding: 0;
    margin: 5px;
`



const TodoItem = ({todo: {value, checked}, idx, onItemChecked, onDeleteClick}) => {
    const onCheckedClick = () => {
        onItemChecked(idx)
    }

    const onTrashClick = () => {
        onDeleteClick(idx)
    }
    return (
        <Row>
            <Button onClick={onCheckedClick}>
                {checked ?
                     <Checked size="30" title="Item Checked - click to uncheck" /> :
                     <Unchecked size="30" title="Item Checked - click to uncheck"/>
                }
            </Button>
            <Value checked={checked}>
                {value}
            </Value>
            <Button onClick={onTrashClick}>
                <Trash size="30" title="Click to delete item" />
            </Button>
        </Row>
    )
}

export default TodoItem