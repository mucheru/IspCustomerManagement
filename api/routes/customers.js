const express = require('express')
const router = express.Router();
const Customer = require('../models/Customer')

router.get('/', async( req, res)=>{
    try{

        const customers = await Customer.find()
        res.json(customers)

    }
    catch(err){
        res.status(500).json({message: err.message})

    }

})

router.get('/customers',async(req,res)=>{
    const customers = await Customer.find();
    if(customers== null){
        return res.status(404).json({message:'no data found'    })
    }
    return res.json(customers);
})



router.post('/customers', async (req, res) => {
    const customer = new Customer({
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        location: req.body.location,
        subscribedToPackage: req.body.subscribedToPackage
    })
    try {
        const newCustomer = await customer.save()
        res.status(201).json(newCustomer)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})



async function getCustomer(req, res, next) {
    let customer
    try {
        customer = await Customer.findById(req.params.id)
        if (customer == null) {
            return res.status(404).json({ message: 'Cannot find customer' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.customer = customer
    next()
}


router.get('/getCustomerdetail/:id',async(req,res)=>{
    let customer    
   try{
     customer= await Customer.findById(req.params.id )
    if(customer==null){
        return res.status(404).json({message:'customer not available'})
    }
} catch(err){
    return res.status(500).json({message:err.message})
}
return res.json(customer);

})

/*router.get('/:id', getCustomer, (req, res) => {
    res.json(res.customer)
})
*/


router.patch('/customerupdate/:id', getCustomer, async (req, res) => {
    if (req.body.name != null) {
        res.customer.name = req.body.name
    }
    if (req.body.email != null) {
        res.customer.email = req.body.email
    }
    if (req.body.phoneNumber != null) {
        res.customer.phoneNumber = req.body.phoneNumber
    }
    if (req.body.location != null) {
        res.customer.location = req.body.location
    }
    if (req.body.subscribedToPackage != null) {
        res.customer.subscribedToPackage = req.body.subscribedToPackage
    }
    try {
        const updatedCustomer = await res.customer.save()
        res.json(updatedCustomer)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})



router.delete('/customers/:id', getCustomer, async (req, res) => {
   
 Customer.findByIdAndRemove(req.params.id,req.body)
 .then(customer=>res.json({msg:'customer removed'}))
 .catch(err=>res.status(404).json({error:'No customer found'}))

  
})


module.exports = router

