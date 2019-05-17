import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {NativeService} from '../providers';

import {HomePage} from '../pages/home/home';
@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any = HomePage;

    constructor(platform: Platform,
                statusBar: StatusBar,
                splashScreen: SplashScreen,
                nativeService:NativeService) {
        platform.ready().then(() => {
            //使用默认状态栏
            statusBar.styleDefault();
            //隐藏启动画面
            splashScreen.hide();
            //检查热更新
            nativeService.sync();
        });
    }
}

