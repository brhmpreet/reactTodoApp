import { useReducer, useState } from 'react'
import './App.css'

function reducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [...state, action.payload];
    case 'DELETE':
      return state.filter((ele) => ele.id != action.payload.id);
    case 'UPDATE':
      return state.map((ele) => {
        if (ele.id == action.payload.id) {
          return {...ele, title: action.payload.title};
        } else {
          return ele;
        }
      });
    case 'TOGGLEDONE':
      return state.map((ele) => {
        if (ele.id == action.payload.id) {
          return { ...ele, isDone: !ele.isDone };
        } else {
          return ele;
        }
      })
    case 'TOGGLEEDIT':
      return state.map((ele) => {
        if (ele.id == action.payload.id) {
          return { ...ele, isEdit: !ele.isEdit };
        } else {
          return ele;
        }
      })
    default:
      return state;
  }
}
const initialState = [];
let nextItemId = 1;

function App() {

  const [state, dispatch] = useReducer(reducer, initialState);
  const [name, setName] = useState('');
  function handleAdd() {
    let payload = {
      type: 'ADD',
      payload: {
        id: nextItemId,
        title: name,
        isDone: false,
        isEdit: false
      }
    }
    nextItemId += 1;
    dispatch(payload);
  }
  function handleIsDone(id) {
    let payload = {
      type: 'TOGGLEDONE',
      payload: {
        id: id
      }
    }
    dispatch(payload);
  }
  function handleDelete(id) {
    let payload = {
      type: 'DELETE',
      payload: {
        id: id
      }
    }
    dispatch(payload);
  }
  function handleEdit(id) {
    let payload = {
      type: 'TOGGLEEDIT',
      payload: {
        id: id
      }
    }
    dispatch(payload);
  }
  function handleUpdate(id,title){
    let payload = {
      type: 'UPDATE',
      payload:{
        id:id,
        title:title
      }
    }
    dispatch(payload);
  }
  return (
    <div>
      <div>
        <h1>TODO List</h1>
        <input type='text' onChange={(e) => setName(e.target.value)} />
        <button onClick={handleAdd}>Add</button>
        <div>
          {
            state.map((ele) => {
              return <div key={ele.id}>
              {(!ele.isEdit)?<div>
                <span style={(ele.isDone) ? { textDecoration: 'line-through' } : {}}>{ele.title}</span> <input onChange={() => handleIsDone(ele.id)} type='checkbox' value={ele.isDone} /> <button onClick={() => handleEdit(ele.id)}>Edit</button> <button onClick={() => handleDelete(ele.id)}>Delete</button>
              </div>:
              <div>
                <input onChange={(e)=>{handleUpdate(ele.id,e.target.value)}} value={ele.title}></input> <button onClick={()=>handleEdit(ele.id)}>Save</button>
              </div>
              }
              
              </div>
            })
          }
        </div>
      </div>
    </div>
  )
}

export default App
