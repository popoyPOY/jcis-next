"use client"
import Link from "next/link";

export default function TableContent({ client, number }) {
    const {id, name, amount, active, plan, created, updated} = client;

    const createdDate = new Date(created).toLocaleDateString();
    const updatedDate = new Date(updated).toLocaleDateString();
    
     return (
        <tr className="bg-black border-b dark:bg-gray-800 dark:border-gray-700">
            <td className="py-4 px-6">{number + 1}</td>
            <td className="py-4 px-6">{name}</td>
            <td className="py-4 px-6">{plan}</td>
            <td className="py-4 px-6">{amount}</td> 
            <td className="py-4 px-6">{(active) ? "True" : "False"}</td>
            <td className="py-4 px-6">{createdDate}</td>
            <td className="py-4 px-6">{updatedDate}</td>
            <td className="py-4 px-6">
                <Link className=" hover:font-bold w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-700 my-2" href={`/client/${id}`}>Edit</Link>
            </td>
        </tr>
     );
}