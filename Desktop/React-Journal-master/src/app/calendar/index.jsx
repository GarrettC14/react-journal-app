import React, {useState, useEffect} from "react";
import './Styles/styles.css'
import buildCalendar from './build'
import dayStyles from './Styles/styles'
import CalendarHeader from './header'
import Aux from '../../Auxiliary/Auxiliary'
import InputField from './InputField/InputField'

export default function Calendar({value, onChange}) {
  const [calendar, setCalendar] = useState([])

  useEffect(() => {
    setCalendar(buildCalendar(value))
  }, [value])


  return (
    <Aux>
      <div className ="calendar">
        <CalendarHeader value = {value} onChange = {onChange} />
        <div className ="body">
          <div className="day-names">
            {
              ["s", "m", "t", "w", "t", "f", "s"].map((d) => (
              <div className="week">{d}</div>
              ))}
          </div>
            {calendar.map((week)=> (
              <div> 
                {week.map((day) => (
                  <div className="day" onClick = {() => onChange(day)}> 
                  <div 
                    className={dayStyles(day, value)}>
                    {day.format("D").toString()} 
                  </div>
                </div>
                ))}
              </div>
            ))}
          </div>
      </div>
      <InputField value = {value}/>
    </Aux>
  )
}