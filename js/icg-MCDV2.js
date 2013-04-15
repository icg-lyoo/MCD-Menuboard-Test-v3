/*@@Description 
JS file that handles all javascript on the menuboards. Includes retriving data, checking for update, promo initialization etc. This is deprecated and not used. This is being used.
	
@@version v2.1.0
@@date 10/17/2012
@@author - Eric Johnson
@@params NONE
*/

var icg = {
      postParams : [],
      getParams :{},//{'zone_name':'zone1', 'store_nid':1734},
      debug:false,
      utils:{
            currentTime:function(milli){
                  var d = new Date();
                  var ts = d.getTime();//returns current time in milliseconds
                  if(!milli){
                        ts = Math.round(ts/1000);//covert to seconds
                  }
                  
                  return ts;
            },
            getURLParameter:function(name) {
                  var r = RegExp(name + '=' + '(.+?)(&|$)').exec(location.search);
                  
                  if(!r){
                        r = [0,null];
                  }
                  
                  return r[1];
            }
      },
      cl:{
            on:false,
            onScreen:false,
            alert:false,
            log:function(){
                  
                  if(!icg.cl.on){
                        return;
                  }
                  if(arguments[0] == 'clear'){
                        this.clear();
                  }
                  var log = '';
                  if(icg.cl.alert){
                        for(var i=0; i<arguments.length; i++){
                              var arg = arguments[i]+'';
                              if(arg.indexOf('<') == -1){
                                    log += ' '+arg;
                              }else{
                                    log += ' obj : '+$(arg).get(0).tagName+" : length "+$(arg).length;
                              }
                        }
                       
                        alert(log);
                        return;
                  }
                  if($(console).length>0 && !this.onScreen){
                        if($.browser.msie){
                              for(var i=0; i<arguments.length; i++){
                                    log += ' '+arguments[i];
                              }
                              console.log(log);
                        }else{
                              console.log(arguments);
                        }
                  }else{
                       
                  }
            },
            clear:function(){
                  if($(console).length>0){
                        console.clear();
                  }
				  
                  if(this.onScreen && $('#console').length>0){
                        $('#console').html('');
                  }
            }
      },
      allContent:{
            html:'',
            dataRefresh:20*1000,//x amount of seconds
            filename:'temp-json.json',
            lastCallTime:0,
            getInterval:null,
            firstrun:true,
            updateContent:false,
            getContent:function(){
                  //icg.cl.log('AllContent Called');
                  this.lastCallTime = icg.utils.currentTime();//divide by 1000 because its milliseconds
                  var params = {};
            
                  if(icg.allContent.firstrun){
                        //first time getContent is called set type to 0
                        params['type'] = 0;
                        params['filename'] = icg.allContent.filename;
                        icg.allContent.firstrun = false;//set first run to false
                  }else{
                        params['type'] = 2;
                        params['filename'] = icg.allContent.filename;
                  }
            
                  //these params are set in the index.php file if this is a preview in Cantalever
                  if(icg.getParams['d_nid']){
                        params.d_nid = icg.getParams['d_nid'];
                        icg.allContent.dataRefresh = 60*1000;//Define the referesh rate to 1 min w/ preview
                  }
                  if(icg.getParams['zone_name']){
                        params.preview_zone = icg.getParams['zone_name'];
                  }
                  if(icg.getParams['ts']){
                        params.preview_ts = icg.getParams['ts'];
                  }
                  
                  params.dataRefresh = icg.allContent.dataRefresh/1000;//send data refresh rate to see if data has been modified in this timeframe
                  
                  //icg.cl.log('asdfasdfasdfasdf');
                  $.post("index.php", params, function(result) {
                        
                        if(result.status){
                              $.post("index.php", {
                                    'type':1, 
                                    'filename':icg.allContent.filename
                                    }, function(response, status, xhr){

                                    if(response != '' && icg.allContent.html != response){
                                          icg.allContent.updateContent = true;
                                          icg.allContent.html = response;
                                          icg.allContent.show();
                                    }
                              });
                        }else{
                            if(result.code){
                                var code = result.code.substring(0,1);
                                icg.cl.log(code);
                                switch(code){
                                    case '1':
                                        $('body').append(result.data);
                                        break;
                                    default:
                                       icg.cl.log('code doesnt exist in file');
                                    break;
                                }
                            }else{
                              //check for zone containers that are hidden
                              if($('.zone-container:hidden').length>0){
                                    //show content if hidden
                                    icg.allContent.show();
                              }
                        }   
                        }   
                  }, "json");
            },
            show:function(){
                  icg.cl.log('Show function called');
                  //check when the last time data was received
                  icg.cl.log('icg.utils.currentTime()-icg.allContent.lastCallTime) : ', icg.utils.currentTime()-icg.allContent.lastCallTime);
                  icg.cl.log('currenttime-lastcalltime > datarefresh-3 : ', (icg.utils.currentTime()-icg.allContent.lastCallTime)>((icg.allContent.dataRefresh-(3*1000))/1000));
                  if((icg.utils.currentTime()-icg.allContent.lastCallTime)>((icg.allContent.dataRefresh-(3*1000))/1000)){
                        //if greater than 30 seconds get content again
                        icg.allContent.getContent();
                  }else{
                        $('.splash-container').hide();
                        if(!icg.fullscreenPromo.showing){
                              
                              if(icg.allContent.updateContent && icg.allContent.hide()){
                                    //check for changes in content and load new
                                    $("#menu-content").html(icg.allContent.html);
                                    
                                    icg.promo.start();
                                    icg.allContent.fadeIn();
                                    
                                    icg.allContent.updateContent = false;
                              }else{
                                    icg.cl.log('Either no update or hide returned false');
                              }
                              
                              //check if fullscreen promo is not hidden & hide it
                              $('.fullscreenpromo:not(:hidden)').hide();
                              $('.fullscreenpromo').empty();
                              
                        
                              if($('.fullscreenpromo').length > 0){
                                    icg.fullscreenPromo.start();
                              }else{
                                    //icg.cl.log('NO FULLSCREEN PROMO');
                                    //clear interval when fullscreen promo exists then gets removed
                                    clearInterval(icg.fullscreenPromo.interval);
                              }
                        }else{
                        //icg.cl.log('FCP is showing please dont try to show all other content');
                        }
                  }
                  
                  
            },
            fadeIn:function(){
                  if(!icg.allContent.fadeInIndex){
                        icg.allContent.fadeInIndex = 0;
                  }else{
                        icg.allContent.fadeInIndex++;
                  }
                  var index = icg.allContent.fadeInIndex;
                  var fadeInObj = $('.zone-container:hidden').eq(index);
                  if(fadeInObj.length > 0){
                        fadeInObj.eq(index).fadeIn(500, icg.allContent.fadeIn);
                  }
            },
            afterShowAdjustments:function(){
                  
                  if($(document).width() == 5760){//if 3X2
                        $('body').addClass('three-by-two');
                  }
				  else if($(document).width() == 7840){//if 3X2
                        $('body').addClass('four-by-one');
                  }else{//Most likely 5X1
                        $('body').addClass('five-by-one');
                  }
            },
            hide:function(){
                  if(icg.promo.hideAll()){
                        $('.zone-container').hide();
                        //empty zone containers to fully release flash memory
                        $('.zone-container').empty();
                        //reset promo data array for updated promos
                        
                        return true;
                  }else{
                        return false;
                  }
            }
      },
      init:function(){
            
            icg.allContent.afterShowAdjustments();
            
            //get all content
            setTimeout(icg.allContent.show, 1000);
            
            //clear interval incase init is called again
            if(icg.allContent.getInterval){
                  clearInterval(icg.allContent.getInterval);
            }
            //set interval to get content every, icg.allCotnent.dataRefresh
            icg.allContent.getInterval = setInterval(icg.allContent.show, icg.allContent.dataRefresh);
      },
      getFlashObjById:function(id){
            var obj = null;
            if(!obj){
                  id = id+'';
                  obj = document.getElementById(id);
            }
            
            return obj;
      },
      promo:{
            data:{},
            zeroWidthOnEmbed:true,
            timeout:{
                  count: 0,
                  showTimeout: 1500,
                  maxCount:10
            },
            start:function(){
                  //icg.cl.log('Promo start called');
                  // setTimeout(function(){
                  //    $(document).trigger('attemptPromoShow');
                  // }, icg.promo.timeout.showTimeout);
				 
                  icg.promo.embedSwf();
            },
            show:function(e){
                  if(e.success){
                        var obj = icg.getFlashObjById(e.id);
                        var swfObj = icg.promo.data[e.id];
                        var data = swfObj['data'];
                        var objCount = (!$(obj).attr('promo-timeout'))?0:parseInt($(obj).attr('promo-timeout'));
                        
                        if($(obj).length > 0 && objCount < icg.promo.timeout.maxCount)
                        {
                              try{
                                    
                                    $(obj).attr('width', swfObj.width);
                                    obj.changeData(data, true);
                              }
                              catch(err)
                              {		
                                    icg.cl.log('Error obj : objCount : len : ', obj," : ", objCount, ' : ', $(obj).length, " d.length : ", data.length, ', error : ', err);
                                    $(obj).attr('promo-timeout', objCount+1);
                                    setTimeout(function(){
                                          icg.promo.show(e);
                                    }, icg.promo.timeout.showTimeout);
                              }
                        }else{
                        //icg.cl.log('ERROR : Promo show has tried to call function ', icg.promo.timeout.maxCount, ' and has failed');
                        }
                  }
            },
            embedSwf:function(){
                  
                  for(var each in icg.promo.data){
                        var id = each;
                        var swfObj = icg.promo.data[each];
                        var width = swfObj.width;
                        if(icg.promo.zeroWidthOnEmbed){
                              width = 1;//cant be zero width or the embedSWF doesnt work and will come back width success equal to false
                        }
                        swfobject.embedSWF(swfObj.swf, id, width, swfObj.height, "9.0.0","expressInstall.swf", swfObj.flashvars, swfObj.params, swfObj.attributes, swfObj.func);
                  }
                  
            },
            hideAll:function(){
                  for(var each in icg.promo.data){
                        var obj
                        var id = each;
                        icg.promo.hide(id);
                  }
				  
                  icg.promo.data= {};
				  
                  return true;
            },
            hide:function(id){
                  //icg.cl.log('TRYING to hide promo : ', id);
                  try{
                        swfobject.removeSWF(id);
                  }catch(e){
                  //icg.cl.log('Error Trying to removeSWF : ', e);
                  }
            }
      },
      fullscreenPromo:{
            duration:1000*15,//15 sec
            timeout:1000*60*.2,//5 min
            hasCompleteCallback:true,
            interval:0,
            html:'',
            data:{},
            debug:false,
            showing:false,
            saveFilename:'fcp-temp.txt',
            _getData:true,
            readyCount:0,
            initialized:false,
            start:function()
            {
                  icg.fullscreenPromo.initialized = true;
                  clearInterval(this.interval);
                  var intTimeout = parseInt(this.timeout)+parseInt(this.duration);
				   
                  if(!this.hasCompleteCallback){
                        this.interval = setInterval(this.show, intTimeout);
                  }else{
                        //icg.cl.log('intTimeout : ', intTimeout);
                        this.interval = setInterval(this.show, intTimeout);
                  //icg.cl.log('fullscreenPromo hasCompleteCallback');
                  }
            },
            remove:function(){
                  icg.fullscreenPromo.initialized = false;
            //TODO:add any other cleanup items when fullscreen Promo doesnt exists for a schedule
            },
            ready:function(){
                  icg.fullscreenPromo.readyCount++;
                  if(icg.fullscreenPromo.readyCount == $('.fullscreenpromo').find(".video-container").length){
                        $('.fullscreenpromo').find(".video-container").each(function(){
                              var id = $(this).find('object').attr('id');
                              //icg.cl.log('id : ', id);
                              var obj = icg.getFlashObjById(id);
                              //icg.cl.log('obj : ', obj);
                              try{
                                    obj.playPromo();
                              }catch(e){
                              //icg.cl.log('FCP Error : couldnt playPromo : ', e);
                              }
                        });
                  }
            },
            embedSwf:function(){
                  
                  for(var each in icg.fullscreenPromo.data){
                        var id = each;
                        var swfObj = icg.fullscreenPromo.data[each];
                        //icg.cl.log('FCP : id ', id);
                        swfobject.embedSWF(swfObj.swf, id, swfObj.width, swfObj.height, "9.0.0","expressInstall.swf", swfObj.flashvars, swfObj.params, swfObj.attributes);
                  }
                  
            },
            show:function()
            {
                  
                  icg.fullscreenPromo.readyCount = 0;
                  //icg.cl.log('fcp show');
                  //hide current showing content
                  icg.allContent.hide();
                  
                  //double check promo container for html
                  // html should be empty after shown the first time
                  if(icg.fullscreenPromo._getData){
                        icg.fullscreenPromo.getData();
                  }else{
                        //embed FCP swf files
                        icg.fullscreenPromo.embedSwf();
                        
                        //show fullscreen promo html
                        //icg.cl.log('fcp showing for the first time');
                        //set showing to true so that a call for new content doesnt cause any issues
                        icg.fullscreenPromo.showing = true;
                        icg.fullscreenPromo._getData = true;
                        $('.fullscreenpromo').show();
                        icg.fullscreenPromo.html = '';
                        if(!icg.fullscreenPromo.hasCompleteCallback){
                              setTimeout(icg.fullscreenPromo.complete, icg.fullscreenPromo.duration);
                        }
                  }
            },
            getData:function(){
                  var data = {
                        'fcp_getData':1,
                        'fcp_file':icg.fullscreenPromo.saveFilename
                  };
                  $.post('index.php', data, function(result){
                        //icg.cl.log("FCP result.updated : ", result.updated);
                        if(result && result.updated){
                              icg.files.get(icg.fullscreenPromo.saveFilename, function(response){
                                    if(response && response != ''){
                                          //icg.cl.log('FCP get resposne : ', response);
                                          icg.fullscreenPromo.html = response;
                                    }else{
                                    //icg.cl.log('FCP : Did get any response from getting contents of temp file');
                                    }
								  
                                    if(icg.fullscreenPromo.html != ''){
                                          $(".fullscreenpromo").empty();
                                          $(".fullscreenpromo").replaceWith(icg.fullscreenPromo.html);
                                          //set boolean getData to false so that show will show fullscreen promo data
                                          icg.fullscreenPromo._getData = false;
                                          //after html is populated show fullscreen promo
                                          icg.fullscreenPromo.show();
                                    }else{
                                    //icg.cl.log('**** FCP ERROR : fullscreenPromo.html is empty ***');
                                    }
                              });
                        }else{
                        //icg.cl.log('FCP ERROR : couldnt get response from json data for FCP : updated', result.updated);
                        }
                  }, "json");
            },
            complete:function(){
                  icg.fullscreenPromo.hide();
            },
            hide:function()
            {     
                  $('.fullscreenpromo').hide();
                  $('.splash-container').show();
                  for(var each in icg.fullscreenPromo.data){
                        var id = each;
                        try{
                              swfobject.removeSWF(id);
                        }catch(e){
                        //icg.cl.log('Error removing swf : ', id, e);
                        }
                  }
                  icg.fullscreenPromo.data = {};
                  $('.fullscreenpromo').empty();
                  
                  
                  clearInterval(icg.fullscreenPromo.interval);
                  
                  //set showing to false so that all content can be shown
                  icg.fullscreenPromo.showing = false;
                  
                  location.reload();
            //setTimeout(icg.allContent.show, 1000);
            }
      },
      files:{
            save:function(file, contents, callback){
                  if(!callback){
                        callback = icg.files.defaultCallback
                  }
                  //icg.cl.log('trying to save to file : ', file, ' with contents : ', contents.length);
                  var data = {
                        'savefile':file,
                        'filecontents':contents
                  };
                  $.post('index.php', data, callback);
            },
            get:function(file, callback){
                  if(!callback){
                        callback = icg.files.defaultCallback
                  }
                  var data = {
                        'getfilecontents':file
                  };
                  $.post('index.php', data, callback);
            },
            defaultCallback:function(response, status, xhr){
            //icg.cl.log('save file response : ', resposne)
            }
      }
				
};
