const express = require('express')
const app = express();
const cors = require("cors")
const {Pool} = require("pg")
// import "reflect-metadata"
//nodemon also installed
  //to use it, run : npx nodemon

//middleware
app.use(cors());
app.use(express.json()); //req.body
const port = 5000


//connection to DB
const pool = new Pool({
    user: "postgres", 
    //this is for windows, below for mac
    //user: "daiyan",
    password: "12345",
    host: "localhost",
    port: 5432,
    database: "journal"
});

app.listen(port, ()=> {
  console.log('listening on port 5000')
})

//Higher Order Goals
  //CRUD 


app.get('/entry', async(req, res) => {
  try{
    //here is where the pool is called on
    const allEntries = await pool.query("SELECT * FROM journalentry")
    console.table(allEntries.rows)
    res.send(allEntries.rows)
  } catch(err) {
    console.error(err.message)
  }
})

//get one entry by date

app.get('/entry/:date_id', async (req, res) => {
  try{
    const {date_id} = req.params
    const getOneEntry = await pool.query("SELECT * FROM journalentry WHERE date = $1", 
      [date_id])
    res.json(getOneEntry.rows[0])
  } catch(err){
    console.error(err.message)
  }
})

//create a new entry into the DB

app.post('/entry', async(req, res) => {
  try{
    const {date} = req.body
    const {description} = req.body
    //const {label} = req.body

    //if {date exists, then return?}

    const createEntry = await pool.query("INSERT INTO journalentry (date, description) VALUES ($1, $2) RETURNING *", 
      [date, description])
        //label can be added later

    res.json(createEntry.rows[0])
  } catch(err){
    console.error(err.message)
  }
})

//update description in an entry

app.put('/entry/description/:date_id', async(req, res) => {
  try{
    const {date_id} = req.params
    const {description} = req.body 
    const updateEntry = await pool.query("UPDATE journalentry SET description = $1 WHERE date = $2 RETURNING *", 
      [description, date_id])
    res.json(updateEntry.rows[0])
  } catch(err){
    console.error(err.message)
  }
})

//update label in an entry

app.put('/entry/label/:date_id', async(req, res) => {
  try{
    const {date_id} = req.params
    const {label} = req.body
    const updateEntry = await pool.query("UPDATE journalentry SET label = $1 WHERE date = $2 RETURNING *", 
      [label, date_id])
    res.json(updateEntry.rows[0])
  } catch (err) {
    console.error(err.message)
  }
})

//delete entry from DB

app.delete('/entry/delete/:date_id', async(req, res) => {
  try{
    const {date_id} = req.params
    const deleteEntry = await pool.query("DELETE FROM journalentry WHERE date = $1", [date_id])
    res.send("entry deleted")
  } catch (err) {
    console.error(err.message)
  }
})