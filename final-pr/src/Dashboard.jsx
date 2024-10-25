import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase'; 
import { getDoc, doc, getDocs, collection, addDoc, deleteDoc, updateDoc } from 'firebase/firestore'; 
import './Dash.css'; 

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [num, setNum] = useState("");
  const [car, setCar] = useState("");
  const [price, setPrice] = useState("");
  const [year, setYear] = useState("");
  const [record, setRecord] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log(currentUser);
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        console.log(userDoc.data());
      }
    };

    fetchUser();
  }, [user]);

  const fetchData = async () => {
    const data = await getDocs(collection(db, "Contacts")); // Change collection name to Contacts
    const newData = data.docs.map((item) => ({ docId: item.id, ...item.data() }));
    setRecord(newData);
  };

  useEffect(() => {
    fetchData(); 
  }, []);

  const addData = async () => {
    if (editIndex === null) {
      await addDoc(collection(db, "Contacts"), { name, num, car, price,year });
    } else {
      await updateDoc(doc(db, "Contacts", editIndex), { name, num, car , price , year });
      setEditIndex(null); 
    }
    setName(""); 
    setNum("");
    setCar(""); 
    setPrice(""); 
    setYear(""); 
    fetchData(); 
  };

  const deleteData = async (docId) => {
    await deleteDoc(doc(db, "Contacts", docId));
    fetchData(); 
  };

  const editData = (docId) => {
    const singleData = record.find((item) => item.docId === docId);
    setName(singleData.name);
    setNum(singleData.num);
    setCar(singleData.car); 
    setPrice(singleData.price); 
    setYear(singleData.year); 
    setEditIndex(docId);
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-greeting">Car Sale</h1>

      <input type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} /> 
      <input type="text" placeholder='Number' value={num} onChange={(e) => setNum(e.target.value)} /> 
      <input type="text" placeholder='Car Model Name' value={car} onChange={(e) => setCar(e.target.value)} /> 
      <input type="text" placeholder='Sell Price ' value={price} onChange={(e) => setPrice(e.target.value)} /> 
      <input type="text" placeholder='Car Buying Year' value={year} onChange={(e) => setYear(e.target.value)} /> 
      <button onClick={addData} className='add'>{editIndex === null ? "Add" : "Update"}</button> 

      <ul>
        {record.map((e) => (
          <li key={e.docId}>
            Name: {e.name} <br />
            Num: {e.num} <br />
            Car Model : {e.car} <br />
            Price: {e.price} <br />
            Year: {e.year} 
            <div>
              <button className="edit-button" onClick={() => editData(e.docId)}>Edit</button>
              <button  className="delete-button" onClick={() => deleteData(e.docId)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
