export default function Response(data? : any | null,statusCode?:number | 200 , message?:string | null) {
    return {
        data,
        statusCode : statusCode ? statusCode : 200 ,
        message : message ? message : null,
    }
}


export interface ResponseI {
    statusCode : number,
    message : string | null,
    data : any | null
}