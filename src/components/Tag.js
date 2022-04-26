import React from 'react';

function Tag(props){
    let thisItem = props.item;

    function renderTag() {


// let tagSection = document.getElementById('tagSection');
// console.log(tagSection);
// console.log("selected div element");
// for(let i = 0; i < allTags.length; i++) {
//   let idName = allTags[i].replace(/\s+/g, '');
//   let newTag = document.createElement('input');

//   newTag.type = 'button';
//   newTag.id = idName;
//   newTag.value = allTags[i];
//   newTag.name = 'tag';
//   newTag.className = 'tag-test';
//   newTag.style.backgroundColor = tagColors[i];
//   newTag.onClick = e => editTag(e.currentTarget.value);
  
//   console.log("created tag " + allTags[i]);
//   tagSection.appendChild(newTag);
//   console.log("append tag " + allTags[i]);
// }

        const handleEditTag = (event) => {
            props.editTag(thisItem.value);
        }

        return (
            //return one instance of tag
            <div>
                <input
                    id='Technical'
                    type='button'
                    name="tag"
                    className='tag-test technical'
                    value='Technical'
                    onClick={e => editTag(e.currentTarget.value)}
                />

            </div>
        )
    }

    return(
        <div>
            {renderTag(thisItem)}
        </div>
    )

}

function TagList(props){
    let items = prop.itens;
    let tagComponents = items.map((currentItem) => {
        return <Tag 
        />
    })


    return (
        <div>
            {tagComponents}
        </div>
    )
}

export default TagList;