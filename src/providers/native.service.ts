import {Injectable} from '@angular/core';
import {CodePush, InstallMode} from '@ionic-native/code-push';

import {Platform} from 'ionic-angular';

import {CODE_PUSH_DEPLOYMENT_KEY, IS_DEBUG} from './constants';

@Injectable()
export class NativeService {
    constructor(private platform: Platform,
                private codePush: CodePush) {

    }

    /**
     * 热更新同步方法
     */
    sync() {
        if (this.isMobile()) {

            let deploymentKey = '';
            if (this.isAndroid() && IS_DEBUG) {
                deploymentKey = CODE_PUSH_DEPLOYMENT_KEY.android.Staging;
                //alert('isAndroidStaging')
            }
            if (this.isAndroid() && !IS_DEBUG) {
                deploymentKey = CODE_PUSH_DEPLOYMENT_KEY.android.Production;
                //alert('isAndroidProduction')
            }
            if (this.isIos() && IS_DEBUG) {
                deploymentKey = CODE_PUSH_DEPLOYMENT_KEY.ios.Staging;
                //alert('isIosStaging')
            }
            if (this.isIos() && !IS_DEBUG) {
                deploymentKey = CODE_PUSH_DEPLOYMENT_KEY.ios.Production;
                //alert('isIosProduction')
            }

            let sync = this.codePush.sync({
                deploymentKey: deploymentKey,
                installMode: InstallMode.IMMEDIATE   //立即更新
            }, (data)=> {
                //返回data:{"receivedBytes":2925216,"totalBytes":3318152}
                //console.log(data);
            });
            sync.subscribe(syncStatus => {
                if (syncStatus == 0) {
                    console.log('[CodePush]:app已经是最新版本;syncStatus:' + syncStatus);
                } else if (syncStatus == 3) {
                    console.log('[CodePush]:更新出错;syncStatus:' + syncStatus);
                } else if (syncStatus == 5) {
                    console.log('[CodePush]:检查是否有更新;syncStatus:' + syncStatus);
                } else if (syncStatus == 7) {
                    console.log('[CodePush]:准备下载安装包;syncStatus:' + syncStatus);
                } else if (syncStatus == 8) {
                    console.log('[CodePush]:下载完成准备安装;syncStatus:' + syncStatus);
                } else {
                    console.log('[CodePush]:syncStatus:' + syncStatus);
                }
            });
            return sync;
        }
    }

    /**
     * 是否真机环境
     */
    isMobile(): boolean {
        return this.platform.is('mobile') && !this.platform.is('mobileweb');
    }

    /**
     * 是否android真机环境
     */
    isAndroid(): boolean {
        return this.isMobile() && this.platform.is('android');
    }

    /**
     * 是否ios真机环境
     */
    isIos(): boolean {
        return this.isMobile() && (this.platform.is('ios') || this.platform.is('ipad') || this.platform.is('iphone'));
    }
}
