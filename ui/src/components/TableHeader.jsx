import "../css/general.css";
import "../css/styles.css";

import React from "react";
import Checkbox from "./Checkbox.jsx";
import { tableHeader as header } from "../misc/config.jsx";

const TableHeader = ({
  tableData,
  setTableData,
  setCheckStatus,
  modifyExportData,
}) => {
  const handleSort = (sortKey, ascending) => {
    const tableDataCopy = [...tableData];

    tableDataCopy.sort((left, right) => {
      const leftVal = left[sortKey];
      const rightVal = right[sortKey];

      if (leftVal === rightVal) return 0;
      if (ascending) return leftVal < rightVal ? -1 : 1;
      return leftVal > rightVal ? -1 : 1;
    });

    setTableData(tableDataCopy);
  };

  const renderSortBtns = (sortKey) => {
    return (
      <div className="header__sortBtns">
        <button onClick={() => handleSort(sortKey, true)} className="btn__sort">
          <>&#x25B2;</>
        </button>
        <button
          onClick={() => handleSort(sortKey, false)}
          className="btn__sort"
        >
          <>&#x25BC;</>
        </button>
      </div>
    );
  };

  const renderTableHeader = (header) => {
    const headerKeys = Object.keys(header);

    const checkStatus = setCheckStatus();
    const headerContent = [
      <Checkbox
        key={checkStatus}
        predefinedClassName="dataTable__header"
        checkStatus={checkStatus}
        modifyExportData={modifyExportData(tableData)}
      />,
    ];

    headerKeys.forEach((key) => {
      const colContent = (
        <div key={key} className="dataTable__header">
          <div>{header[key]}</div>
          {renderSortBtns(key)}
        </div>
      );
      headerContent.push(colContent);
    });

    return headerContent;
  };

  return <>{renderTableHeader(header)}</>;
};

export default TableHeader;
