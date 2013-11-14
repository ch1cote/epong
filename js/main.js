
            //set position
            var playerInit = function(){
               this.wins = 0;
               this.losses = 0;
               this.gameStatus = 'waiting' ;//need to create function that returns proper value
            }
                 //end check position
                var checkInBox = $('.checkin-box:first-child').clone();
                //firebase
                var myRootRef = new Firebase('bbnb.firebaseio.com/EPingPong');


               $('.js-sign-in__submit').on('click',(function(event) {
                  var signInName = $('.js-sign-in__name').val();
                    if(signInName != ''){
                        console.log('<----'+signInName+'------->');
                       //irebase - add new player
                                var myPushRef = myRootRef.push();
                                    myPushRef.set({
                                        name: signInName,
                                        gameStatus: 'waiting',
                                        wins: '0',
                                        losses: 0
                                                    }, function(error){
                                                        if(error) {
                                                            console.log(error);
                                                        } else {
                                                            console.log(myPushRef.name() + ' success!');
                                                        }
                                                        
                                                    });

              } else {
                alert('please enter a name');
              }

               }));

/*≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠*/
                                        //Child Added//
/*≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠≠*/
                            var listCount = 0;
                            myRootRef.on('child_added', function(snapshot) {
                            //get data of child added store in var
                            var flData = snapshot.val();
                            var flID = snapshot.name();
                            var newPlayer = checkInBox.clone();
                            newPlayer.attr('id', flID);

                            console.log(listCount);
                            //if position is 1 or 2 append to 
                            //proper place
                            switch(listCount){
                                case 0:
                                flData.gameStatus = '';
                                break;

                                case 1:
                                flData.gameStatus = '';
                               break;

                                default:
                            }
                            //increment count
                            listCount++;
                              $('.checkin-list').append(newPlayer);      


                              //save ref id "flID" so we can remove with a click
                              newPlayer.data_id = flID;
                              newPlayer.removeClass('hidden');
                            //add checkPos to newPlayer
                              newPlayer.init = playerInit;
                              newPlayer.init();        
                              newPlayer.find('.js-status').text(flData.gameStatus);        
                              newPlayer.find('.js-checkin__name').text(flData.name);        

                            //add click function
                          //     newPlayer.find('.js-checkout').on('click', function(){
                          //   var fbString = 'bbnb.firebaseio.com/EPingPong/'+newPlayer.data_id;
                          //   console.log(flData);
                          //   var curRef = new Firebase(fbString);
                          // console.log(curRef);
                          //   newPlayer.finish = onComplete;
                          //   curRef.remove(newPlayer.finish());

                          //     });
                              clickInits = function(divObj){
                            console.log('clickInits');
                                //check outs - removes from dom and database
                              divObj.find('.js-checkout').on('click', function(){
                            var fbString = 'bbnb.firebaseio.com/EPingPong/'+divObj.data_id;
                            var curRef = new Firebase(fbString);
                            curRef.remove();
                              });
                              //lose - moves to bottom of div
                              divObj.find('.js-lose').on('click', function(){
                             var fbString = 'bbnb.firebaseio.com/EPingPong/'+divObj.data_id;
                            var curRef = new Firebase(fbString);
                             var cLosses = flData.losses++; 
                                 curRef.update({losses: cLosses});
                                //later add feature to count losses
                              })
                                                            } 
                            clickInits(newPlayer);
 

                           
                            });

/* child removed */
                            myRootRef.on('child_removed', function(snapshot) {
                            //get data of child added store in var
                            var flData = snapshot.val();
                            var flID = snapshot.name();
                            var selectDataId = "#"+flID;
                            $(selectDataId).remove();
                          });

/* child changed*/
                            myRootRef.on('child_changed', function(snapshot) {
                            var flData = snapshot.val();
                            var flID = snapshot.name();
                            var theID = '#' + flID;
                            $('.checkin-list').append($(theID));
                            $(theID).find('.js-status').text('waiting with: ' + flData.losses + ' losses');
});

//some useful waiting list stuff

