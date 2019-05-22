import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HTTP} from '@ionic-native/http';
import {Events} from 'ionic-angular';

import {GlobalVars} from '../common/global';

@Injectable()
export class Api {
    // HOST: string = 'http://172.17.2.18:8080/family-wu-data/data/';
    // HOST: string = 'http://192.168.0.102:8080/family-wu-data/data/';
    HOST: string = 'http://www.scbbsc.com/FamilyWu/data/';
    Extension = '.json';    //接口后缀


    constructor(
        public http:HttpClient,
        public httpNative:HTTP,
        public events:Events,
        public globalVars:GlobalVars) {

    }

    get(endpoint: string, body: any, reqOpts?: any) {
        let seq;
        if (!this.globalVars.isMobile) {
            /**
             * 浏览器开发环境
             * */
            seq = this.http.get(this.HOST + endpoint + this.Extension,body);
            seq.subscribe(
                res =>{
                    //发布成功事件
                    this.events.publish(endpoint, res);
                },
                err =>{
                    this.events.unsubscribe(endpoint);
                }
            )
        }else{
            /**
             * 真机环境
             * */
            seq = this.httpNative.get(this.HOST + endpoint + this.Extension, body, {});
            seq.then(res =>{
                let resData = JSON.parse(res.data);
                this.events.publish(endpoint, resData);
            }).catch(err =>{
                this.events.unsubscribe(endpoint);
            })
        }

        return this.events;
    }

    post(endpoint: string, body: any, reqOpts?: any) {
        let seq;
        if (!this.globalVars.isMobile) {
            /**
             * 浏览器开发环境
             * */
            seq = this.http.get(this.HOST + endpoint + this.Extension,body);
            seq.subscribe(
                res =>{
                    //发布成功事件
                    this.events.publish(endpoint, res);
                },
                err =>{
                    this.events.unsubscribe(endpoint);
                }
            )
        }else{
            /**
             * 真机环境
             * 如果要暂时改为get,第二个参数body要改为 {}
             * */
            seq = this.httpNative.get(this.HOST + endpoint + this.Extension, {}, {});
            seq.then(res => {
                let resData = JSON.parse(res.data);
                this.events.publish(endpoint, resData);
                if (resData.Status != '0') {
                    this.globalVars.error.emit(resData);
                }
            }).catch(err => {
                this.events.unsubscribe(endpoint);
            });
        }

        return this.events;
    }
}
