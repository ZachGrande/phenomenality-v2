import React from 'react';

function TagButton(props){
    let thisItem = props.item;
    console.log(props);

    function renderTagButton(){
        const handleEditTag = (event) => {
            props.editTag(thisItem);
        }

        let idName = thisItem.replace(/\s+/g, '');
        // document.getElementById(idName).classList.toggle('selected');
        
        return(
            <div>
                <input
                id={idName}
                type='button'
                value={thisItem}
                className='tag-test'
                onClick={handleEditTag}
                />
            </div>
        )
    }






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

    //     const handleEditTag = (event) => {
    //         props.editTag(thisItem.value);
    //     }

    //     return (
    //         //return one instance of tag
    //         <div>
    //             <input
    //                 id='Technical'
    //                 type='button'
    //                 name="tag"
    //                 className='tag-test technical'
    //                 value='Technical'
    //                 onClick={e => editTag(e.currentTarget.value)}
    //             />

    //         </div>
    //     )
    // }

    // return(
    //     <div>
    //         {renderTag(thisItem)}
    //     </div>
    // )

    return (
        <div>
            {renderTagButton(thisItem)}
        </div>
    )
}

function TagButtonList(props){
    let items = props.items;
    let tagBtnComponenets = items?.map((currentItem) => {
        return <TagButton item={currentItem}
        editTag={props.editTag}
        />
    })

    return (
        <div>
            {tagBtnComponenets}
        </div>
    )
}

export default TagButtonList;