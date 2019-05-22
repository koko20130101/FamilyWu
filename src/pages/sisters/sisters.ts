import {Component} from '@angular/core';
import {IonicPage,Refresher} from 'ionic-angular';

import {GlobalVars, MemberService, PopupService,ENDPOINT} from '../../providers';

import{Level} from '../../models/level';

@IonicPage()
@Component({
    selector: 'page-sisters',
    templateUrl: 'sisters.html'
})
export class SistersPage {

    sistersList: any;

    constructor(
                public globalVars: GlobalVars,
                public memberService: MemberService,
                public popup: PopupService) {
    }

    ionViewDidLoad() {
        this.getSistersInfo();
    }

    getSistersInfo() {
        if (!this.sistersList) {
            this.memberService.storage.get(ENDPOINT.sisters).then(data=> {
                if (!!data) {
                    this.sistersList = data;
                } else {
                    //loading
                    this.globalVars.loading = this.popup.loading();
                    this.globalVars.loading.present();
                    this.getSistersFromServer(this.globalVars.loading)
                }
            })
        }
    }

    getSistersFromServer(loader?:any,refresher?:any){
        let seqEvent = this.memberService.getSisters();
        seqEvent.subscribe(ENDPOINT.sisters, res=> {

            seqEvent.unsubscribe(ENDPOINT.sisters);

            if (!!res['Status'] && res['Status'] == '0') {
                this.sistersList = [];
                for (let item of res.Data) {
                    let newItem = new Level(item);
                    this.sistersList.push(newItem);
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

    //下拉刷新
    doRefresh(refresher: Refresher) {
        let myTimeout = setTimeout(() => {
            this.getSistersFromServer(null, refresher);
            clearTimeout(myTimeout);
        }, 200);
    }

}
