import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { toast } from 'react-toastify';

const MovieRent = (props) => {
  const {
    buttonLabel,
    className,
    movie,
    handleOk,
  } = props;

  const [modal, setModal] = useState(false);
  const [rent, setRent] = useState({rentDays: 1, quantity: 1})

  const toggle = () => {setModal(!modal)};

  const handleRentClicked = () => {
    handleOk(rent)
    .then(() => {
        toggle();
        toast.success('Rent successful');
    })
    .catch((err) => {
        toast.error(err.response.data.message)
    });
  }

  return (
    <div>
      <button className="nav-link btn btn-link" color="text-muted" onClick={() => {toggle()}}>{buttonLabel}</button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Rent movie: {movie.title}</ModalHeader>
        <ModalBody>
            <div className="form-group">
                <div className="row">
                    <div className="col-12">
                        <label htmlFor="rent-days">Days</label>
                        <input type="number" id="rent-days" className="form-control" min={1} defaultValue={rent.rentDays} onChange={(e) => setRent({...rent, rentDays: e.target.value})}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <label htmlFor="quantity">Quantity</label>
                        <input type="number" id="quantity" className="form-control" min={1} defaultValue={rent.quantity} onChange={(e) => setRent({...rent, quantity: e.target.value})}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        Total: {rent.rentDays * rent.quantity * movie.rentalPrice}
                    </div>
                </div>
            </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleRentClicked}>OK</Button>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default MovieRent;

