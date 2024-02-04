import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth'
import { set, ref } from 'firebase/database'
import app, { db } from '../auth/firebase'
import md5 from 'md5';

export const auth = getAuth(app);

export async function signUpEmail(email, name, password) {
    try {
        // 회원가입 수행
        const createdUser = await createUserWithEmailAndPassword(auth, email, password);
        // console.log(createdUser);
        await updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: `https://gravatar.com/avatar/${md5(email)}?d=identicon`,
        });
        set(ref(db, `users/${createdUser.user.uid}`), {
            name: createdUser.user.displayName,
            avatarImage: createdUser.user.photoURL,
        });
    } catch(err) {
        // 이미 존재하는 이메일인 경우 실패
        if (err?.toString().includes('email-already-in-use')) return false;
    } finally {
        // 회원가입 성공
        return true;
    }
}

