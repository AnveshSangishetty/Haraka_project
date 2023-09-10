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
    const parsed_mail=email_to_json(parsed)
 
    sendToNodeServer(parsed_mail,this);

    next();
};

function email_to_json(email){
    const json={}
    for(const key in email){
        if(typeof email[key] === 'object' && email[key]!==null){
            json[key]=email_to_json(email[key])
        }
        else{
            json[key]=email[key]
        }
    }
    return json;
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