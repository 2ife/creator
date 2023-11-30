import { RequestHandler } from "express";

const availableSummonerTotemIndex = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
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

const inspectSummonerTotemIndex = (summonerIndex: number) => {
  if (!availableSummonerTotemIndex.includes(summonerIndex)) {
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

const checkRequest: RequestHandler = (req, res, next) => {
  if (req.user?.id) {
    next();
  } else {
    console.log("req 오류!", req);
    res.status(403).send({ fatal: false });
  }
};
const checkParams =
  (mode: "itemCode" | "id" | "summonerTotemIndex"): RequestHandler =>
  (req, res, next) => {
    switch (mode) {
      case "itemCode": {
        const code = req.params.code;
        const itemInfo = splitCodeToInfo(code);
        if (itemInfo) {
          res.locals.itemInfo = itemInfo;
          next();
        } else {
          console.log(
            "item code 입력 오류!",
            "id",
            req.user?.id,
            "입력값: ",
            code
          );
          res.status(403).send({ fatal: true });
        }
        break;
      }
      case "id": {
        const id = Number(req.params.id);
        if (Number.isInteger(id) && id >= 0) {
          next();
        } else {
          console.log(
            "id 입력 오류!",
            "id",
            req.user?.id,
            "입력값: ",
            req.params.id
          );
          res.status(403).send({ fatal: true });
        }
        break;
      }
      case "summonerTotemIndex": {
        const index = Number(req.params.id);
        if (inspectSummonerTotemIndex(index)) {
          next();
        } else {
          console.log(
            "summoner totem index 입력 오류!",
            "id",
            req.user?.id,
            "입력값: ",
            req.params.id
          );
          res.status(403).send({ fatal: true });
        }
        break;
      }
    }
  };

export { checkRequest, checkParams };
