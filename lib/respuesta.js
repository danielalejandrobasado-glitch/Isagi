// --- VALORES NECESARIOS PARA LA NUEVA FUNCIONALIDAD ---
// Estos valores se han añadido para recrear la funcionalidad que pediste.
// Asegúrate de que las variables como 'redes' y 'miniaturaRandom' se adapten a tu bot.
const newsletterJid = '120363418071540900@newsletter';
const newsletterName = '⏤͟͞ू⃪፝͜⁞⟡ 𝐄llen 𝐉ᴏᴇ\'s 𝐒ervice';
const packname = '˚🄴🄻🄻🄴🄽-🄹🄾🄴-🄱🄾🅃';

/**
 * Plugin centralizado para manejar todos los mensajes de error de permisos.
 * @param {string} type - El tipo de error (ej. 'admin', 'owner', 'unreg').
 * @param {object} conn - La conexión del bot.
 * @param {object} m - El objeto del mensaje.
 * @param {string} comando - El nombre del comando que se intentó usar.
 */
const handler = (type, conn, m, comando) => {
    // Objeto con todos los posibles mensajes de error.
    const msg = {
        rowner: `『⚽』¿Intentas usar *${comando}* sin ser mi creador?  
Tu “ego” aún no alcanza mi visión del campo. 🚫`,
        owner: `『⚽』¿Creíste que podías usar *${comando}*?  
Solo los verdaderos estrategas controlan este juego, y tú no tienes la visión. 👁️`,
        mods: `『⚽』*${comando}* es solo para los que leen el campo como yo.  
Tú ni siquiera sabes a quién devorar. 🥱`,
        premium: `『⚽』¿Premium? Tú no eres un “as” de este partido.  
*${comando}* es solo para jugadores de élite, no para los del montón. 🦅`,
        group: `『⚽』¿Tan perdido estás que usas *${comando}* en privado?  
Este comando es solo para la cancha de grupos, aquí es donde se devoran los rivales. 💥`,
        private: `『⚽』¿Quieres usar *${comando}* aquí?  
Esto no es un entrenamiento privado, esto es el Blue Lock. Sal a la cancha. 🔥`,
        admin: `『⚽』*${comando}* es solo para líderes.  
Un decorado como tú jamás decidiría el gol. 🙄`,
        botAdmin: `『⚽』¿Cómo quieres que ejecute *${comando}* si ni admin soy?  
Hazme admin primero, y te mostraré mi visión del campo. 😉`,
        unreg: `『⚽』¿Usar *${comando}* sin registrarte?  
En Blue Lock ni siquiera pisas la cancha sin demostrar tu ego. Regístrate ya: #reg Isagi-Bot ⚡`,
        restrict: `『⚽』Ooops~ Esta función está *desactivada*.  
Ni con “metavisión” podrás usarla ahora mismo. 😏``
    }[type];

    // Si se encontró un mensaje para el 'type' dado, se envía.
    if (msg) {
        // --- CONSTRUCCIÓN DEL CONTEXTINFO ---
        // Aquí se crea el objeto con la apariencia de reenviado de canal y el anuncio externo.
        const contextInfo = {
            mentionedJid: [m.sender],
            isForwarded: true,
            forwardingScore: 999,
            forwardedNewsletterMessageInfo: {
                newsletterJid,
                newsletterName,
                serverMessageId: -1
            },
            externalAdReply: {
                title: packname,
                body: '🦈 ¡Acceso Denegado! 🦈',
                thumbnailUrl: icons,
                sourceUrl: redes,
                mediaType: 1,
                renderLargerThumbnail: false
            }
        };

        // Se envía el mensaje de error utilizando el contextInfo creado.
        return conn.reply(m.chat, msg, m, { contextInfo }).then(_ => m.react('✖️'));
    }
    return true; // Devuelve true si no hay mensaje, para seguir el flujo si es necesario.
};

// Exportamos la función para poder importarla desde handler.js
export default handler;