import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import { set, ref } from 'firebase/database'
import app, { db } from './firebase'
import md5 from 'md5';

export const auth = getAuth(app);

export async function signUpEmail(email, name, password) {
    try {
        // 회원가입 수행
        const createdUser = await createUserWithEmailAndPassword(auth, email, password);
        // console.log(createdUser);
        const emailToMD5 = md5(email);
        await updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: `https://gravatar.com/avatar/${emailToMD5}?d=identicon`,
        });
        set(ref(db, `users/${createdUser.user.uid}`), {
            name: createdUser.user.displayName,
            avatarImage: createdUser.user.photoURL,
        });
        // 회원가입 성공
        console.log(createdUser);
        return { status: true, userData: createdUser, md5: emailToMD5 };
    } 
    catch(err) {
        console.error(err);
        let errCode = err?.toString();
        // 이미 존재하는 이메일인 경우
        if (errCode.includes('email-already-in-use')) errCode = 'email-already-in-use';
        // 유효하지 않은 이메일인 경우
        else if (errCode.includes('invaild-email')) errCode = 'invaild-email';
        // 회원가입 실패
        return { status: false, errCode };
    }
}

export async function signInEmail(email, password) {
    try {
        const loginUser = await signInWithEmailAndPassword(auth, email, password);
        console.log(loginUser);
        return { status: true, userData: loginUser };
    } 
    catch(err) {
        console.error(err);
        let errCode = err?.toString();
        // 유효하지 않은 이메일인 경우
        if (errCode.includes('invaild-email')) errCode = 'invaild-email';
        // 패스워드가 누락된 경우 (UI 에러)
        else if (errCode.includes('auth/missing-email')) errCode = 'missing-email';
        // 로그인 실패
        return { status: false, errCode };
    }
}

export async function signOutUser() {
    try {
        await signOut(auth);
        return { status: true, userData: null };
    }
    catch(err) {
        console.error(err);
        return { status: false, errCode: err };
    }
}

export async function changeUserState(callback) {
    return onAuthStateChanged(auth, callback);
}