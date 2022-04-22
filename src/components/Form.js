import { useState } from 'react';
import { ref, update } from 'firebase/database';
import { map } from '@firebase/util';

import '../css/Form.css';

function Form(props) {

  const items = props.items;
  const setItems = props.setItems;
  const database = props.database;
  const user = props.user;

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
    let newTags = accomplishmentTags;
    let idName = value.replace(/\s+/g, '');
    document.getElementById(idName).classList.toggle('selected');
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
       <div id='tag-section'>
       <br></br>
       <p><u>Tags</u></p>
       <input
          id='Technical'
          type='button'
          name="tag"
          className='tag-test technical'
          value='Technical'
          onClick={e => editTag(e.currentTarget.value)}
       />
      <input
          id='SoftSkills'
          type='button'
          name="tag"
          className='tag-test'
          value='Soft Skills'
          onClick={e => editTag(e.currentTarget.value)}
       />
       </div>
      {/* ['Technical', 'Soft Skills', 'Kudos', 'Award',
   'Training', 'Special Projects', 'Volunteer', 'Promotion','Idea', 'Innovation', 'Other'] */}
       <br></br>
       <button onClick={addNewAccomplishment}>Add accomplishment</button>
       </form>
     </div>
   );
}


 export default Form;