import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Datatable from '../components/Datatable';
import app from '../firebase';
import { NavItem } from 'react-bootstrap';
const ref = app.firestore().collection('violations');
const init_columns = [
  {
    field: 'licenseNumber',
    label: 'License Number',
  },
  {
    field: 'totalViolations',
    label: 'Total Violations Committed',
  },
];

const transformToDatatable = (list) => {
  let fRow = [];
  const transform = (listItem) => {
    const licenseNum = listItem.license;
    const index = fRow.findIndex((item) => item.licenseNumber === licenseNum);
    console.log(index);
    if (index === -1) {
      fRow.push({ licenseNumber: licenseNum, totalViolations: 1 });
    } else {
      fRow[index].totalViolations += 1;
    }
    console.log(listItem.license);
  };
  list.forEach(transform);

  return { columns: init_columns, rows: fRow };
};

const PlateNumber = () => {
  const [datatable, setdatatable] = useState({ columns: [], rows: [] });

  useEffect(() => {
    ref.onSnapshot((querySnapshot) => {
      let items = [];
      querySnapshot.forEach((doc) => {
        var dateReadable = new Date(
          doc.data().date.seconds * 1000
        ).toLocaleDateString('en-US');

        items.push({ ...doc.data(), date: dateReadable, id: doc.id });
      });

      setdatatable(transformToDatatable(items));
    });
  }, []);
  return (
    <>
      <NavBar />
      <div style={{ marginTop: '20px' }} className="section">
        <Datatable datatable={datatable} />
      </div>
    </>
  );
};

export default PlateNumber;
