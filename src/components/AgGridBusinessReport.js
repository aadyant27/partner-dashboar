import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

export default function AgGridBusinessReport({
  obj,
  setBusinessReportFilterValueLicSold,
  setBusinessReportFilterValueLicRefunded,
}) {
  const [columnDef, setColumnDef] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [businessReportFilter1, setBusinessReportFilter1] =
    useState("all time");
  const [businessReportFilter2, setBusinessReportFilter2] =
    useState("all time");

  // custom hook to get the current pathname(URL) in React
  const location = useLocation();

  useEffect(() => {
    const keys = Object.keys(obj[0] || {}); // if obj[0] is null, empty object will be passed to Object.keys() instead of null or undefined
    const columnNames = [];
    for (let i = 0; i < keys.length; i++) {
      if (keys[i].includes("date")) {
        columnNames.push({
          field: keys[i],
          filter: "agDateColumnFilter",
        });
      } else {
        columnNames.push({ field: keys[i] });
      }
    }
    setColumnDef(columnNames);
    setRowData(obj);
  }, [obj]);

  /*///////
  AG-GRID FUNCTIONALITY
  */ ///////
  const defaultColDef = useMemo(() => {
    return {
      //   flex: 1,
      sortable: true,
      filter: true,
    };
  }, []);

  const gridRef = useRef();
  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current.api.setQuickFilter(
      document.getElementById("filter-text-box").value
    );
  }, []);

  //   External filters

  //   var priorDate = new Date(new Date().setDate(today.getDate() - 30));
  const asDate = (dateAsString) => {
    const splitFields = dateAsString?.split("/");
    return new Date(
      Number.parseInt(splitFields[2]),
      Number.parseInt(splitFields[1]),
      Number.parseInt(splitFields[0])
    );
  };

  const isExternalFilterPresent = useCallback(() => {
    // if businessReportFilter is not 'all time', then we are filtering
    if (location.pathname === "/business-report/licenses-sold") {
      return businessReportFilter1 !== "all time";
    }
    if (location.pathname === "/business-report/license-refunds") {
      return businessReportFilter2 !== "all time";
    }
  }, [businessReportFilter1, businessReportFilter2]);

  const doesExternalFilterPass = useCallback(
    (node) => {
      if (location.pathname === "/business-report/licenses-sold") {
        if (node.data.payment_date) {
          switch (businessReportFilter1) {
            case "30 days":
              return asDate(node.data.payment_date) > new Date(2023, 8, 14);
            case "90 days":
              return asDate(node.data.payment_date) > new Date(2023, 9, 27);
            default:
              return true;
          }
        }
        return true;
      }

      if (location.pathname === "/business-report/license-refunds") {
        if (node.data.refund_date) {
          switch (businessReportFilter2) {
            case "30 days":
              return asDate(node.data.refund_date) > new Date(2023, 8, 14);
            case "90 days":
              return asDate(node.data.refund_date) > new Date(2023, 9, 27);
            default:
              return true;
          }
        }
        return true;
      }
    },
    [businessReportFilter1, businessReportFilter2]
  );

  useEffect(() => {
    gridRef.current?.api?.onFilterChanged();
    const count = gridRef.current?.api?.getDisplayedRowCount();
    if (location.pathname === "/business-report/licenses-sold") {
      if (count !== undefined) setBusinessReportFilterValueLicSold(count);
    }
    if (location.pathname === "/business-report/license-refunds") {
      if (count !== undefined) setBusinessReportFilterValueLicRefunded(count);
    }
  }, [businessReportFilter1, businessReportFilter2]);

  return (
    <>
      <div className="business-report-ag-grid">
        <input
          type="text"
          id="filter-text-box"
          placeholder="Search..."
          onInput={onFilterTextBoxChanged}
        />
        {location.pathname === "/business-report/licenses-sold" && (
          <select
            className="select-box"
            value={businessReportFilter1}
            onChange={(e) => {
              setBusinessReportFilter1(e.target.value);
            }}
          >
            <option value="all time">All Time</option>
            <option value="30 days">30 Days</option>
            <option value="90 days">90 Days</option>
          </select>
        )}
        {location.pathname === "/business-report/license-refunds" && (
          <select
            className="select-box"
            value={businessReportFilter2}
            onChange={(e) => {
              setBusinessReportFilter2(e.target.value);
            }}
          >
            <option value="all time">All Time</option>
            <option value="30 days">30 Days</option>
            <option value="90 days">90 Days</option>
          </select>
        )}
      </div>
      <div
        className="ag-theme-alpine"
        style={{ height: "55vh", width: "100%" }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDef}
          ref={gridRef}
          pagination={true}
          defaultColDef={defaultColDef}
          isExternalFilterPresent={isExternalFilterPresent}
          doesExternalFilterPass={doesExternalFilterPass}
        ></AgGridReact>
      </div>
    </>
  );
}
