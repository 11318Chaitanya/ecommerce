import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        maxLength: 32,
        required: true, 
    }
})

const Category = new mongoose.model('Category', categorySchema);

export default Category;