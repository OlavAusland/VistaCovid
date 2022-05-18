import * as ImagePicker from 'expo-image-picker';
import { updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { auth, storage } from "../firebase-config";
import { profileStyle } from '../styles/ProfileStyles';

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
        <View style={profileStyle.singleFlex}>
            <View style={{flex:1, justifyContent:'center', alignItems:'center', flexDirection:"row", backgroundColor:'white', elevation:6}}>
                <Image
                    style={profileStyle.imgStyle}
                    source={avatar ? {uri: avatar} : require('../assets/favicon.png')}
                />
                <View style={{flex:1, flexDirection:'column', justifyContent:'center'}}>
                    <Text style={{flex:1, marginTop:50}}>Name: {auth.currentUser?.displayName}</Text>
                    <Text style={profileStyle.singleFlex}>Email: {auth.currentUser?.email}</Text>
                </View>
            </View>
            <View style={{flex:1, backgroundColor:'white', justifyContent:'center', alignItems:'center'}}>
                    <TouchableOpacity style={[profileStyle.upload, profileStyle.shadow]}
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

