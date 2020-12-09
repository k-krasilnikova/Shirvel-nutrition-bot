export const REPLIES = {
  Registration: {
    start:
      "Привет. Я твой персональный помощник в ведении дневника питания. Давай познакомимся. Как тебя зовут? \nНапиши, пожалуйста, полные имя и фамилию в формате: Женя Иванова.",
    age: "Расскажи мне про свой возраст в цифровом формате (лет): 32",
    height: "Какой у тебя рост в цифровом формате (см): 170",
    weight: "Финальные штрихи. Напиши свой вес в цифровом формате (кг): 60",
    end: "Отлично! Анкета заполнена. Чуть позже начнём работать с дневником.",
  },
  DailyReport: {
    start: "Привет. Готов(а) поделиться со мной своим питанием?",
    startMarkup: [
      [{ text: "Да", callback_data: "SD" }],
      [{ text: "Позже", callback_data: "LD" }],
      [{ text: "Нет", callback_data: "ND" }],
    ],
    lunch: "Что ты кушал(а) на обед?",
    dinner: "А на ужин?",
    snacks: "Были ли какие-то перекусы?",
    end: "Спасибо, малышка. Спишемся завтра.",
  },
  AngryMessage: `Итак, ты не заполнила отчёт\\.\\.\\.\nКакого хрена?\\!\\!\\!\nТы все знаешь о своём питании? Уверена, что все делаешь правильно? Не боишься навредить своему здоровью?\\! Ты профессиональный нутрициолог?\\! Нет?\\! Так заполни отчёт\\!\\!\\! Иначе дополнительные подходы и адская тренировка на ноги тебе гарантирована\\!\\!\\!\nИ да\\.\\.\\. с зала пойдёшь выпадами\\.\\. с утяжелителями\\.\\.\\. с подъёмом ноги 😁😈\\.\n*НО* если вдруг одумаешься, воспользуйся тегом \/daily, чтобы заполнить ежедневный отчёт\\.`,
};

export const DAILY_MARKUP = {
  SD: {
    value: "SD",
    label: "Start daily",
    reply: "Расскажи мне про свой завтрак.",
  },
  LD: {
    value: "LD",
    label: "Later daily",
    reply:
      "Конечно, дай знать как будешь готов(а). Можешь воспользоваться кнопками выбора, которые расположены выше.",
  },
  ND: {
    value: "ND",
    label: "No daily",
    reply: "🚫 Ок, плюс подход",
  },
};
