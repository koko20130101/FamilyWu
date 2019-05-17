import {HttpClient, HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {CodePush} from '@ionic-native/code-push';
import {StatusBar} from '@ionic-native/status-bar';
import {HTTP} from '@ionic-native/http';
import {IonicStorageModule} from '@ionic/storage';


import {Api,GlobalVars,NativeService,MemberService,PopupService} from '../providers';
import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';

@NgModule({
    declarations: [
        MyApp,
        HomePage
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        IonicModule.forRoot(MyApp,{
            iconMode: 'ios', //强制使用ios的icon和样式
            // mode: 'ios',  //强制使用ios的模式
            backButtonText: '' //左上角返回上级页面的文本
        }),
        IonicStorageModule.forRoot()
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage
    ],
    providers: [
        Api,
        GlobalVars,
        NativeService,
        MemberService,
        PopupService,
        StatusBar,
        SplashScreen,
        CodePush,
        HTTP,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {
}
