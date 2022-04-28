import React from 'react';
import '../css/TagButton.css'

function TagButton(props){
    let thisItem = props.item;

    const getClassName = () => {
        return "tag-test " + props.color;
      }
    
    function renderTagButton(){
        const handleEditTag = (event) => {
            props.editTag(thisItem);
        }

        let idName = thisItem.replace(/\s+/g, '');

        return(
            
            <div>
                <input
                id={idName}
                className={getClassName()}
                type='button'
                value={thisItem}
                onClick={handleEditTag}
                />
            </div>
        )
    }

    return (
        <div>
            {renderTagButton(thisItem)}
        </div>
    )
}

function TagButtonList(props){
    let items = props.items;

    let tagBtnComponenets = items?.map((currentItem, index) => {
        return <TagButton item={currentItem}
        editTag={props.editTag}
        color={props.color[index]}
        />
    })

    return (
        <div className='tag-btn-list'>
            {tagBtnComponenets}
        </div>
    )
}

export default TagButtonList;