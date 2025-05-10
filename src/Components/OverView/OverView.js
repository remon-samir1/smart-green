import React from "react";
import Boxes from "../Boxes/Boxes";
import AlarmsTable from "../AlarmsTable/AlarmsTable";
import Nav from "../NavBar/Nav";

const OverView = () => {
  return (
    <div>
      <Nav/>
      <Boxes />
      <AlarmsTable />
    </div>
  );
};

export default OverView;
