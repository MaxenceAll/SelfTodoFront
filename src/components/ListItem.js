import TickIcon from './TickIcon'
import ProgressBar from './ProgressBar'
import { useState } from 'react';
import Modal from './Modal';

function ListItem({task , getData}) {

    const [showModal, setShowModal] = useState(null);

  function handleEditClick(){
    setShowModal(true);
  }

  
  async function handleDeleteClick() {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`, {
          method: "DELETE",
          headers: {'Content-Type': 'application/json'},
        })
        if (response.status === 200) {
          console.log("Deleted !")
          setShowModal(false);
          getData();
        }
      } catch (error) {
        console.error(error)
      }
    }

    return (
      <li className="list-item">

        <div className="info-container">
          <TickIcon />          
          <p className="task-title">{task.title}</p>
          <ProgressBar progress={task.progress} />
        </div>

        <div className='button-container'>
        <button className="edit" onClick={ handleEditClick }>EDIT</button>
        <button className='delete' onClick={ handleDeleteClick }>DELETE</button>

        </div>

        {showModal && <Modal getData={getData} task={task} mode={'edit'} setShowModal={setShowModal}/>}

      </li>
    )
  }
  
  export default ListItem;
  