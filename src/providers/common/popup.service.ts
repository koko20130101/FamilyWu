import {Injectable} from '@angular/core';
import {AlertController, ToastController,LoadingController} from 'ionic-angular';

@Injectable()
export class PopupService {
    constructor(private alertCtrl: AlertController,
                private loadingCtrl:LoadingController,
                private toastCtrl: ToastController) {
    }

    /**
     * 弹窗
     * this.popupFactory.showAlert({
     *                       message:'提示文案'
     *     });
     *
     *
     * */
    public showAlert(config?) {
        let alertConfig = {
            cssClass:'my-alert',
            buttons:[
                {
                    text:'确 定',
                    handler:()=>{

                    }
                }
            ]
        };
        Object.assign(alertConfig, config);
        let alert = this.alertCtrl.create(alertConfig);
        alert.present();
        return alert;
    }

    /**
     * loading
     * */
    public loading(config?) {
        let loaderConfig = {
            duration:5000,
            cssClass:'my-loading',
            showBackdrop:true //黑色背景
            // dismissOnPageChange:false
        };
        if(!!config) {
            Object.assign(loaderConfig, config);
        }
        return this.loadingCtrl.create(loaderConfig);
    }

    /**
     * 泡泡提示
     * this.popup.showToast({
     *              message:'提示文字'
     *        });
     * */
    public showToast(config) {
        let toastConfig = {
            message: '',
            duration: 2000,
            position: 'bottom',
            cssClass: 'my-toast',
            dismissOnPageChange: false
        };
        Object.assign(toastConfig, config);
        let toast = this.toastCtrl.create(toastConfig);
        toast.present();
        return toast;
    }
}