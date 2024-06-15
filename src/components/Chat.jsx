import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { auth, db } from "../Firebase";

export default function Chat(props) {
  const { room } = props;
  const [messages, setMessages] = useState("");
  const messageRef = collection(db, "messages");
  const [arr, setArr] = useState([]);

  useEffect(() => {
    const queryMessages = query(messageRef, where("room", "==", room));
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messagesData = [];
      snapshot.forEach((doc) => {
        messagesData.push({ ...doc.data(), id: doc.id });
      });
      setArr(messagesData);
    });

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, [room]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (messages.trim() === "") {
      alert("Message can't be empty");
      return;
    }
    try {
      await addDoc(messageRef, {
        text: messages,
        createdAt: serverTimestamp(),
        name: auth.currentUser.displayName,
        room,
      });

      setMessages("");
    } catch (error) {
      console.log("Message submit error", error);
    }
  };

  return (
    <div>
      <h2>{room}</h2>
      <div>
        {arr.map((value) => (
          <h1 key={value.id}>{value.text}</h1>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input value={messages} onChange={(e) => setMessages(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
