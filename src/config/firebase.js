import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { average, getFirestore, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBTq66huN6DLu660v5nDnuDt6xMynZeyWo",
  authDomain: "chat-app-c456a.firebaseapp.com",
  projectId: "chat-app-c456a",
  storageBucket: "chat-app-c456a.appspot.com",
  messagingSenderId: "803924455831",
  appId: "1:803924455831:web:25c9f0329b21588e4e94d2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (username, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await setDoc(doc(db, "users", user, uid), {
      id: user.uid,
      username: username.toLowercase(),
      email,
      name: "",
      avatar: "",
      bio: "Hey, There i am using Chat App",
      lastSeen: Date.now(),
    });
    await setDoc(doc(db, "chats", user.uid), {
      chatData: [],
    });
  } catch (error) {
    console.error(error);
    toast.error(error.code);
  }
};

export {signup}
