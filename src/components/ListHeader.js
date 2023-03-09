import { useState } from "react";
import Modal from "./Modal";

function ListHeader({ listName , getData}) {

  const [showModal, setShowModal] = useState(null);

  function signOut() {
    alert("Clicked Sign out !");
  }


  return (
    <div className="list-header">
      <h1>{listName}</h1>
      <div className="button-container">
        <button className="create" onClick={()=>setShowModal(true)}>Add New</button>

        <button className="signout" onClick={signOut}>
          Sign out
        </button>
      </div>
      {showModal && <Modal getData={getData} mode={'create'} setShowModal={setShowModal}/>}
    </div>
  );
}

export default ListHeader;
