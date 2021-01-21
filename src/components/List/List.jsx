import React from 'react'
import classNames from 'classnames'
import Badge from "../Badge/Badge";

import removeSvg from '../../assets/img/remove.svg'

import './list.scss'


const List = ({ items, isRemovable, onClick, onRemove }) => {

    const removeList = (item) => {
        if (window.confirm('Are you sure you want to delete the list?')) {
            onRemove(item)
        }
    }

    return (
        <ul onClick={onClick} className={"list"}>
            {items.map((item, index) => (
                <li key={index} className={classNames(item.className, {'active': item.active})}>
                    { item.icon ?  item.icon : <Badge color={item.color} /> }
                    <span>{item.name}</span>
                    {
                        isRemovable && (
                        <img
                            onClick={() => { removeList(item) }}
                            className={'list__remove-icon'}
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