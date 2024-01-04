import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { Form, Button, Container, Row, Col, InputGroup, FormControl,  OverlayTrigger, Tooltip } from 'react-bootstrap';
import { saveAs } from 'file-saver';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';  // Import PDFViewer
import pdfLogo from '../assets/img/pdfLogo.png';
import * as Icon from 'react-bootstrap-icons';
import '../assets/css/global.css';
import coverImage from '../assets/img/cover.jpg';
import TransactionVersionModal from './transactionVersionModal';

const ReportTable = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showTransactionVersionModal, setShowTransactionVersionModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const handleOpenTransactionVersionModal = (row) => {
    setSelectedRow(row);
    
    setShowTransactionVersionModal(true);
  };

  const handleCloseModalVer = () => {
    setShowTransactionVersionModal(false);
  };

  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);

  const fetchData = async () => {
    try {
      let url = 'http://localhost:8001/transaction/fetchAll';

      if (startDate && endDate) {
        url = `http://localhost:8001/transaction/findByDateRange?startDate=${startDate}&endDate=${endDate}`;
      }

      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleExcelExport = () => {
    if (startDate && endDate) {
      window.location.href = `http://localhost:8001/transaction/groupReport?startDate=${startDate}&endDate=${endDate}`;
    } else {
      console.error('Please select start and end dates');
    }
  };

  const formatTransactionDate = (row) => {
    const transactionDate = new Date(row.transactionDate);
    return transactionDate.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };



  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#f0faf4',
    },
    backgroundImageContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundSize: 'cover',
      opacity: 0.1,  // 50% opacity
    },
    section: {
      margin: 10,
      flexGrow: 1,
      textAlign: 'center',
    },
    section3: {
      margin: 10,
      display: 'block',
      textAlign: 'right',
      position: 'absolute',
      bottom: '10px',
      left: '10px',
      right: '10px',
      fontSize: '11px',
      fontStyle: 'italic',
      color: 'grey',
    },
    header: {
      fontSize: '13px',
      fontWeight: 'bold',
      marginTop: '13px',
      marginBottom: '15px',
    },
    subtitle: {
      fontSize: '13px',
      marginTop: '5px',
      paddingLeft: '35px',
      textAlign: 'left',
    },
  });



  const columns = [
    { name: 'Transaction ID', selector: 'transactionId', sortable: true, minWidth: '137px', grow: 5 },
    { name: 'Date', selector: 'transactionDate', sortable: true, minWidth: '100px', cell: (row) => formatTransactionDate(row) },
    {
      name: 'Type',
      selector: 'transactionType',
      sortable: true,
      minWidth: '115px',
      cell: (row) => (
        <span>
          {row.transactionType === 'INFLOW' ? (
            <>
              <div className='text-success'>
                Inflow <Icon.ArrowUp />
              </div>
            </>
          ) : (
            <>
              <div className='text-danger'>
                Outflow <Icon.ArrowDown />
              </div>
            </>
          )}
        </span>
      ),
    },
    {
      name: 'Amount',
      selector: 'amount',
      sortable: true,
      cell: (row) => (
        <span>
          ₱ {Number(row.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
      ),
    },
    { name: 'Quantity', selector: 'quantity', sortable: true },
    {
      name: 'Total',
      selector: 'total',
      sortable: true,
      minWidth: '115px',
      cell: (row) => (
        <span>
          ₱ {Number(row.total).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
      ),
    },
    { name: 'Particular', selector: 'particular', sortable: true, minWidth: '160px', grow: 5 },

    {
      name: 'Balance',
      selector: 'balance',
      sortable: true,
      minWidth: '115px',
      cell: (row) => (
        <span>
          ₱ {Number(row.balance).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
      ),
    },
    { name: 'OR No.', selector: 'orNumber', sortable: true },
    { name: 'Remark', selector: 'remark', sortable: true, minWidth: '150px', grow: 5 },
    {
      name: 'Action',
      selector: 'actionModal',
      sortable: false,
      minWidth: '50px',
      grow: 5,
      cell: (row) => (
        <>
        
        <PDFDownloadLink document={
          <Document>
          <Page size={{ width: 420, height: 298 }} style={styles.page}>
          <Image src={coverImage} style={styles.backgroundImageContainer} />
            <View style={styles.section}>
            <Image style={{width: '45px', height: '45px', margin: '15px 0 0 15px', padding: '0 0 0 0'}} src={pdfLogo}></Image>
            <Text style={{fontSize: '14px', fontWeight: 'bold' , marginTop: '-35px'}}>Builders of Innovative Technologist Society</Text>
            <Text style={styles.header}>{'INVOICE RECORD'}</Text>
            <Text style={styles.subtitle}>{'Transaction ID:     '+ row.transactionId}</Text>
            <Text style={styles.subtitle}>{'Date:                    '+formatTransactionDate(row)}</Text>
            <Text style={styles.subtitle}>{'Particular:             '+row.particular}</Text>
            <Text style={styles.subtitle}>{'Amount:               PHP '+ Number(row.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
            <Text style={styles.subtitle}>{'Quantity:               '+row.quantity}</Text>
            <Text style={styles.subtitle}>{'Total:                    PHP '+ Number(row.total).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
            <Text style={styles.subtitle}>{'Remark:               '+row.remark}</Text>
          </View>
          <View style={styles.section3}>
            <Text>{'Generated from BITS Financial Management System'}</Text>
          </View>
      </Page>
        </Document>}
         fileName={`${row.transactionId}.pdf`}>
           {({ blob, url, loading, error }) =>
            loading ? 'Loading document...' : 
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id={`tooltip-pdf-${row.transactionId}`}>Export PDF</Tooltip>}
              >
            <Button variant="link" size="md">
            <Icon.FileEarmarkArrowDown />
          </Button>
          </OverlayTrigger>
          }
        </PDFDownloadLink>
        

        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id={`tooltip-history-${row.transactionId}`}>Transaction History</Tooltip>}
        >
         <Button variant='link' size='md' onClick={() => handleOpenTransactionVersionModal(row)}>
         <Icon.ClockHistory variant='dark'/>
        </Button>
        </OverlayTrigger>
        </>
      ),
    },
  ];

  const filteredData = data.filter((row) =>
    columns.some((column) => String(row[column.selector]).toLowerCase().includes(searchText.toLowerCase()))
  );

  return (
    <Container className='form-container mt-1 p-3 pt-4 rounded-4 container-bg'>
      <h4 className='d-flex justify-content-center mb-4'>Financial Report</h4>

      <Row className="my-4 pt-2">
        <Col lg="2" className="d-flex align-items-center">
          <h6 className='px-2'>Generate Report:</h6>
        </Col>
        <Col lg="3">
          <Form.Group controlId='startDate'>
            <InputGroup>
              <InputGroup.Text className="my-2">Start Date:</InputGroup.Text>
              <FormControl type='date' value={startDate} onChange={handleStartDateChange} />
            </InputGroup>
          </Form.Group>
        </Col>
        <Col lg="3">
          <Form.Group controlId='endDate'>
            <InputGroup>
              <InputGroup.Text className="my-2">End Date:</InputGroup.Text>
              <FormControl type='date' value={endDate} onChange={handleEndDateChange} />
            </InputGroup>
          </Form.Group>
        </Col>
        <Col lg="4">
          <Button variant='success' className="my-2" onClick={handleExcelExport}>
            Excel
          </Button>
        </Col>
      </Row>

      <Form.Group controlId='search' className='my-3'>
        <Form.Control type='text' placeholder='Search...' value={searchText} onChange={(e) => setSearchText(e.target.value)} />
      </Form.Group>

      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        paginationPerPage={10}
        highlightOnHover
        paginationRowsPerPageOptions={[10, 25, 50, 100]}
        persistTableHead={true}
        fixedHeader={true}
        fixedHeaderScrollHeight='600px'
      />
      <TransactionVersionModal
        showTransactionVersionModal={showTransactionVersionModal}
        handleCloseModalVer={handleCloseModalVer}
        selectedRow={selectedRow}
      />
    </Container>
  );
};

export default ReportTable;
