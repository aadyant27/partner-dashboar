/*
TODO
When sending data from AG GRID to server,
1. Sanity checks on values, check if value exists otherwise, send error on client
2. try-catch block
*/

import { useEffect, useState, useCallback, useRef, useMemo } from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import MailIcon2 from "../assets/mail2.png";
import WhatsappIcon2 from "../assets/whatsapp2.png";

export default function AgGrid({ obj, type }) {
  const [columnDef, setColumnDef] = useState([]);
  const [rowData, setRowData] = useState([]);

  function requestDemo(props) {
    if (props.value === "Converted") {
      return (
        <button
          className="ag-grid-buttons"
          onClick={() => {
            // POST REQUEST
            const phone = { phone: props.data.phone };
            const options = {
              method: "POST",
              body: JSON.stringify(phone),
              headers: { "Content-Type": "application/json" },
            };
            fetch("http://127.0.0.1:7000/demo/request", options).then((res) =>
              console.log(res)
            );
          }}
        >
          Request Demo
        </button>
      );
    } else return props.value;
  }

  function sendReminderRenewals(props) {
    return (
      <div className="send-reminder-buttons">
        <button
          className=""
          onClick={() => {
            const email = { email: props.data.email };
            const options = {
              method: "POST",
              body: JSON.stringify(email),
              headers: { "Content-Type": "application/json" },
            };
            fetch("http://127.0.0.1:7000/reminder/email", options).then((res) =>
              console.log(res)
            );

            alert("Email sent");
          }}
        >
          <img src={MailIcon2} alt="Mail Icon" />
        </button>
        <button
          className=""
          onClick={() => {
            const whatsappPhone = props.data.phone;
            // const whatsappPhone = "9638111654";
            const msg2 =
              "Dear+User%2C%0A%0AMy+name+is+" +
              "Aadyant" +
              "+%2C+I+am+your+Personal+Account+Manager%0A%0AUnfortunately+we+were+not+able+to+complete+our+call.%0ALet+me+guide+you+through+the+app+and+help+you+set+up+your+business+on+Vyapar.+I+request+you+to+let+us+know+your+availability+by+replying+to+this+message+for+a+FREE+demo+from+my+end.%0A%0AI+am+available+from+10%3A00+AM+-+07%3A00+PM%2C+Monday+to+Saturday.";
            const link =
              "https://web.whatsapp.com/send/?phone=91" +
              whatsappPhone +
              "&text=" +
              msg2;
            window.open(link, "_blank");
          }}
        >
          <img src={WhatsappIcon2} alt="Whatsapp Icon" />
        </button>
      </div>
    );
  }

  useEffect(() => {
    const keys = Object.keys(obj[0] || {}); // if obj[0] is null, empty object will be passed to Object.keys() instead of null or undefined
    const columnNames = [];

    // AG GRID FOR LOGINS PAGE
    if (type === "logins") {
      for (let i = 0; i < keys.length; i++) {
        if (keys[i].includes("date")) {
          columnNames.push({
            field: keys[i],
            filter: "agDateColumnFilter",
          });
        } else if (keys[i] === "demo_requested") {
          columnNames.push({
            field: keys[i],
            cellStyle: (params) => {
              if (params.value === "Demo Completed") {
                return { color: "#4C7EAF" };
              } else if (params.value === "Not Interested") {
                return { color: "#ED1A3B" };
              } else if (params.value === "Follow Up") {
                return { color: "#F69618" };
              } else if (params.value === "Demo Done") {
                return { color: "#4C7EAF" };
              } else {
                return { color: "black" };
              }
            },
            cellRenderer: requestDemo,
          });
        } else {
          columnNames.push({ field: keys[i] });
        }
      }
    }

    //   AG GRID FOR RENEWALS PAGE
    if (type === "renewals") {
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
      columnNames.push({
        field: "Send Reminder",
        cellRenderer: sendReminderRenewals,
      });
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

  return (
    <>
      <div className="example-header">
        <input
          type="text"
          id="filter-text-box"
          placeholder="Search..."
          onInput={onFilterTextBoxChanged}
        />
      </div>
      <div className="ag-theme-alpine" style={{ height: "60vh", width: "98%" }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDef}
          ref={gridRef}
          pagination={true}
          defaultColDef={defaultColDef}
        ></AgGridReact>
      </div>
    </>
  );
}
