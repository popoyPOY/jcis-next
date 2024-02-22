"use client"

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import Swal from "sweetalert2";

export default function Client() {
     const router = useRouter();
     const [newName, setName] = useState('');
     const [newAmount, setAmount] = useState();
     const [newPlan, setPlan] = useState();

     const handleChange = (event) => {
          setPlan(event.target.value);
     }

     const onCreate = async(event) => {
          event.preventDefault();
          const response = await fetch(`http://127.0.0.1:8090/api/collections/clients/records/`, 
          {
               cache: "no-store", 
               method: 'POST',
               headers: {
                    'Content-Type': "application/json"
               },
               body: JSON.stringify({
                    name: newName,
                    active: true,
                    amount: newAmount,
                    plan: newPlan
               }),
          });
          const data = response.json();

          try {
               if (data) { 
                    Swal.fire({
                         title: "Customer Added",
                         text: "new customer has been added",
                         confirmButtonText: 'OK',
                         icon: "success"
                       }).then((result) => {
                         if(result.isConfirmed) {
                              router.refresh();
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
               <h2 className=" text-black text-2xl font-semibold mb-4">Create Client</h2>
               <form onSubmit={onCreate}>
               <div className="grid grid-cols-2 gap-4">
               <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Name:</label>
                    <input  required value={newName} onChange={(e) => setName(e.target.value)} type="text" id="firstName" name="firstName" className=" text-gray-700 t-1 tex-area p-2 w-full border rounded-md"></input>
               </div>
               </div>

               <div className="mt-4">
               <label  className="block text-sm font-medium text-gray-700">Amount</label>
               <input  required type="text" value={newAmount}  onChange={(e) => setAmount(e.target.value)} id="amount" name="amount" className=" text-gray-700 mt-1 p-2 w-full border rounded-md"></input>
               </div>


               <div className="mt-4">

               <label className="block text-sm font-medium text-gray-700">Plan</label>
               <select 
               className=" text-gray-700 mt-1 p-2 w-full border rounded-md"
               value={newPlan}
               onChange={handleChange}
               >
                    <option value="2000">2000</option>
                    <option value="1500">1500</option>
               </select>
               </div>
               

               <div className="mt-6">
               <button type="submit" className="w-full p-3 bg-green-500 text-white rounded-md hover:bg-green-700 my-2">Create</button>
               </div>
               </form>
               </div>
               </div>
     )
}