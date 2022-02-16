import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import DateTimePicker from "react-datetime-picker";
import moment from "moment";
import Swal from "sweetalert2";
import { addNewEventAction, closeModalAction, EventUpdatedAction } from "../../actions/actions";
import {
  isAValidEndDate,
  validateTitle,
} from "../../utils/event-form-validator";
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

const defaultStartDate = moment().minutes(0).seconds(0);
const defaultEndDate = defaultStartDate.clone().add(1, "hours");
const defaultEvent = {
  title: "",
  notes: "",
  start: defaultStartDate.toDate(),
  end: defaultEndDate.toDate(),
}

export const CalendarModal = () => {

  /* Redux State Management */
  const modalOpen = useSelector((state) => state.ui.modalOpen); //get app state from redux's store
  const {selected, slot} = useSelector((state) => state.calendar);
  const dispatch = useDispatch(); //get redux-dispatch function

  const [startDate, setStartDate] = useState(defaultStartDate.toDate());
  const [endDate, setEndDate] = useState(defaultEndDate.toDate());
  const [isAValidTitle, setIsAValidTitle] = useState(true);

  /* Form Values */
  const [formValues, setFormValues] = useState(defaultEvent);
  const { title, notes, start, end } = formValues;

  /* useEffect Hook pending for eventSelected state */
  useEffect(() => {
    if (selected){
      setStartDate(selected.start);
      setEndDate(selected.end);
      setFormValues(selected);
    }
    else {
      setStartDate(defaultStartDate.toDate());
      setEndDate(defaultEndDate.toDate());
      setFormValues(defaultEvent);
    }
  }, [selected, setFormValues])

  
  useEffect(() => {
    if (slot){
      setStartDate(slot.start);
      setEndDate(slot.start);
      setFormValues({
        ...formValues,
        start: slot.start,
        end:slot.end,
      })
    }
  }, [slot])
  


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
    
    if (!isAValidEndDate(start, end)) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "La fecha y hora fin debe de ser mayor a la fecha y hora de inicio!",
      });
    }

    if (!validateTitle(title)) {
      return setIsAValidTitle(false);
    }

    if (modalOpen) {
      dispatch(EventUpdatedAction(formValues))
    }
    else {
      dispatch(
        addNewEventAction({
          ...formValues,
          id: new Date(),
          user: {
            id: "oandnbf56s0jk498685jhn",
            name: "user1",
          },
        })
      );
    }

    
    setIsAValidTitle(true);
    closeModal();
  };

  function closeModal() {
    dispatch(closeModalAction);
    /* Reset Form's values */
    setStartDate(defaultStartDate.toDate());
    setEndDate(defaultEndDate.toDate());
    setFormValues(defaultEvent);
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
      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        closeTimeoutMS={200}
        contentLabel="Example Modal"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h1> {`${selected ? "Editar evento":"Nuevo evento"}`} </h1>
        <hr />
        <form className="container" onSubmit={formSubmitHandler}>
          <div className="form-group">
            <label>Fecha y hora inicio</label>
            <DateTimePicker
              onChange={onChangeStartDate}
              value={startDate}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Fecha y hora fin</label>
            <DateTimePicker
              onChange={onChangeEndDate}
              value={endDate}
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
