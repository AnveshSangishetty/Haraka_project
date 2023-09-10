const axios=require('axios')

exports.register = function(){
    this.register_hook('data_post','my_hook_data_post')
}

exports.my_hook_data_post = function (next, connection) {
    // This is called when the email data is received.
    this.loginfo("hook called")

    const transaction = connection.transaction;
    const fromAddress = transaction.mail_from.original;
    const toAddress = transaction.rcpt_to[0].original;
    const subject = transaction.header.get('Subject');
    
    const emailData = {
        from: fromAddress,
        to: toAddress,
        subject: subject
    };

 
    sendToNodeServer(emailData,this);

    next();
};

function sendToNodeServer(emailData,t) {
    axios.post('http://localhost:3000/receive-email', emailData)
        .then(response => {
            t.loginfo('Email details sent to Node server.');
        })
        .catch(error => {
            t.loginfo('Error sending email details:', error);
        });
}