import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import { usePatient } from "../context/PatientContext";
import { useState } from "react";

const PatientList = () => {
  const {
    state: { patients, loading, error, query },
    dispatch,
    removePatient,
    addToList,
    updatePatient,
  } = usePatient();

  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    address: "",
  });

  const [editingId, setEditingId] = useState(null);
  //   const [editForm, setEditingForm] = useState({name: "", age: "", gender: "", address: ""})

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.age || !form.gender || !form.address) return;

    if (editingId) {
      updatePatient({
        id: editingId,
        name: form.name,
        age: Number(form.age),
        gender: form.gender,
        address: form.address,
      });
      setEditingId(null);
      setForm({ name: " ", age: "", gender: "", address: "" });
    } else {
      addToList({
        id: patients.length,
        name: form.name.trim(),
        age: Number(form.age),
        gender: form.gender,
        address: form.address.trim(),
      });
      setForm({ name: " ", age: "", gender: "", address: "" });
    }
  };

  const startEdit = (p) => {
    setEditingId(p.id);
    setForm({ name: p.name, age: p.age, gender: p.gender, address: p.address });
  };

  //   const onEditChange = (e) => {
  //     const { name, value } = e.target;
  //     setForm((f) => ({ ...f, [name]: value }));
  //   };

  //   const saveEdit = () => {
  //     updatePatient({
  //       id: editingId,
  //       name: form.name.trim(),
  //       age: Number(form.gender),
  //       address: form.address.trim(),
  //     });
  //     setEditingId(null);
  //   };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ name: " ", age: "", gender: "", address: "" });
  };

  return (
    <>
      <h1>Patient Management</h1>
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            value={form.name}
            onChange={onChange}
            type=""
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Age</Form.Label>
          <Form.Control
            name="age"
            value={form.age}
            onChange={onChange}
            type=""
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Gender</Form.Label>
          <Form.Control
            name="gender"
            value={form.gender}
            onChange={onChange}
            type=""
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Address</Form.Label>
          <Form.Control
            name="address"
            value={form.address}
            onChange={onChange}
            type=""
            placeholder="Enter email"
          />
        </Form.Group>

          <div className="d-flex gap-2">
            <Button variant="primary" type="submit">
              {editingId ? "Save changes" : "Add Patient"}
            </Button>
            {editingId && (
              <Button variant="secondary" type="button" onClick={cancelEdit}>
                Cancel
              </Button>
            )}
          </div>
      </Form>
      {loading && <div>Loading...</div>}
      {error && <div className="text-danger">{error}</div>}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {patients.length !== 0 ? (
            patients.map((p) => (
              <tr>
                <td>{p.name}</td>
                <td>{p.age}</td>
                <td>{p.gender}</td>
                <td>{p.address}</td>
                <td>
                  <div className="d-flex gap-1">
                    <Button
                      onClick={() => startEdit(p)}
                      variant="warning"
                      size="sm"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => removePatient(p.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <div>Nothing to display</div>
          )}
        </tbody>
      </Table>
    </>
  );
};
export default PatientList;
