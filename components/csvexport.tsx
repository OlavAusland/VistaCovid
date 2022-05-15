import { collection, getDocs } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { CSVLink } from 'react-csv';
import { db } from '../firebase-config';


export const csvexport = () => {
    const [data, setData] = useState<any[]>([]);
    useEffect(() => {
        getDocs(collection(db, "Rooms")).then((docs) => {
            const healthData: any = [];
            docs.forEach((doc) => {
                const {
                    bloodPressure,
                    heartRate,
                    oxygenLevel,
                } = doc.data();
                const userData = {
                    id: doc.id,
                    bloodPressure: bloodPressure,
                    heartRate: heartRate,
                    oxygenLevel: oxygenLevel,
                  };
      
        const headers = [
            { label: "ID", key: data.id },
            { label: "bloodPressure", key: data.bloodPressure },
            { label: "heartRate", key: data.heartRate },
            { label: "oxygenLevel", key: data.oxygenLevel },

        ];

        const csvReport = {
            filename: "userReport.csv",
            headers: headers,
            data: userData
          }
          healthData.push(csvReport);
        });
        setData(healthData);
      });
  }, []);
  
  return (
    <CSVLink  {...data} >
      Export
    </CSVLink>
  )
  }




