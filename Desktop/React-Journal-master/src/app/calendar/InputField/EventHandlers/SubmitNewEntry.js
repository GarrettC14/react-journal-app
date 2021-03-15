export default function SubmitNewEntry (date, description) {

    const submitNewEntry = async() => {
        try {
            console.log('button clicked!')
            const body = {date, description}
            const response = await fetch("http://localhost:5000/entry", {
                method : "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(body)
            })

        } catch (err) {
            console.error(err.message)
        }
    }
    return submitNewEntry()
}
    

