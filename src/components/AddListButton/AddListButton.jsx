import React, { useState } from 'react'
import List from "../List/List"
import Badge from "../Badge/Badge";

import closeSvg from '../../assets/img/close.svg'

import './AddListButton.scss'


const AddListButton = ({ colors, onAddList }) => {

    const [visiblePopup, setVisiblePopup] = useState(false)
    const [selectedColor, setSelectedColor] = useState(colors[0].id)
    const [inputValue, setInputValue] = useState('')

    const onClose = () => {
        setVisiblePopup(false)
        setInputValue('')
        setSelectedColor(colors[0].id)
    }

    const addList = () => {
        if (!inputValue) {
            alert('Enter list name')
            return
        }
        const color = colors.filter(c => c.id === selectedColor)[0].name
        onAddList({ id: Math.random(), name: inputValue, color: color })
        onClose();
    }

    return (
    <div className={'add-list'}>
        <List
            onClick={() => setVisiblePopup(!visiblePopup)}

            items={[
            {
                className: 'list__add-button',
                icon: <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 1V11" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M1 6H11" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                ,
                name: 'Add new list',
            }
        ]}
        />
        { visiblePopup && <div className='add-list__popup'>
            <img
                onClick={ onClose }
                src={ closeSvg } alt="Close button"
                className="add-list__popup-close-btn"
            />

            <input
                value={inputValue}
                onChange={ e => setInputValue(e.target.value) }
                className={'field'}
                type="text"
                placeholder={'List name'}
            />

            <div className="add-list__popup-colors">
                {
                    colors.map(color => <Badge
                        onClick={() => setSelectedColor(color.id)}
                        key={color.id}
                        color={color.name}
                        className={selectedColor === color.id && 'active'}
                    />)
                }
            </div>
            <button onClick={addList} className={'button'}>Add</button>
        </div>}
    </div>
    )
}

export default AddListButton;