import React from 'react';
import { Container, Spinner } from 'react-bootstrap';

const Loader = ({ message = 'Loading...' }) => {
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
      <div className="text-center">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3 text-muted">{message}</p>
      </div>
    </Container>
  );
};

export default Loader;