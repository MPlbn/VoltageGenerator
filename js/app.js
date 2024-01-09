/*
 * Red Pitaya Template Application
 *
 *
 * (c) Red Pitaya  http://www.redpitaya.com
 */


(function(APP, $, undefined) {
    
    // App configuration
    APP.config = {};
    APP.config.app_id = 'VoltageGenerator';
    APP.config.app_url = '/bazaar?start=' + APP.config.app_id + '?' + location.search.substr(1);
    APP.config.socket_url = 'ws://' + window.location.hostname + ':9002';

    // WebSocket
    APP.ws = null;




    // Starts template application on server
    APP.startApp = function() {

        $.get(APP.config.app_url)
            .done(function(dresult) {
                if (dresult.status == 'OK') {
                    APP.connectWebSocket();
                } else if (dresult.status == 'ERROR') {
                    console.log(dresult.reason ? dresult.reason : 'Could not start the application (ERR1)');
                    APP.startApp();
                } else {
                    console.log('Could not start the application (ERR2)');
                    APP.startApp();
                }
            })



            .fail(function() {
                console.log('Could not start the application (ERR3)');
                APP.startApp();
            });
    };




    APP.connectWebSocket = function() {

        //Create WebSocket
        if (window.WebSocket) {
            APP.ws = new WebSocket(APP.config.socket_url);
            APP.ws.binaryType = "arraybuffer";
        } else if (window.MozWebSocket) {
            APP.ws = new MozWebSocket(APP.config.socket_url);
            APP.ws.binaryType = "arraybuffer";
        } else {
            console.log('Browser does not support WebSocket');
        }


        // Define WebSocket event listeners
        if (APP.ws) {

            APP.ws.onopen = function() {
                $('#hello_message').text("Hello, Red Pitaya!");
                console.log('Socket opened');               
            };

            APP.ws.onclose = function() {
                console.log('Socket closed');
            };

            APP.ws.onerror = function(ev) {
                $('#hello_message').text("Connection error");
                console.log('Websocket error: ', ev);         
            };

            APP.ws.onmessage = function(ev) {
                console.log('Message recieved');
            };
        }
    };

}(window.APP = window.APP || {}, jQuery));


APP.stopGen = function(){
    APP.isRunning = false;
    APP.isPaused = false;
    var local = {};
    local['isRunning'] = { value: APP.isRunning };
    local['isPaused'] = { value: APP.isPaused }; 
    APP.ws.send(JSON.stringify({parameters: local}));
};

APP.startGen = function(){
    APP.isRunning = true;
    APP.isPaused = false;
    var local = {};
    local['isRunning'] = { value: APP.isRunning };
    local['isPaused'] = { value: APP.isPaused };
    APP.ws.send(JSON.stringify({parameters: local}));
};

APP.pause = function(){
    APP.isRunning = false;
    APP.isPaused = true;
    var local = {};
    local['isRunning'] = { value: APP.isRunning };
    local['isPaused'] = { value: APP.isPaused }; 
    APP.ws.send(JSON.stringify({parameters: local}));
}

// Page onload event handler
$(function() {
    // Start application
    APP.startApp();

    $("startBtn").click(function(){
        APP.startGen();
    });

    $("stopBtn").click(function(){
        APP.stopGen();
    });

    $("pasueBtn").click(function(){
        APP.pause();
    });
});
