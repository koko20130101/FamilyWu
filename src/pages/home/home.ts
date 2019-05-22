import {Component} from '@angular/core';
import {IonicPage,NavController,Refresher} from 'ionic-angular';

import {GlobalVars, NativeService, MemberService, PopupService,ENDPOINT} from '../../providers';

import{Level} from '../../models/level';

@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    memberList: any;

    constructor(public navCtrl: NavController,
                public globalVars: GlobalVars,
                public memberService: MemberService,
                public popup: PopupService,
                public nativeService: NativeService) {
        this.globalVars.isMobile = this.nativeService.isMobile();
        this.memberService.storage.get('token').then( data => {
            this.globalVars.token = data;
        });
    }

    ionViewDidLoad() {
        if(!this.globalVars.token){
            //如果没有登录

        }else{
            this.getMembersInfo();
        }
    }

    getMembersInfo() {
        if (!this.memberList) {
            this.memberService.storage.get(ENDPOINT.members).then(data=> {
                if (!!data) {
                    this.memberList = data;
                } else {
                    //loading
                    this.globalVars.loading = this.popup.loading();
                    this.globalVars.loading.present();
                    this.getMembersFromServer(this.globalVars.loading)
                }
            })
        }
    }

    getMembersFromServer(loader?:any,refresher?:any){
        let seqEvent = this.memberService.getMembers();
        seqEvent.subscribe(ENDPOINT.members, res=> {

            seqEvent.unsubscribe(ENDPOINT.members);

            if (!!res['Status'] && res['Status'] == '0') {
                this.memberList = [];
                for (let item of res.Data) {
                    let newItem = new Level(item);
                    this.memberList.push(newItem);
                }

                //如果有loading效果
                if (!!loader) {
                    loader.dismiss();
                }

                //如果有下拉刷新
                if (!!refresher) {
                    refresher.complete();
                }

            }
        })
    }

    goSistersPage(){
        this.navCtrl.push('SistersPage');
    }


    //下拉刷新
    doRefresh(refresher: Refresher) {
        let myTimeout = setTimeout(() => {
            this.getMembersFromServer(null, refresher);
            clearTimeout(myTimeout);
        }, 200);
    }

}
