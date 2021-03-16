import "reflect-metadata";
import {createConnection, getRepository} from "typeorm";
import {User} from "./entity/User";
import {Request, Response} from "express"
import * as express from "express";
import {JournalEntry} from "./entity/JournalEntry"
const bodyParser = require("body-parser")

createConnection().then(async connection => {
    const app = express();
    const port = 5000;
    const cors = require("cors")
    app.use(express.json());
    app.use(bodyParser.json());
    app.use(cors());
    const connectToDB = await getRepository(JournalEntry);

    app.listen(port, () => {
        console.log("listning on port 5000 !")
    })

    //get all entries (won't ever use this in the app, just for reference)

    app.get("/entry", async(req : Request, res : Response) => {
        try{        
            res.send( await connectToDB.find())
            console.log( await connectToDB.find())
        } catch (err) {
            console.error(err.message)
        }
    })

    //get one entry by date (via http)

    app.get('/entry/:date_id', async (req : Request, res : Response) => {
        try{
            const date_id = req.params.date_id;
            const result = await connectToDB.findOne({date : date_id})
            console.log(result)
            res.send(result)            
        } catch(err){
        console.error(err.message)
        }
    })

    app.delete("/entry/:date_id", async(req : Request, res : Response) => {
        try {
            const param = req.params //this returns {date_id : '20211603}
            const deleteEntry = await connectToDB
                .createQueryBuilder()
                .delete()
                .from(JournalEntry)
                .where("date = :date_id", {date_id : param.date_id})
                .execute();
                
            const getAllEntries = await connectToDB.find()
            console.log('complete list of entries', getAllEntries)
            res.send(getAllEntries)
        } catch (err) {
            console.error(err.message)
        }
    })


    //create a new entry / if exists, update the description

    app.post('/entry', async(req : Request, res : Response) => {
        try{
            //create new entry   
            //check for existing entry in DB
            const date_id = req.body.date
            const {description} = req.body

            const getOneEntryForIdParam = await connectToDB.findOne({date : date_id})
                //if code above returns undefined, it means that there is no entry for this date

                //if it does not return undefined, it means there is already an entry saved in the DB
                    //here we update the description column of the entry
                if(getOneEntryForIdParam !== undefined){
                    const entry_ID = getOneEntryForIdParam.id //returns ID for entry
                    const updateEntry = await connectToDB.findOne({id : entry_ID})
                    //updateEntry is the entry, how do we re-asign the description?

                    connectToDB.merge(updateEntry, req.body)
                    const results = await connectToDB.save(updateEntry);

                    //to confirm the update happens
                    const updatedEntry = await connectToDB.findOne({id : entry_ID})
                    console.log("the entry for this date has been updated to", updateEntry)
                    return res.send(results);
                } else /* new data, needs to be saved */ {
                    const journalentry = new JournalEntry()

                    journalentry.date = date_id;
                    journalentry.description = description
                    journalentry.label = 'test'

                    await connectToDB.save(journalentry)
                    console.log('new entry has been saved!', journalentry)
                    res.send(journalentry)   
                }
        } catch (err) {
            console.error(err.message)
        }
    })

}).catch(error => console.log(error));
