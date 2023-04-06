import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [validationError, setValidationError] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    try {
      const response = await axios
        .post(`http://127.0.0.1:8000/api/login`, formData)
        .catch(({ response }) => {
          const data = response.json();
          if (response.status === 422) {
            setValidationError(response.data.errors);
          }
        });

      if (data.status === "success") {
        // console.log("Login successful");
        // console.log(data.authorisation.token);

        localStorage.setItem("token", data.authorisation.token);
        // window.location.href = "/";
        navigate("/", { replace: true });
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h3>Login</h3>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Adresse email</Form.Label>
        <Form.Control
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Mot de passe</Form.Label>
        <Form.Control
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Button
        className="btn-2 mt-2 btn-sm"
        size="lg"
        block="block"
        type="submit"
      >
        Login
      </Button>
    </Form>
  );
};

export default Login;
