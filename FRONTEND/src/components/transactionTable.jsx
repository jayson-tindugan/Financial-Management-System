import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { Form, Button, Container, Modal } from 'react-bootstrap';
import * as Icon from "react-bootstrap-icons";
const TransactionTable = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedRow, setSelectedRow] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8001/transaction/fetchAll');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const formatTransactionDate = (row) => {
    const transactionDate = new Date(row.transactionDate);
    return transactionDate.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  };

  const columns = [
    { name: 'Transaction ID', selector: 'transactionId', sortable: true, minWidth: '90px', grow: 5 },
    { name: 'Date', selector: 'transactionDate', sortable: true, minWidth: '165px', cell: (row) => formatTransactionDate(row) },
    { name: 'Type', selector: 'transactionType', sortable: true },
    { name: 'Amount', selector: 'amount', sortable: true },
    { name: 'Quantity', selector: 'quantity', sortable: true },
    { name: 'Total', selector: 'total', sortable: true },
    { name: 'Particular', selector: 'particular', sortable: true, minWidth: '150px', grow: 5 },
    { name: 'OR No.', selector: 'orNumber', sortable: true },
    { name: 'Remark', selector: 'remark', sortable: true, minWidth: '150px', grow: 5 },
    {
      name: 'Action',
      selector: 'actionModal',
      sortable: false,
      minWidth: '50px',
      grow: 5,
      cell: (row) => (
       <Button variant="link" size="sm" onClick={() => handleOpenModal(row)}>
          <Icon.Pencil /> {/* Bootstrap pencil icon */}
        </Button>
      ),
    },
  ];

  const filteredData = data.filter((row) =>
    columns.some(
      (column) =>
        String(row[column.selector])
          .toLowerCase()
          .includes(searchText.toLowerCase())
    )
  );

  const handleOpenModal = (row) => {
    setSelectedRow(row);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Container className="form-container mt-1 p-3 py-4 rounded-4 container-bg">
      <h4 className="d-flex justify-content-center">Breakdown of Cash Inflows and Outflows</h4>
      <Form.Group controlId="search" className="mb-2">
        <Form.Control
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </Form.Group>
      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        paginationPerPage={5}
        highlightOnHover
        paginationRowsPerPageOptions={[5, 10, 20, 30, 40, 50]}
      />
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>View</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRow && (
            <div>
                <p>Transaction ID: {selectedRow.transactionId}</p>
                <p>Date: {formatTransactionDate(selectedRow)}</p>
                <p>Type: {selectedRow.transactionType}</p>
                <p>Particular: {selectedRow.particular}</p>
                <p>Amount: {selectedRow.amount}</p>
                <p>Quantity: {selectedRow.quantity}</p>
                <p>Total: {selectedRow.total}</p>
                <p>Remark: {selectedRow.remark}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default TransactionTable;
