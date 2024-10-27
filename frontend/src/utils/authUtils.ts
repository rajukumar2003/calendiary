import { auth, db, googleProvider } from '../firebaseConfig';
import { getIdToken, signInWithPopup } from 'firebase/auth';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { toast } from 'sonner';

export const GoogleSignIn = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;

        // Store the token in localStorage
        const token = await getIdToken(user);
        localStorage.setItem('token', token);
        
        // Check if user document exists in Firestore
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);

        // If the user document does not exist, create it
        if (!userDoc.exists()) {
            await setDoc(userDocRef, {
                name: user.displayName || 'User',
                email: user.email,
                phoneNumber: 'Not set',
                createdAt: new Date().toISOString(),
            });
            toast.success('User profile created successfully 🎉');
        }

        // Optionally return the user object or any other information needed
        return user;
    } catch (error) {
        toast.error('Failed to sign in with Google');
        console.error('Google sign-in error:', error);
    }
};