$(function() {
  var data = [
  { 
    action: 'type',
    strings: ["Let's hack Brian's server!", ''],
    postDelay: 1500
  },
  { 
    action: 'type',
    strings: ["ssh brian@Brians-WebServer"],
    output: '<span class="gray">Login as:</span><br>&nbsp;',
    postDelay: 1500
  },
  { 
    action: 'type',
    strings: ["anon"],
    output: '<span class="gray">brian@Brians-WebServer Password:</span><br>&nbsp;',
    postDelay: 3000
  },
  { 
    action: 'type',
    strings: ["*********"],
    output: '<span class="gray">Login Successful</span><br>&nbsp;',
    postDelay: 2000
  },
  { 
    action: 'type',
    strings: ["We're in!", ''],
    postDelay: 1500
  },
  { 
    action: 'type',
    strings: ["ls"],
    output: '<span class="gray">Documents    Pictures    Video    Projects</span><br>&nbsp;',
    postDelay: 1000
  },
  { 
    action: 'type',
    strings: ["ls ./Projects"],
    output: '<span class="gray">Java    C-Programming    C-Sharp    Scripts    Web</span><br>&nbsp;',
    postDelay: 1000
  },
  { 
    action: 'type',
    strings: ["ls ./Projects/Web"],
    output: '<span class="green">Portfolio</span><br>&nbsp;',
    postDelay: 1000
  },
  { 
    action: 'type',
    //clear: true,
    strings: ['./Projects/Web/Portfolio^400'],
    output: '<span class="gray">Loading Portfolio<br>Portfolio Started<br>Welcome!</span><br>&nbsp;',
    postDelay: 5000
  },
  { 
    action: 'type',
    strings: ["", ''],
    postDelay: 2000
  }
  
];
  runScripts(data, 0);
});

function runScripts(data, pos) {
    var prompt = $('.prompt'),
        script = data[pos];
    if(script.clear === true) {
      $('.history').html(''); 
    }
    switch(script.action) {
        case 'type':
          // cleanup for next execution
          prompt.removeData();
          $('.typed-cursor').text('');
          prompt.typed({
            strings: script.strings,
            typeSpeed: 30,
            callback: function() {
              var history = $('.history').html();
              history = history ? [history] : [];
              history.push('$ ' + prompt.text());
              if(script.output) {
                history.push(script.output);
                prompt.html('');
                $('.history').html(history.join('<br>'));
              }
              // scroll to bottom of screen
              $('section.terminal').scrollTop($('section.terminal').height());
              // Run next script
              pos++;
              if(pos < data.length) {
                setTimeout(function() {
                  runScripts(data, pos);
                }, script.postDelay || 1000);
              }
            }
          });
          break;
        case 'view':

          break;
    }
}

