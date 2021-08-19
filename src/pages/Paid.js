import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import { Row, Col, Button, Card } from 'react-bootstrap';
import Datatable from '../components/Datatable';
import { sweetConfirmHandler } from '../components/SweetAlert';
import {
  PersonCheckFill as PersonFill,
  CashStack,
} from 'react-bootstrap-icons';
import app from '../firebase';
const ref = app.firestore().collection('violations');
const columns = [
  { field: 'name', label: 'Name' },
  { field: 'license', label: 'License Number', sort: 'enabled' },
  { field: 'date', label: 'Date' },
  { field: 'plate', label: 'Plate #' },
  { field: 'violation', label: 'Violation' },
  //Additional 2
  { field: 'modeOfPayment', label: 'Payment' },
  { field: 'amount', label: 'Amount' },
  //
  { field: 'status', label: 'Status' },
  { field: 'action', label: 'Action' },
];

const handleConfirm = (id) => {
  const deleteDoc = () => {
    ref.doc(id).delete();
  };

  sweetConfirmHandler(deleteDoc, null, 'Do you want to delete this data?');
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
      modeOfPayment: item.mode,
      amount: item.amount,
      action: (
        <Button
          variant="danger"
          onClick={() => {
            handleConfirm(item.id);
          }}
        >
          DELETE
        </Button>
      ),
    };
  });

  return fList;
};

const Paid = () => {
  const [datatable, setdatatable] = useState({ columns, rows: [] });
  const [settledViolations, setsettledViolations] = useState(0);
  const [collected, setcollected] = useState(0);

  useEffect(() => {
    ref.onSnapshot((querySnapshot) => {
      let items = [];
      querySnapshot.forEach((doc) => {
        var dateReadable = new Date(
          doc.data().date.seconds * 1000
        ).toLocaleDateString('en-US');

        if (doc.data().status === 'PAID') {
          items.push({ ...doc.data(), date: dateReadable, id: doc.id });
        }
      });
      let collectedCount = 0;
      let settledViolationsCount = 0;
      for (const i in items) {
        collectedCount += items[i].amount;
        settledViolationsCount++;
      }

      setcollected(collectedCount);
      setsettledViolations(settledViolationsCount);
      setdatatable({ columns, rows: transformToRows(items) });
    });
  }, []);

  useEffect(() => {}, []);

  return (
    <>
      <NavBar />
      <div className="section">
        <Row style={{ marginTop: '10px' }}>
          <Col>
            <Card>
              <Card.Body>
                <div className="row align-items-center justify-content-center">
                  <div className="col text-center">
                    <h3 style={{ color: 'rgba(3, 121, 113)' }}>
                      ₱ {collected}
                    </h3>
                    <h5>Collected</h5>
                  </div>
                  <div className="col text-center">
                    <CashStack color="rgba(3, 121, 113)" size={80}></CashStack>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <div className="row align-items-center justify-content-center">
                  <div className="col text-center">
                    <h3 style={{ color: 'rgba(3, 121, 113)' }}>
                      {settledViolations}
                    </h3>
                    <h5>Settled Violations</h5>
                  </div>
                  <div className="col text-center">
                    <PersonFill
                      color="rgba(3, 121, 113)"
                      size={80}
                    ></PersonFill>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

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
