// import { RAPID_API_KEY } from "@env";
import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
// import { BASE_URL_API, API_URL } from '@env';

const apiUrl: string = process.env.EXPO_PUBLIC_BASE_URL_API!;
// const apiUrl: string = 'http://capstone23.sit.kmutt.ac.th/ms2/api';
interface QueryParams {
    [key: string]: string;
}

interface FetchResult {
    data: any[];
    // data: {
    //     content: any; // ปรับชนิดของ content ตามที่ API คืนมา
    //     first: any;   // ปรับชนิดของ first ตามที่ API คืนมา
    //     last: any;    // ปรับชนิดของ last ตามที่ API คืนมา
    // };
    isLoading: boolean;
    error: any;
    refetch: () => void;
}

const useFetch = (endpoint: string, query: QueryParams): FetchResult | any => {
    const [data, setData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);

    const options: AxiosRequestConfig = {
        method: "GET",
        url: `${apiUrl}/${endpoint}`,
        // headers: {
        //     Accept: '*/*',
        //     'Content-Type': 'application/json',
        // },
        params: { ...query },

    };

    const fetchData = async () => {
        setIsLoading(true);

        try {
            const response = await axios.request(options);
            setData(response.data);
            setIsLoading(false);
        } catch (error) {
            setError(error);
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const refetch = () => {
        setIsLoading(true);
        fetchData();
    };

    return { data, isLoading, error, refetch };
};

export default useFetch;