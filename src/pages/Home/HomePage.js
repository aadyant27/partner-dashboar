import GraphComponent from "./Graph";
import scheduledDemoImg from "../../assets/scheduled_demo_img.png";
import desktopLicImg from "../../assets/desktop_lic_img.png";
import totalCommImg from "../../assets/total_commission_img.png";
import renewalImg from "../../assets/renewal_img.png";

import basicPartner from "../../assets/basic_partner.png";
import keyPartner from "../../assets/key_partner.png";
import primePartner from "../../assets/prime_partner.png";
import strategicPartner from "../../assets/strategic_partner.png";
import superStrategicPartner from "../../assets/super_strategic_partner.png";

export default function HomePage({ homePageData }) {
  console.log(homePageData, "hommeee");
  return (
    <div className="content">
      <h1 className="primary-heading">Welcome, {homePageData.name}</h1>
      <div className="cards">
        <Card
          cardTitle="Desktop License"
          item={homePageData.desktop_licenses}
          img={desktopLicImg}
          alt={"Desktop License"}
        />
        <Card
          cardTitle="Total Commission"
          item={homePageData.total_commission}
          img={totalCommImg}
          alt={"Total Commission"}
        />
        <Card
          cardTitle="Scheduled Demos"
          item={homePageData.demo_scheduled}
          img={scheduledDemoImg}
          alt={"Scheduled Demos"}
        />
        <Card
          cardTitle="Upcoming Renewals"
          item={homePageData.renewals}
          img={renewalImg}
          alt={"Upcoming Renewals"}
        />
      </div>
      <div className="content-main">
        <Graph
          commissionGraph={homePageData.commissionGraph || []}
          licenseGraph={homePageData.licenseGraph || []}
        />

        {/*   */}
        <div className="posters">
          <Poster />
          <Poster />
        </div>
      </div>
    </div>
  );
}

function Card({ cardTitle, item, img, alt }) {
  return (
    <button className="card">
      <div className="card-icon">
        <img src={img} alt={alt} />
      </div>
      <div className="card-data">
        <p className="card-title">{cardTitle}</p>
        <p className="card-title-value">{item}</p>
      </div>
    </button>
  );
}

function Graph({ commissionGraph, licenseGraph }) {
  return (
    <div className="graph">
      <GraphComponent
        commissionGraph={commissionGraph}
        licenseGraph={licenseGraph}
      />
    </div>
  );
}

function Poster() {
  const partnerBadge = [
    basicPartner,
    keyPartner,
    primePartner,
    strategicPartner,
    superStrategicPartner,
  ];

  return (
    <div className="poster">
      <div className="poster-text">
        <p className="poster-heading">You have sold $X licenses this month</p>
        <p className="poster-subtext">
          Sell $Y license more and become to level-up
        </p>
      </div>
      <div className="partner-badge">
        {partnerBadge.map((el) => {
          return (
            <div className="badge">
              <img src={el} alt="partner badges" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
