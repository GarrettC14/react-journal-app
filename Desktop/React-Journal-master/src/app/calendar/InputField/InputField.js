import React, {useState, useEffect} from 'react'
import styles from './InputField.module.css'
import Button from '@material-ui/core/Button'
import Aux from '../../../Auxiliary/Auxiliary'
import SaveIcon from '@material-ui/icons/Save'
import DeleteIcon from '@material-ui/icons/Delete'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import FormatDate from './FormatDate'
import SubmitNewEntry from './EventHandlers/SubmitNewEntry'
import DeleteEntryFromDB from './EventHandlers/DeleteEntry'
import GetEntryFromDB from './EventHandlers/GetEntryFromDB'



const InputField = ({value}) => {
    const [shouldRender, setShouldRender] = useState(false)
    const [description, setDescription] = useState("")
    
    //function returns "20210309" (YYYYMMDD)
    const UUID = FormatDate({value});

    const saveEntry = () => {
        SubmitNewEntry(UUID, description);   
    }


    const deleteEntry = () => {
        DeleteEntryFromDB(UUID)
        setDescription("")
    }

    const getEntry = () => {
        const descriptionData =  GetEntryFromDB(UUID, setDescription) //this should return description : string, which can use to setDescription
        return (setDescription(descriptionData))
    }

    const renderTextFeild = () => {
        setShouldRender(!shouldRender)
        getEntry()
    }

    useEffect(() => {
        getEntry();
    }, [value])
    
        let textInput
        if (shouldRender) {
            textInput = (
            <div>
                <TextareaAutosize
                //when this renders, call on getEntry?
                value = {description}
                onChange = {e => setDescription(e.target.value)} 
                style = {{
                    margin:"auto",
                    display:"flex",
                    width:"60%",
                    height:"125px",
                    marginTop:"10px"
                }}
                />
                    <div className ={styles.CenterButton}>
                        <Button
                            onClick = {e => saveEntry()} 
                            startIcon={<SaveIcon/>}
                            color = "primary"
                            variant = "contained">
                                Save
                        </Button>
                        <Button 
                            startIcon={<DeleteIcon/>}
                            onClick= { e => deleteEntry()}
                            color = "secondary"
                            variant = "contained">
                                Discard
                        </Button>
                        <Button 
                            startIcon={<DeleteIcon/>}
                            onClick= { e => getEntry()}
                            color = "secondary"
                            variant = "contained">
                                test this
                        </Button>
                    </div>
            </div>)
        } else {
            textInput = null
        }

    return(
        <Aux>
        <div>
            <Button 
            variant="contained" 
            color = "primary" 
            onClick= {e => renderTextFeild()}
            size = "medium"
            style={{
                margin: "auto",
                display: "flex",
                marginTop:"10px"
             }}>
                Create New Entry
            </Button>
        </div>
        <div>{textInput}</div>
    </Aux>
    )
}

export default InputField
