var Buffer = require('buffer/').Buffer;
module.exports.SaveImgBase64 = async (img,path) =>{
  let result = {
      fileName : "",
    }
        // Decoding base-64 image
        // Source: http://stackoverflow.com/questions/20267939/nodejs-write-base64-image-file
        function decodeBase64Image(dataString) 
        {
          var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
          var response = {};

          if (matches.length !== 3) 
          {
            return new Error('Invalid input string');
          }

          response.type = matches[1];
          response.data = new Buffer(matches[2], 'base64');

          return response;
        }

        // Regular expression for image type:
        // This regular image extracts the "jpeg" from "image/jpeg"
        var imageTypeRegularExpression      = /\/(.*?)$/;      

        // Generate random string
        var crypto                          = require('crypto');
        var seed                            = crypto.randomBytes(20);
        var uniqueSHA1String                = crypto
                                               .createHash('sha1')
                                                .update(seed)
                                                 .digest('hex');

        var base64Data = img;
        var imageBuffer                      = decodeBase64Image(base64Data);
        var userUploadedFeedMessagesLocation = './public/uploads' + path ;
        var uniqueRandomImageName            = 'image-' + uniqueSHA1String;
        // This variable is actually an array which has 5 values,
        // The [1] value is the real image extension
        var imageTypeDetected = imageBuffer.type.match(imageTypeRegularExpression);

        var userUploadedImagePath = userUploadedFeedMessagesLocation + '/'+ uniqueRandomImageName + '.' + imageTypeDetected[1];
        // Save decoded binary image to disk
        try {
          await require('fs').writeFile(userUploadedImagePath, imageBuffer.data,  
            function() 
            {
              console.log('DEBUG - feed:message: Saved to disk image attached by user:', userUploadedImagePath);
            });
            result.fileName = uniqueRandomImageName +'.' + imageTypeDetected[1];
        }catch(err){}
    return result;
}