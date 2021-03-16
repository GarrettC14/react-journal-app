import React, {useState} from 'react'

export default function GetEntryFromDB (UUID, setDescription)  {
    //function needs to return the string data of description row
    const date_id = UUID;

    //if getOneEntry returns [object Promise] , return without doing anything

    const getOneEntry = async() => {
        try{
            const result = await fetch(`http://localhost:5000/entry/${date_id}`)
            const data = await result.json()
            if(data ) {
                setDescription("")
            } else {
                const dataForState = data.description
                setDescription(dataForState)
                console.log(dataForState)
            }

        } catch(err) {
            console.error(err.message)
        }
    }
    return getOneEntry()
}