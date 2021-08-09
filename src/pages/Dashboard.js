import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import classes from './Dashboard.module.css';
import { Row, Col, Button } from 'react-bootstrap';
import Datatable from '../components/Datatable';
import { sweetConfirmHandler } from '../components/SweetAlert';
import app from '../firebase';

const ref = app.firestore().collection('violations');

const columns = [
  { field: 'name', label: 'Name' },
  { field: 'license', label: 'License Number', sort: 'enabled' },
  { field: 'date', label: 'Date' },
  { field: 'plate', label: 'Plate #' },
  { field: 'violation', label: 'Violation' },
  { field: 'status', label: 'Status' },
  { field: 'action', label: 'Action' },
];

const handleConfirm = (id) => {
  const markAsPaid = () => {
    ref.doc(id).update({ status: 'PAID' });
  };

  sweetConfirmHandler(markAsPaid, null, 'Do you want to continue?');
};

const transformToRows = (list) => {
  let fList;
  fList = list.map((item) => {
    return {
      name: item.name,
      license: item.license,
      date: item.date,
      violation: item.violation,
      plate: item.plate,
      status: item.status,
      action: (
        <Button
          variant="success"
          onClick={() => {
            handleConfirm(item.id);
          }}
        >
          MARK AS PAID
        </Button>
      ),
    };
  });

  return fList;
};

const Dashboard = () => {
  const [datatable, setdatatable] = useState({ columns, rows: [] });

  useEffect(() => {
    ref.onSnapshot((querySnapshot) => {
      let items = [];
      querySnapshot.forEach((doc) => {
        var dateReadable = new Date(
          doc.data().date.seconds * 1000
        ).toLocaleDateString('en-US');
        console.log(doc.id);
        console.log(dateReadable);
        if (doc.data().status !== 'PAID') {
          items.push({ ...doc.data(), date: dateReadable, id: doc.id });
        }
      });
      console.log(items);

      setdatatable({ columns, rows: transformToRows(items) });
    });
  }, []);

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
