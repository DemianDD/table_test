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
            });

            if (!data.every(row => isRequiredField(row))) {
                throw new Error("Invalid csv format")
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
