import React, {useState} from 'react'
import styles from './InputField.module.css'
import Button from '@material-ui/core/Button'
import Aux from '../../../Auxiliary/Auxiliary'
import SaveIcon from '@material-ui/icons/Save'
import DeleteIcon from '@material-ui/icons/Delete'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import FormatDate from './FormatDate'
import SubmitNewEntry from './EventHandlers/SubmitNewEntry'



const InputField = ({value}) => {
    const [shouldRender, setShouldRender] = useState(false)
    const [description, setDescription] = useState("")
    
    //function returns "20210309" (YYYYMMDD)
    const UUID = FormatDate({value});

    const saveEntry = () => {
        SubmitNewEntry(UUID, description);   
    }

    
        let textInput
        if (shouldRender) {
            textInput = (
            <div>
                <TextareaAutosize
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
                            onClick= { e => setShouldRender(!shouldRender)}
                            color = "secondary"
                            variant = "contained">
                                Discard
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
            onClick= {e => setShouldRender(!shouldRender)}
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
