import Papa from 'papaparse';
import { isRequiredField } from '../utils/validation';

type Callback = (data: any) => void;

const useFetch = () => {
    const fetchCsvData = async (filePath: string, callback: Callback) => {
        try {
            const response = await fetch(filePath);

            if (!response.ok) {
                throw new Error(`Failed to fetch data. Status: ${response.status}`);
            }

            const reader = response.body?.getReader();
            const result = await reader?.read();
            const decoder = new TextDecoder('utf-8');
            const csvString = decoder.decode(result?.value!);

            const { data } = Papa.parse(csvString, {
                header: true,
                dynamicTyping: true,
                transformHeader: header =>
                header.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(''),
            });

            if (!data.every(row => isRequiredField(row).isValid === true)) {
                throw new Error("Invalid csv format")
            }
            if (data.some(row => row != null || row != undefined)){
                callback(undefined)
            } 

            callback(data);
            
        } catch (error) {
            console.error('Error fetching or parsing CSV data:');
            callback(undefined);
        }
    };

    return { fetchCsvData };
};

export default useFetch;
