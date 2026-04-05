import { useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  onSnapshot, 
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { db, auth } from '../firebase/config';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, 'tasks'),
      where('userId', '==', auth.currentUser.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const taskData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTasks(taskData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth.currentUser]);

  const addTask = async (task) => {
    await addDoc(collection(db, 'tasks'), {
      ...task,
      userId: auth.currentUser.uid,
      status: 'todo',
      createdAt: serverTimestamp()
    });
  };

  const updateTask = async (id, updates) => {
    const taskRef = doc(db, 'tasks', id);
    await updateDoc(taskRef, updates);
  };

  const deleteTask = async (id) => {
    const taskRef = doc(db, 'tasks', id);
    await deleteDoc(taskRef);
  };

  const toggleComplete = async (task) => {
    const taskRef = doc(db, 'tasks', task.id);
    await updateDoc(taskRef, {
      status: task.status === 'completed' ? 'todo' : 'completed'
    });
  };

  return { tasks, loading, addTask, updateTask, deleteTask, toggleComplete };
};
