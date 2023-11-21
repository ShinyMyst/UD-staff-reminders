// Generalized Functions for dealing with emails

function sendEmail(recipient, subject, body, cc=null){
    var options = {};

    if (cc !== null && cc.length > 0) {
        options.cc = cc.join(',');
    }
    GmailApp.sendEmail(recipient, subject, body, options);    
}