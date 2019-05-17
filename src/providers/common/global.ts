import{Injectable,EventEmitter} from '@angular/core';

/**
 * 全局变量
 * */
@Injectable()
export class GlobalVars{
    //父组件与子组件之间通讯
    error: EventEmitter<any> = new EventEmitter<any>();

    isMobile:boolean = false;       //是否真机环境
    loading:any;
}