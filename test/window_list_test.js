// Generated by CoffeeScript 1.4.0
(function() {

  describe('A window list', function() {
    var createWindow, joinMultipleServersAndChannels, windows, wl;
    wl = windows = void 0;
    createWindow = function(server, chan) {
      var win;
      win = new chat.Window(server, chan);
      if (chan) {
        win.setTarget(chan);
      }
      win.conn = {
        name: server
      };
      windows.push(win);
      return win;
    };
    joinMultipleServersAndChannels = function() {
      wl.add(createWindow('freenode'));
      wl.add(createWindow('freenode', '#bash'));
      wl.add(createWindow('freenode', '#zebra'));
      wl.add(createWindow('dalnet'));
      wl.add(createWindow('dalnet', '#bash'));
      return wl.add(createWindow('dalnet', '#zebra'));
    };
    beforeEach(function() {
      wl = new chat.WindowList();
      return windows = [];
    });
    it('returns undefined when getChannelWindow is called with no matching window', function() {
      return expect(wl.getChannelWindow(0)).toBeUndefined();
    });
    it('returns -1 when indexOf is called with no matching window', function() {
      expect(wl.indexOf(createWindow('freenode'))).toBe(-1);
      return expect(wl.indexOf(createWindow('freenode', '#bash'))).toBe(-1);
    });
    it('can have windows added', function() {
      wl.add(createWindow('freenode'));
      return wl.add(createWindow('freenode', '#bash'));
    });
    it('can have windows removed', function() {
      wl.add(createWindow('freenode'));
      wl.add(createWindow('freenode', '#bash'));
      wl.remove(windows[0]);
      return wl.remove(windows[1]);
    });
    it('throws an error when a channel window is added with no corresponding connection window', function() {
      var addChannelWindow;
      addChannelWindow = function() {
        return wl.add(createWindow('freenode', '#bash'));
      };
      return expect(addChannelWindow).toThrow();
    });
    it("returns undefined on getChannelWindow when it only has server windows", function() {
      wl.add(createWindow('freenode'));
      wl.add(createWindow('dalnet'));
      expect(wl.getChannelWindow(0)).toBeUndefined();
      return expect(wl.getChannelWindow(1)).toBeUndefined();
    });
    it("returns the nth window on get(n)", function() {
      var i, _i, _results;
      joinMultipleServersAndChannels();
      _results = [];
      for (i = _i = 0; _i <= 5; i = ++_i) {
        _results.push(expect(wl.get(i)).toBe(windows[i]));
      }
      return _results;
    });
    it("has a length property which is equal to the number of windows", function() {
      expect(wl.length).toBe(0);
      joinMultipleServersAndChannels();
      expect(wl.length).toBe(6);
      wl.remove(windows[0]);
      expect(wl.length).toBe(3);
      wl.add(windows[0]);
      return expect(wl.length).toBe(4);
    });
    it("returns undefined when get is called on a deleted window", function() {
      joinMultipleServersAndChannels();
      wl.remove(windows[0]);
      wl.remove(windows[4]);
      expect(wl.get('freenode')).toBeNull();
      return expect(wl.get('dalnet', '#bash')).toBeNull();
    });
    it("deletes all channel windows when their server window is deleted", function() {
      var i, window, _i, _len, _ref, _results;
      joinMultipleServersAndChannels();
      wl.remove(windows[0]);
      wl.remove(windows[4]);
      _ref = [-1, -1, -1, 0, -1, 1];
      _results = [];
      for (window = _i = 0, _len = _ref.length; _i < _len; window = ++_i) {
        i = _ref[window];
        _results.push(expect(wl.indexOf(windows[window])).toBe(i));
      }
      return _results;
    });
    it("returns the Nth channel window on getChannelWindow(N)", function() {
      var i, window, _i, _len, _ref, _results;
      joinMultipleServersAndChannels();
      _ref = [1, 2, 4, 5];
      _results = [];
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        window = _ref[i];
        _results.push(expect(wl.getChannelWindow(i)).toBe(windows[window]));
      }
      return _results;
    });
    it("returns the Nth server window on getServerWindow(N)", function() {
      joinMultipleServersAndChannels();
      return expect(wl.getServerWindow(1)).toBe(windows[3]);
    });
    it("returns the server window with the given name on getServerWindow(N)", function() {
      joinMultipleServersAndChannels();
      return expect(wl.getServerWindow(1)).toBe(windows[3]);
    });
    it("returns the window with the given server and channel on get(server, chan)", function() {
      joinMultipleServersAndChannels();
      expect(wl.get('freenode')).toBe(windows[0]);
      expect(wl.get('freenode', '#bash')).toBe(windows[1]);
      expect(wl.get('freenode', '#zebra')).toBe(windows[2]);
      expect(wl.get('dalnet')).toBe(windows[3]);
      expect(wl.get('dalnet', '#bash')).toBe(windows[4]);
      return expect(wl.get('dalnet', '#zebra')).toBe(windows[5]);
    });
    it("returns the index of the given window on indexOf(window)", function() {
      var i, _i, _results;
      joinMultipleServersAndChannels();
      _results = [];
      for (i = _i = 0; _i <= 5; i = ++_i) {
        _results.push(expect(wl.indexOf(windows[i])).toBe(i));
      }
      return _results;
    });
    it("sorts windows under the same server in alphabetical order by their channel", function() {
      var i, window, _i, _len, _ref, _results;
      wl.add(createWindow('freenode'));
      wl.add(createWindow('freenode', '#zebra'));
      wl.add(createWindow('freenode', '#bash'));
      _ref = [0, 2, 1];
      _results = [];
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        window = _ref[i];
        _results.push(expect(wl.indexOf(windows[window])).toBe(i));
      }
      return _results;
    });
    it("sorts first by server, then by channel", function() {
      var i, window, _i, _j, _len, _len1, _ref, _ref1, _results;
      wl.add(createWindow('freenode'));
      wl.add(createWindow('dalnet'));
      wl.add(createWindow('dalnet', '#zebra'));
      wl.add(createWindow('freenode', '#zebra'));
      wl.add(createWindow('dalnet', '#bash'));
      wl.add(createWindow('freenode', '#bash'));
      _ref = [5, 3, 4, 2];
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        window = _ref[i];
        expect(wl.getChannelWindow(i)).toBe(windows[window]);
      }
      _ref1 = [0, 5, 3, 1, 4, 2];
      _results = [];
      for (i = _j = 0, _len1 = _ref1.length; _j < _len1; i = ++_j) {
        window = _ref1[i];
        _results.push(expect(wl.indexOf(windows[window])).toBe(i));
      }
      return _results;
    });
    it("returns the window index on indexOf when it only has server windows", function() {
      wl.add(createWindow('freenode'));
      wl.add(createWindow('dalnet'));
      expect(wl.indexOf(windows[0])).toBe(0);
      return expect(wl.indexOf(windows[1])).toBe(1);
    });
    it("returns the window on get() when it only has server windows", function() {
      wl.add(createWindow('freenode'));
      wl.add(createWindow('dalnet'));
      expect(wl.get('freenode')).toBe(windows[0]);
      return expect(wl.get('dalnet')).toBe(windows[1]);
    });
    it("can return the index of a channel in the context of its server", function() {
      wl.add(createWindow('freenode'));
      wl.add(createWindow('dalnet'));
      wl.add(createWindow('dalnet', '#zebra'));
      wl.add(createWindow('freenode', '#zebra'));
      wl.add(createWindow('dalnet', '#bash'));
      wl.add(createWindow('freenode', '#bash'));
      expect(wl.localIndexOf(windows[2])).toBe(1);
      return expect(wl.localIndexOf(windows[5])).toBe(0);
    });
    return it("can return the server that corresponds with a given window", function() {
      joinMultipleServersAndChannels();
      expect(wl.getServerForWindow(windows[0])).toBe(windows[0]);
      expect(wl.getServerForWindow(windows[1])).toBe(windows[0]);
      expect(wl.getServerForWindow(windows[2])).toBe(windows[0]);
      expect(wl.getServerForWindow(windows[3])).toBe(windows[3]);
      expect(wl.getServerForWindow(windows[4])).toBe(windows[3]);
      return expect(wl.getServerForWindow(windows[5])).toBe(windows[3]);
    });
  });

}).call(this);
