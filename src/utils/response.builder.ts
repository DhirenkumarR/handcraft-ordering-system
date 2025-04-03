export default function Response(statusCode?:number | 200 , message?:string | null,data? : any | null) {
    return {
        statusCode,
        message,
        data
    }
}


export interface ResponseI {
    statusCode : number,
    message : string | null,
    data : any | null
}