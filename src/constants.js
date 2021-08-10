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
    start: "Привет. Готов(а) поделиться со мной своим питанием?\n",
    startMarkup: [
      [{ text: "Да", callback_data: "SD" }],
      [{ text: "Позже", callback_data: "LD" }],
      [{ text: "Нет", callback_data: "ND" }],
    ],
    lunch: "Что ты кушал(а) на обед?",
    dinner: "А на ужин?",
    snacks: "Были ли какие-то перекусы?\nИначе просто напиши `Нет`",
    weight:
      "Время взвешивания! Что показывают весы? \nЕсли пропустила взвешивание или не хочешь отвечать, пиши просто `Нет`",
    end: "Спасибо, малышка. Спишемся завтра.",
    reactionsMarkup: [
      [{ text: "Отлично", callback_data: "VG" }],
      [{ text: "Нормально", callback_data: "N" }],
      [{ text: "Плохо", callback_data: "NG" }],
      [{ text: "Бля, тебе пиздец", callback_data: "FK" }],
    ],
  },
  ManualDailyReport: {
    start: `Введи, пожалуйста, дату, за которую хочешь внести данные, в формате <b> ДЕНЬ/МЕСЯЦ/ГОД </b> (13/01/2020).`,
    wrongDate:
      "Дата введена некорректно. Можно заполнить только данные за прошедший период",
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

export const DAILY_MARKUP_REACTIONS = {
  VG: {
    value: "VG",
    label: "Very Good",
    reply: "Отлично! Так держать. ✅",
  },
  N: {
    value: "N",
    label: "Normal",
    reply: "Нормально, возможно стоит что-то изменить. 🌥",
  },
  NG: {
    value: "NG",
    label: "Not good",
    reply: "Всё плохо! 🐷",
  },
  FK: {
    value: "FK",
    label: "Fuck",
    reply: "Бля, тебе пиздец!",
  },
};

export const FALSE_ANSWER = "нет";

export const DATE_FORMAT = "DD/MM/YYYY";
