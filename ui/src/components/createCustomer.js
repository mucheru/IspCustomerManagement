import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';



import { Paper, Typography, } from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import {useState} from 'react';
import axios from "axios";

export default function CreateCustomer() {
    const paperStyle = { padding: '30px 20px', height: '500px', width: '500px', margin: "20px auto" }
    const headerStyle = { margin: 0, fontWeight:"800" }
    const marginTop = { marginTop: 15 }
    const options = [
        {
            label: "5 Mbps",
            value: "5 Mbps",
        },
        {
            label: "10 Mbps",
            value: "10 Mbps",
        },
        {
            label: "20 Mbps",
            value: "20 Mbps",
        },
        {
            label: "40 Mbps",
            value: "40 Mbps",
        },
    ];
    const [value, setValues] = useState(['']);

    const handleChange = (event) => {
        setValues(event.target.value);
      };

    const [customer, setCustomer] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        location:"",
        subscribedToPackage: "",

        });
      
    const createCustomer = () => {
    axios.post("http://localhost:5000/customers", customer).then((response) => {       
        console.log(response.data)
        })
        .catch((error)=>{
            console.error(error)
        })
    };
    
    return (
        <div>   
    <label htmlFor="name">Name</label>
        <input type="text" id="name" value={customer.name}  onChange={(e) => setCustomer({...customer, name: e.target.value })}  />
        <label htmlFor="name">Email</label>
        <input type="text" id="email" value={customer.email}  onChange={(e) => setCustomer({...customer, email: e.target.value })}  />
        <label htmlFor="Phone">Phone number</label>


        <input type="text" id="phone" value={customer.phoneNumber}  onChange={(e) => setCustomer({...customer, phoneNumber: e.target.value })}   placeholder='enter phone number'/>
        <label htmlFor="name">Location</label>

        <input type="text" id="phone" value={customer.location}  onChange={(e) => setCustomer({...customer, location: e.target.value })}   placeholder='enter location'/> 
        <label>subscribedToPackage</label>
        <select  name=" subscribedToPackage" value={customer.subscribedToPackage} onChange={(e)=>setCustomer({...customer,subscribedToPackage:e.target.value})}>
        {options.map((option) => (           
            
    <option key={option.value} value={option.value}>{option.label}</option>  ))
}
        </select> 
  
    <button type='submit' variant='contained' color='primary' style={marginTop} 
    onClick={createCustomer}>Submit</button>

</div>
       
    )
}
