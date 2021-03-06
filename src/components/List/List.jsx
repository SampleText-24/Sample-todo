import React from 'react'
import classNames from 'classnames'
import Badge from "../Badge/Badge";

import removeSvg from '../../assets/img/remove.svg'

import './list.scss'
import axios from "axios";


const List = ({ items, isRemovable, onClick, onRemove, onClickItem, activeList }) => {

    const removeList = (item) => {
        if (window.confirm('Are you sure you want to delete the list?')) {
            axios.delete('http://localhost:3001/lists/' + item.id).then(() => {
                onRemove(item.id)
            })
        }
    }

    return (
        <ul onClick={onClick} className="list">
            {items.map((item, index) => (
                <li
                    key={index}
                    className={classNames(item.className, {
                        'active': item.active
                            ? item.active
                            : activeList && activeList.id === item.id
                    })}
                    onClick={ onClickItem ? () => onClickItem(item) : null }
                >
                    { item.icon ?  item.icon : <Badge color={item.color.name} /> }
                    <span>{item.name}</span>
                    {
                        isRemovable && (
                        <img
                            onClick={() => { removeList(item) }}
                            className="list__remove-icon"
                            src={removeSvg} alt="Remove icon"
                        />
                        )
                    }
                </li>
            ))}
        </ul>
    )
}

export default List;