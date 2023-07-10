import axios from 'axios';
import React from 'react'
import { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom';


export default function EditCustomer(props) {
    const [customer, showCustomer] = useState([]);
    const { id } = useParams();
    
   const data = useEffect(()=>{
         axios.get(`http://localhost:5000/getCustomerdetail/${id}`).then((customer)=>{
            showCustomer(customer.data)
        })
    })

    const updateCustomer = () => {
        axios.patch((`http://localhost:5000/customerupdate/${id}`), customer).then((customer) => {
            showCustomer(customer.data)
            window.alert('Successfully Edited')    
        })
    }

   
    return (
        <>
                    <label>Name</label>
                    <input type="text" id="name" placeholder='Enter your name ' value={customer.name} onChange={(e) => showCustomer({ ...customer, name: e.target.value })}/>
                    
               
                     <input type="text" id="email" placeholder='Enter your Email' value={customer.email} onChange={(e) => showCustomer({ ...customer, email: e.target.value })}/>
                     <label>Phone</label>  
                     <input type="number" id="number" placeholder='Enter your Phone number' value={customer.phoneNumber} onChange={(e) => showCustomer({ ...customer, phoneNumber: e.target.value })}/>
                     <label>Location</label>  
                     <input type="text" id="number" placeholder='Location' value={customer.location} onChange={(e) => showCustomer({ ...customer, location: e.target.value })}/>
                     <label>Subscription</label> 
                    <input type="text" id="subscription" placeholder='subscription' value={customer.subscribedToPackage}     onChange={(e) => showCustomer({ ...customer, subscribedToPackage: e.target.value })}/>
                    <button type='submit' onClick={updateCustomer}> Update </button>
        </>
             
          
        )
    }