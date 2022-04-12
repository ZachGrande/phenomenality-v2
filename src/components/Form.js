import { useState } from 'react';
import { ref, update } from 'firebase/database';
import { map } from '@firebase/util';
import { withContext as ReactTags } from "react-tag-input";

function Form(props) {

  const items = props.items;
  const setItems = props.setItems;
  const database = props.database;
  const user = props.user;
  const setFilter = props.setFilter;

  const [accomplishment, setAccomplishment] = useState("");
  const [status, setStatus] = useState("success");
  const [tags, setTags] = useState([]);

  const [searchTags, setSearchTags] = useState([]);
  const KeyCodes = {
    comma: 188,
    enter: 13
  };
  const delimiters = [KeyCodes.comma, KeyCodes.enter];
  const handleDelete = i => {
    setSearchTags(searchTags.filter((tag, index) => index !== i));
  };
  const handleAddition = (tag) => {
    setSearchTags([...searchTags, tag]);
  };
  const handleTagClick = index => {
    console.log('The tag at index ' + index + ' was clicked');
  };
  const onClearAll = () => {
    setSearchTags([]);
  };
  const onTagUpdate = (i, newTag) => {
    const updatedSearchTags = searchTags.slice();
    updatedSearchTags.splice(i, 1, newTag);
    setSearchTags(updatedSearchTags);
  };

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

    console.log(tags) //tags spits out array based on order on selection of tag
    
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
       <br />
       <div>
       <ReactTags
          handleDelete={handleDelete}
          handleAddition={handleAddition}
          delimiters={delimiters}
          handleTagClick={handleTagClick}
          onClearAll={onClearAll}
          onTagUpdate={onTagUpdate}
          placeholder="Search..."
          tags={searchTags}
        />
        </div>
     </div>
   )
 }

 export default Form;