import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';

import {Api,ENDPOINT} from '../../providers/';
import {Level} from '../../models/level';

@Injectable()
export class MemberService {

    members: any = [];

    constructor(public api: Api,
                public storage: Storage) {

    }

    getMembers() {
        let parameters = {};
        let seqEvent = this.api.post(ENDPOINT.members, parameters);
        seqEvent.subscribe(ENDPOINT.members, (res: any)=> {
            //取消订阅
            seqEvent.unsubscribe(ENDPOINT.members);
            if (res.Status == '0') {
                this.members = [];
                for (let item of res.Data) {
                    let newItem = new Level(item);
                    this.members.push(newItem);
                }

                this.storage.set('members', this.members).then((data)=> {
                    console.log(data)
                });
            }
        });
        return seqEvent;
    }
}