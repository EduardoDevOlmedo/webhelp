import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { IWord } from '../../../interfaces';
import { Word } from '../../../models';

type Data = 
|{message: string}
| IWord[]
| IWord

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getWords(req, res);
        case 'POST':
            return addWord(req, res);
        case 'DELETE':
            return deleteWord(req, res);  
        default:
            return res.status(400).json({message: 'Bad request method'})
    }
}


const getWords = async(req: NextApiRequest, res: NextApiResponse<Data>) => {



    try {
        const words = await Word.find().sort({ _id: -1 }).limit(Number(req.query!.size!));
        return res.status(200).json(words)
    } catch (error) {
        return res.status(400).json({message: 'An error has ocurred'})
    }    



}

const deleteWord = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    const {id = ""} = req.body
    
    await db.connect()

    try {
        await Word.findByIdAndDelete(id)
        return res.status(200).json({message: "Deleted succesfully"})
    } catch (error) {
        console.log(error)
        return res.status(400).json({message: 'An error has ocurred'})
    }


}


const addWord = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    const {word = '', meaning = []} = req.body

    await db.connect();

    try {
        const newWord = new Word({
            word, meaning
        })
        await newWord.save({validateBeforeSave: true})
        return res.status(201).json(newWord)
    } catch (error) {
        await db.disconnect()
        console.log(error)
        return res.status(400).json({message: "Couldn't add this word."})

    }

}
