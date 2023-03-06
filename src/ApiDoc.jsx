import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

function ApiDoc() {
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("get");
  const [params, setParams] = useState("");
  const [token, setToken] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const headers =
        method === "get"
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {};
      const res =
        method === "get"
          ? await axios.get(url, { headers })
          : await axios.post(url, JSON.parse(params), { headers });
      setResponse(JSON.stringify(res.data, null, 2));
    } catch (error) {
      setResponse(JSON.stringify(error.message, null, 2));
    }
  };

  return (
    <Container className="my-5">
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <h1 className="text-center mb-4">Documentador de APITecNL</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="https://ejemplo.com/api"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Método</Form.Label>
              <Form.Control
                as="select"
                value={method}
                onChange={(e) => setMethod(e.target.value)}
              >
                <option value="get">GET</option>
                <option value="post">POST</option>
              </Form.Control>
            </Form.Group>
            {method === "get" && (
              <Form.Group>
                <Form.Label>Token de acceso</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ingresa tu token de acceso"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                />
              </Form.Group>
            )}
            {method === "post" && (
              <Form.Group>
                <Form.Label>Parámetros</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Ingresa los parámetros para la solicitud POST en formato JSON"
                  value={params}
                  onChange={(e) => setParams(e.target.value)}
                />
              </Form.Group>
            )}
            <Button variant="primary" type="submit">
              Enviar solicitud
            </Button>
          </Form>
        </Col>
        <Col md={{ span: 8, offset: 2 }} className="mt-5">
          {response && (
            <pre>
              <code>{response}</code>
            </pre>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default ApiDoc;
