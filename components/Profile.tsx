import { View, TouchableOpacity, Text, Image, StyleSheet } from "react-native"
import { useEffect, useReducer, useState } from "react"
import Icon from 'react-native-vector-icons/Fontisto';
import { auth, storage } from "../firebase-config";
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { updateProfile } from "firebase/auth";
import { profileStyle } from "../styles/ProfileStyles";

export const ProfileView = () => {
    const [image, setImage] = useState<ImagePicker.ImageInfo>();
    const [avatar, setAvatar] = useState<string>();

    const handleUpload = () => {
        if(auth.currentUser === null){throw new Error("User is not logged in");}
        const photoURL = auth.currentUser.uid + '_pp';
        updateProfile(auth.currentUser, {photoURL: photoURL})
        uploadImage(photoURL).then(() => {
            if(auth.currentUser && auth.currentUser.photoURL)
                getDownloadURL(ref(storage, auth.currentUser?.photoURL)).then((url) => {setAvatar(url)}).catch((err) => {console.log(err)})
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
        <View style={profileStyle.body}>
            <View style={profileStyle.column1}>
                <Image
                    style={profileStyle.imageStyle}
                    source={avatar ? {uri: avatar} : require('../assets/favicon.png')}
                />
                <View style={profileStyle.userStyle}>
                    <Text style={profileStyle.nameStyle}>Name: {auth.currentUser?.displayName}</Text>
                    <Text style={profileStyle.emailStyle}>Email: {auth.currentUser?.email}</Text>
                </View>
            </View>
            <View style={profileStyle.uploadImageButtonStyle}>
                    <TouchableOpacity style={[profileStyle.upload, profileStyle.shadow]}
                    onPress={() => {pickImage();handleUpload();}}>
                        <Text style={profileStyle.buttonTextStyle}>Upload Image</Text>
                    </TouchableOpacity>
            </View>
            {/* <View style={profileStyle.nameStyle}>
                <Text>SkoleBolle{auth.currentUser?.displayName}</Text>
            </View> */}
        </View>
    )
}

