const HTTP_TIMEOUT:number=20000;
export interface Enviroment{
    mainApi:String,
    timeout:number
}
export const Live:Enviroment={
    mainApi:'http://bracketteam.optimaltechnology.in/api/',
    timeout:HTTP_TIMEOUT
}
export const ENV:Enviroment=Live;