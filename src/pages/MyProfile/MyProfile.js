import { useEffect, useState } from "react";
import MedalImg from "../../assets/medals.png";

export default function MyProfile() {
  const [profile, setProfile] = useState([] || "true");
  useEffect(() => {
    // fetch("http://127.0.0.1:7000/my-profile")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     const obj = [...data];
    //     setProfile(obj[0]);
    //     // console.log(data, "profile");
    //   });
    const obj = [
      {
        referral_code: "BAQ1G9",
        partner_type: "key",
        account_holder_name: "Husaini Aamir",
        account_number: "501994003323100",
        ifsc_code: "HDFC0008641",
        pan_no: "AFDPH8117M",
        gstin: "Not Provided",
      },
    ];
    setProfile(obj[0]);
  }, []);
  console.log(profile, "profile");
  return (
    <div className="content">
      <h1 className="primary-heading">My Profile</h1>
      <div className="profile-container">
        <ProfileHeader />
        <div className="profile-content">
          <ProfileContent profile={profile} />
          <div className="profile-hero-image">
            <img src={MedalImg} alt="Medal Icon" />
          </div>
        </div>

        {/* <img src={MedalImg} alt="Medal Icon" /> */}
      </div>
    </div>
  );
}

function ProfileHeader() {
  return (
    <div className="profile-header">
      <div>
        <p className="title">EMAIL</p>
        <h2 className="secondary-heading">peter.parker@gmail.com</h2>
      </div>
      <div>
        <p className="title">PHONE</p>
        <h2 className="secondary-heading">+91 9336234586</h2>
      </div>
    </div>
  );
}

function ProfileContent({ profile }) {
  // const pan = "AB2343CDF";
  return (
    <div className="profile-info-content">
      <div className="profile--flex">
        <ProfileInformation title="PAN NUMBER" value={profile.pan_no} />
        <ProfileInformation
          title="ACCOUNT NUMBER"
          value={profile.account_number}
        />
      </div>

      <div className="profile--flex">
        <ProfileInformation
          title="BANK ACCOUNT HOLDER NAME"
          value={profile.account_holder_name}
        />
        <ProfileInformation title="IFSC CODE" value={profile.ifsc_code} />
      </div>

      <div className="profile--flex">
        <ProfileInformation title="BANK NAME" value={"TODO"} />
        <ProfileInformation title="GST NUMBER" value={profile.gstin} />
      </div>
    </div>
  );
}

function ProfileInformation({ title, value }) {
  return (
    <div>
      <p className="title">{title}</p>
      <input className="input" type="text" disabled value={value} />
    </div>
  );
}
