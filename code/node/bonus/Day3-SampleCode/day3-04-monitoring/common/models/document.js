module.exports = function(Document) {
  var docs = []    
  function Documents() {
  }
  Document.content = function(msg, cb) {
      for (var i=0; i < 100; i++) {
       docs.push(new Documents);
      }
      cb(null, 'Adding document content' + msg);
    }
 
    var docs = []    
    Document.remoteMethod(
        'content', 
        {
          accepts: {arg: 'content', type: 'string'},
          returns: {arg: 'content', type: 'string'}
        }
    );
};
