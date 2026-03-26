import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useExpenses } from "../context/ExpensesContext";
import { useNavigate, useParams } from "react-router-dom";
import { FormGroup } from "react-bootstrap";
import { useState } from "react";

const Content = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    state: { filtered: expenses },
    removeExpenses,
    updateExpenses,
    addToList,
  } = useExpenses();

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedHours = hours.toString().padStart(2, "0");

    return `${day}/${month}/${year}`;
  };

  const [form, setForm] = useState({
    userId: "",
    name: "",
    category: "",
    amount: "",
    date: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [toggleAdd, setToggleAdd] = useState(true);

  const handleSetEdit = () => {
    setToggleAdd(false)
  }


  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.userId || !form.name || !form.category || !form.date) return;

    if (editingId) {
      updateExpenses({
        userId: id,
        name: form.name,
        category: form.category,
        amount: form.amount,
        date: formatDate(form.date),
      });
      setEditingId(null);
      setForm({ userId: " ", name: "", category: "", date: "" });
    } else {
      addToList({
        id: expenses.length,
        name: form.name.trim(),
        category: form.category,
        amount: form.amount,
        date: formatDate(form.date),
      });
      setForm({ name: " ", category: "", amount: "", date: "" });
    }
  };

  const startEdit = (p) => {
    setToggleAdd(false)
    setEditingId(p.id);
    setForm({
      name: p.name,
      category: p.category,
      amount: p.amount,
      date: p.date,
    });
  };

  const expCategory = [
    ...new Set(expenses.map((category) => category.category)),
  ];

  return (
    <Container className="mt-3">
      <Row>
        <Col md={4} className="border">
          <Row>
            <h6>Total of Expenses</h6>
          </Row>
        </Col>
        <Col md={8} className="border">
          <h6>Filter</h6>
          <Form.Label htmlFor="inputPassword5">Category</Form.Label>
          <Dropdown>
            <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
              All category
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {expCategory.map((ec) => (
                <Dropdown.Item>{ec}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>

      <Row>
        <Col md={4} className="border mt-4">
          {toggleAdd ? (
            <>
              <Row>
                <h6>Add Expense</h6>
              </Row>
              <Row>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="" />
                  </Form.Group>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label>Amount</Form.Label>
                        <Form.Control type="text" placeholder="" />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Category</Form.Label>
                        <Dropdown>
                          <Dropdown.Toggle
                            variant="outline-secondary"
                            id="dropdown-basic"
                          >
                            ・dfghjkljhgfdfg
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            {expCategory.map((ec) => (
                              <Dropdown.Item>{ec}</Dropdown.Item>
                            ))}
                          </Dropdown.Menu>
                        </Dropdown>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group>
                    <Form.Label>Amount</Form.Label>
                    <Form.Control type="date" placeholder="" />
                  </Form.Group>

                  <Form.Group className="mt-2 ">
                    <div>
                      <Button variant="secondary">Reset</Button>
                      <Button variant="primary">Save</Button>
                    </div>
                  </Form.Group>
                </Form>
              </Row>{" "}
            </>
          ) : (
            <>
              <Row>
                <h6>Edit Expense</h6>
              </Row>
              <Row>
                <Form onSubmit={onSubmit}>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Name</Form.Label>
                    <Form.Control name="name" onChange={onChange} type="text" placeholder="" value={form.name}/>
                  </Form.Group>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label>Amount</Form.Label>
                        <Form.Control name="amount" onChange={onChange} type="text" placeholder="" value={form.amount}/>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Category</Form.Label>
                        <Dropdown>
                          <Dropdown.Toggle
                            variant="outline-secondary"
                            id="dropdown-basic"
                            name={form.category}
                            onChange={onChange}
                          >
                            {form.category}
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            {expCategory.map((ec) => (
                              <Dropdown.Item name={form.category} onChange={onChange}>{ec}</Dropdown.Item>
                            ))}
                          </Dropdown.Menu>
                        </Dropdown>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group>
                    <Form.Label>Date</Form.Label>
                    <Form.Control onChange={onChange} name="date" type="date" placeholder="" value={form.date} />
                  </Form.Group>

                  <Form.Group className="mt-2 ">
                    <div>
                      <Button variant="secondary">Reset</Button>
                      <Button variant="primary" type="submit">Save</Button>
                    </div>
                  </Form.Group>
                </Form>
              </Row>
            </>
          )}
        </Col>
        <Col md={8}>
          <Row>
            <h6>Expensise Management</h6>
          </Row>
          <Row>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Amount</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((ex) => (
                  <tr>
                    <td>{ex.name}</td>
                    <td>{ex.amount}</td>
                    <td>{ex.category}</td>
                    <td>
                      <Button variant="warning" onClick={() => startEdit(ex)}>Edit</Button>
                      <Button
                        variant="danger"
                        onClick={() => removeExpenses(ex.id)}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Content;
