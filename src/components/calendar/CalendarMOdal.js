import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import DateTimePicker from "react-datetime-picker";
import moment from "moment";
import Swal from "sweetalert2";
import { uiCloseModal } from "../../actions/ui";
import {
  eventClearActiveEvent,
  eventStartAddNew,
  eventStartUpdate,
  eventUpdated,
} from "../../actions/events";

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

const now = moment().minutes(0).seconds(0).add(1, "hours");
const nowPlus = moment().minutes(0).seconds(0).add(2, "hours");

const initEvent = {
  title: "",
  notes: "",
  start: now.toDate(),
  end: nowPlus.toDate(),
};

const CalendarMOdal = () => {
  const dispatch = useDispatch();
  const { modalOpen } = useSelector((state) => state.ui);
  const { activeEvents } = useSelector((state) => state.calendar);

  const [dateStart, setDateStart] = useState(now.toDate());
  const [dateEnd, setDateEnd] = useState(nowPlus.toDate());

  const [titleValid, setTitleValid] = useState(true);

  const [formValues, setFormValues] = useState(initEvent);

  const { title, notes, start, end } = formValues;

  useEffect(() => {
    if (activeEvents !== null) {
      setFormValues(activeEvents);
    } else {
      setFormValues(initEvent);
    }
  }, [activeEvents]);

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const closeModal = () => {
    dispatch(uiCloseModal());
    dispatch(eventClearActiveEvent());
    setFormValues(initEvent);
  };

  const handleStartDateChange = (e) => {
    setDateStart(e);
    setFormValues({
      ...formValues,
      start: e,
    });
  };
  const handleEndDateChange = (e) => {
    setDateEnd(e);
    setFormValues({
      ...formValues,
      end: e,
    });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const momentStart = moment(start);
    const momentEnd = moment(end);
    if (momentStart.isSameOrAfter(momentEnd)) {
      // la fecha de fin debe ser mayor q la de inicio
      return Swal.fire({
        title: "Error!",
        text: "La fecha fin debe ser mayor a la fecha de inicio",
        icon: "error",
        confirmButtonText: "Arreglar",
      });
    }
    if (title.trim().length < 2) {
      return setTitleValid(false);
    }
    if (activeEvents) {
      dispatch(eventStartUpdate(formValues));
    } else {
      dispatch(eventStartAddNew(formValues));
    }
    setTitleValid(true);
    closeModal();
  };

  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={closeModal}
      style={customStyles}
      closeTimeoutMS={200}
      //animacion  para retardar el cierre
      className="modal"
      overlayClassName="modal-fondo"
    >
      <h1>{activeEvents ? "Editar Evento" : " Nuevo Evento "}</h1>
      <hr />
      <form className="container" onSubmit={handleSubmitForm}>
        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
          <DateTimePicker
            onChange={handleStartDateChange}
            value={dateStart}
            className="form-control"
          />
        </div>

        <div className="form-group mb-2">
          <label>Fecha y hora fin</label>
          <DateTimePicker
            onChange={handleEndDateChange}
            value={dateEnd}
            minDate={dateStart}
            className="form-control"
          />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${!titleValid && "is-invalid"}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={title}
            onChange={handleInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group mb-2">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={notes}
            onChange={handleInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};

export default CalendarMOdal;
