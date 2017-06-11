import { Injectable } from '@angular/core';

@Injectable()
export class ApiProvider {
    public url:string = 'http://192.168.0.100:8000/'; // http://192.168.0.100:8000
    public token:string = '7afb143945125d6bd471f988d5449f2b23b3d099'; // 7afb143945125d6bd471f988d5449f2b23b3d099
}