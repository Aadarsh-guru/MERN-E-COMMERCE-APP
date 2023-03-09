import categoryModel from "../models/categoryModel.js"
import slugify from 'slugify'

export const createCategoryController = async(req, res)=>{
    try {
        
        const { name } = req.body
        if (!name) {
           return res.status(401).send({message:'name is required'})
        }
        const existingCategory = await categoryModel.findOne({name})
        if (existingCategory) {
            return res.status(200).send({
                success: true,
                message:'Category Already Exist'
            })
        }
        const category = await new categoryModel({name, slug: slugify(name) }).save()

        res.status(201).send({
            success: true,
            message:'Category Created',
            category
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error in Category'
        })
    }
}


export const updateCategoryController = async(req, res)=>{
    try {
        const { name } = req.body
        const { id } = req.params
        const category = await categoryModel.findByIdAndUpdate(id,{name, slug:slugify(name)}, {new:true})
        res.status(200).send({
            success: true,
            message:'Category Updated',
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error in update Category'
        })
    }
}


export const categoryController = async(req,res)=>{
    try {
        const category = await categoryModel.find({})
        res.status(200).send({
            success: true,
            message:'All categories',
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error in fetching Category'
        })
    }
}


export const singleCategoryController = async(req,res)=>{
    try {
        const category = await categoryModel.findOne({slug:req.params.slug})
        res.status(200).send({
            success: true,
            message:'fetched single category',
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error in getting single Category'
        })
    }
}


export const deleteCategoryController = async(req,res)=>{
    try {
        await categoryModel.findByIdAndDelete(req.params.id)
        res.status(200).send({
            success: true,
            message:'deleted category'
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error in Delete Category'
        })
    }
}