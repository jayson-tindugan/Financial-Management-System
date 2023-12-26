import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import '../assets/css/global.css';
const TransactionForm = () => {
  const [transactionType, setTransactionType] = useState('');
  const [allocationType, setAllocationType] = useState('');
  const [particular, setParticular] = useState('');
  const [orNumber, setOrNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [quantity, setQuantity] = useState('');
  const [total, setTotal] = useState('');
  const [remark, setRemark] = useState('');

  const toggleFields = () => {
    setParticular('');
    setOrNumber('');
  };

  const updateTotal = () => {
    const amountValue = parseFloat(amount) || 0;
    const quantityValue = parseFloat(quantity) || 0;
    const totalValue = amountValue * quantityValue;
    setTotal(totalValue.toFixed(2));
  };

  useEffect(() => {
    updateTotal();
  }, [amount, quantity]);

  const handleAmountChange = (e) => {
    const inputValue = e.target.value;
    if (/^\d*\.?\d{0,2}$/.test(inputValue)) {
      setAmount(inputValue);
    }
  };

  const handleQuantityChange = (e) => {
    const inputValue = e.target.value;
    if (/^\d*$/.test(inputValue)) {
      setQuantity(inputValue);
    }
  };

  const clearForm = () => {
    setTransactionType('');
    setAllocationType('');
    toggleFields();
    setAmount('');
    setQuantity('');
    setTotal('');
    setRemark('');
  };

  const submitForm = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    alert('Form submitted!');
  };

  return (
    <Container className="form-container mt-1 p-4 rounded-4 container-bg">
      <h4 className='d-flex justify-content-center mb-3'>Transaction Form</h4>
      <Form onSubmit={submitForm}>
        <Row className="mb-3">
          <Col sm={6}>
            <Form.Label>Transaction Type:</Form.Label>
            <Form.Select value={transactionType} onChange={(e) => { setTransactionType(e.target.value); toggleFields(); }}>
              <option value="" disabled>Select..</option>
              <option value="Inflow">Inflow</option>
              <option value="Outflow">Outflow</option>
            </Form.Select>
          </Col>
          <Col sm={6}>
            <Form.Label>Allocation Type:</Form.Label>
            <Form.Select value={allocationType} onChange={(e) => setAllocationType(e.target.value)}>
              <option value="" disabled>Select..</option>
              <option value="Collection">Collection</option>
              <option value="IGP">IGP</option>
              <option value="Donation">Donation</option>
            </Form.Select>
          </Col>
        </Row>

        {transactionType === 'Outflow' && (
          <>
            <Row className="mb-3">
              <Col sm={6}>
                <Form.Label>Particular:</Form.Label>
                <Form.Select value={particular} onChange={(e) => setParticular(e.target.value)} required>
                  <option value="" disabled>Select..</option>
                  <option value="Food Expense">Food Expense</option>
                  <option value="Supplies Expense">Supplies Expense</option>
                  {/* Add other options for Outflow */}
                </Form.Select>
              </Col>
              <Col sm={6}>
                <Form.Label>OR No.:</Form.Label>
                <Form.Control type="text" id="orNumber" value={orNumber} onChange={(e) => setOrNumber(e.target.value)} required />
              </Col>
            </Row>
          </>
        )}

        <Row className="mb-3">
          <Col sm={6}>
            <Form.Label>Amount:</Form.Label>
            <Form.Control type="text" id="amount" value={amount} pattern="^\d+(\.\d{1,2})?$" required onChange={handleAmountChange} />
          </Col>
          <Col sm={6}>
            <Form.Label>Quantity:</Form.Label>
            <Form.Control type="text" id="quantity" value={quantity} pattern="^\d+$" onChange={handleQuantityChange} />
          </Col>
        </Row>

        <Row className="mb-3"w>
          <Col sm={6}>
            <Form.Label>Total:</Form.Label>
            <Form.Control type="text" id="total" value={total} readOnly />
          </Col>
        </Row>

        <Row  className="mb-3">
          <Col sm={12}>
            <Form.Label>Remark:</Form.Label>
            <Form.Control as="textarea" id="remark" value={remark} onChange={(e) => setRemark(e.target.value)} required />
          </Col>
        </Row>

        <Row className="mt-2">
          <Col sm={12} className='d-flex justify-content-end'>
            <div>
              <Button className="mx-2" variant="secondary" onClick={clearForm}>Clear</Button>
              <Button variant="success" className='button-bg' type="submit">Submit</Button>
            </div>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default TransactionForm;
