import { Text, View, TextInput, Pressable, Modal, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { getPatient } from '../../api/folkeregisterAPI';
import { FolkeregisterPerson } from '../../domain/PatientType';
import { assignPatientStyle } from '../../styles/AssignPatientStyle';
import { addPatient, getAvailableRooms } from '../../api/firebaseAPI';
import { Room } from '../../domain/RoomType';
import { addPatientToRoom } from '../../api/firebaseAPI';
import { DropDownType, ItemType } from '../../domain/DropDownType';
import {ExistingPatient} from './patientExist'
import {NewPatient} from './newPatient'
import { AssignPatientModalProps } from '../../domain/AssignPatietTypes';
import { ErrorType } from '../../domain/Errortype';
import { Errormodal } from '../ErrorModal';


export const AssignPatientModal = (props: AssignPatientModalProps) => {

    const [patient, setPatient] = useState<FolkeregisterPerson>();
    const [dropdown, setDropdown] = useState<DropDownType>({ open: false, value: "0", items: [], label: "" });
    const [error, setError] = useState<ErrorType>({errorObject:undefined, errormodalVisible:false});
    const [search, setSearch] = useState<string>("");
    const [newPatient, setNew] = useState<boolean>(false);
    const [errormodal, setErrormodal] = useState<boolean>(false);
    const [e, setE] = useState<string>('');


    useEffect(() => {
        getAvailableRooms().then((room: Room[]) => {
            setDropdown(prev => ({ ...prev, items: [] }));
            room.forEach((room: Room) => {
                const item: ItemType = { label: room.id, value: room.id, };
                setDropdown(prev => ({ ...prev, items: [...prev.items, item] }));
            })
        }).catch(err => { setError((prev) =>({...prev, errorObject:err, errormodalVisible:true})); } )
    }, [props.modalVisible]);

    const handleSearch = () => {
        if (search.length > 0) {
            const fnrRegex = new RegExp(/^(0[1-9]|[1-2][0-9]|31(?!(?:0[2469]|11))|30(?!02))(0[1-9]|1[0-2])\d{7}$/g);
            const isFnr = fnrRegex.test(search);

            if (!isFnr) {
                setE('Invald SSN') 
            }
            getPatient(search).then(result => {
                setPatient(result)
            }).catch(err => { setE(err.message) });
        }
    }

    const handleAddPatient = () => {
        if (patient && dropdown.label) {
            addPatientToRoom(dropdown.label, patient.ssn);
            setEmpty();
        }
        setError((prev) =>({...prev, errorObject: new Error('Some fields are missing, please make sure everything is filed out'), errormodalVisible:true}));
    }
    const handleNewPatient = () => {
        if (patient && dropdown.label) {
            addPatient(patient)
            addPatientToRoom(dropdown.label, patient.ssn);
            setEmpty();
        }
        setError((prev) =>({...prev, errorObject: new Error('Some fields are missing, please make sure everything is filed out'), errormodalVisible:true})); 
    }

    const setEmpty = () => {
        props.handleRequestClose();
        setPatient(undefined);
        setSearch("");
        setNew(false)
        setDropdown({ open: false, value: "0", items: [], label: "" });
        setE('')
    }

    const handleNew = () => {
       setNew(true);
    }
    const handleErrorRequestClose = () => {
        setErrormodal(false)
        setError((prev) =>({...prev, errorObject: undefined, errormodalVisible:false}));
        
    }

    if(error.errormodalVisible){
        return (
            <Errormodal error={error} handleRequestClose={handleErrorRequestClose} />
        )
    }

    return (

        <Modal
            animationType="slide"
            statusBarTranslucent={true}
            transparent={true}
            visible={props.modalVisible}
            onRequestClose={() => props.handleRequestClose()}
        >
            <View style={{ top: '5%'}}>
                <View style={assignPatientStyle.container}>
                    <Text style={{ fontSize: 40, marginBottom: 60 }}>Admit patient</Text>
                    {newPatient? 
                    <NewPatient 
                        setPatient={setPatient} 
                        patient={patient}
                        setSearch={setSearch} 
                        handleSearch={handleSearch} 
                        dropdown={dropdown} 
                        setDropdown={setDropdown} 
                        handleRequestClose ={props.handleRequestClose}
                        handleNewPatient= {handleNewPatient}
                        setNew ={setNew}
                        setError={setE}
                       /> 
                        
                    :<ExistingPatient 
                        patient={patient}
                        setPatient={setPatient}  
                        setSearch={setSearch} 
                        handleSearch={handleSearch} 
                        dropdown={dropdown} 
                        setDropdown={setDropdown}  
                        handleAddPatient={handleAddPatient}
                        handleNew ={handleNew}
                        error={e}
                        setEmpty={setEmpty}/>
                        }
                </View>
            </View>
        </Modal>
    );
}

