import * as FileSystem from 'expo-file-system';
const { StorageAccessFramework } = FileSystem;

export const saveFile = async (filename: string, data: any) => {
  const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
  // Check if permission granted
  if (permissions.granted) {
    // Get the directory uri that was approved
    let directoryUri = permissions.directoryUri;
    // Create file and pass it's SAF URI
    await StorageAccessFramework.createFileAsync(directoryUri, filename, "application/text").then(async(fileUri) => {
      // Save data to newly created file
      await FileSystem.writeAsStringAsync(fileUri, data, { encoding: FileSystem.EncodingType.UTF8 });
    })
    .catch((e) => {
      console.log(e);
    });
  } else {
    alert("You must allow permission to save.")
  }
}