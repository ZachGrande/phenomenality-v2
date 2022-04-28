import { useState } from 'react';
import { ref, update } from 'firebase/database';
import { map } from '@firebase/util';

import TagButtonList from './TagButton.js';

import '../css/Form.css';

function Form(props) {

  const items = props.items;
  const setItems = props.setItems;
  const database = props.database;
  const user = props.user;
  // const allTags = ['Technical', 'Soft Skills', 'Kudos', 'Award',
  // 'Training', 'Special Projects', 'Volunteer', 'Promotion','Idea', 'Innovation', 'Other'];
  const tagColors = ['#581064', '#9B6CFE', '#6F79DB'];
  const allTags = ['Technical', 'Soft Skills', 'Kudos'];


  const [accomplishment, setAccomplishment] = useState("");
  const [status, setStatus] = useState("success");
  const [accomplishmentTags, setAccomplishmentTags] = useState([]);

  const addNewAccomplishment = async (event) => { 
    event.preventDefault();
    let thisAccomplishment = {
      complete: true,
      description: accomplishment,
      id: items.length + 1,
      key: items.length + "",
      status: status,
      tags: accomplishmentTags
    }
    
    let newItems = items.push(thisAccomplishment);
    newItems = map((currentItem, index = 0, newItems) => {
      currentItem.id = index + 1;
      currentItem.key = index + "";
      index = index + 1;
      return currentItem;
    })

    setItems(newItems);
    setAccomplishment("");
    update(ref(database, 'users/' + user.uid), {
        data: items
    });
  }

  const editTag = value => {
    console.log(typeof value);
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
    setAccomplishmentTags(newTags);
  }

// var element = document.createElement('select');
// element.style.width = "100px";
// add classname
// element.classList.add("my-class");
// or 
// var d = document.getElementById("div1");
// d.className += " otherclass";

// document.addEventListener('DOMContentLoaded', function() {
//   var button = document.createElement('input');
//   button.type = 'button';
//   button.id = 'submit';
//   button.value = 'Submit';
//   button.className = 'btn';

//   button.onclick = function() {
//   // …
//   };

//   var container = document.getElementById('container');
//   container.appendChild(button);
// }, false);


// id='SoftSkills'
// type='button'
// name="tag"
// className='tag-test'
// value='Soft Skills'
// onClick={e => editTag(e.currentTarget.value)}

// document.addEventListener("DOMContentLoaded", function() {
//   console.log("page loading");
//   renderTags();
// });
  
  return (
     <div>
       <p>Bank Page</p>
       <form>
       <h4>What's something you're proud of?</h4>
       <p><em>This only works if you are already logged in.</em></p>
       <input
         placeholder="Today I was able to..."
         value={accomplishment}
         onChange={(event) => {
           setAccomplishment(event.target.value);
         }}
       />
       <br></br>
       {/* <button onClick={renderTags}>Render Tags</button> */}
       <div id='tagSection'>
       <br></br>
       <p><u>Tags</u></p>
       <input
                id='test'
                type='button'
                value='test'
                className='tag-test'
                onClick={e => editTag(e.currentTarget.value)}
                />
       <TagButtonList items={allTags} 
          editTag={editTag}/>
       </div>
       <br></br>
       <button onClick={addNewAccomplishment}>Add accomplishment</button>
       </form>
     </div>
   );
}


 export default Form;