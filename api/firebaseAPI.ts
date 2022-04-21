import { db } from "../firebase-config";
import { getDoc, getDocs, addDoc, setDoc, doc, collection, deleteDoc} from 'firebase/firestore'
import { User } from "../domain/UserType";
import { Room } from "../domain/RoomType";
import { FolkeregisterPatient } from "../domain/PatientType";

// USERS

export const addUser = async(user: User) => {
    await addDoc(collection(db, 'Users'), user).then((res) => {
        console.log(res);
    }).catch((err) => {
        console.log(err);
    });
}

export const deleteUser = async(id: string) => {
    await deleteDoc(doc(db, 'Users', id)).then((res) => {
        console.log(res);
    }).catch((err) => {
        console.log(err);
    });
}

// Patients

export const addPatient = async (user: FolkeregisterPatient) => {
    await addDoc(collection(db, 'Patients'), user).then((res) => {
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
    await getDoc(doc(db, 'Patients', id)).then((res) => {
        console.log(res);
        return res.data();
    }).catch((err) => {
        console.log(err);
    });
};

// ROOMS

export const addRoom = async (room: Room) => {
    await addDoc(collection(db, 'Rooms'), room).then((res) => {
        console.log(res);
    });
}

export const deleteRoom = async (id: string) => {
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
    console.log(rooms)
    
    const availableRooms = rooms.filter(room => room.patientId === null || room.patientId === undefined || room.patientId === '');
    console.log(availableRooms);
    return availableRooms;
}

export const getRoom = async (id: string): Promise<Room | undefined> => {
    return await getDoc(doc(db, 'Rooms', id)).then((res) => {
        return res.data() as Room;
    }).catch((err) => {
        throw err;
    }
);
}

// ASSIGNMENTS - 
// ! DISCHARGE PATIENT
/*
export const assignRoom = async(room_id: string, patient_id: string){
    await setDoc(doc(db, 'Rooms', room_id), {
        patientId: patient_id,

}
*/