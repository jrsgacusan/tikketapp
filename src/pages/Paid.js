import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import { Row, Col, Button } from 'react-bootstrap';
import Datatable from '../components/Datatable';
import { sweetConfirmHandler } from '../components/SweetAlert';

const columns = [
  { field: 'fullname', label: 'Full Name' },
  { field: 'license', label: 'License Number', sort: 'enabled' },
  { field: 'plate', label: 'Plate' },
  { field: 'violation', label: 'Violation' },
  { field: 'status', label: 'Status' },
  { field: 'action', label: 'Action' },
];

const handleConfirm = () => {
  sweetConfirmHandler(() => {}, null, 'Do you want to delete this data?');
};

const rows = [
  {
    fullname: 'Juel Rei S. Gacusan',
    license: 'Sample license',
    plate: 'Sample plate',
    violation: 'Sample violation',
    status: 'paid',
    action: (
      <Button
        variant="danger"
        onClick={() => {
          handleConfirm();
        }}
      >
        DELETE
      </Button>
    ),
  },
];

const Paid = () => {
  const [datatable, setdatatable] = useState({ columns, rows });
  return (
    <>
      <NavBar />
      <div className="section">
        <Row style={{ padding: '10px' }}>
          <Col>
            <Datatable title="PAID VIOLATIONS" datatable={datatable} />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Paid;
