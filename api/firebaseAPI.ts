import { auth, db } from "../firebase-config";
import { getDoc, getDocs, addDoc, setDoc, doc, collection, deleteDoc, query} from 'firebase/firestore'
import { User } from "../domain/UserType";
import { Room } from "../domain/RoomType";
import { FolkeregisterPerson, Patient } from "../domain/PatientType";
import { getAuth } from "firebase/auth";
import { ConsoleWriter } from "istanbul-lib-report";

// USERS

export const addUser = async(user: User, id:string) => {
    await addDoc(collection(db, 'Users', id), user).then((res) => {
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


export const getUsers = async(): Promise<User[]> => {
    return await getDocs(collection(db, 'User')).then((res) =>{
        return res.docs.map((doc) => <User>({...doc.data()}));
    }).catch((err) => {
        throw err;
    });
} 

// auth
// .getUsers([
//     { uid: 'uid1' },
//     { email: 'user2@example.com' },
//     { phoneNumber: '+15555550003' },
//     { providerId: 'google.com', providerUid: 'google_uid4' },
//   ])
//   .then((getUsersResult) => {
//     console.log('Successfully fetched user data:');
//     getUsersResult.users.forEach((userRecord) => {
//       console.log(userRecord);
//     });

//     console.log('Unable to find users corresponding to these identifiers:');
//     getUsersResult.notFound.forEach((userIdentifier) => {
//       console.log(userIdentifier);
//     });
//   })
//   .catch((error) => {
//     console.log('Error fetching user data:', error);
//   });


export const getLoggedInUser = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    return user;
}


// Patients

export const addPatient = async (user: FolkeregisterPerson) => {
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

// ROOMS

export const addRoom = async (room: Room) => {
    getRoom(room.id).then(async(res)=> {
        if(res == undefined){
            await addDoc(collection(db, 'Rooms', room.id), room).then((res) => {
                console.log("added new room")
                console.log(res)
            });
        }
   }).catch((err)=> {console.log("inside"); throw(err)});
}


export const deleteRoom = async (id: string) => {
    getRoom(id).then(async(res)=>{
        if(res?.patientId == ""){
            await deleteDoc(doc(db, 'Rooms', id)).then((res) => {
                console.log('Deleted Room: ', res);
            }).catch((err) => {
                console.log(console.log('Failed to delete room with id: ', id));
                console.log('Error: ', err);
            });
        }
    })
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

export const getRoom = async (id: string): Promise<Room | undefined> => {
    return await getDoc(doc(db, 'Rooms', id)).then((res) => {
        return res.data() as Room;
    }).catch((err) => {
        throw err;
    }
);
}

export const addPatientToRoom = async (roomId: string, patientId: string) => {
    await setDoc(doc(db, 'Rooms', roomId), {patientId: patientId}, {merge: true})
    
}




// ASSIGNMENTS - 
// ! DISCHARGE PATIENT
/*
export const assignRoom = async(room_id: string, patient_id: string){
    await setDoc(doc(db, 'Rooms', room_id), {
        patientId: patient_id,

}
*/