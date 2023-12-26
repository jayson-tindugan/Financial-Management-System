import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { Form, Button, Container } from 'react-bootstrap';

const TransactionTable = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');

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
    { name: 'Transaction ID', selector: 'transactionId', sortable: true , minWidth: '90px' , grow: 5},
    { name: 'Date', selector: 'transactionDate', sortable: true, minWidth: '165px', cell: (row) => formatTransactionDate(row), },
    { name: 'Type', selector: 'transactionType', sortable: true },
    { name: 'Amount', selector: 'amount', sortable: true },
    { name: 'Quantity', selector: 'quantity', sortable: true },
    { name: 'Total', selector: 'total', sortable: true },
    { name: 'Particular', selector: 'particular', sortable: true , minWidth: '150px' , grow: 5},
    { name: 'OR No.', selector: 'orNumber', sortable: true },
    { name: 'Remark', selector: 'remark', sortable: true , minWidth: '150px' , grow: 5},
  ];

  const filteredData = data.filter((row) =>
    columns.some(
      (column) =>
        String(row[column.selector])
          .toLowerCase()
          .includes(searchText.toLowerCase())
    )
  );

  return (
    <Container className="form-container mt-1 p-3 py-4 rounded-4 container-bg">
      <h4 className="d-flex justify-content-center">Breakdown of Cash Inflows and Outflows</h4>
      <Form.Group controlId="search" className='mb-2'>
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
        paginationRowsPerPageOptions={[5,10, 20, 30, 40, 50]}
      />
    </Container>
  );
};

export default TransactionTable;
