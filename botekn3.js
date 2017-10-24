var restify = require('restify'); //web server restify
var builder = require('botbuilder');

//Crear servidor
var server = restify.createServer();

//se escucha en distintos puertos, particularmente en el 3978
server.listen(
    process.env.port || 
    process.env.PORT || 
    3978, function(){
        console.log('%s listening to %s', server.name, server.url);
});

var connector = new builder.ChatConnector({
    appId: '',
    appPassword: ''
});

var bot = new builder.UniversalBot(connector);
server.post('api/messages', connector.listen());

// Diálogos
bot.dialog('/',[  // Primer dialogo o dialogo raìz, se crea dentro del bot
    function(session,result,next){
        if(!session.userData.nombre){// preguntar si sabemos el nombre
        builder.Prompts.text(session, '¿Me Puedes decir tu nombre porfavor...?');
    }
    else{
        next();//Pasamos al siguiente metodo de la cascada llamada next()
    }
    
    },
    function(session,results){
        if(results.response){
            let msj = results.response;
            session.userData.nombre = msj;
        }
        session.send(`Hola como estas  ${session.userData.nombre}!` );
        session.beginDialog('/preguntarLugar');
  

    },
    function (session) {
        
        if (session.dialogData.lugar) {
        
        session.send(`Muchos Saludos por ${session.userData.lugar}`);
        
        }
        
        else {
        
        session.send('Sabes...Ya no me acuerdo donde estás.');
        
        }
        
        }
        
        ]);
        
        
        
        bot.dialog('/preguntarLugar', [
        
        function (session) {
        
        builder.Prompts.text(session, '¿Dónde estás?');
        
        },
        
        function (session, results) {
        
        session.dialogData.lugar = results.response;
        
        
        
        session.endDialog(`Saludos por ${session.dialogData.lugar} (me acuerdo en este diálogo!)`);
        session.beginDialog('/preguntarPlatillo');
        }
        
        ]);
        bot.dialog('/preguntarPlatillo', [ //método preguntar lugar
            function(session){// objeto llamado sesiòn
                builder.Prompts.text(session, '¿Cuál es tu  Platillo favorito ?');
            },
            function (session, results){
                let comida = results.response;
                session.endConversation(`${comida} ohh que bien .. es un buen platillo..`);
                session.beginDialog('/preguntarEdad');
            }
        ]);
        bot.dialog('/preguntarEdad', [ //método preguntar lugar
            function(session){// objeto llamado sesiòn
                builder.Prompts.text(session, '¿Oye Cuántos años tienes Verdad ?');
            },
            function (session, results){
                let Años = results.response;
                session.endConversation(`uyyy ${Años} eres muy joven`);
                session.beginDialog('/preguntartrabajo');
            }
        ]);
        bot.dialog('/preguntartrabajo', [ //método pregunta el lugar donde trabajamos
            function(session){// objeto llamado sesiòn
                builder.Prompts.text(session, '¿Trabajas... Puedo saber el nombre de la empresa.?');
            },
            function (session, results){
                let trabajo = results.response;
                session.endConversation(` ${trabajo}?, ah yaaa. igual no se donde queda esa empresa.. Disculpa ...Mejor Cambiemos de Tema.`);
                session.beginDialog('/preguntarEquipofavorito');
            }
        ]);
        
        bot.dialog('/preguntarEquipofavorito', [ //método preguntar lugar
            function(session){// objeto llamado sesiòn
                builder.Prompts.text(session, '¿Cuál es tu equipo favorito de Futbol?');
            },
            function (session, results){
                let equipofutbol = results.response;
                session.endConversation(` del ${equipofutbol}?, es un buen equipo de futbol`);
                session.beginDialog('/preguntardondeestudias');
            }
        
        ]);
        bot.dialog('/preguntardondeestudias', [ //método preguntar lugar
            function(session){// objeto llamado sesiòn
                builder.Prompts.text(session, '¿en que universidad estas estudiando?');
            },
            function (session, results){
                let universidad = results.response;
                session.endConversation(` en la ${universidad} Genial. Es muy buenas Universidad.`);
                session.beginDialog('/preguntarqueestudias');
            }
        
        ]);
        bot.dialog('/preguntarqueestudias', [ //método preguntar lugar
            function(session){// objeto llamado sesiòn
                builder.Prompts.text(session, '¿Que carrera estas estudiando?');
            },
            function (session, results){
                let carrera = results.response;
                session.endConversation(` muy buena carrera ${carrera}`);
                session.beginDialog('/preguntarsemestre');
            }
        
        ]);
        bot.dialog('/preguntarsemestre', [ //método preguntar lugar
            function(session){// objeto llamado sesiòn
                builder.Prompts.text(session, '¿en que semestre vas?');
            },
            function (session, results){
                let semestre = results.response;
                session.endConversation(` en el ${semestre} Sabes. Te faltaba Mas cuando Empezaste.. jajaja..`);
                session.beginDialog('/quepeliculahasvisto');
            }
        
        ]);

        bot.dialog('/quepeliculahasvisto', [ //método pregunta una pelicula que hayas visto
            function(session){// objeto llamado sesiòn
                builder.Prompts.text(session, '¿Que pelicula has visto que te haya Gustado demasiado.?');
            },
            function (session, results){
                let musica = results.response;
                session.endDialog(`${musica} Mmmm.. Es buena Aunque hay Mejores.`);
                session.beginDialog('/preguntarmundial');
            }
        
        ]);
        bot.dialog('/preguntarmundial', [ //método pregunta como le ira a colombia ne el mundial de rusia
            function(session){// objeto llamado sesiòn
                builder.Prompts.text(session, '¿Crees que colombia Hara un buen papel en el Mundial ?');
            },
            function (session, results){
                let respuestafutbol = results.response;
             
                if(respuestafutbol == 'si' || respuestafutbol == 'SI'){
                    session.endConversation(`${respuestafutbol} excelente asi es que se habla Carajo.`);
                    session.beginDialog('/adondehasviajado');
                }else{
                    session.endConversation(`${respuestafutbol} Pues tengo muchas Esperanzas en mi Colombia. `);
                    
                }
            }
        ]);
        bot.dialog('/adondehasviajado', [ //método preguntar lugar
            function(session){// objeto llamado sesiòn
                builder.Prompts.text(session, '¿a que cuidades de colombia haz viajado?');
            },
            function (session, results){
                let viaje = results.response;
                session.endConversation(`${viaje} excelente a mi tambien me encanta viajar`);
                session.beginDialog('/preguntarEstadocivil');
            }
        
        ]);
        bot.dialog('/preguntarEstadocivil', [ //método preguntar lugar
            function(session){// objeto llamado sesiòn
                builder.Prompts.text(session, '¿Cuál es tu estado civil?');
            },
            function (session, results){
                let estado = results.response;
        
                if(estado == 'casado' || estado == 'CASADO'){
                    session.endDialogWithResult(`${estado} Estás jodido hermano`);
                }else{
                    session.endConversation(` ${estado} que bien por ti`);
                }
                
            }
        ]);