function isSelected(day, value) {
    return value.isSame(day, "day")
  }

  function beforeToday(day) {
    return day.isBefore(new Date(), "day")
  }

  function isToday(day) {
    return day.isSame(new Date(), "day")
  }

  export default function dayStyles(day, value) {
    // if (beforeToday(day)) return "before" 
    if (isSelected(day, value)) return "selected" 
    if (isToday(day)) return "today" 
    return ""
  } 

  //this is where the styles are added to the client. 

    //I imageine here is where I would add the label

//https://www.toptal.com/front-end/dynamic-css-with-custom-properties => reference this for the CSS -- syntax for variable styling