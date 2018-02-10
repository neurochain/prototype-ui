var activity = require('./business');

function Terminal(id, cmdLineContainer, outputContainer, inputDiv) {

  window.URL = window.URL || window.webkitURL;
  window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;

  var cmdLine_ = document.querySelector(cmdLineContainer);
  var output_ = document.querySelector(outputContainer);
  var input_ = document.querySelector(inputDiv);

  var lastActivity = null;

  const CMDS_ = [
    'clear', 'help', 'start'
  ];

  var history_ = [];
  var histpos_ = 0;
  var histtemp_ = 0;

  window.addEventListener('click', function(e) {
    cmdLine_.focus();
  }, false);

  cmdLine_.addEventListener('click', inputTextClick_, false);
  cmdLine_.addEventListener('keydown', historyHandler_, false);
  cmdLine_.addEventListener('keydown', processNewCommand_, false);

  function inputTextClick_(e) {
    this.value = this.value;
  }

  function historyHandler_(e) {
    if (history_.length) {
      if (e.keyCode == 38 || e.keyCode == 40) {
        if (history_[histpos_]) {
          history_[histpos_] = this.value;
        } else {
          histtemp_ = this.value;
        }
      }

      if (e.keyCode == 38) { // up
        histpos_--;
        if (histpos_ < 0) {
          histpos_ = 0;
        }
      } else if (e.keyCode == 40) { // down
        histpos_++;
        if (histpos_ > history_.length) {
          histpos_ = history_.length;
        }
      }

      if (e.keyCode == 38 || e.keyCode == 40) {
        this.value = history_[histpos_] ? history_[histpos_] : histtemp_;
        this.value = this.value; // Sets cursor to end of input.
      }
    }
  }

  function processNewCommand_(e) {

    if (e.keyCode == 9) { // tab
      e.preventDefault();
      // Implement tab suggest.
    } else if (e.keyCode == 13) { // enter
      // Save shell history.
      if (this.value) {
        history_[history_.length] = this.value;
        histpos_ = history_.length;
      }

      // Duplicate current input and append to output section.
      var line = this.parentNode.parentNode.cloneNode(true);
      line.removeAttribute('id');
      line.classList.add('line');
      var input = line.querySelector('input.cmdline');
      input.autofocus = false;
      input.readOnly = true;
      output_.appendChild(line);

      if (this.value && this.value.trim()) {
        var args = this.value.split(' ').filter(function(val, i) {
          return val;
        });
        var cmd = args[0].toLowerCase();
        args = args.splice(1); // Remove cmd from arg list.
      }

      if (lastActivity) {
        var nextActivity = getValue(lastActivity, this.value);
        if (nextActivity) {
          output(displayActivity(nextActivity));
          lastActivity = nextActivity;
          input_.scrollIntoView();
          this.value = ''; // Clear/setup line for next input.
          return;
        }
      }

      switch (cmd) {
        case 'clear':
          output_.innerHTML = '';
          this.value = '';
          return;
        case 'help':
          output('<div class="ls-files">' + CMDS_.join('<br>') + '</div>');
          break;
        case 'start':
          output(displayActivity(activity));
          lastActivity = activity;
          break;
        default:
          if (cmd) {
            output(cmd + ': command not found');
          }
      }

      input_.scrollIntoView();
      this.value = ''; // Clear/setup line for next input.
    }
  }

  function output(html) {
    output_.insertAdjacentHTML('beforeEnd', '[bot'+id+'@user] # <span>' + html + '<span>');
  }

  function getValue(activity, key) {
    try {
      return activity.choices.find(a => {return a.key == key;}).activity;
    } catch (e) {
      return null;
    }
  }

  function displayActivity(activity) {
      var result = activity.message+'<br>';
      result += activity.choices.map((c) => {return c.name+' ('+c.key+')'}).join(' / ');
      return result;
  }

}

module.exports = Terminal;
