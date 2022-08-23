import React, { useState } from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
Modal.setAppElement("#root");

const CalendarMOdal = () => {
  const [isOpen, setIsOpen] = useState(true);
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Modal
      isOpen={isOpen}
      // onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      closeTimeoutMS={200}
      //animacion  para retardar el cierre
      className="modal"
      overlayClassName="modal-fondo"
    >
      <h1>Hola a todos!</h1>
      <hr />
      <span>Hola putic!</span>
    </Modal>
  );
};

export default CalendarMOdal;
