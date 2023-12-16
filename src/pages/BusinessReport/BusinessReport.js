import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

// Internal Imports
import licSoldImg from "../../assets/lic_sold.png";
import licRefundImg from "../../assets/lic_refunds.png";

export default function BusinessReport({
  businessReportFilterValueLicSold,
  businessReportFilterValueLicRefunded,
}) {
  return (
    <div className="content">
      <div className="business-report-header">
        <h1 className="primary-heading">Business Report</h1>
      </div>
      <div className="business-report-cards">
        <Cards
          cardTitle="Licenses Sold"
          img={licSoldImg}
          alt="Licenses Sold Image"
          link="licenses-sold"
          item={businessReportFilterValueLicSold}
        />
        <Cards
          cardTitle="License Refunds"
          img={licRefundImg}
          alt="License Refunds Image"
          link="license-refunds"
          item={businessReportFilterValueLicRefunded}
        />
      </div>
      <div className="business-report-table-container">
        <Outlet />
      </div>
    </div>
  );
}

function Cards({ cardTitle, img, alt, link, item }) {
  return (
    <NavLink to={link} className="business-report-card">
      <div className="card-icon">
        <img src={img} alt={alt} />
      </div>
      <div className="card-data">
        <p className="card-title">{cardTitle}</p>
        <p className="card-title-value">{item}</p>
      </div>
    </NavLink>
  );
}
