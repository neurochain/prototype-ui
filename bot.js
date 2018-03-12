var moment = require('moment'),
    numeral = require('numeral'),
    json2html = require('node-json2html');
function Bot(id, socketUrl) {

  Bot.prototype.render = function() {

    var divBot = $('<div>').addClass('bot');

      var spanBotId = $('<span>').attr('id','bot'+id+'title').addClass('bot-id').append('Bot '+id);
      divBot.append(spanBotId);

      var divLog = $('<div>').attr('id','bot'+id).addClass('log');
      divBot.append(divLog);

        var divButtonBarFilterLog = $('<div>').addClass('btn-group').css('position', 'relative').css('bottom', '0');
        divLog.append(divButtonBarFilterLog);

          var buttonFilter1 = $('<button>').addClass('active').addClass('filter').text('CSN').attr('filter', 'CSN');
          buttonFilter1.append($('<span>').addClass('tooltiptext').text('Hide/Show consensus logs'));
          divButtonBarFilterLog.append(buttonFilter1);

          var buttonFilter2 = $('<button>').addClass('active').addClass('filter').text('TRX').attr('filter', 'TRX');
          buttonFilter2.append($('<span>').addClass('tooltiptext').text('Hide/Show transactions logs'));
          divButtonBarFilterLog.append(buttonFilter2);

          var buttonFilter3 = $('<button>').addClass('active').addClass('filter').text('BLK').attr('filter', 'BLK');
          buttonFilter3.append($('<span>').addClass('tooltiptext').text('Hide/Show blocks logs'));
          divButtonBarFilterLog.append(buttonFilter3);

          var buttonFilter4 = $('<button>').addClass('active').addClass('filter').text('REG').attr('filter', 'REG');
          buttonFilter4.append($('<span>').addClass('tooltiptext').text('Hide/Show registration logs'));
          divButtonBarFilterLog.append(buttonFilter4);

          var buttonFilter5 = $('<button>').addClass('active').addClass('filter').text('COM').attr('filter', 'COM');
          buttonFilter5.append($('<span>').addClass('tooltiptext').text('Hide/Show communication logs'));
          divButtonBarFilterLog.append(buttonFilter5);

          var buttonFilter6 = $('<button>').addClass('active').addClass('filter').text('BIZ').attr('filter', 'BIZ');
          buttonFilter6.append($('<span>').addClass('tooltiptext').text('Hide/Show business logs'));
          divButtonBarFilterLog.append(buttonFilter6);

          var buttonFilter7 = $('<button>').addClass('active').addClass('filter').text('SEC').attr('filter', 'SEC');
          buttonFilter7.append($('<span>').addClass('tooltiptext').text('Hide/Show security logs'));
          divButtonBarFilterLog.append(buttonFilter7);

          var buttonFilter8 = $('<button>').addClass('active').addClass('filter').text('HST').attr('filter', 'HST');
          buttonFilter8.append($('<span>').addClass('tooltiptext').text('Hide/Show history logs'));
          divButtonBarFilterLog.append(buttonFilter8);

          var buttonFilter9 = $('<button>').addClass('active').addClass('filter').text('CON').attr('filter', 'CON');
          buttonFilter9.append($('<span>').addClass('tooltiptext').addClass('left').text('Hide/Show connection logs'));
          divButtonBarFilterLog.append(buttonFilter9);

        var sectionLog = $('<section>').addClass('log').attr('id','bot'+id+'Activity');
        divLog.append(sectionLog);

      var divStats = $('<div>').addClass('stats').text('').hide();
      divBot.append(divStats);

        // Statistics

      var divButtonBar = $('<div>').addClass('btn-group');
      divBot.append(divButtonBar);

        var buttonConsole = $('<button>').addClass('active').text('console logs');
        divButtonBar.append(buttonConsole);

        var buttonStats = $('<button>').text('statistics');
        divButtonBar.append(buttonStats);

      var divConsole = $('<div>').attr('id','console'+id).addClass('console');
      divBot.append(divConsole);

        var divContainer = $('<div>').attr('id','container'+id).addClass('container');
        divConsole.append(divContainer);

          var output = $('<output>');
          divContainer.append(output);

          var divInputLine = $('<div>').attr('id','input-line'+id).addClass('input-line');
          divContainer.append(divInputLine);

            var divPrompt = $('<div>').addClass('promptBot');
            divInputLine.append(divPrompt);

            var divInput = $('<div>');
            divInputLine.append(divInput);

              var input = $('<input>').addClass('cmdline');
              divInput.append(input);

    divBot.appendTo(document.body);

    var socketBot = require('socket.io-client')(socketUrl);
    socketBot.on('message', function (message) {
        var obj = {};
        try {
          obj = JSON.parse(message);
        } catch (e) {
          obj = {'message': message};
        }
        switch (obj.objectType) {
          case 'OBJECT_TYPE_STAT':
            obj.memoryUsageLabel = numeral(obj.memoryUsage/1024/1024).format('0')+'Mo';
            obj.cpuUsageLabel = numeral(obj.cpuUsage).format('0.00%');
            var transform = {'<>':'div','html':
                  'Total transaction current: ${totalTrxCurrent}'
                + '<br>Total transaction: ${totalTrxEver}'
                + '<br>Time Alive: ${timeAlive}'
                + '<br>Total Sub Blocks Current ${totalSubBlocksCurrent}'
                + '<br>Total Sub Blocks Ever: ${totalSubBlocksEver}'
                + '<br>Transactions / second: ${trxPerSecond}'
                + '<br>Blocks / second: ${blkPerSecond}'
                + '<br>Chain Size: ${chainSize}'
                + '<br>Net Size: ${netSize}'
                + '<br>'
                + '<br>Memory usage: ${memoryUsageLabel}'
                + '<br>CPU usage: ${cpuUsageLabel}'};
            divStats.html(json2html.transform(obj,transform));
            break;
          case 'OBJECT_TYPE_LOG':
            sectionLog.prepend('<span class=\''+obj.domain+'\'>'+moment(obj.timestamp).format('HH:mm:ss.SSS') + " "+obj.domain.replace("LOG_", "")+ " " + obj.message+'</br></span>');
            break;
          default:
            sectionLog.prepend('</br>').prepend(JSON.stringify(obj));
        }
    });

    divBot.hover(
      function() {
        $(this).addClass('active');
        input.focus();
      }, function() {
        $(this).removeClass('active');
      }
    );

    buttonConsole.click(
      function() {
        divStats.hide();
        divLog.show();
        buttonConsole.addClass('active');
        buttonStats.removeClass('active');
        setTimeout(()=>input.focus());
      }
    );

    buttonStats.click(
      function() {
        divLog.hide();
        divStats.show();
        buttonStats.addClass('active');
        buttonConsole.removeClass('active');
        setTimeout(()=>input.focus());
      }
    );

    // Action of filter buttons
    addAction(buttonFilter1, input);
    addAction(buttonFilter2, input);
    addAction(buttonFilter3, input);
    addAction(buttonFilter4, input);
    addAction(buttonFilter5, input);
    addAction(buttonFilter6, input);
    addAction(buttonFilter7, input);
    addAction(buttonFilter8, input);
    addAction(buttonFilter9, input);

    // Set the command-line prompt
    divPrompt.html('[user@bot'+id+'] # ');
    // Initialize a new terminal object
    new Terminal(id, '#input-line'+id+' .cmdline', '#container'+id+' output', '#input-line'+id);

  }

  function addAction(button, input) {
    var cssClass ='#bot'+id+' .LOG_'+button.attr('filter');
    var style = $("<style type='text/css'> "+cssClass+"{ display:;} </style>");
    style.appendTo("head");
    button.click(
      function() {
        if (button.hasClass('active')) {
          button.removeClass('active');
          style.html(cssClass+"{ display:none;}");
        } else {
          button.addClass('active');
          style.html(cssClass+"{ display:;}");
        }
        setTimeout(()=>input.focus());
      }
    );
  }

}

module.exports = Bot;
