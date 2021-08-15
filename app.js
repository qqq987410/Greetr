const g = G$('John', 'Doe');
g.greet();
// Hello John!

g.greet().greet(true);
// Hello John!
// Greetings John Doe!

g.greet().setLang('es').greet(true);
// Hello John!
// Saludos John Doe!

// g.greet().setLang('ch');
// Hola John!
// Uncaught Invalidate language

g.log();
// Iniciar sesión: John Doe

$('#login').click(function () {
  const loginGreetr = G$('Jane', 'Doe');

  $('#logindiv').hide();
  loginGreetr.setLang($('#lang').val()).HTMLGreeting('#greeting', true).log();
});
