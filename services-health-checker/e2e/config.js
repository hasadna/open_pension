exports.config = { 
    beforeTest: function (test) {
      console.log(test.config); 
      test.config.baseUrl = 'https://5535-77-125-98-78.ngrok.io'; 
      return {"backend":"https://5535-77-125-98-78.ngrok.io","front":"https://1480-77-125-98-78.ngrok.io"} 
    } 
  }