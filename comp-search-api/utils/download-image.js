http = require('http'),
https = require('https');
const Stream = require('stream').Transform;
const fs = require('fs');

module.exports.downloadImageFromURL = (url, filename, callback) => {
    let client = http;
    if (url.toString().indexOf("https") === 0){
      client = https;
     }
    client.request(url, function(response) {                                        
      let data = new Stream();                                                    
      response.on('data', function(chunk) {                                       
         data.push(chunk);                                                         
      });                                                                         
      response.on('end', function() {                                             
        fs.writeFileSync(filename, data.read());                               
      });                                                                         
   }).end();
};

  
