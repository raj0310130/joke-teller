
// VoiceRSS Javascript SDK
// const VoiceRSS={speech:function(e){this._validate(e),this._request(e)},_validate:function(e){if(!e)throw"The settings are undefined";if(!e.key)throw"The API key is undefined";if(!e.src)throw"The text is undefined";if(!e.hl)throw"The language is undefined";if(e.c&&"auto"!=e.c.toLowerCase()){var a=!1;switch(e.c.toLowerCase()){case"mp3":a=(new Audio).canPlayType("audio/mpeg").replace("no","");break;case"wav":a=(new Audio).canPlayType("audio/wav").replace("no","");break;case"aac":a=(new Audio).canPlayType("audio/aac").replace("no","");break;case"ogg":a=(new Audio).canPlayType("audio/ogg").replace("no","");break;case"caf":a=(new Audio).canPlayType("audio/x-caf").replace("no","")}if(!a)throw"The browser does not support the audio codec "+e.c}},_request:function(e){var a=this._buildRequest(e),t=this._getXHR();t.onreadystatechange=function(){if(4==t.readyState&&200==t.status){if(0==t.responseText.indexOf("ERROR"))throw t.responseText;audioElement.src=t.responseText,audioElement.play()}},t.open("POST","https://api.voicerss.org/",!0),t.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),t.send(a)},_buildRequest:function(e){var a=e.c&&"auto"!=e.c.toLowerCase()?e.c:this._detectCodec();return"key="+(e.key||"")+"&src="+(e.src||"")+"&hl="+(e.hl||"")+"&r="+(e.r||"")+"&c="+(a||"")+"&f="+(e.f||"")+"&ssml="+(e.ssml||"")+"&b64=true"},_detectCodec:function(){var e=new Audio;return e.canPlayType("audio/mpeg").replace("no","")?"mp3":e.canPlayType("audio/wav").replace("no","")?"wav":e.canPlayType("audio/aac").replace("no","")?"aac":e.canPlayType("audio/ogg").replace("no","")?"ogg":e.canPlayType("audio/x-caf").replace("no","")?"caf":""},_getXHR:function(){try{return new XMLHttpRequest}catch(e){}try{return new ActiveXObject("Msxml3.XMLHTTP")}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP.6.0")}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP.3.0")}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP")}catch(e){}try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(e){}throw"The browser does not support HTTP request"}};

let joke = "";

function toggleButton() {
    button.disabled = !button.disabled;
}

async function getJokes() {
    
    const apiUrl = "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";
    try{
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ${data.delivery}`;
        } else { joke = data.joke;}
        console.log(joke);
        getSound();
    } catch (error) {
        console.log("whoops something is wrong!", error);
    }
  }
  
//getJokes();

function getSound() {
    function getVoices() {
  let voices = speechSynthesis.getVoices();
  if(!voices.length){
  // some time the voice will not be initialized so we can call speak with empty string
  // this will initialize the voices 
  let utterance = new SpeechSynthesisUtterance("");
  speechSynthesis.speak(utterance);
  voices = speechSynthesis.getVoices();
  }
  return voices;
  }
  
  function speak(text, voice, rate, pitch, volume) {
  // create a SpeechSynthesisUtterance to configure the how text to be spoken 
  let speakData = new SpeechSynthesisUtterance();
  speakData.volume = volume; // From 0 to 1
  speakData.rate = rate; // From 0.1 to 10
  speakData.pitch = pitch; // From 0 to 2
  speakData.text = text;
  speakData.lang = 'en';
  speakData.voice = voice;
  
  // pass the SpeechSynthesisUtterance to speechSynthesis.speak to start speaking 
  speechSynthesis.speak(speakData);
  
  }
  
  if ('speechSynthesis' in window) {
  
  let voices = getVoices();
  let rate = 0.8, pitch = 1.5, volume = 1;
  let text = joke;
  
  speak(text, voices[2], rate, pitch, volume);
  
  //setTimeout(()=>{ // speak after 2 seconds 
 // rate = 0.5; pitch = 1.5, volume = 0.5;
 // text = "Spaecking with volume = 0.5 rate = 0.5 pitch = 1.5 ";
  //speak(text, voices[10], rate, pitch, volume );
  //}, 2000);
  } else{
  console.log(' Speech Synthesis Not Supported 😞'); 
  }
  
  //window.location.reload();
  }

  document.getElementById("button").addEventListener("click", getJokes);
  
  

  