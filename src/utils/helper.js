import { GithubAuthProvider, signInWithRedirect } from 'firebase/auth';
import {auth} from "../config/firebase.config";
import { GoogleAuthProvider } from 'firebase/auth';
import {v4 as uuidv4} from "uuid";
const googleProvider=new GoogleAuthProvider()
const githubProvider= new GithubAuthProvider()
export const signINWithGoogle= async()=>{
    await signInWithRedirect(auth,googleProvider).then((userCred) =>{
        console.log(userCred);
        window.location.reload();
    });
}
export const signINWithGithub= async()=>{
    await signInWithRedirect(auth,githubProvider)
    .then((userCred) =>{
        console.log(userCred)
        window.location.reload();
    });
}
export const Menus=[
    { id: uuidv4(),name:"Project",uri:"/home/projects"},
    { id: uuidv4(),name:"Collections",uri:"/home/collection"},
    { id: uuidv4(),name:"Profile",uri:"/home/profile"}
];

export const signOutAction= async()=>{
    await auth.signOut()
    .then(()=>{
        window.location.reload();
    })
    .catch((err)=>{
        console.log(err);
    })

}



