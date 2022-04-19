import { useState } from 'react';
import { ref, update } from 'firebase/database';
import { map } from '@firebase/util';
import '../css/Form.css'


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

    console.log(accomplishmentTags) //tags spits out array based on order on selection of tag
    
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

  return (
     <div className = "padding">
       {/* <p>Bank Page</p> */}
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
       {/* <input
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
       <br></br> */}
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
     </div>
   );
}


 export default Form;