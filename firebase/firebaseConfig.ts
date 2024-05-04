import { FirebaseApp, initializeApp } from "firebase/app";
import { FirebaseStorage, getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAUZun5qb7ExIZP_fnni4D-2cpm0G6aNwg",
    authDomain: "filehub-storage.firebaseapp.com",
    projectId: "filehub-storage",
    storageBucket: "filehub-storage.appspot.com",
    messagingSenderId: "379031846027",
    appId: "1:379031846027:web:bfbdbb9d4c14c993eaa88e"
};


const app: FirebaseApp = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
export const storage: FirebaseStorage = getStorage(app);

// export { getSignedUrl };