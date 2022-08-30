import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../database'
import { IWord } from '../../interfaces';
import { Word } from '../../models';

type Data = {
    message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    if(process.env.NODE_ENV === "production"){
        return res.status(401).json({
            message: "No tiene acceso a este servicio"
    })}  

    await db.connect();

    await Word.deleteMany();
    const testValues: IWord[] = [
        {
            word: 'Pizza',
            meaning: [
                'A dish made typically of flattened bread dough spread with a savory mixture usually including tomatoes and cheese and often other toppings and baked',
                'Flat, open-faced baked pie of Italian origin, consisting of a thin layer of bread dough topped with spiced tomato sauce and cheese',
                'A pizza is a flat, round piece of dough covered with tomatoes, cheese, and other savoury food, and then baked in an oven.'
            ]
        },
        {
            word: 'Hamburger',
            meaning: [
                'A round patty of ground beef, fried or grilled and typically served on a bun or roll and garnished with various condiments.',
                'A sandwich consisting of a cooked patty of ground or chopped beef, usually in a roll or bun, variously garnished.',
                'Ground or chopped beef.',
            ]
        },
    ]


   try {
    await Word.insertMany(testValues)
    return res.status(201).json({message:'Succesfully added the seed values to the db.'})

   } catch (error) {
    console.log(error)
    await db.disconnect();
    return res.status(400).json({message: 'Error ocurred'})
   }

}
