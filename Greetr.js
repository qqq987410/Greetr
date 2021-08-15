// make sure pass by window and jQuery objects when I use bracket
(function (global, $) {
  // new an Object
  const Greetr = function (firstName, lastName, language) {
    //  I don't always setup the object with the new keyword
    return new Greetr.init(firstName, lastName, language);
  };

  // hidden within the scope of the IIFE and never directly accessible
  const supportLanguages = ['en', 'es'];

  const greetings = {
    en: 'Hello',
    es: 'Hola',
  };

  const formalGreetings = {
    en: 'Greetings',
    es: 'Saludos',
  };

  const logMessage = {
    en: 'Logged in',
    es: 'Iniciar sesión',
  };

  // put properties and methods on here (to save memory space)
  Greetr.prototype = {
    // 'this' refers to the calling object at execution time
    fullName: function () {
      return this.firstName + ' ' + this.lastName;
    },
    validate: function () {
      if (supportLanguages.indexOf(this.language) === -1) {
        throw 'Invalidate language';
      }
    },
    greeting: function () {
      return greetings[this.language] + ' ' + this.firstName + '!';
    },
    formalGreeting: function () {
      return formalGreetings[this.language] + ' ' + this.fullName() + '!';
    },
    greet: function (formal) {
      let msg;
      // if undefined or null it will be coerced to 'false'
      if (formal) {
        msg = this.formalGreeting();
      } else {
        msg = this.greeting();
      }

      if (console) console.log(msg);

      // 'this' refers to the calling object at execution time
      // makes the method chainable
      return this;
    },
    log: function () {
      if (console) {
        console.log(logMessage[this.language] + ': ' + this.fullName());
      }
      return this;
    },
    setLang: function (lang) {
      this.language = lang;
      this.validate();
      return this;
    },
    HTMLGreeting: function (selector, formal) {
      if (!$) throw 'jQuery not loaded';
      if (!selector) throw 'Missing jQuery selector';

      let msg;
      if (formal) msg = this.formalGreeting();
      else msg = this.greet();

      $(selector).html(msg);

      return this;
    },
  };

  Greetr.init = function (firstName, lastName, language) {
    const self = this;
    self.firstName = firstName || '';
    self.lastName = lastName || '';
    self.language = language || 'en';

    self.validate();
  };
  // trick borrowed from jQuery so we don't have to use the 'new' keyword
  Greetr.init.prototype = Greetr.prototype;

  // attach 'Greetr' to the global object,and provide a shorthand 'G$' for ease our poor fingers
  global.Greetr = global.G$ = Greetr;
})(window, jQuery);
