const {simpleParser}=require('mailparser')
const axios=require('axios')

exports.register = function(){
    this.register_hook('data_post','my_hook_data_post')
}

exports.my_hook_data_post = async function (next, connection) {
    // This is called when the email data is received.
    this.loginfo("hook called")
    const transaction =connection.transaction;
    const parsed=await simpleParser(transaction.message_stream)
    parsed.headers=[...parsed.headers]
 
    sendToNodeServer(parsed,this);

    next();

}

function sendToNodeServer(emailData,t) {
    axios.post('http://localhost:3000/receive-email', emailData)
        .then(response => {
            t.loginfo('Email details sent to Node server.');
        })
        .catch(error => {
            t.loginfo('Error sending email details:', error);
        });
}