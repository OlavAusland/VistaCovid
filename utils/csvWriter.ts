import RNFS from 'react-native-fs';


export const writeCSV = (csv: any) => {
    var path = RNFS.DocumentDirectoryPath + '/healthdata.csv';

    // write the file
    RNFS.writeFile(path, csv, 'utf8').then((success) => {
        console.log('FILE WRITTEN!');
    }).catch((err) => {
        console.log(err.message);
    });

    return csv;
}