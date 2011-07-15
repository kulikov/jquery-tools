(function($) {

    $.eventHandler = {

        _observers: {},
        _oneNotify: {},

        bind: function(eventName, callback)
        {
            if (typeof callback != 'function') return;
            if (!this._observers[eventName]) {
                this._observers[eventName] = [];
            }
            this._observers[eventName][callback] = callback;
            return this;
        },
        
        bindOne: function(eventName, callback)
        {
            if (typeof callback != 'function') return;
            if (!this._oneNotify[eventName]) {
                this._oneNotify[eventName] = [];
            }
            this._oneNotify[eventName][callback] = true;

            return this.bind(eventName, callback)
        },
        
        unbind: function(eventName, callback)
        {
            if (!this._observers[eventName]) return;
            
            if (callback) {
                this._observers[eventName][callback] = null;
            } else {
                this._observers[eventName] = null;
            }
        },
        
        notify: function(eventName, options) 
        {
            if (!this._observers[eventName]) return;
            for (key in this._observers[eventName]) {
                if (!this._observers[eventName][key]) continue;
                
                this._observers[eventName][key](options);
                
                if (this._oneNotify[eventName] && this._oneNotify[eventName][key]) {
                    this._oneNotify[eventName][key] = null;
                    this._observers[eventName][key] = null;
                }
            }
            return this;
        }
    };
    
})(jQuery);