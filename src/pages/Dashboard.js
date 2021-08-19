import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import classes from './Dashboard.module.css';
import { Row, Col, Button, Card } from 'react-bootstrap';
import Datatable from '../components/Datatable';
import { sweetConfirmHandler } from '../components/SweetAlert';
import app from '../firebase';
import { PersonXFill as PersonFill, CashStack } from 'react-bootstrap-icons';

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
      modeOfPayment: item.mode,
      amount: item.amount,
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
  const [collectibles, setcollectibles] = useState(0);
  const [unsettledViolations, setunsettledViolations] = useState(0);

  useEffect(() => {
    ref.onSnapshot((querySnapshot) => {
      let items = [];
      querySnapshot.forEach((doc) => {
        var dateReadable = new Date(
          doc.data().date.seconds * 1000
        ).toLocaleDateString('en-US');
        console.log(doc.id);
        console.log(dateReadable);
        if (doc.data().status === 'UNPAID') {
          items.push({ ...doc.data(), date: dateReadable, id: doc.id });
        }
      });
      let collectiblesCount = 0;
      let unsettledViolationsCount = 0;
      for (const i in items) {
        collectiblesCount += items[i].amount;
        unsettledViolationsCount++;
      }
      setunsettledViolations(unsettledViolationsCount);
      setcollectibles(collectiblesCount);
      setdatatable({ columns, rows: transformToRows(items) });
    });
  }, []);

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
                    <h3 style={{ color: '#A63446' }}>₱ {collectibles}</h3>
                    <h5>Collectibles</h5>
                  </div>
                  <div className="col text-center">
                    <CashStack color="#A63446" size={80}></CashStack>
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
                    <h3 style={{ color: '#A63446' }}>{unsettledViolations}</h3>
                    <h5>Unsettled Violations</h5>
                  </div>
                  <div className="col text-center">
                    <PersonFill color="#A63446" size={80}></PersonFill>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
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
