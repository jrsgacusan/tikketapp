import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Datatable from '../components/Datatable';
import app from '../firebase';
import { NavItem } from 'react-bootstrap';
const ref = app.firestore().collection('violations');
const init_columns = [
  {
    field: 'plateNumber',
    label: 'Plate Number',
  },
  {
    field: 'totalViolations',
    label: 'Total Violations Committed',
  },
];

const transformToDatatable = (list) => {
  let fList = [];
  for (const key in list) {
    const plate = list[key].plate;
    console.log(plate);
    const indexInFList = fList.indexOf((item) => item.plate === plate);
    console.log(indexInFList);
    if (indexInFList) {
      //No same plate #.
      fList.push({ plateNumber: plate, totalViolations: 1 });
    } else {
      //The plate number is already in the fList
      fList[indexInFList].count += 1;
    }
  }

  return { columns: init_columns, rows: fList };
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
