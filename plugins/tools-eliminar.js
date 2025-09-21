let handler = async (m, { conn, participants, args }) => {
  const user = m.mentionedJid[0] || (args[0] ? args[0].replace(/[@+]/g, '') + '@s.whatsapp.net' : null);
  if (!user) return m.reply('⚽ ¿Quieres borrar mensajes pero ni siquiera mencionas al rival?  
En Blue Lock siempre eliges a quién devorar. \n\nEjemplo: *.borrarmsg @usuario*');

  if (!participants.some(p => p.id === user)) return m.reply('❌ Ese jugador ni siquiera está en la cancha.  
¿Cómo piensas devorarlo si no está en el partido?');

  const messages = Object.values(conn.chats[m.chat]?.messages || {})
    .filter(v => v.key?.participant === user && !v.key.fromMe)
    .sort((a, b) => b.messageTimestamp.low - a.messageTimestamp.low)
    .slice(0, 100);

  if (!messages.length) return m.reply('👁️ No hay jugadas recientes de ese rival...  
Tu visión del campo falló esta vez.');

  for (let msg of messages) {
    try {
      await conn.sendMessage(m.chat, { delete: msg.key });
      await new Promise(resolve => setTimeout(resolve, 150));
    } catch (e) {
      console.error('Error al eliminar:', e);
    }
  }

  await m.reply(`✅ ⚽ Se eliminaron ${messages.length} jugadas de @${user.split('@')[0]}.  
Ese rival ya no tiene presencia en la cancha. 🦅`, null, {
    mentions: [user]
  });
};

handler.help = ['borrarmsg @usuario'];
handler.tags = ['grupo'];
handler.command = ['borrarmsg'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;
