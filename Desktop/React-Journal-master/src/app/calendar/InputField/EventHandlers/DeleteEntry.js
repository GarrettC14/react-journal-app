export default function DeleteEntryFromDB (UUID) {
    const date_id = UUID
    const deleteFromDB = async() =>  {
        try {
            const deleteEntry = await fetch(`http://localhost:5000/entry/${date_id}`, {
                method : "DELETE"
            })
        } catch (err) {
            console.error(err.message)
        }
    }
    return deleteFromDB()
}