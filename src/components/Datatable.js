/* eslint-disable no-sequences */
import React from 'react';
import { MDBDataTable } from 'mdbreact';
import { Card, Button } from 'react-bootstrap';
import { CSVLink } from 'react-csv';

// Props
// 'style' = the inline styling of the table.
// 'title' = string, the title of the table.
// 'datatable' = an object that contains 'columns' and 'rows'
//     'columns' contains an array of objects. Objects inside mainly has 'label' and 'field' keys, these two are required, other keys are found on the documentation.
//     'rows' contains an array of objects as well. These are the data displayed in the data table.
// 'exportToCsv' = boolean. True to show the export to CSV option, false to hide.
// 'className' = class used to style the datatable.

export default function Datatable({
  style = { border: 'none', boxShadow: 'none' },
  datatable,
  title = null,
  exportToCsv = false,
  className,
}) {
  //Remove the object that has the value action(so that it won't appear on the CSV file).
  const filteredHeader = datatable.columns.filter(
    (item) => item.field !== 'action'
  );
  //list of header objects with 'label' and 'key' properties.
  const headersObjList = filteredHeader.map((item) => {
    return { label: item.label, key: item.field };
  });
  //list of flat string headers, it is used to set the headers within the CSV file.
  const headersList = filteredHeader.map((item) => item.field);

  //list of data objects
  const rows = datatable.rows;
  const dataObList = rows.map((item) => {
    const _res = headersList.reduce((acc, curr, index) => {
      return (acc[curr] = item[curr]), acc;
    }, {});
    return _res;
  });
  //use as prop to CSVLink
  const csvReport = {
    data: dataObList,
    headers: headersObjList,
    filename: 'sample.csv',
  };

  return (
    <Card style={style} className={className}>
      {title !== null && (
        <Card.Header>
          <h4 className="text-center">{title}</h4>
        </Card.Header>
      )}
      <Card.Body>
        <MDBDataTable
          striped={true}
          barReverse
          hover
          entriesOptions={[10, 25, 50, 100]}
          entries={10}
          pagesAmount={4}
          responsive={true}
          theadColor="gray"
          data={datatable}
          noBottomColumns={true}
        />
      </Card.Body>
      {exportToCsv && (
        <Card.Footer>
          <CSVLink {...csvReport}>
            <Button>Export to CSV</Button>
          </CSVLink>
        </Card.Footer>
      )}
    </Card>
  );
}
