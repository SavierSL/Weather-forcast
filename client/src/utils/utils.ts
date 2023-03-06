export const convertEpochTimeToString = (epochTime:number):string => {
    const date = new Date(epochTime * 1000);
    return date.toLocaleString();
}


export const getCodeParam = (queryString:string) => {
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('code');
}