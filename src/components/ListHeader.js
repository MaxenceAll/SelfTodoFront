import { useState } from "react";
import Modal from "./Modal";
import { useCookies } from "react-cookie";

function ListHeader({ listName , getData}) {

  const [showModal, setShowModal] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(null);

  function signOut() {
    removeCookie('Email');
    removeCookie('AuthToken')
    window.location.reload();
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
