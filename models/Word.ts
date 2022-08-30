import mongoose, { Schema, model, Model } from 'mongoose';
import { IWord } from '../interfaces';



const wordSchema = new Schema({
    word: {type: String, unique: true, required: true},
    meaning: {
        type: [String], 
        required: true,
        validate : {
            validator : function(array: Array<string>) {
              return array.length >= 1 && array.length <= 3
            },
            message: (props: any) => `${props.value} is not a valid meaning length`
        }
    },
})

wordSchema.index({word: 'text'})


export const Word: Model<IWord> = mongoose.models.Word || model('Word', wordSchema)