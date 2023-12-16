import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

import { useEffect, useState } from "react";
import AgGrid from "./components/AgGrid";
import AgGridBusinessReport from "./components/AgGridBusinessReport";

// /////to be deleted///
import licSold from "./JSON/lic-sold.json";

import NoPage from "./components/NoPage";
import Logins from "./pages/Logins/Logins";
import Sidebar from "./pages/Sidebar/Sidebar";
import HomePage from "./pages/Home/HomePage";
import Renewals from "./pages/Renewals/Renewals";
import BusinessReport from "./pages/BusinessReport/BusinessReport";
import MyProfile from "./pages/MyProfile/MyProfile";
// import Logo from "../src/assets/logo.png";
import { slide as Menu } from "react-burger-menu";

function App() {
  const [sideBarData, setSideBarData] = useState({});
  const [homePageData, setHomePageData] = useState({});
  const [renewalsExpiring, setRenewalsExpiring] = useState([] || "true");
  const [renewalsExpired, setRenewalsExpired] = useState([] || "true");
  const [licensesSold, setLicensesSold] = useState([] || "true");
  const [licenseRefunded, setLicenseRefunded] = useState([] || "true");

  const [
    businessReportFilterValueLicSold,
    setBusinessReportFilterValueLicSold,
  ] = useState(0);
  const [
    businessReportFilterValueLicRefunded,
    setBusinessReportFilterValueLicRefunded,
  ] = useState(0);

  useEffect(() => {
    // fetch("http://127.0.0.1:7000/home")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data, "homee");

    const data = {
      name: "Husaini Aamir",
      referral_code: "BAQ1G9",
      manager: "Sudeepti Tripathy",
      manager_phone: "9336234586",
      manager_email: "sudeepti@gmail.in",
      desktop_licenses: 2,
      renewals: 7,
      demo_scheduled: 0,
      total_commission: 4490.09,
      commision_to_be_paid: 2200,
      commission: [
        5615.32, 8676.54, 15396.71, 12000.8, 10000.62, 9000.86, 8863.4, 7564.92,
        6537.16, 6765.21, 13258.31, 2499,
      ],
      license: [3, 1, 19, 16, 6, 9, 6, 4, 5, 3, 11, 7],
      partner_type: "basic",
    };
    const { referral_code, manager, manager_phone, manager_email } = data;
    setSideBarData({
      ...sideBarData,
      referral_code,
      manager,
      manager_phone,
      manager_email,
    });
    const {
      name,
      desktop_licenses,
      renewals,
      demo_scheduled,
      total_commission,
      commision_to_be_paid,
      commission: commissionGraph,
      license: licenseGraph,
      partner_type,
    } = data;

    setHomePageData({
      ...homePageData,
      name,
      desktop_licenses,
      renewals,
      demo_scheduled,
      total_commission,
      commision_to_be_paid,
      commissionGraph,
      licenseGraph,
      partner_type,
    });

    // Renewals
    // fetch("http://127.0.0.1:7000/renewals/expiring")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //     const obj = [...data];
    //     setRenewalsExpiring(obj);
    //   });

    // fetch("http://127.0.0.1:7000/renewals/expired")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //     const obj = [...data];
    //     setRenewalsExpired(obj);
    //   });

    // Business Report
    console.log(licSold);
    setLicensesSold(licSold);
    setBusinessReportFilterValueLicSold(licSold.length);

    // fetch("http://127.0.0.1:7000/business-report/licenses-sold")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //     const obj = [...data];
    //     setLicensesSold(obj);
    //     setBusinessReportFilterValueLicSold(obj.length);
    //   });

    // fetch("http://127.0.0.1:7000/business-report/license-refunds")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //     const obj = [...data];
    //     setLicenseRefunded(obj);
    //     setBusinessReportFilterValueLicRefunded(obj.length);
    //   });
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <div className="hamburger-responsive">
          <BurgerMenu />
          <ResponsiveHeader />
        </div>
        <div className="flex-container">
          <Sidebar sideBarData={sideBarData} />
          <div className="main-content">
            <Routes>
              <Route
                path="home"
                element={<HomePage homePageData={homePageData} />}
              />
              <Route path="logins" element={<Logins />} />
              <Route path="renewals" element={<Renewals />}>
                <Route
                  path="expiring"
                  element={<AgGrid obj={renewalsExpiring} type={"renewals"} />}
                />
                <Route
                  path="expired"
                  element={<AgGrid obj={renewalsExpired} type={"renewals"} />}
                />
              </Route>
              <Route
                path="business-report"
                element={
                  <BusinessReport
                    businessReportFilterValueLicSold={
                      businessReportFilterValueLicSold
                    }
                    businessReportFilterValueLicRefunded={
                      businessReportFilterValueLicRefunded
                    }
                  />
                }
              >
                <Route
                  path="licenses-sold"
                  element={
                    <AgGridBusinessReport
                      obj={licensesSold}
                      setBusinessReportFilterValueLicSold={
                        setBusinessReportFilterValueLicSold
                      }
                      setBusinessReportFilterValueLicRefunded={
                        setBusinessReportFilterValueLicRefunded
                      }
                    />
                  }
                />
                <Route
                  path="license-refunds"
                  element={
                    <AgGridBusinessReport
                      obj={licenseRefunded}
                      setBusinessReportFilterValueLicSold={
                        setBusinessReportFilterValueLicSold
                      }
                      setBusinessReportFilterValueLicRefunded={
                        setBusinessReportFilterValueLicRefunded
                      }
                    />
                  }
                />
              </Route>
              <Route path="my-profile" element={<MyProfile />} />
              <Route path="*" element={<NoPage />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

function ResponsiveHeader() {
  return (
    <div className="responsive-header">
      {/* <img src={Logo} alt="Vyapar Logo" /> */}
    </div>
  );
}

function BurgerMenu() {
  const [isOpen, setOpen] = useState(false);

  const handleIsOpen = () => {
    setOpen(!isOpen);
  };

  const closeSideBar = () => {
    setOpen(false);
  };

  return (
    <Menu isOpen={isOpen} onOpen={handleIsOpen} onClose={handleIsOpen}>
      <NavLink to="/home" onClick={closeSideBar}>
        Home
      </NavLink>

      <NavLink to="/logins" onClick={closeSideBar}>
        Logins
      </NavLink>

      <NavLink to="/renewals" onClick={closeSideBar}>
        Renewals
      </NavLink>

      <NavLink to="/business-report" onClick={closeSideBar}>
        Business Report
      </NavLink>

      <NavLink to="/my-profile" onClick={closeSideBar}>
        My Profile
      </NavLink>
    </Menu>
  );
}
