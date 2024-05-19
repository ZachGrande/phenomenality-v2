import { useState } from 'react';
import { ref, update } from 'firebase/database';
import { map } from '@firebase/util';
import '../css/Form.sass'

import TagButtonList from './TagButton.js';

import '../css/Form.sass';

function Form(props) {

  const items = props.items;
  const setItems = props.setItems;
  const database = props.database;
  const user = props.user;
  // const allTags = ['Technical', 'Soft Skills', 'Kudos', 'Award',
  // 'Training', 'Special Projects', 'Volunteer', 'Promotion','Idea', 'Innovation', 'Other'];
  const tagColors = ['color1', 'color2', 'color3'];
  const allTags = ['Technical', 'Soft Skills', 'Kudos'];


  const [accomplishment, setAccomplishment] = useState("");
  const [accomplishmentTags, setAccomplishmentTags] = useState([]);
  const [title, setTitle] = useState("");

  const current = new Date();
  const date = `${current.getMonth()+1}/${current.getDate()}/${current.getFullYear()}`;

  const addNewAccomplishment = async (event) => { 
    event.preventDefault();
    let thisAccomplishment = {
      title: title,
      description: accomplishment,
      id: items.length + 1,
      key: items.length + "",
      tags: accomplishmentTags,
      date: date
    }
    
    let newItems = items.push(thisAccomplishment);
    newItems = map((currentItem, index = 0, newItems) => {
      currentItem.id = index + 1;
      currentItem.key = index + "";
      index = index + 1;
      return currentItem;
    })

    setItems(newItems);
    setTitle("");
    setAccomplishment("");
    update(ref(database, 'users/' + user.uid), {
        data: items
    });
  }

  const editTag = value => {
    let newTags = accomplishmentTags;
    let idName = value.replace(/\s+/g, '');
    document.getElementById(idName).classList.toggle('selected');;
    if (!accomplishmentTags.includes(value)) {
      newTags.push(value)
    } else {
      let index = newTags.indexOf(value);
      if (index > -1) {
        newTags.splice(index, 1);
      }
    }
    console.log(accomplishmentTags);
    setAccomplishmentTags(newTags);
  }
  
  return (
     <div className = "padding">
       <form>
       <h4>What's something you're proud of?</h4>
       <p><em>This only works if you are already logged in.</em></p>
       <input
         placeholder="Title"
         value={title}
         onChange={(event) => {
           setTitle(event.target.value);
         }}
       />
       <br></br>
       <input
         placeholder="Today I was able to..."
         value={accomplishment}
         onChange={(event) => {
           setAccomplishment(event.target.value);
         }}
       />
       <br></br>
       <div id='tagSection'>
         <p><u>Tags</u></p>
         <TagButtonList items={allTags}
            editTag={editTag}
            color={tagColors}
            />
       </div>
       <br></br>
       <button onClick={addNewAccomplishment}>Add accomplishment</button>
       </form>
     </div>
   );
}

 export default Form;