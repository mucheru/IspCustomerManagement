import logo from './logo.svg';
import './App.css';
import { Routes,Route } from 'react-router-dom';
import CreateCustomer from './components/createCustomer';
import CustomerList from './components/customerList';
import EditCustomer from './components/editCustomer';
function App() {
  return (
    <Routes>
     <Route path="/customer" element={<CreateCustomer />} />
     <Route path='/customerlist' element={<CustomerList />} />
     <Route path='/edit/:id' element={<EditCustomer />} />



    </Routes>
    
  );
}

export default App;
