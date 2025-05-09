import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import '../.././styling/LiquorBottle'
const LCForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    ABV: 45,
    typeLiquor: "",
    amountLeft: 100.0,
    date: "2025-03-12",
    notes: "",
    image: null, // To store the actual image file
  });

  const [preview, setPreview] = useState("");

  useEffect(() => {
    setPreview(formData.image ? URL.createObjectURL(formData.image) : "");
  }, [formData.image]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "ABV" || name === "amountLeft" ? parseFloat(value) || 0 : value,
    }));
  };

  //  Image Upload: Updates state and sets preview
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file)); // Show preview immediately
      setFormData((prevData) => ({
        ...prevData,
        image: file, // Store the actual file
      }));
    }
  };

  // Post Form Data with FormData object to handle file uploads
  const postForm = () => {
    const formToSend = new FormData();
    // Append form data
    Object.keys(formData).forEach((key) => {
      if (key !== "image") {
        formToSend.append(key, formData[key]);
      }
    });

    if (formData.image) {
      formToSend.append("image", formData.image); // Add image file to form data
    }

    axios.post("/api/liquor", formToSend)
      .then((response) => {
        console.log("Success:", response.data);
        navigate("/liquor");
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postForm();
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <Row className="w-100 justify-content-center">
        <Col xs={12} md={4} lg={4}> {/* This sets the column to take up 4/12 of the width */}
          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            <h2 className="text-center mb-4">Bottle Information</h2>

            {/* Form Fields in One Column */}
            <Form.Group className="mb-3" controlId="formGroupName">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter the name of the bottle"
                size="md" // Smaller input
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupBrand">
              <Form.Label>Brand:</Form.Label>
              <Form.Control
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                required
                placeholder="Enter the brand"
                size="md" // Smaller input
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupABV">
              <Form.Label>ABV (%):</Form.Label>
              <Form.Control
                type="number"
                name="ABV"
                value={formData.ABV}
                onChange={handleChange}
                step="0.1"
                placeholder="Enter the ABV percentage"
                size="md" // Smaller input
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupImage">
              <Form.Label>Upload Image:</Form.Label>
              <Form.Control
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageUpload}
                size="md" // Smaller input
              />
            </Form.Group>
            {/* Image Preview */}
            {preview && (
              <div className='imagePreview'>
                <img src={preview} alt="Preview" className='img' />
              </div>
            )}
            <Form.Group className="mb-3" controlId="formGroupTypeLiquor">
              <Form.Label>Type of Liquor:</Form.Label>
              <Form.Control
                type="text"
                name="typeLiquor"
                value={formData.typeLiquor}
                onChange={handleChange}
                required
                placeholder="Enter the type of liquor"
                size="md"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupAmountLeft">
              <Form.Label>Amount Left (%):</Form.Label>
              <Form.Control
                type="number"
                name="amountLeft"
                value={formData.amountLeft}
                onChange={handleChange}
                step="0.1"
                required
                placeholder="Enter the amount left in percentage"
                size="md"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupDate">
              <Form.Label>Date Acquired:</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                size="md"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupNotes">
              <Form.Label>Notes:</Form.Label>
              <Form.Control
                as="textarea"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                placeholder="Enter any notes here..."
                size="md"
              />
            </Form.Group>



            {/* Submit Button */}
            <Button block='true' bsPrefix='button' type="submit" >
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );

}





export default LCForm;
