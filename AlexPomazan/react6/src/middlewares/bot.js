import { CHATS_MESSAGE_SEND, chatsMessageSendAction } from "../actions/chats";
import { nanoid } from "nanoid";
let interval = null;

export const botMiddware = (store) => (next) => (action) => {
  if (action.type === CHATS_MESSAGE_SEND) {
    const { author, chatId } = action.payload;
    const messagesBot = [
      `В России выявили более 7 тысяч зараженных COVID-19, так что, ${author}, носи маску!`,
      `Меня звут Bob, приятно познакомиться, ${author}`,
      `${author}, почему люди такие шумные?`,
      `Извини, ${author}, у меня только несколько реплик, хозяин не научил меня отвечать правильно :(`,
      `Мне интересно всё, что ты пишешь, ${author}!`,
    ];
    const messageBot =
      messagesBot[Math.floor(Math.random() * messagesBot.length)];

    if (author !== "Bot Bob") {
      interval = setTimeout(() => {
        store.dispatch(
          chatsMessageSendAction({
            id: nanoid(),
            chatId,
            text: messageBot,
            author: "Bot Bob",
          })
        );
      }, 3000);
    } else clearTimeout(interval);
  }
  return next(action);
};
