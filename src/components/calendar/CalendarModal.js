import React, { useState } from "react";
import Modal from "react-modal";
import DateTimePicker from "react-datetime-picker";
import moment from "moment";
import Swal from "sweetalert2";
import { isAValidEndDate, validateTitle } from "../../utils/event-form-validator";
import "./CalendarModal.css";

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

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

const defaultStartDate = moment().minutes(0).seconds(0).add(1, "hours");
const defaultEndDate = defaultStartDate.clone().add(1, "hours");

export const CalendarModal = () => {
  const [startDate, setStartDate] = useState(defaultStartDate.toDate());
  const [endDate, setEndDate] = useState(defaultEndDate.toDate());
  const [isAValidTitle, setIsAValidTitle] = useState(true);
  /* Default Form Values */
  const [formValues, setFormValues] = useState({
    title: "Evento",
    notes: "",
    start: startDate,
    end: endDate,
  });
  const { title, notes, start, end } = formValues;

  /* Handle Form's Inputs */
  const formInputChangeHandler = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  /* Handle Form submit */
  const formSubmitHandler = (e) => {
    e.preventDefault();
    console.log(formValues);
    if (!isAValidEndDate(start, end))
    {
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'La fecha y hora fin debe de ser mayor a la fecha y hora de inicio!'
      });
    }

    if (!validateTitle(title))
    {
      return setIsAValidTitle(false);
    }
    /* TODO : SAVE DATA TO DB*/
    setIsAValidTitle(true);
    closeModal();
  };

  function openModal() {
    // setIsOpen(true);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  }

  function closeModal() {
    // setIsOpen(false);
  }

  const onChangeStartDate = (e) => {
    setStartDate(e);
    setFormValues({
      ...formValues,
      start: e,
    });
  };

  const onChangeEndDate = (e) => {
    setEndDate(e);
    setFormValues({
      ...formValues,
      end: e,
    });
  };

  return (
    <div>
      {/* <button onClick={openModal}>Open Modal</button> */}
      <Modal
        isOpen={true}
        // onAfterOpen={afterOpenModal}
        // onRequestClose={closeModal}
        style={customStyles}
        closeTimeoutMS={200}
        contentLabel="Example Modal"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h1> Nuevo evento </h1>
        <hr />
        <form className="container" onSubmit={formSubmitHandler}>
          <div className="form-group">
            <label>Fecha y hora inicio</label>
            {/* <input className="form-control" placeholder="Fecha inicio" /> */}
            <DateTimePicker
              onChange={onChangeStartDate}
              value={startDate}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Fecha y hora fin</label>
            {/* <input className="form-control" placeholder="Fecha inicio" /> */}
            <DateTimePicker
              onChange={onChangeEndDate}
              value={endDate}
              minDate={startDate}
              className="form-control"
            />
          </div>

          <hr />
          <div className="form-group">
            <label>Titulo y notas</label>
            <input
              type="text"
              className={`form-control ${!isAValidTitle && "is-invalid"}`}
              placeholder="Título del evento"
              name="title"
              autoComplete="off"
              value={title}
              onChange={formInputChangeHandler}
            />
            <small id="emailHelp" className="form-text text-muted">
              Una descripción corta
            </small>
          </div>

          <div className="form-group">
            <textarea
              type="text"
              className="form-control"
              placeholder="Notas"
              rows="5"
              name="notes"
              value={notes}
              onChange={formInputChangeHandler}
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
    </div>
  );
};
