$(document).ready(function() {
    
    var myDataRef = new Firebase('https://kolebook.firebaseio.com/statuses');
    $('#messageInput').keypress(function (e) {
        if (e.keyCode == 13) {
            var text = $('#messageInput').val();
            //myDataRef.push({value: text, name: "kole"});  //removed stuff should be myDataRef.push({value: text, name: facebookData.displayName, userID: facebookData.id}); 
            myDataRef.push({value: text, name: facebookData.displayName, userID: facebookData.id}); 
            $('#messageInput').val('');
        }
    });
    
    var facebookData;
    var firebaseDirectoryName;
            
    myDataRef.on('child_added', function(snapshot) {
        var message = snapshot.val();
        firebaseDirectoryName= snapshot.name();
        displayChatMessage(message.value, message.name);
    });
    
    function displayChatMessage(status, username) {
        
        var statusBuilder = $('#statusTemplate').html();
        var statusElement = $(statusBuilder);
        
        statusElement.find('.name').html(username);
        statusElement.find('.content').html(status);
        statusElement.find('.editButton').attr("id", firebaseDirectoryName);
        statusElement.prependTo('.statusContent');
        console.log(statusElement.find('.editButton').id);
    };
        
        
    var edit;
    //edit function
        //live query thing
    $( document ).on( "click", ".editButton", function() {
        var firebaseid = this.id;
        edit = window.prompt("Your new message");
        myDataRef.child(firebaseid).update({value: edit});
        
        $(this).parent().children('.content').html(edit);
        
    });
    
    
  var chatRef = new Firebase('https://kolebook.firebaseio.com/statuses');
    var auth = new FirebaseSimpleLogin(chatRef, function(error, user) {
      if (error) {
        // an error occurred while attempting login
        console.log(error);
      } else if (user) {
        // user authenticated with Firebase
        console.log('User ID: ' + user.id + ', Provider: ' + user.provider);
      } else {
        console.log("user logged out");// user is logged out
      }
        facebookData = user;
    });
    
    auth.login('facebook');
    
    $('#logout').click(function () {
        auth.logout();
    });
    
});


