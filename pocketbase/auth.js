import PocketBase from 'pocketbase';

const pb = new PocketBase('https://pocketbase.io');


const Auth = async () => {
     const authData = await pb.collection('users').authWithPassword('YOUR_USERNAME_OR_EMAIL', '1234567890');

     console.log(authData);
}


module.exports = { Auth };