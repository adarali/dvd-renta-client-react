import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { toast } from 'react-toastify';

const MoviePurchase = (props) => {
    const {
      buttonLabel,
      className,
      movie,
      handleOk,
    } = props;
  
    const [modal, setModal] = useState(false);
    const [purchase, setPurchase] = useState({quantity: 1})
  
    const toggle = () => {setModal(!modal)};
  
    const handlePurchaseClicked = () => {
      handleOk(purchase)
      .then(() => {
        toggle();
        toast.success('Purchase successful');
    })
    .catch((err) => {
        toast.error(err.response.data.message)
    });
    }
  
    return (
      <div>
        <button className="nav-link btn btn-link" color="text-muted" onClick={() => {toggle()}}>{buttonLabel}</button>
        <Modal isOpen={modal} toggle={toggle} className={className}>
          <ModalHeader toggle={toggle}>Purchase movie: {movie.title}</ModalHeader>
          <ModalBody>
              <div className="form-group">
                  <div className="row">
                      <div className="col-12">
                          <label htmlFor="quantity">Quantity</label>
                          <input type="number" id="quantity" className="form-control" min={1} defaultValue={purchase.quantity} onChange={(e) => setPurchase({...purchase, quantity: e.target.value})}/>
                      </div>
                  </div>
                  <div className="row">
                      <div className="col-12">
                          Total: {purchase.quantity * movie.salePrice}
                      </div>
                  </div>
              </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handlePurchaseClicked}>OK</Button>
            <Button color="secondary" onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }

export default MoviePurchase
