import Image from "next/image";
import Statistics from "./Statistics";
import TableContent from "./TableContent";
import Link from "next/link";

const clients = async() => {

  const response = await fetch('http://127.0.0.1:8090/api/collections/clients/records?perPage=1000', {cache: "no-store"});
  const data = await response.json();
  return data.items;
}

export default async function Home() {
  const client = await clients();
  return (
    <section>
      <div>
        <Statistics/>
      </div>

      <div className="flex items-center justify-center my-5">
        <h2>List Of Clients</h2>
      </div>

      <div className=" overflow-scroll flex items-center  justify-start flex-col">
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
                  <TableContent key={cc.id} client={cc} number={key} />
                );
              })
            }
            </tbody>
            </table>
          </div>
          
    </section>
  );
}
