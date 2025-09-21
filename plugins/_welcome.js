import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return !0;

  let who = m.messageStubParameters[0]
  let taguser = `@${who.split('@')[0]}`
  let chat = global.db.data.chats[m.chat]
  let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => 'https://files.catbox.moe/xr2m6u.jpg')
  let img = await (await fetch(`${pp}`)).buffer()

    if (chat.welcome && m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
      let bienvenida = `💙 ¡Bienvenido al campo de Blue Lock! 💙
🔥 Aquí forjamos al mejor delantero del mundo 🔥
⚽ ${taguser} acaba de unirse al equipo ⚽️
🏆 Edita este mensaje con *setwelcome* 🏆
\n> 📌 Puedes usar *#help* para ver la lista de comandos.`
      await conn.sendMessage(m.chat, { image: img, caption: bienvenida, mentions: [who] })
    }
       
    if (chat.welcome && m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE) {
      let bye = `💫 ¡El partido terminó! Gracias por jugar con nosotros 🌟
⚡ ${taguser} dejó el campo de Blue Lock ⚡
🏆 Edita este mensaje con *setbye* 🏆
\n> 📌 Puedes usar *#help* para ver la lista de comandos.`
      await conn.sendMessage(m.chat, { image: img, caption: bye, mentions: [who] })
    }

    if (chat.welcome && m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE) { 
      let kick = `💫 ¡El partido terminó para ${taguser}! 🌟
⚡ Fue expulsado del campo de Blue Lock ⚡
🏆 Edita este mensaje con *setbye* 🏆
\n> 📌 Puedes usar *#help* para ver la lista de comandos`
      await conn.sendMessage(m.chat, { image: img, caption: kick, mentions: [who] })
  }}
