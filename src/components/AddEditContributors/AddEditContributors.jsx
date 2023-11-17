import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import s from "./AddEditContributor.module.scss";
import { createContributor, editContributor } from '../../store/features/products';
import Inputs from '../common/Inputs/Inputs';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';


function AddEditContributor({ closeMoadalForEdit, closeModalForAdd }) {

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
} = useForm();

  const dispatch = useDispatch()
  
  const isEditContributor = useSelector((state) => state?.products?.isEditContributor);
  const isAddContributor = useSelector((state)=> state?.products?.isAddContributor);
  const selectedContributor = useSelector((state) => state.products.selectedContributor);

  useEffect(() => {
    if (selectedContributor && !isAddContributor) {
        setValue('contributorName', selectedContributor.contributor_name);
        setValue('contributorEmail', selectedContributor.email_id);
    }
    
}, [selectedContributor, setValue]);


  const onSubmit =(data) => {
    if (isAddContributor) {
      dispatch(createContributor({contName: data?.contributorName, contEmail: data.contributorEmail}))
    }
    else {
      dispatch(editContributor({contName: data?.contributorName, contEmail: data.contributorEmail}))
    }
  }

  const handleClose = () => {
    closeMoadalForEdit();
    closeModalForAdd();
  };

  return (
    <>
      <Modal show={isEditContributor || isAddContributor} onHide={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header closeButton>
          <Modal.Title>{isAddContributor ? "Add Contributor" : "Edit Contributor"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
            <div className={s.contributorItem}>
              <label>Contributor Name</label>
              <Inputs
                    register={register}
                    inputClassName={s.input}
                    name="contributorName"
                    autofocus
                    placeholder="Enter contributor name"
                    validation={{ required: true, pattern: /\S/ }}
                    showError={errors.contributorName}
                    error={"Required"}
                />
            </div>
            <div className={s.contributorItem}>
              <label>Email ID</label>
              <Inputs
                    register={register}
                    inputClassName={s.input}
                    name="contributorEmail"
                    autofocus
                    placeholder="Enter contributor email"
                    validation={{ required: true, pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ }}
                    showError={errors.contributorEmail}
                    error={"Required"}
                />
            </div>
         
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" type="submit">
            Save
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
        </form>
      </Modal>
      
    </>
  );
}

export default AddEditContributor;
