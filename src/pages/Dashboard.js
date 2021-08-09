import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import classes from './Dashboard.module.css';
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
  sweetConfirmHandler(() => {}, null, 'Do you want to continue?');
};

const rows = [
  {
    fullname: 'Juel Rei S. Gacusan',
    license: 'Sample license',
    plate: 'Sample plate',
    violation: 'Sample violation',
    status: 'unsettled',
    action: (
      <Button
        variant="success"
        onClick={() => {
          handleConfirm();
        }}
      >
        MARK AS PAID
      </Button>
    ),
  },
];

const Dashboard = () => {
  const [datatable, setdatatable] = useState({ columns, rows });
  return (
    <>
      <NavBar />
      <div className="section">
        <Row style={{ paddingTop: '10px' }}>
          <Col>
            <Datatable title="UNSETTLED VIOLATIONS" datatable={datatable} />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Dashboard;
