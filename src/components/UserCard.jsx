import React from 'react';
import { Card, Row, Col, Form, Button } from 'react-bootstrap';
import  '../assets/css/UserCardStyle.css'

const UserCard = ({ user, onUpdateStatus }) => {
  const { id, name,fLastName,sLastName, email, birthday, phone, assignedAnalyst, status, cardInfo } =
    user;

  return (

    <Card className="mb-3">
    <Card.Body className='card'>
      <Row className="align-items-center">
        <Col md={2}>
          <img
            src="default_user_image.png"
            alt="User"
            className="img-fluid rounded-circle"
            style={{ width: '150px' }}
          />
        </Col>
        <Col md={8}>
          <h5 className="card-title">{name + ' ' + fLastName + ' ' + sLastName}</h5>
          <Col md={3}>
          <p>ID: {id}</p>
        </Col>
        </Col>
        <Col md={2}>
          <Form.Group className='form-group right'>
            <Form.Control
                className='form-control'
              as="select"
              value={status}
              onChange={(e) => onUpdateStatus(id, e.target.value)}
            >
              <option value="EN_PROCESO">EN PROCESO</option>
              <option value="APROBADO">APROBADO</option>
              <option value="RECHAZADO">RECHAZADO</option>
            </Form.Control>
          </Form.Group>
        </Col>
        
      </Row>
      
      <Row className="row1 align-items-center">
        <Col md={7} className='col1'>
            <label className='label'>MAIL</label>
          <p> {email}</p>
          <label className='label'>FECHA DE NACIMIENTO</label>
          <p> {birthday}</p>
          <lable className='label'> TELEFONO</lable>
          <p>Teléfono: {phone}</p>
          <label className='label'>ANALISTA ASIGNADO</label>
          <p>{assignedAnalyst}</p>
        </Col>

        <div className="line-vertical"></div>
        

        <Col md={5} className='col2'>
        <div className='container'>
            <label className='label'>FULL NAME</label>
            <p>Full Name: {name + ' ' + fLastName + ' ' + sLastName}</p>
            <label className='label'>FULL NAME</label>    
            <p>Card Number: {cardInfo.number}</p>
            <label className='label'>FULL NAME</label>
            <p>CVV: {cardInfo.cvv}</p>
            <label className='label'>FULL NAME</label>
            <p>PIN: {cardInfo.pin}</p>
            <label className='label'>FULL NAME</label>
            <p>Expiration: {cardInfo.expiration}</p>
        </div>
        </Col>
       
        
         
      </Row>
      <Button md={1} type='submit' className='btn btn-primary right'>EDIT</Button>
      
       
    </Card.Body>
  </Card>
  );
};

export default UserCard;