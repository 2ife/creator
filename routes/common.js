"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkParams = exports.checkRequest = void 0;
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
const inspectSummonerTotemIndex = (summonerIndex) => {
    if (!availableSummonerTotemIndex.includes(summonerIndex)) {
        return false;
    }
    return true;
};
const inspectItemClass = (itemClass) => {
    if (!availableItemClass.includes(itemClass)) {
        return false;
    }
    return true;
};
const inspectItemGrade = (itemClass, itemGrade, itemDetail) => {
    if ((itemClass === 6 && itemDetail === "0") ||
        (itemClass === 7 && ["0", "1"].includes(itemDetail))) {
        if (itemGrade !== 0) {
            return false;
        }
    }
    else if (!availableItemGrade.includes(itemGrade)) {
        return false;
    }
    return true;
};
const inspectItemDetail = (itemClass, itemDetail) => {
    if (itemClass === 5) {
        if (itemDetail.length !== 4) {
            return false;
        }
        for (const enhanceGrade of itemDetail) {
            if (!markAvailableEnhanceGrade.includes(enhanceGrade)) {
                return false;
            }
        }
    }
    else {
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
const inspectItemInfo = (itemClass, itemGrade, itemDetail) => {
    const classCorrect = inspectItemClass(itemClass);
    const gradeCorrect = inspectItemGrade(itemClass, itemGrade, itemDetail);
    const detailCorrect = inspectItemDetail(itemClass, itemDetail);
    if (classCorrect && gradeCorrect && detailCorrect) {
        return true;
    }
    return false;
};
const splitCodeToInfo = (code) => {
    const underBarNumbers = Array.from(code).filter((str) => str === "_").length;
    if (underBarNumbers !== 2) {
        return null;
    }
    const firstUnderBarIndex = code.indexOf("_");
    const lastUnderBarIndex = code.lastIndexOf("_");
    const itemClass = Number(code.slice(0, firstUnderBarIndex));
    const itemGrade = Number(code.slice(firstUnderBarIndex + 1, lastUnderBarIndex));
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
class ReqError extends Error {
    constructor(obj, msg) {
        super(msg);
        this.fatal = obj.fatal ? obj.fatal : false;
        this.status = obj.status;
        this.place = obj.place;
        this.content = obj.content;
        this.user = obj.user ? obj.user : null;
    }
}
const checkRequest = (req, res, next) => {
    if (req.user?.id) {
        next();
    }
    else {
        const errorObj = {
            status: 400,
            place: "routes-common-checkRequest",
            content: `no userId! req.user: ${req.user}`,
        };
        const error = new ReqError(errorObj, errorObj.content);
        next(error);
    }
};
exports.checkRequest = checkRequest;
const checkParams = (mode) => (req, res, next) => {
    switch (mode) {
        case "itemCode": {
            const code = req.params.code;
            const itemInfo = splitCodeToInfo(code);
            if (itemInfo) {
                next();
            }
            else {
                const errorObj = {
                    status: 400,
                    place: "routes-common-checkParams",
                    content: `weird code! code: ${code}`,
                };
                const error = new ReqError(errorObj, errorObj.content);
                next(error);
            }
            break;
        }
        case "id": {
            const id = Number(req.params.id);
            if (Number.isInteger(id) && id >= 0) {
                next();
            }
            else {
                const errorObj = {
                    status: 400,
                    place: "routes-common-checkParams",
                    content: `weird id! id: ${id}`,
                };
                const error = new ReqError(errorObj, errorObj.content);
                next(error);
            }
            break;
        }
        case "summonerTotemIndex": {
            const index = Number(req.params.id);
            if (inspectSummonerTotemIndex(index)) {
                next();
            }
            else {
                const errorObj = {
                    status: 400,
                    place: "routes-common-checkParams",
                    content: `weird summonerTotemIndex! index: ${index}`,
                };
                const error = new ReqError(errorObj, errorObj.content);
                next(error);
            }
            break;
        }
    }
};
exports.checkParams = checkParams;
