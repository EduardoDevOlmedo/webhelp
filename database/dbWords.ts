import {Word} from "../models"
import {db} from "."
import { capitalize } from "@mui/material"

export const getWordByTerm = async(query: string) => {
    console.log(query)
    query = capitalize(query.toString())
        

    await db.connect()

    const words = await Word.find({
        $text: {$search: query}
    }).select("_id word meaning")

    await db.disconnect()


    return JSON.parse(JSON.stringify(words));
}

export const getWordById = async(id: string) => {
    id = id.toString()

    await db.connect()

    const foundWord = await Word.findById(id)

    await db.disconnect()

    return JSON.parse(JSON.stringify(foundWord));

}