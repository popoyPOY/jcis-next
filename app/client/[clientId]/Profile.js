"use client"

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { redirect } from 'next/navigation'
import Swal from "sweetalert2";

export default function Profile({ data }) {
     const router = useRouter();
     const {id, name, active, amount, created, plan, updated} = data;
     const [newName, setName] = useState('');
     const [isActive, setActive] = useState(active);
     const [newAmount, setAmount] = useState();
     const [newPlan, setPlan] = useState();


     useEffect(()=> {
          const isExist = async() => {
               const response = await fetch(`http://127.0.0.1:8090/api/collections/clients/records/${id}`)
               const status  = response.status;
               (status == 404) ? router.push('/') : router.refresh();
          }
          isExist()
     }, [])

     const handleChange = (event) => {
          setPlan(event.target.value);
     }
     
     const handleActiveChange = (event) => {
          setActive(event.target.value);
     }

     const onDelete = async() => {
          const response = await fetch(`http://127.0.0.1:8090/api/collections/clients/records/${id}`, {cache: "no-store", method: 'DELETE'});

          router.push('/client');
     }    

     const onUpdate = async() => {
          const response = await fetch(`http://127.0.0.1:8090/api/collections/clients/records/${id}`, 
          {
               cache: "no-store", 
               method: 'PATCH',
               headers: {
                    'Content-Type': "application/json"
               },
               body: JSON.stringify({
                    active: isActive,
                    amount: newAmount,
                    plan: newPlan
               }),
          });
          const data = response.json();
          try {
               if (data) { 
                    Swal.fire({
                         title: "Customer updated",
                         text: "new customer has been updated",
                         confirmButtonText: 'OK',
                         icon: "success"
                       }).then((result) => {
                         if(result.isConfirmed) {
                              router.back();
                         }
                       });
               }
          } catch (e) {
               Swal.fire({
                    title: "Something went wrong",
                    text: "error has been occurred",
                    confirmButtonText: 'OK',
                    icon: "error"
                  });
          }
     }

     return (
          <div className="bg-black-100 min-h-screen flex items-center justify-center ">
          <div className="bg-white p-8 rounded shadow-md max-w-md w-full mx-auto">
               <h2 className=" text-black text-2xl font-semibold mb-4">Change Information</h2>
               <form>
               <div className="grid grid-cols-2 gap-4">
               <div>
                    <label className="block text-sm font-medium text-gray-700">ID</label>
                    <input value={id} onChange={(e) => setName(e.target.value)}  type="text" id="firstName" name="firstName" className=" text-gray-700 mt-1 p-2 w-full border rounded-md" disabled ></input>
               </div>
               <div>
                    <label className="block text-sm font-medium text-gray-700">Name:</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" id="firstName" name="firstName" className=" text-gray-700 t-1 tex-area p-2 w-full border rounded-md" disabled></input>
               </div>
               </div>

               <div className="mt-4">
               <label  className="block text-sm font-medium text-gray-700">Amount: {amount}</label>
               <input required type="text" value={newAmount}  onChange={(e) => setAmount(e.target.value)} id="amount" name="amount" className=" text-gray-700 mt-1 p-2 w-full border rounded-md"></input>
               </div>


               <div className="mt-4">

               <label className="block text-sm font-medium text-gray-700">Plan: {plan}</label>
               <select
               required 
               className=" text-gray-700 mt-1 p-2 w-full border rounded-md"
               value={newPlan}
               onChange={handleChange}
               >
                    <option value="2000">2000</option>
                    <option value="1500">1500</option>
               </select>
               </div>

               <div className="mt-4">
               <label className="block text-sm font-medium text-gray-700">Active: {(active) ? <span className=" text-green-600">Active</span> : <span className=" text-red-600">Deactivated</span> }</label>
               <select 
               required
               className=" text-gray-700 mt-1 p-2 w-full border rounded-md"
               value={isActive}
               onChange={handleActiveChange}
               >
                    <option value="true">true</option>
                    <option value="false">false</option>
               </select>
               </div>

               <div className="mt-4">
               <label className="block text-sm font-medium text-gray-700">Created Date:</label>
               <input value={created}  onChange={(e) => setName(e.target.value)} type="text" id="date" name="date" className="text-gray-700 mt-1 p-2 w-full border rounded-md" disabled></input>
               </div>

               <div className="mt-4">
               <label className="block text-sm font-medium text-gray-700">Updated At:</label>
               <input value={updated}  onChange={(e) => setName(e.target.value)} type="text" id="date" name="date" className="text-gray-700 mt-1 p-2 w-full border rounded-md" disabled></input>
               </div>

               <div className="mt-6">
               <button onClick={(e) => {
                    e.preventDefault();
                    onUpdate();
               }} type="submit" className="w-full p-3 bg-green-500 text-white rounded-md hover:bg-green-700 my-2">Save</button>
               <button onClick={(e) => {
                    e.preventDefault();
                    onDelete();
               }} type="submit" className="w-full p-3 bg-red-500 text-white rounded-md hover:bg-red-700">Delete Customer</button>
               </div>
               </form>
               </div>
               </div>
     )
}