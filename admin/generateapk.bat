@ECHO OFF
REM Run npm install -g cordova, ionic, npm install
cd ..
gulp configure-app
cordova plugin add https://github.com/brodysoft/Cordova-SQLitePlugin.git
cordova plugin add cordova-plugin-x-socialsharing
cordova prepare
ionic platform rm android
REM create icon.png and splash.png in resources folder and run following command
ionic resources android
ionic platform add android
cordova build --release android -- --keystore=./admin/abcsmobileapps.keystore --storePassword=Public@123 --alias=abcsmobileapps --password=Public@123 

ren platforms/android/build/outputs/apk/android-release.apk @APPNAME@.apk