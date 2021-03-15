export default function FormatDate ({value}) {
    //function takes the moment object, and converts the date to a string YYYYDDMM

    const clickedDate = value.toString()
        //this takes the moment object and returns a string

    const getMonthFromString = () => {
        //get month name from Moment();
        return clickedDate.slice(4,7);
    }

    //need to format the first part of this string => jan = 1 feb = 2
    const formatMonthToInt = () => {
        const month = getMonthFromString()
        if(month === "Jan") {
            return "01"
        }   if(month === "Feb") {
            return "02"
        }   if(month === "Mar") {
            return "03"
        }   if(month === "Apr") {
            return "04"
        }   if(month === "May") {
            return "05"
        }   if(month === "Jun") {
            return "06"
        }   if(month === "Jul") {
            return "07"
        }   if(month === "Aug") {
            return "08"
        }   if(month === "Sep") {
            return "09"
        }   if(month === "Oct") {
            return "10"
        }   if(month === "Nov") {
            return "11"
        }   if(month === "Dec") {
            return "12"
        } else {
            alert("wrong date information passed into function")
        }
    }

    //above function returns "03"

    //remember we need YYYYMMDD as format 
        

        const formatDateToString = () => {
            const monthToInt = formatMonthToInt(); //returns MM
            const dayAndYearToString = 
                (clickedDate.slice(11,15) + clickedDate.slice(8,10)) //should return "202130" YYYYDD
            //key string for DB
            const formattedDate = dayAndYearToString + monthToInt;
            return formattedDate
        }

    return formatDateToString()
}