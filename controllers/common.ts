type RecursiveFunction = () => RecursiveFunction;

type errorObj = {
  fatal?: boolean;
  status: number;
  place: string;
  content: string;
  user?: number;
};

class ReqError extends Error {
  declare fatal: boolean;
  declare status: number;
  declare place: string;
  declare content: string;
  declare user: number | null;
  constructor(obj: errorObj, msg: string) {
    super(msg);
    const { status, place, content } = obj;
    this.fatal = obj.fatal ? obj.fatal : false;
    this.status = status;
    this.place = place;
    this.content = content;
    this.user = obj.user ? obj.user : null;
  }
}

const availableSummonerIndex = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const availableTotemIndex = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const availableItemClass = [1, 2, 3, 4, 5, 6, 7];
const availableItemGrade = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const elementAvailableItemDetail = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
];
const powerAvailableItemDetail = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
];
const woodAvailableItemDetail = ["0", "1", "2", "3", "4"];
const blessAvailableItemDetail = ["1", "2", "3", "4", "5", "6", "7"];
const markAvailableEnhanceGrade = ["0", "1", "2", "3", "4", "5"];
const recipeAvailableItemDetail = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
];
const etcAvailableItemDetail = ["0", "1", "2", "3", "4"];
const cashItemPriceArr = [
  100, 170, 280, 470, 780, 1290, 2150, 3590, 5990, 10000,
];

const inspectSummonerIndex = (summonerIndex: number) => {
  if (!availableSummonerIndex.includes(summonerIndex)) {
    return false;
  }
  return true;
};
const inspectTotemIndex = (totemIndex: number) => {
  if (!availableTotemIndex.includes(totemIndex)) {
    return false;
  }
  return true;
};
const inspectItemClass = (itemClass: number) => {
  if (!availableItemClass.includes(itemClass)) {
    return false;
  }
  return true;
};
const inspectItemGrade = (
  itemClass: number,
  itemGrade: number,
  itemDetail: string
) => {
  if (
    (itemClass === 6 && itemDetail === "0") ||
    (itemClass === 7 && ["0", "1"].includes(itemDetail))
  ) {
    if (itemGrade !== 0) {
      return false;
    }
  } else if (!availableItemGrade.includes(itemGrade)) {
    return false;
  }
  return true;
};
const inspectItemDetail = (itemClass: number, itemDetail: string) => {
  if (itemClass === 5) {
    if (itemDetail.length !== 4) {
      return false;
    }
    for (const enhanceGrade of itemDetail) {
      if (!markAvailableEnhanceGrade.includes(enhanceGrade)) {
        return false;
      }
    }
  } else {
    const availableItemDetail = [
      elementAvailableItemDetail,
      powerAvailableItemDetail,
      woodAvailableItemDetail,
      blessAvailableItemDetail,
      ["0"],
      recipeAvailableItemDetail,
      etcAvailableItemDetail,
    ][itemClass - 1];
    if (!availableItemDetail.includes(itemDetail)) {
      return false;
    }
  }
  return true;
};
const inspectItemInfo = (
  itemClass: number,
  itemGrade: number,
  itemDetail: string
) => {
  const classCorrect = inspectItemClass(itemClass);
  const gradeCorrect = inspectItemGrade(itemClass, itemGrade, itemDetail);
  const detailCorrect = inspectItemDetail(itemClass, itemDetail);
  if (classCorrect && gradeCorrect && detailCorrect) {
    return true;
  }
  return false;
};
const splitCodeToInfoWithoutInspection = (code: string) => {
  const firstUnderBarIndex = code.indexOf("_");
  const lastUnderBarIndex = code.lastIndexOf("_");
  const itemClass = Number(code.slice(0, firstUnderBarIndex));
  const itemGrade = Number(
    code.slice(firstUnderBarIndex + 1, lastUnderBarIndex)
  );
  const itemDetail = code.slice(lastUnderBarIndex + 1);
  return {
    itemClass,
    itemGrade,
    itemDetail,
  };
};
const splitCodeToInfo = (code: string) => {
  const underBarNumbers = Array.from(code).filter((str) => str === "_").length;
  if (underBarNumbers !== 2) {
    return null;
  }
  const firstUnderBarIndex = code.indexOf("_");
  const lastUnderBarIndex = code.lastIndexOf("_");
  const itemClass = Number(code.slice(0, firstUnderBarIndex));
  const itemGrade = Number(
    code.slice(firstUnderBarIndex + 1, lastUnderBarIndex)
  );
  const itemDetail = code.slice(lastUnderBarIndex + 1);
  const infoCorrect = inspectItemInfo(itemClass, itemGrade, itemDetail);
  if (!infoCorrect) {
    return null;
  }
  return {
    itemClass,
    itemGrade,
    itemDetail,
  };
};
const joinInfoToCodeWithoutInspection = (
  itemClass: number,
  itemGrade: number,
  itemDetail: string
) => {
  return [itemClass, itemGrade, itemDetail].join("_");
};
const joinInfoToCode = (
  itemClass: number,
  itemGrade: number,
  itemDetail: string
) => {
  const infoCorrect = inspectItemInfo(itemClass, itemGrade, itemDetail);
  if (!infoCorrect) {
    return null;
  }
  return [itemClass, itemGrade, itemDetail].join("_");
};
const getMarkEnhanceGrade = (itemDetail: string) => {
  const markEnhanceGradeArr = itemDetail.split("").map((text) => Number(text));
  return markEnhanceGradeArr;
};
const changeNumToRome = (num: number) => {
  return num <= 3
    ? "I".repeat(num)
    : num === 4
    ? "IV"
    : num <= 8
    ? `V${"I".repeat(num - 5)}`
    : num === 9
    ? "IX"
    : "X";
};
const changeRomeToNum = (rome: string) => {
  return [
    "",
    "I",
    "II",
    "III",
    "IV",
    "V",
    "VI",
    "VII",
    "VIII",
    "IX",
    "X",
  ].indexOf(rome);
};
const getNameInfoByCode = (code: string) => {
  const itemInfo = splitCodeToInfo(code);
  if (!itemInfo) {
    return null;
  }
  const { itemClass, itemDetail } = itemInfo;
  const itemDetailNumber = Number(itemDetail);
  let name = "";
  let korName = "";
  switch (itemClass) {
    case 1: {
      name = `${
        ["element_of_", "crystal_of_", "first_"][
          Math.floor((itemDetailNumber - 1) / 4)
        ]
      }${["air", "earth", "water", "fire"][(itemDetailNumber - 1) % 4]}`;
      korName = `${
        ["원소: ", "원소 결정: ", "태초의 "][
          Math.floor((itemDetailNumber - 1) / 4)
        ]
      }${["공기", "흙", "물", "불"][(itemDetailNumber - 1) % 4]}`;
      break;
    }
    case 2: {
      name = `${
        ["bubble_of_", "mass_of_", "essence_of_"][
          Math.floor((itemDetailNumber - 1) / 4)
        ]
      }${["time", "space", "light", "chaos"][(itemDetailNumber - 1) % 4]}`;
      korName = `${["시간", "공간", "빛", "혼돈"][(itemDetailNumber - 1) % 4]}${
        ["의 힘(방울)", "의 힘(덩어리)", "의 정수"][
          Math.floor((itemDetailNumber - 1) / 4)
        ]
      }`;
      break;
    }
    case 3: {
      name = `${
        [
          "wood",
          "body_of_jaguar_totem",
          "body_of_bear_totem",
          "body_of_eagle_totem",
          "body_of_owl_totem",
        ][itemDetailNumber]
      }`;
      korName = [
        "나무",
        "재규어 토템 몸체",
        "곰 토템 몸체",
        "독수리 토템 몸체",
        "올빼미 토템 몸체",
      ][itemDetailNumber];
      break;
    }
    case 4: {
      name = `${
        ["bless_of_", "first_bless_of_"][Math.floor((itemDetailNumber - 1) / 4)]
      }${
        ["speed", "growth", "creation", "fantasy"][(itemDetailNumber - 1) % 4]
      }`;
      korName = `${
        ["축복: ", "태초의 축복: "][Math.floor((itemDetailNumber - 1) / 4)]
      }${["신속", "성장", "창조", "환상"][(itemDetailNumber - 1) % 4]}`;
      break;
    }
    case 5: {
      name = "mark_of_summoner";
      korName = "소환사의 문양";
      break;
    }
    case 6: {
      name = `${
        [
          "breathe_of_creation",
          "body_of_jaguar_totem",
          "body_of_bear_totem",
          "body_of_eagle_totem",
          "body_of_owl_totem",
          "mark_of_summoner",
          "bless_of_speed",
          "bless_of_growth",
          "bless_of_creation",
          "bless_of_fantasy",
          "first_bless_of_speed",
          "first_bless_of_growth",
          "first_bless_of_creation",
          "market_commission_discount_ticket",
        ][itemDetailNumber]
      }_recipe`;
      korName = `조합서 | ${
        [
          "창조의 숨결",
          "재규어 토템 몸체",
          "곰 토템 몸체",
          "독수리 토템 몸체",
          "올빼미 토템 몸체",
          "소환사의 문양",
          "축복: 신속",
          "축복: 성장",
          "축복: 창조",
          "축복: 환상",
          "태초의 축복: 신속",
          "태초의 축복: 성장",
          "태초의 축복: 창조",
          "거래소 수수료 인하 티켓",
        ][itemDetailNumber]
      }`;
      break;
    }
    case 7: {
      name = [
        "fragment_of_creation",
        "breathe_of_creation",
        "market_commission_discount_ticket",
        "sheet_of_old_book",
        "old_book_of_creation",
      ][itemDetailNumber];
      korName = [
        "창조의 파편",
        "창조의 숨결",
        "거래소 수수료 인하 티켓",
        "오래된 종이 조각",
        "창조의 고서",
      ][itemDetailNumber];
      break;
    }
  }
  return {
    name,
    korName,
  };
};
const checkSummonerLevelUpCondition = (level: number, grade: number) => {
  if (
    (level === 30 && grade < 1) ||
    (level === 50 && grade < 2) ||
    (level === 65 && grade < 3) ||
    (level === 75 && grade < 4) ||
    (level === 90 && grade < 5)
  ) {
    return false;
  }
  return true;
};
const checkTotemLevelUpCondition = (level: number, grade: number) => {
  if (
    (level === 10 && grade < 1) ||
    (level === 20 && grade < 2) ||
    (level === 30 && grade < 3) ||
    (level === 40 && grade < 4) ||
    (level === 50 && grade < 5) ||
    (level === 60 && grade < 6) ||
    (level === 70 && grade < 7) ||
    (level === 80 && grade < 8) ||
    (level === 90 && grade < 9)
  ) {
    return false;
  }
  return true;
};
const tryLevelUp = (
  targetIndex: number,
  currentExp: number,
  level: number,
  grade: number
): { level: number; currentExp: number } | RecursiveFunction => {
  const expToLevelUp =   10 ** (Math.ceil(level / 10) + 2) *
  (targetIndex === 2 ? 50 : 10 ** targetIndex) *
  level;
  if (currentExp < expToLevelUp) {
    return { level, currentExp };
  }
  let ableToLevelUp = true;
  if (targetIndex === 0) {
    ableToLevelUp = checkSummonerLevelUpCondition(level, grade);
  } else if (targetIndex === 1) {
    ableToLevelUp = checkTotemLevelUpCondition(level, grade);
  }
  if (ableToLevelUp) {
    return tryLevelUp(targetIndex, currentExp - expToLevelUp, level + 1, grade);
  }
  return { level, currentExp };
};
const getExp = (
  targetIndex: number,
  currentExp: number,
  exp: number,
  level: number,
  grade: number
) => {
  currentExp += exp;
  const result = tryLevelUp(targetIndex, currentExp, level, grade) as {
    level: number;
    currentExp: number;
  };
  return result;
};
const changeLevelAndExp = (
  target: "creator" | "summoner" | "totem",
  currentExp: number,
  exp: number,
  level: number,
  grade: number
) => {
  const targetIndex = ["summoner", "totem", "creator"].indexOf(target);
  let expToLevelUp =
    10 ** (Math.ceil(level / 10) + 2) *
    (targetIndex === 2 ? 50 : 10 ** targetIndex) *
    level;
  if (currentExp + exp >= expToLevelUp) {
    const levelExpInfo = getExp(targetIndex, currentExp, exp, level, grade);
    level = levelExpInfo.level;
    currentExp = levelExpInfo.currentExp;
  } else {
    currentExp += exp;
  }
  return {
    level,
    exp: currentExp,
  };
};

export {
  ReqError,
  cashItemPriceArr,
  recipeAvailableItemDetail,
  inspectSummonerIndex,
  inspectTotemIndex,
  inspectItemClass,
  inspectItemGrade,
  inspectItemDetail,
  inspectItemInfo,
  splitCodeToInfoWithoutInspection,
  splitCodeToInfo,
  joinInfoToCodeWithoutInspection,
  joinInfoToCode,
  getMarkEnhanceGrade,
  changeNumToRome,
  changeRomeToNum,
  getNameInfoByCode,
  getExp,
  changeLevelAndExp,
};
