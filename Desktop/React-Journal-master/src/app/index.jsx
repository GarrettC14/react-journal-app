import React, {useState} from "react";
import "./styles.css";
import moment from "moment"
import Calendar from "./calendar";
import Aux from '../Auxiliary/Auxiliary'

export default function () {
  const [value, setValue] = useState(moment());
  

  return (
    <Aux>
      <Calendar value ={value} onChange={setValue}/>
    </Aux>
    );
}
