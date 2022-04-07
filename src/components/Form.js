import { useState } from 'react';
import { ref, update } from 'firebase/database';
import { map } from '@firebase/util';

function Form(props) {

  const items = props.items;
  const setItems = props.setItems;
  const database = props.database;
  const user = props.user;
  const setFilter = props.setFilter;

  const [accomplishment, setAccomplishment] = useState("");
  const [status, setStatus] = useState("success");
  const [tags, setTags] = useState([]);

/* addNewAccomplishment will help inform what i will need to create. 
  - also reference deleteCard in Bank.js (line 66), this will likely have similar structure?
   - a new function will need to be created for users to update this info, right?
        - yes, editCard()
   - users will be able to edit the the 'description' and 'tags'. (I imagine status isn't relevant anymore) 
        - this information would show up as the starting text in a text boxes that users can then edit as needed 
   - where should the edit function live? Bank vs Card ? probably not form right?
   - TO ALL: should the users edit their accomp on a separate page or where the card exists? 
*/
  const addNewAccomplishment = async (event) => { 
    event.preventDefault();
    let thisAccomplishment = {
      complete: true,
      description: accomplishment,
      id: items.length + 1,
      key: items.length + "",
      status: status,
      tags: tags
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
    let newTags = tags;
    if (!tags.includes(value)) {
      newTags.push(value)
    } else {
      let index = newTags.indexOf(value);
      if (index > -1) {
        newTags.splice(index, 1);
      }
    }
    setTags(newTags);
  }

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
       <input
         type="radio"
         value="success"
         name="status"
         defaultChecked={status === "success"}
         onChange={e => setStatus(e.currentTarget.value)}
       /> Success
       <br></br>
       <input
         type="radio"
         value="question-unanswered"
         name="status"
         onChange={e => setStatus(e.currentTarget.value)}
       /> Question (Unanswered)
       <br></br>
       <p><u>Tags</u></p>
       <input
         type="checkbox"
         value="technical"
         name="tag"
         onChange={e => editTag(e.currentTarget.value)}
       /> Technical
       <br></br>
       <input
         type="checkbox"
         value="soft skills"
         name="tag"
         onChange={e => editTag(e.currentTarget.value)}
       /> Soft Skills
       <br></br>
       <br></br>
       <button onClick={addNewAccomplishment}>Add accomplishment</button>
       </form>
       <br></br>
       <h4>Want to filter by a specific tag?</h4>
       <input
         type="radio"
         value="none"
         name="filter"
         defaultChecked={true}
         onChange={e => setFilter(e.currentTarget.value)}
       /> None
       <input
         type="radio"
         value="technical"
         name="filter"
         onChange={e => setFilter(e.currentTarget.value)}
       /> Technical
       <input
         type="radio"
         value="soft skills"
         name="filter"
         onChange={e => setFilter(e.currentTarget.value)}
       /> Soft Skills
     </div>
   )
 }

 export default Form;