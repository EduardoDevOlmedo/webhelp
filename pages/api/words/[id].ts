import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { IWord } from '../../../interfaces';
import { Word } from '../../../models';

type Data = 
|{message: string}
| IWord

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'PUT':
            return updateWord(req, res);  
        default:
            return res.status(405).json({message: 'Bad request method'})
    }


}


const updateWord = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    const {id = ""} = req.query
    const {word = '', meaning = []} = req.body; 

    console.log("Editado")

    await db.connect();

    try {
        const updatedWord = await Word.findByIdAndUpdate(id, {
            word, meaning
        }, {runValidators: true, new: true})
        return res.status(200).json({message: "Updated " + updatedWord})
    } catch (error) {
        console.log(error)
        return res.status(400).json({message: 'An error has ocurred'})
    }

}

