
import Client from "./Client";
import TableContent from "../TableContent";
const clients = async() => {

     const response = await fetch('http://127.0.0.1:8090/api/collections/clients/records', {cache: "no-store"});
     const data = await response.json();
     return data.items;
   }


export default async function page() {

     const client = await clients();    
     return (
          <div className=" flex justify-center">
               <div className="mx-10">
                    <Client/>
               </div>

          {/* for CLIENT LIST*/}     
          <div className="flex items-center justify-center flex-col">
            <h2 className=" py-5">Client List</h2>
            <table>
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="py-3 px-6">Number</th>
                    <th scope="col" className="py-3 px-6">Person</th>
                    <th scope="col" className="py-3 px-6">Plan</th>
                    <th scope="col" className="py-3 px-6">Amount Paid</th>
                    <th scope="col" className="py-3 px-6">Approved</th>
                    <th scope="col" className="py-3 px-6">Created</th>
                    <th scope="col" className="py-3 px-6">Updated</th>
                    <th scope="col" className="py-3 px-6">Option</th>
                </tr>
            </thead>
            <tbody>
            {
              client.map((cc, key) => {
                return (
                  <TableContent key={cc.id} client={cc} number={key}  />
                );
              })
            }
            </tbody>
            </table>
          </div>
          </div>
     );
}