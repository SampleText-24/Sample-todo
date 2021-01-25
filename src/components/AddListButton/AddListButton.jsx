import React, { useState, useEffect } from 'react'
import List from "../List/List"
import Badge from "../Badge/Badge";
import axios from "axios";

import closeSvg from '../../assets/img/close.svg'

import './AddListButton.scss'



const AddListButton = ({ colors, onAddList }) => {

    const [visiblePopup, setVisiblePopup] = useState(false)
    const [selectedColor, setSelectedColor] = useState(3)
    const [isLoading, setIsLoading] = useState(false)
    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
        setSelectedColor()
    }, [colors])

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
        setIsLoading(true)
        axios
            .post('http://localhost:3001/lists', {
                name: inputValue,
                colorId: selectedColor
            })
            .then(({ data }) => {
                const color = colors.filter(c => c.id ===selectedColor)[0].name
                const listObj = { ...data, color: { name: color } }
                onAddList(listObj)
                onClose()
            })
            .catch(() => {
                alert('Error adding list')
            })
            .finally(() => {
                setIsLoading(false)
            })
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
            <button onClick={addList} className={'button'}>{ isLoading ? 'Adding...' : 'Add' }</button>
        </div>}
    </div>
    )
}

export default AddListButton;