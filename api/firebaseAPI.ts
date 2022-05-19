import { getAuth } from "firebase/auth";
import { addDoc, arrayUnion, collection, deleteDoc, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { Patient } from "../domain/PatientType";
import { NoteData, Room } from "../domain/RoomType";
import { User } from "../domain/UserType";
import { db } from "../firebase-config";

// USERS

export const addUser = async(user: User, id:string) => {
    await addDoc(collection(db, 'Users', id), user).then((res) => {
        console.log(res);
    }).catch((err) => {
        console.log(err);
    });
}

export const deleteUserById = async(id: string) => {
    await 
    await deleteDoc(doc(db, 'Users', id)).then((res) => {
        console.log(res);
    }).catch((err) => {
        console.log(err);
    });
}


export const getUsers = async(): Promise<User[]> => {
    return await getDocs(collection(db, 'User')).then((res) =>{
        return res.docs.map((doc) => <User>({...doc.data(), id: doc.id}));
    }).catch((err) => {
        throw err;
    });
}

export const addNote = async(id: string, note: NoteData) => {
    await setDoc(doc(db, 'Rooms', id), {notes:arrayUnion(note)}, {merge: true}).then((res) => {
        console.log(res);
    }).catch((err) => {
        console.log(err);
    });
}


export const getLoggedInUser = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    return user;
}


// Patients

export const addPatient = async (user: Patient) => {
    await setDoc(doc(db, 'Patients', user.ssn), user).then((res) => {
        console.log(res);
    }).catch((err) => {
        console.log(err);
    });
}

export const deletePatient = async(id: string) => {
    await deleteDoc(doc(db, 'Patients', id)).then((res) => {
        console.log(res);
    }).catch((err) => {
        console.log(err);
    });
}

export const getPatient = async (id: string) => {
    return await getDoc(doc(db, 'Patients', id)).then((res) => {
        return res.data() as Patient;
    }).catch((err) => {
        throw err;
    });
};

export const addEmptyRoom = async (id: string) => {
    await setDoc(doc(db, 'Rooms', id), {
        patientId: '',
        lastUpdated: Date.now(),
        heartRate: [],
        respirationRate: [],
        oxygenLevel: [],
        notes: [],
        id: id
    }).then((res) => {
        console.log(res);
    }).catch((err) => {
        console.log(err);
    });
}

export const addRoom = async (room: Room): Promise<boolean> => {
    console.log('ADDED ROOM')
    try {
        const response = await getRoom(room.id);

        console.log(response);

        if (response) {
            return false;
        }
    
        await setDoc(doc(db, 'Rooms', room.id), room).then((res) => {
            console.log("added new room")
            console.log(res)
        });
    
        return true;
    } catch (e: any) {
        console.log("Error in add room: " + e);
        throw e;
    }
}


export const getRole = async (id: string): Promise<string | undefined> => {
    return await getDoc(doc(db, 'User', id)).then((res) => {
        return  res.data()?.role;
    }).catch((err) => {
        throw err;
    });
};


export const deleteRoom = async (id: string) => {
    console.log("ID: " + id)
    await deleteDoc(doc(db, 'Rooms', id)).then((res) => {
        console.log('Deleted Room: ', res);
    }).catch((err) => {
        console.log(console.log('Failed to delete room with id: ', id));
        console.log('Error: ', err);
    });
}


export const getRooms = async (): Promise<Room[]> => {
    return await getDocs(collection(db, 'Rooms')).then((res) => {
        return res.docs.map((doc) => <Room>({...doc.data(), id: doc.id}));
    }).catch((err) => {
        throw err;
    });
}

export const getAvailableRooms = async (): Promise<Room[]> => {
    const rooms: Room[] = await getRooms();
    const availableRooms = rooms.filter(room => room.patientId === null || room.patientId === undefined || room.patientId === '');
    return availableRooms;
}

export const getOccupiedRooms = async (): Promise<Room[]> => {
    const rooms: Room[] = await getRooms();
    const occupiedRooms = rooms.filter(room => room.patientId !== null || room.patientId !== undefined || room.patientId !== '');
    return occupiedRooms;
}

export const getRoom = async (id: string): Promise<Room | undefined> => {
    return await getDoc(doc(db, 'Rooms', id)).then((doc) => {
        return {...doc.data(), id:doc.id} as Room;
    }).catch((err) => {
        throw err;
    }
);}

export const addPatientToRoom = async (roomId: string, patientId: string) => {
    await setDoc(doc(db, 'Rooms', roomId), {id: roomId, patientId: patientId}, {merge: true})
    
}


