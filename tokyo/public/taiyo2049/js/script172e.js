(function($){
  var displayBoot = true;
  var crtEffect = true;
  var ambientSound = false;

  // IE11 forEach polyfill
  if (typeof NodeList !== "undefined" && NodeList.prototype && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
  }

  // Google Analytics Custom Events
  var gaCustomEventTrigger = document.querySelectorAll('.ga-ce');
  gaCustomEventTrigger.forEach(function(e,i){
    e.addEventListener('click', function(){
      var category = this.dataset.category ? this.dataset.category : null,
      action = this.dataset.action ? this.dataset.action : null,
      label = this.dataset.label ? this.dataset.label : null,
      value = this.dataset.value ? this.dataset.value : 1;

      if(window.ga && ga.create) {
        ga('send', 'event', category, action, label, value, null);
      }
    });
  });

  /*var sharePopups = undefined;
	sharePopups = {
		triggers : $('.share-popup'),

		init: function(){
			var self = this;
			self.triggers.click(function(e){
				e.preventDefault();
				self.popup($(this).attr('href'));
			});
		},
		popup: function(target){
		    //console.log(target);
		    popupWindow = window.open(target,'','width=600,height=400');
		    popupWindow.focus();
		}
	};
	sharePopups.init();*/


  var system = {
    view: $('.screen'),
    bios: $('.screen .bios'),
    started: false,
    loading: {
      audio: false,
      video: false
    },
    ambientAudio: new Audio('sound/ambient.mp3'),
    //audioPlayer: new Audio(),
    audioPlayer: document.createElement('audio'),
    text: [
      '<p>TAIYO OFFICIAL</p>'+
      '<p>Copyright (c) 2049, 2050, All Rights Reserved</p>'+
      '<p>BIOS Version: 2049280406 Release 2</p>'+
      '<br />',
      '<p>DDR RAM "MEMORY": 100% OK</p>',
      '<p>Intel Ouroboros Lake Test: 100% OK</p>',
      '<p>Crash Test: 20020 CODE … Done</p>',
      '<br />'+
      '<br />',
      '<p>Press Any Key to boot system</p>'
    ],
    actionHandlers: [
        ['play', () => { this.resumeTrack(); }],
        ['pause', () => { this.pauseTrack(); }],
        ['stop', () => { this.stopTrack(); }]
    ],
    init: function(){
      var self = this;

      self.setBodyHeight();

      var agent=navigator.userAgent.toLowerCase();
      self.isIPhone = (agent.indexOf('iphone')!=-1);

      self.displayTime();

      setTimeout(function(){ self.boot(); }, 100);

      for (const [action, handler] of self.actionHandlers) {
        try {
          navigator.mediaSession.setActionHandler(action, handler);
        } catch (error) {
          console.log(`The media session action "${action}" is not supported yet.`);
        }
      }

      $(window).on('keyup click', function(e){
        if(!system.started){
          self.bios.hide();
          self.setLoading(true);
          setTimeout(function(){
            $('.login').addClass('loaded');
            //$('.login input[type="password"]').focus();
            self.setLoading(false);
          }, 1500);

          if(ambientSound && !self.isIPhone){
            self.ambientAudio.play();
            $(self.ambientAudio).animate({volume: .2}, 3000);
          }
          system.started = true;
        }
      });

      // $(window).on('mousemove', function(e){
      //     $(".cursor").css({left:e.pageX, top:e.pageY});
      // });

      self.ambientAudio.loop = true;
      self.ambientAudio.volume = 0;
      self.ambientAudio.addEventListener('timeupdate', function(){
        var buffer = .44
        if(this.currentTime > this.duration - buffer){
            this.currentTime = 0
            this.play()
        }
      });

      $(self.audioPlayer).on('ended', function(){
        self.stopTrack();
      });

      $(self.audioPlayer).on("stalled", function() {
        var audio = this;
        console.log("audio stalled");
        audio.load();
        //audio.play();
      });

      $('#video').on("stalled", function() {
        var video = this;
        console.log("video stalled");
        video.load();
        //video.play();
      });

      if ('mediaSession' in navigator) {
        navigator.mediaSession.setActionHandler("pause", () => {
          self.pauseTrack();
        });
        navigator.mediaSession.setActionHandler("play", () => {
          self.resumeTrack();
        });
        navigator.mediaSession.setActionHandler("seekto", details => {
          self.audioPlayer.currentTime = details.seekTime;
        });
      }
    },
    setBodyHeight: function(){
      var self = this;
      $('body').css('height', window.innerHeight);

      setTimeout(self.setBodyHeight, 100);
    },
    setLoading: function(state){
      var self = this;
      if(state){
        $('body').addClass('loading');
      } else {
        $('body').removeClass('loading');
      }
    },
    formatAMPM: function (date) {
      var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      // var strTime = hours + ':' + minutes + ampm + '<span> - ' + monthNames[date.getMonth()] + '. ' + date.getDate() + ', 2049</span>';
      var strTime = hours + ':' + minutes + ampm + '<span> - ' + "Dec" + '. ' + '31' + ', 2049</span>';
      return strTime;
    },
    displayTime: function(){
      var self = this;
      var time = self.formatAMPM(new Date);
      $('#time').html(time);
      setTimeout(function(){ self.displayTime(); }, 1000);
    },
    boot: function(){
      var self = this;
      // hide fullscreen toggle on fucking iOS

      if (self.isIPhone){
        $('.hide-on-ios').hide();
      }

      if(crtEffect){
        $('body').addClass('crt');
      }
      if(!displayBoot){
        self.bios.hide();
        $('.login').hide();
      } else {
        self.view.fadeIn(100, function(){
          $.each(self.text, function(i,e){
            setTimeout(function(){
              self.bios.append(e)
          }, i*700);
          });
        });
      }
    },
    toggleAmbientSound: function(status){
      var self = this;
      if(status){
        $(self.ambientAudio).animate({volume: .2}, 3000);
      } else {
        $(self.ambientAudio).animate({volume: 0}, 8000);
      }
    },
    loadTrack: function(item){
      var self = this;
      //console.log('play', item);

      self.loading.video = false;
      self.loading.audio = false;

      self.setLoading(true);

      $(self.audioPlayer).on('canplay', function(){
        self.playTrack('audio');
      });

      $('#video').on('canplay', function(){
        self.playTrack('video');
      });

      self.playingTrack = item;
      item.addClass('active playing');
      var track = item.attr('data-sound');
      var video = item.attr('data-video');
      var title = item.attr('data-title');
      var album = item.attr('data-album');

      $('#video .mpeg').attr('src', "video/"+video+".mp4");
      $('#video .webm').attr('src', "video/"+video+".webm");
      $('#video .milkdrop-video').attr('src', "#webamp canvas");
      $('#video').get(0).load();

      self.audioPlayer.src = "sound/"+track;
      self.audioPlayer.load();

      if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: title,
          artist: 'Taiyo Official',
          album: album,
          artwork: [
            { src: 'img/cover/'+album+'_96x96.png',   sizes: '96x96',   type: 'image/png' },
            { src: 'img/cover/'+album+'_128x128.png', sizes: '128x128', type: 'image/png' },
            { src: 'img/cover/'+album+'_192x192.png', sizes: '192x192', type: 'image/png' },
            { src: 'img/cover/'+album+'_256x256.png', sizes: '256x256', type: 'image/png' },
            { src: 'img/cover/'+album+'_384x384.png', sizes: '384x384', type: 'image/png' },
            { src: 'img/cover/'+album+'_512x512.png', sizes: '512x512', type: 'image/png' }
          ]
        });
      }
    },
    playTrack: function(media){
      var self = this;
      if(media == 'audio'){
        self.loading.audio = true;
      }
      if(media == 'video'){
        self.loading.video = true;
      }
      if(self.loading.audio && self.loading.video){
        self.setLoading(false);
        self.resumeTrack();
        $('body').addClass('media-playing');
        if ('mediaSession' in navigator) {
            navigator.mediaSession.playbackState = 'playing';
        }
      }
    },
    stopTrack: function(){
      var self = this;
      //console.log('stop', self.playingTrack);

      $(self.audioPlayer).unbind('canplay');
      $('#video').unbind('canplay');
      $('body').removeClass('media-playing');

      $('#video').stop(true, true).fadeOut(800);
      setTimeout(function(){
        $('#video').get(0).pause()
      }, 800);
      self.audioPlayer.pause();
      self.playingTrack.removeClass('active playing');
      if ('mediaSession' in navigator) {
          navigator.mediaSession.playbackState = 'paused';
      }
      //self.toggleAmbientSound(true);
    },
    pauseTrack: function(){
      var self = this;
      //console.log('pause', self.playingTrack);
      $('#video').get(0).pause();

      self.audioPlayer.pause();
      navigator.mediaSession.playbackState = 'paused';
      //self.toggleAmbientSound(true);
    },
    resumeTrack: function(){
      var self = this;
      //console.log('resume', self.playingTrack);
      $('#video').stop(true, true).fadeIn(800);
      $('#video').get(0).play();
      self.audioPlayerPromise = self.audioPlayer.play();
      //self.toggleAmbientSound(false);
    }
  };

  system.init();

  $('.login .hint a').on('click', function(e){
    e.preventDefault();
    $(this).parent('.hint').find('a').hide();
    $(this).parent('.hint').find('span').show();
  });

  $('.login form').on('submit', function(e){
    e.preventDefault();
    // var answers = ['dGFpeW8=', 'b2ZmaWNpYWw=', 'dGFpeW8gb2ZmaWNpYWw=', 'dGFpeW8yMDQ5', 'dGFpeW8gMjA0OQ==', 'c3Vu', 'dGhlIHN1bg==', 'YmUgbGlrZSB0YWl5bw==', 'dGhlIGV0ZXJuYWwgc3Vuc2hpbmUgb2YgaG9wZQ==', 'dGhpcyBpcyB0YWl5bw==', 'MjA0OQ==', 'Z3JlYXRlc3QgYnJhbmQgb2YgYWxsIHRpbWU='];
    var answers = ['dGFpeW8=', 'b2ZmaWNpYWw=', 'dGFpeW8gb2ZmaWNpYWw=', 'dGFpeW8yMDQ5', 'dGFpeW8gMjA0OQ==', 'c3Vu', 'dGhlIHN1bg==', 'YmUgbGlrZSB0YWl5bw==', 'dGhlIGV0ZXJuYWwgc3Vuc2hpbmUgb2YgaG9wZQ==', 'dGhpcyBpcyB0YWl5bw==', 'MjA0OQ==', 'Z3JlYXRlc3QgYnJhbmQgb2YgYWxsIHRpbWU='];
    var value = $('.login form input[type=password]').val().toLowerCase();

    //console.log(btoa(value));
    if(answers.includes(btoa(value))){
      document.body.classList.add('logged-in');
      $('.login').removeClass('loaded');
      setTimeout(function(){
        $('.login').hide();
        system.toggleAmbientSound(false);
        system.setLoading(false);
      }, 1800);
    } else {
      $('.login form input[type=password]').val('');
    }
  });

  $('.navbar .item.submenu button').on('click', function(e){
    if(!$(this).parent('.submenu').hasClass('active')){
      $('.navbar .item.submenu.active').removeClass('active');
      $(this).parent('.submenu').addClass('active');
    } else {
      $('.navbar .item.submenu.active').removeClass('active');
    }
  });

  $('body').on('click', function(e){
    if($(e.target).closest('.item.submenu.active').length <= 0){
      $('.navbar .item.submenu.active').removeClass('active');
    }
    if($(e.target).closest('.dialog, .navbar').length <= 0){
      $('.dialog').css('display', 'none').html('');
    }
    $('.file').removeClass('active');
  });

  $('.disabled').on('click', function(e){
    e.preventDefault();
  });

  /*$('.human-div .human-btn button').on('click', function(e){
    if(!$(this).parent('.human-div').hasClass('active')){
      $('.human-div .human-btn.active').removeClass('active');
      $(this).parent('.human-div').addClass('active');
    } else {
      $('.human-div .human-btn.active').removeClass('active');
    }
  });

  $('.disabled').on('click', function(e){
    e.preventDefault();
  }); */

  $('#about').on('click', function(e){
    e.preventDefault();
    $('.navbar .item.submenu.active').removeClass('active');
    var content = '<div><p><a href="" target="_blank">Taiyo Official</a> is a Fashion Label conceptualized in 2019 by <a href="https://www.instagram.com/sofus_w/" target="_blank">Sofus Wenøe</a> and <a href="" target="_blank">Jens Bjerre</a>.<br /><br />'+
    'The brand aesthetic takes inspiration from Vintage Designs that mirror the Dichotomy between Luxury and Streetwear; A Partition of the past and future.<br /><br />'+
    'At its definition, <a href="" target="_blank">Taiyo Official</a> is the culmination of Japanese Modern Art with Philosophical references.'+
    '</p></div>';
    $('.dialog').html(content).css('display', 'flex');
  });

  $('#ourstory').on('click', function(e){
    e.preventDefault();
    $('.navbar .item.submenu.active').removeClass('active');
    var content = '<div><p><target="_blank">Taiyo Official</a> is a collaboration that exists to make a change in the Industry.<br />'+
    'We are changing the directory away from Slave-like practices and towards Ethical Production and CO2 Neutrality.</p></div>';
    $('.dialog').html(content).css('display', 'flex');
  });

  $('#social').on('click', function(e){
    e.preventDefault();
    $('.navbar .item.submenu.active').removeClass('active');
    var content = '<div><p><em><a href="https://www.instagram.com/taiyo_official_/" target="_blank">INSTAGRAM</a></em><br /><br />'+
    '<em><a href="https://www.tiktok.com/@taiyoofficial" target="_blank">TIK TOK</a></em><br /><br />'+
    '<em><a href="https://www.facebook.com/Taiyo-Official-108891261657101" target="_blank">FACEBOOK</a></em><br /><br />'+
    '<em><a href="https://twitter.com/TaiyoOfficial_" target="_blank">TWITTER</a></em><br /><br />'+
    '<em><a href="https://www.reddit.com/r/taiyoofficial/" target="_blank">REDDIT</a></em>'+
    '</p></div>';
    $('.dialog').html(content).css('display', 'flex');
  });

  $('#contact').on('click', function(e){
    e.preventDefault();
    $('.navbar .item.submenu.active').removeClass('active');
    var content = '<div><p>If you want to contact us:<br /><br />'+
    '- You can send a <a href="#" id="social" class="ga-ce" data-category="elements" data-action="click" data-label="social">DM</a> to us.<br /><br />'+
    '- You can send a mail to <a target="_blank" alt="thetaiyoservice@gmail.com" href="mailto:thetaiyoservice@gmail.com">thetaiyoservice@gmail.com</a>.'+
    '</p></div>';
    $('.dialog').html(content).css('display', 'flex');
  });


  $('#fullscreen').on('click', function(e){
    e.preventDefault();
    $('.navbar .item.submenu.active').removeClass('active');
    var elem = document.documentElement;

    if($('body').hasClass('fullscreen')){
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) { /* Firefox */
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { /* IE/Edge */
        document.msExitFullscreen();
      }
      $('body').removeClass('fullscreen');
    } else {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
      }
      $('body').addClass('fullscreen');
    }
  });

/*  $('#restart').on('click', function(e){
    e.preventDefault();
    location.reload();
  });

  $('#print').on('click', function(e){
    $('.navbar .item.submenu.active').removeClass('active');
    e.preventDefault();
    window.print();
  });*/

  $('#switchfiles').on('click', function(e){
    e.preventDefault();
    $('.navbar .item.submenu.active').removeClass('active');
    $(this).toggleClass('invert');
    $('body').toggleClass('show-hidden-files');
  });/*

  $('#folder1').on('click', function(e){
    e.preventDefault();
    $('.finder').removeClass('focus');
    $('.finder.2k49').addClass('focus').show('slow');
    $(this).addClass('active');
  });

  $('#folder2').on('click', function(e){
    e.preventDefault();
    $('.finder').removeClass('focus');
    $('.finder.gktfolder').addClass('focus').show('slow');
    $(this).addClass('active');
  });

  $('#folder3').on('click', function(e){
    e.preventDefault();
    $('.finder').removeClass('focus');
    $('.finder.dietyeezusfolder').addClass('focus').show('slow');
    $(this).addClass('active');
  });*/

  /*$('#folder4').on('click', function(e){
    e.preventDefault();
    $('.finder').removeClass('focus');
    $(this).addClass('active');
    setTimeout(function(){
      var content = '<div><p>File corrupted!<br />Please download it again.</p></div>';
      $('.dialog').html(content).css('display', 'flex');
    }, 0);
    $(this).addClass('active');
  });
*/
  $('#snake').on('click', function(e){
    e.preventDefault();
    $('#video').get(0).play();
    $('.tab.fdl.snake').addClass('focus').show();
  });

  $('#blog').on('click', function(e){
    e.preventDefault();
    $('#video').get(0).play();
    $('.tab.fdl.blog').addClass('focus').show();
  });

  $('#winamp').on('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    // One continuous session: the player is built once on boot, so this only
    // brings it forward. It used to construct a second Webamp here, which
    // came up empty because it loaded a placeholder track from the old CDN.
    $('.wwwinamp').addClass('focus').show();
    // Reopens the same session if it was closed, rather than building a new one.
    if (window.__taiyoWinamp) {
      window.__taiyoWinamp.show();
    } else {
      var container = document.getElementById('webamp');
      if (container) {
        container.style.display = 'block';
        container.style.zIndex = '12';
      }
    }
  });

  /*

  $('#readme').on('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    $('.finder.readme').addClass('focus').show('slow');
  });*/

  $('#earththt2').on('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    $('.tab.earth').addClass('focus').show('slow');
  });

  $('#termstht2').on('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    $('.tab.terms').addClass('focus').show('slow');
  });

  $('#catalogtht2').on('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    $('.tab.catalog').addClass('focus').show('slow');
  });

  $('#lorem-ipsumtht2').on('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    $('.tab.lorem-ipsum').addClass('focus').show('slow');
  });

  $('#black-tshirttht2').on('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    $('.tab.black-tshirt').addClass('focus').show('slow');
  });

  $('#white-tshirttht2').on('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    $('.tab.white-tshirt').addClass('focus').show('slow');
  });

  $('#black-hoodietht2').on('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    $('.tab.black-hoodie').addClass('focus').show('slow');
  });

  $('#white-hoodietht2').on('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    $('.tab.white-hoodie').addClass('focus').show('slow');
  });

  $('#earththt3').on('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    $('.tab.earth').addClass('focus').show('slow');
  });

  $('#termstht3').on('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    $('.tab.terms').addClass('focus').show('slow');
  });

  $('#catalogtht3').on('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    $('.tab.catalog').addClass('focus').show('slow');
  });

  $('#lorem-ipsumtht3').on('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    $('.tab.lorem-ipsum').addClass('focus').show('slow');
  });

  $('#black-tshirttht3').on('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    $('.tab.black-tshirt').addClass('focus').show('slow');
  });

  $('#white-tshirttht3').on('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    $('.tab.white-tshirt').addClass('focus').show('slow');
  });

  $('#black-hoodietht3').on('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    $('.tab.black-hoodie').addClass('focus').show('slow');
  });

  $('#white-hoodietht3').on('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    $('.tab.white-hoodie').addClass('focus').show('slow');
  });

  $('#earththt4').on('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    $('.tab.earth').addClass('focus').show('slow');
  });

  $('#termstht4').on('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    $('.tab.terms').addClass('focus').show('slow');
  });

  $('#catalogtht4').on('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    $('.tab.catalog').addClass('focus').show('slow');
  });

  $('#lorem-ipsumtht4').on('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    $('.tab.lorem-ipsum').addClass('focus').show('slow');
  });

  $('#black-tshirttht4').on('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    $('.tab.black-tshirt').addClass('focus').show('slow');
  });

  $('#white-tshirttht4').on('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    $('.tab.white-tshirt').addClass('focus').show('slow');
  });

  $('#black-hoodietht4').on('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    $('.tab.black-hoodie').addClass('focus').show('slow');
  });

  $('#white-hoodietht4').on('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    $('.tab.white-hoodie').addClass('focus').show('slow');
  });

  $('#earththt5').on('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    $('.tab.earth').addClass('focus').show('slow');
  });

  $('#termstht5').on('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    $('.tab.terms').addClass('focus').show('slow');
  });

  $('#catalogtht5').on('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    $('.tab.catalog').addClass('focus').show('slow');
  });

  $('#lorem-ipsumtht5').on('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    $('.tab.lorem-ipsum').addClass('focus').show('slow');
  });

  $('#black-tshirttht5').on('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    $('.tab.black-tshirt').addClass('focus').show('slow');
  });

  $('#white-tshirttht5').on('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    $('.tab.white-tshirt').addClass('focus').show('slow');
  });

  $('#black-hoodietht5').on('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    $('.tab.black-hoodie').addClass('focus').show('slow');
  });

  $('#white-hoodietht5').on('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    $('.tab.white-hoodie').addClass('focus').show('slow');
  });

  $('.finder .close').on('click', function(e){
    e.preventDefault();
    $(this).closest('.finder').hide();
  });

  $('.play-track').on('click', function(e){
    e.preventDefault();
    var item = $(this);
    if(!item.hasClass('playing')){
      //system.toggleAmbientSound(false);
      system.setLoading(true);
      if(system.playingTrack){
        system.stopTrack();
        setTimeout(function(){
          system.loadTrack(item);
        }, 800);
      } else {
        system.loadTrack(item);
      }
    }
  });

  $('#pause').on('click', function(e){
    e.preventDefault();
    if(system.audioPlayer.paused){
      $(this).removeClass('invert');
      system.resumeTrack();
    } else {
      $(this).addClass('invert');
      system.pauseTrack();
    }

  });
  $('#stop').on('click', function(e){
    e.preventDefault();
    $('body').removeClass('media-playing');
    system.stopTrack();
  });

/*TAB THAT CAN GO OUT OF THE SCREEN*/

$('.tab').on('mousedown click', function(e){
  $('.tab.focus').removeClass('focus');
  $(this).addClass('focus');
});

$('.tab').each(function(i,e){
  dragElement(e);
});


$('#earththt').on('click', function(e){
  e.preventDefault();
  e.stopPropagation();
  $('.tab.earth').addClass('focus').show('slow');
});

$('#termstht').on('click', function(e){
  e.preventDefault();
  e.stopPropagation();
  $('.tab.terms').addClass('focus').show('slow');
});

$('#catalogtht').on('click', function(e){
  e.preventDefault();
  e.stopPropagation();
  $('.tab.catalog').addClass('focus').show('slow');
});

$('#lorem-ipsumtht').on('click', function(e){
  e.preventDefault();
  e.stopPropagation();
  $('.tab.lorem-ipsum').addClass('focus').show('slow');
});

$('#black-tshirttht').on('click', function(e){
  e.preventDefault();
  e.stopPropagation();
  $('.tab.black-tshirt').addClass('focus').show('slow');
});

$('#white-tshirttht').on('click', function(e){
  e.preventDefault();
  e.stopPropagation();
  $('.tab.white-tshirt').addClass('focus').show('slow');
});

$('#black-hoodietht').on('click', function(e){
  e.preventDefault();
  e.stopPropagation();
  $('.tab.black-hoodie').addClass('focus').show('slow');
});

$('#white-hoodietht').on('click', function(e){
  e.preventDefault();
  e.stopPropagation();
  $('.tab.white-hoodie').addClass('focus').show('slow');
});

$('.tab .close').on('click', function(e){
  e.preventDefault();
  $(this).closest('.tab').hide();
});


function buttonFunction(el) {
  el.style.backgroundColor = "red";
}

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if ($(elmnt).find('.header').get(0)) {
    $(elmnt).find('.header').get(0).onmousedown = dragMouseDown;
    $(elmnt).find('.header').get(0).ontouchstart = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
    elmnt.ontouchstart = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    if (e.cancelable) { /* e.preventDefault(); */ }
    // get the mouse cursor position at startup:
    if(e.touches){
      var clientX = e.touches[0].pageX;
      var clientY = e.touches[0].pageY;
    } else {

      var clientX = e.clientX;
      var clientY = e.clientY;
    }

    pos3 = clientX;
    pos4 = clientY;

    document.onmouseup = closeDragElement;
    document.ontouchend = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
    document.ontouchmove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    if (e.cancelable) { e.preventDefault(); }

    if(e.touches){
      var clientX = e.touches[0].pageX;
      var clientY = e.touches[0].pageY;
    } else {
      var clientX = e.clientX;
      var clientY = e.clientY;
    }
    // calculate the new cursor position:
    pos1 = pos3 - clientX;
    pos2 = pos4 - clientY;
    pos3 = clientX;
    pos4 = clientY;

    /*if (elmnt.offsetLeft + element.clientWidth > window.innerWidth
        || elmnt.offsetLeft + element.clientHeight > window.innerHeight
        || elmnt.offsetLeft < 0*/

    var posY = (elmnt.offsetTop - pos2  >= 0) ? elmnt.offsetTop - pos2 : 0 || elmnt.offsetLeft + element.clientHeight > window.innerHeight;
    //(elmnt.offsetTop + pos2  <= window.innerHeight) ? elmnt.offsetTop - pos2 : window.innerHeight;
    var posX = (elmnt.offsetLeft - pos1 >= 0) ? elmnt.offsetLeft - pos1 : 0;
    // set the element's new position:
    elmnt.style.top = posY + "px";
    elmnt.style.left = posX + "px";
}

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.ontouchend = null;
    document.onmousemove = null;
    document.ontouchmove = null;
  }
}

$(function() {
  var b = $("#button");
  var w = $("#wrapper");
  var l = $("#list");
  var l_ = $("#list_");

  // w.height(l.outerHeight(true)); REMOVE THIS

  b.click(function() {

    if (w.hasClass('open')) {
      w.removeClass('open');
      w.height(0);
    } else {
      w.addClass('open');
      w.height(l.outerHeight(true));
      w.height(l_.outerHeight(true));
    }

  });
});

$(function() {
  var b2 = $("#option-size-title");
  var w2 = $("#wrapper2");
  var l2 = $("#list2");
  var w = $("#wrapper");

  // w.height(l.outerHeight(true)); REMOVE THIS

  b2.click(function() {

    if (w2.hasClass('open')) {
      w2.removeClass('open');
      w.removeClass('down');
      w2.height(0);
    } else {
      w2.addClass('open');
      w.addClass('down');
      w2.height(l2.outerHeight(true));
    }

  });
});

/* Dropdown menu in clothing tab */
var x, i, j, l, ll, selElmnt, a, b, c;
/* Look for any elements with the class "custom-select": */
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /* For each element, create a new DIV that will act as the selected item: */
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /* For each element, create a new DIV that will contain the option list: */
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    /* For each option in the original select element,
    create a new DIV that will act as an option item: */
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /* When an item is clicked, update the original select box,
        and the selected item: */
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
    /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);


})(jQuery);
