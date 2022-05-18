import { View, TouchableOpacity, Text, Image, StyleSheet } from "react-native"
import { useEffect, useReducer, useState } from "react"
import Icon from 'react-native-vector-icons/Fontisto';
import { auth, storage } from "../firebase-config";
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { updateProfile } from "firebase/auth";

export const ProfileView = () => {
    const [image, setImage] = useState<ImagePicker.ImageInfo>();
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [avatar, setAvatar] = useState<string>();
    

    const handleCloseModal = () => {setModalVisible(false);}

    const handleUpload = () => {
        if(auth.currentUser === null){throw new Error("User is not logged in");}
        const photoURL = auth.currentUser.uid + '_pp';
        updateProfile(auth.currentUser, {photoURL: photoURL})
        uploadImage(photoURL).then(() => {
            getDownloadURL(ref(storage, auth.currentUser?.photoURL)).then((url) => {setAvatar(url)})
        });
    }

    const uploadImage = async (name: string) => {
        if (image !== undefined) {
            const img = await fetch(image.uri);
            const bytes = await img.blob();
            await uploadBytes(ref(storage, name), bytes);
        }
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.3
        });
        if(!result.cancelled){
            setImage(result);
        }
    }
    
    useEffect(() => {handleUpload();}, [image])

    useEffect(() => {
        const getAvatar = async () => {
            if(auth.currentUser !== null && auth.currentUser?.photoURL !== null)
                await getDownloadURL(ref(storage, auth.currentUser.photoURL)).then((url) => setAvatar(url)).catch((error) => console.log(error));
        };
        getAvatar();

    }, []);

    return (
        <View style={{flex:1}}>
            <View style={{flex:1, justifyContent:'center', alignItems:'center', flexDirection:"row", backgroundColor:'white', elevation:6}}>
                <Image
                    style={{ flex:1, width:200,height:200, borderRadius:100}}
                    source={avatar ? {uri: avatar} : require('../assets/favicon.png')}
                />
                <View style={{flex:1, flexDirection:'column', justifyContent:'center'}}>
                    <Text style={{flex:1, marginTop:50}}>Name: {auth.currentUser?.displayName}</Text>
                    <Text style={{flex:1}}>Email: {auth.currentUser?.email}</Text>
                </View>
            </View>
            <View style={{flex:1, backgroundColor:'white', justifyContent:'center', alignItems:'center'}}>
                    <TouchableOpacity style={[styles.upload, styles.shadow]}
                    onPress={() => {pickImage();handleUpload();}}>
                        <Text style={{fontSize:20}}>Upload Image</Text>
                    </TouchableOpacity>
            </View>
            <View style={{flex:1, backgroundColor:'white'}}>
                <Text>{auth.currentUser?.displayName}</Text>
            </View>
        </View>
    )
}

export const styles = StyleSheet.create({
    upload:{
        width:'75%',
        backgroundColor:'#9DD4FB',
        paddingTop:10,
        paddingBottom:10,
        borderRadius:10,
        alignItems:'center'
    },
    shadow:{
        shadowColor: "#000", 
        shadowOffset: { width: 0,height: 3,},
        shadowOpacity: 0.27,
        shadowRadius: 4.65, 
        elevation: 6
    }
})