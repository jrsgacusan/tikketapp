import React, { useRef, useState } from 'react';
import { Card, Form, Button, Container, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const Signin = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setloading] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();
  const { signIn } = useAuth();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setErrorMessage('');
      setloading(true);
      await signIn(emailRef.current.value, passwordRef.current.value);
      history.push('/unsettled');
    } catch (e) {
      setErrorMessage(e.message);
    }
    setloading(false);
  };

  return (
    <Container
      className="d-flex align-items center justify-content-center"
      style={{ minHeight: '100vh' }}
    >
      <div className="w-100" style={{ maxWidth: '400px', marginTop: '20px' }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-3">Log in</h2>
            {errorMessage !== '' && (
              <Alert variant="danger">{errorMessage}</Alert>
            )}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  required
                  ref={emailRef}
                ></Form.Control>
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  required
                  ref={passwordRef}
                ></Form.Control>
              </Form.Group>
              <Button
                disabled={loading}
                type="submit"
                className="w-100"
                style={{ marginTop: '10px' }}
              >
                Log In
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Create an account{' '}
          <Link style={{ textDecoration: 'none' }} to="/sign-up">
            here
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default Signin;
