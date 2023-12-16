// import React, { FunctionComponent, PropsWithChildren } from 'react';
import copy from "copy-to-clipboard";
import { NavLink } from "react-router-dom";
// Asset Files
// import Logo from "../../assets/logo.png";
import CopyIcon from "../../assets/copy-icon.png";
import MailIcon from "../../assets/mail.png";
import WhatsappIcon from "../../assets/whatsapp.png";

export default function Sidebar({ sideBarData }) {
  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="main-icon">
          {/* <img src={Logo} alt="Vyapar Logo" /> */}
        </div>
        <div className="buttons">
          <NavLink to="/home" className="sidebar-button">
            Home
          </NavLink>
          <NavLink to="/logins" className="sidebar-button">
            Logins
          </NavLink>
          <NavLink to="/renewals" className="sidebar-button">
            Renewals
          </NavLink>

          <NavLink to="/business-report" className="sidebar-button">
            Business Report
          </NavLink>

          <NavLink to="/my-profile" className="sidebar-button">
            My Profile
          </NavLink>
        </div>
        <div className="sidebar-footer">
          <ReferralCode referralCode={sideBarData.referral_code} />
          <PersonalInformation
            manager={sideBarData.manager}
            managerEmail={sideBarData.manager_email}
            managerPhone={sideBarData.manager_phone}
          />
        </div>
      </div>
    </div>
  );
}

function ReferralCode({ referralCode }) {
  //   const code = "X Æ A-12";
  return (
    <div className="referral">
      <h3 className="referral-title">Your Referral Code</h3>
      <div className="referral-code">{referralCode}</div>
      <hr />
      <h3 className="referral-title">Share</h3>
      <div className="socials">
        <button className="share mail">
          <img src={MailIcon} alt="Mail Icon" />
        </button>
        <button
          className="share whatsapp"
          onClick={() => {
            const msg2 =
              "Dear+User%2C%0A%0AMy+name+is+" +
              "Aadyant" +
              "+%2C+I+am+your+Personal+Account+Manager%0A%0AUnfortunately+we+were+not+able+to+complete+our+call.%0ALet+me+guide+you+through+the+app+and+help+you+set+up+your+business+on+Vyapar.+I+request+you+to+let+us+know+your+availability+by+replying+to+this+message+for+a+FREE+demo+from+my+end.%0A%0AI+am+available+from+10%3A00+AM+-+07%3A00+PM%2C+Monday+to+Saturday.";
            const link = "https://web.whatsapp.com/send/?" + "text=" + msg2;
            window.open(link, "_blank");
          }}
        >
          <img src={WhatsappIcon} alt="Whatsapp Icon" />
        </button>
        <button
          className="share copy"
          onClick={() => {
            copy(referralCode);
            alert(`Referral code ${referralCode} copied!`);
          }}
        >
          <img src={CopyIcon} alt="Copy Icon" />
        </button>
      </div>
    </div>
  );
}

function PersonalInformation({ manager, managerEmail, managerPhone }) {
  return (
    <div className="personal-info">
      <h3 className="personal-info-title">Your Account Manager</h3>
      <div className="info">
        <div className="info-title">NAME</div>
        <div className="info-value">{manager}</div>
      </div>
      <hr />
      <div className="info">
        <div className="info-title">EMAIL</div>
        <div
          className="info-value"
          onClick={() => {
            copy(managerEmail);
            alert(`Email '${managerEmail}' copied to clipboard!`);
          }}
        >
          {managerEmail}
        </div>
      </div>
      <hr />
      <div className="info">
        <div className="info-title">PHONE</div>
        <div
          className="info-value"
          onClick={() => {
            copy(managerPhone);
            alert(`Phone Number '${managerPhone}' copied to clipboard!`);
          }}
        >
          {managerPhone}
        </div>
      </div>
      <hr />
    </div>
  );
}
