
import Profile from "./Profile";
import { notFound } from 'next/navigation'


const profile = async(clientId) => {
     const response = await fetch(`http://127.0.0.1:8090/api/collections/clients/records/${clientId}`, {cache: "no-store"});
     const data = response.json();
     if (response.status == 404) {
          notFound()
     } else {
       return data;
     }
}



export default async function Client({ params }) {

     const clientId = params.clientId;

     const client = await profile(clientId);

     return (
          <div>
               <Profile data={client}/>
          </div>
     );
}