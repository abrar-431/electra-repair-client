import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from "../Firebase/firebase.config";

export const AuthContext = createContext(null);
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const auth = getAuth(app);
    const [theme, setTheme] = useState(localStorage.getItem('local-theme') || 'light');
    useEffect(() => {
        localStorage.setItem('local-theme', theme);
        const localTheme = localStorage.getItem('local-theme');
        document.querySelector('html').setAttribute('data-theme', localTheme);
    }, [theme])

    const signUp = (email, password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const signIn = (email, password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    const googleProvider = new GoogleAuthProvider();
    const googleSignIn = () =>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }
    const logOut = ()=>{
        setLoading(true);
        return signOut(auth);
    }
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, currentUser=>{
            setUser(currentUser);
            setLoading(false);
        })
        return ()=>{
            unsubscribe();
        }
    },[auth])
    const AuthInfo = {
        user,
        loading,
        signIn,
        signUp,
        logOut,
        googleSignIn,
        auth,
        theme, setTheme
    }
    return (
        <AuthContext.Provider value={AuthInfo}>
            {children}
        </AuthContext.Provider >
    );
};

export default AuthProvider;
AuthProvider.propTypes = {
    children: PropTypes.node,
}