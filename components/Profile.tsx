import { View, TouchableOpacity, Text, Image, StyleSheet } from "react-native"
import { useEffect, useReducer, useState } from "react"
import Icon from 'react-native-vector-icons/AntDesign';
import { auth, storage } from "../firebase-config";
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { updateProfile } from "firebase/auth";
import { profileStyle } from "../styles/ProfileStyles";
import { ScrollView } from "react-native-gesture-handler";

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
        <ScrollView>
            <View>
                <View style={profileStyle.first}>
                    <View >
                        <Text style={profileStyle.header}>PROFILE</Text>
                    </View>
                    <View style={profileStyle.row1}>
                        <Image
                            style={profileStyle.imageStyle}
                            source={avatar ? {uri: avatar} : require('../assets/favicon.png')}
                        />
                        <Text>{}</Text>
                    </View>
                </View>
                <View style={profileStyle.second}>
                    <View style={profileStyle.userStyle}>
                        <View style={profileStyle.box}>
                            <Icon name='user' size={30}></Icon>
                            <Text style={profileStyle.textStyle}>Name: {auth.currentUser?.displayName}</Text>
                        </View>
                        <View style={profileStyle.box}>
                            <Icon name='mail'size={30}></Icon>
                            <Text style={profileStyle.textStyle}>Email: {auth.currentUser?.email}</Text>
                        </View>
                        <View style={profileStyle.box}>
                            <Icon name='phone'size={30}></Icon>
                            <Text style={profileStyle.textStyle}>Tlf:{auth.currentUser?.phoneNumber}</Text>
                        </View>
                    </View>
                    <View style={profileStyle.uploadImageButtonStyle}>
                            <TouchableOpacity style={[profileStyle.upload, profileStyle.shadow]}
                            onPress={() => {pickImage();handleUpload();}}>
                                <Text style={profileStyle.buttonTextStyle}>Upload Image</Text>
                            </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

