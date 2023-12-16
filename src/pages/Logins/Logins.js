import { useEffect, useState } from "react";
import AgGrid from "../../components/AgGrid";

export default function Logins() {
  const [logins, setLogins] = useState([] || "true");
  useEffect(() => {
    // fetch("http://127.0.0.1:7000/logins")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     const obj = [...logins, ...data];
    //     setLogins(obj);
    //   });
  }, []);
  return (
    <div className="content">
      <h1 className="primary-heading">Logins Overview</h1>
      <AgGrid obj={logins} type={"logins"} />
    </div>
  );
}
