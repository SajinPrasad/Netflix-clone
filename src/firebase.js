// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1KAxlJds4lPnw6dSMzWMoQkOoNTbKSNU",
  authDomain: "netflix-clone-df78b.firebaseapp.com",
  projectId: "netflix-clone-df78b",
  storageBucket: "netflix-clone-df78b.appspot.com",
  messagingSenderId: "154331578082",
  appId: "1:154331578082:web:b1091ebac25255455ba8bb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signUp = async (name, email, password) => {
    try{
        const response = await createUserWithEmailAndPassword(auth, email, password)
        const user = response.user
        await addDoc(collection(db, 'users', {
            uid : user.uid,
            name,
            authProvider : 'local',
            email,
        }));
        return true
    } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(' '))
        return false
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(' '))
    }
}

const logout = () => {
    signOut(auth);
}

export {auth, db, login, signUp, logout}