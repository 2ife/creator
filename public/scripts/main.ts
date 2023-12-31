import axios from "axios";

/* html */
const homePart = document.querySelector(".homePart") as HTMLDivElement;
const homePartSummonerImgs = homePart.querySelectorAll(
  ".homePart_summonerImg"
) as NodeListOf<HTMLImageElement>;
const homePartTotemImgs = homePart.querySelectorAll(
  ".homePart_totemImg"
) as NodeListOf<HTMLImageElement>;
const homeModal = homePart.querySelector(".homeModal") as HTMLDivElement;
const OutOfHomeModal = homePart.querySelector(
  "#OutOfHomeModal"
) as HTMLDivElement;
const homeModalCloseBtn = homeModal.querySelector(
  ".homeModal_closeBtn"
) as HTMLDivElement;
const homeModalFirstMain = homeModal.querySelector(
  "#homeModalFirstMain"
) as HTMLDivElement;
const homeModalImg = homeModalFirstMain.querySelector(
  ".homeModal_img"
) as HTMLImageElement;
const homeModalName = homeModalFirstMain.querySelector(
  "#homeModal_name"
) as HTMLDivElement;
const homeModalLevelAndGrade = homeModalFirstMain.querySelector(
  "#homeModal_levelAndGrade"
) as HTMLDivElement;
const homeModalExpContainer = homeModalFirstMain.querySelector(
  ".homeModal_expContainer"
) as HTMLDivElement;
const homeModalSecondMain = homeModal.querySelector(
  "#homeModalSecondMain"
) as HTMLDivElement;
const homeModalMarkImg = homeModalSecondMain.querySelector(
  "#homeModal_markImg"
) as HTMLImageElement;
const homeModalMarkInfo = homeModalSecondMain.querySelector(
  "#homeModal_markInfo"
) as HTMLDivElement;
const homeModalBlessOfSpeedImg = homeModalSecondMain.querySelector(
  "#homeModal_blessOfSpeedImg"
) as HTMLImageElement;
const homeModalBlessOfGrowthImg = homeModalSecondMain.querySelector(
  "#homeModal_blessOfGrowthImg"
) as HTMLImageElement;
const homeModalBlessOfCreationImg = homeModalSecondMain.querySelector(
  "#homeModal_blessOfCreationImg"
) as HTMLImageElement;
const homeModalBlessOfFantasyImg = homeModalSecondMain.querySelector(
  "#homeModal_blessOfFantasyImg"
) as HTMLImageElement;
const homeModalBlessInfo = homeModalSecondMain.querySelector(
  "#homeModal_blessInfo"
) as HTMLDivElement;
const homeModalExpInfo = homeModalFirstMain.querySelector(
  ".expInfo"
) as HTMLDivElement;
const homeModalExpBar = homeModalFirstMain.querySelector(
  ".expBar"
) as HTMLDivElement;
const homeModalFirstInfo = homeModalFirstMain.querySelector(
  "#homeModal_firstInfo"
) as HTMLDivElement;
const homeModalSecondInfo = homeModalFirstMain.querySelector(
  "#homeModal_secondInfo"
) as HTMLDivElement;
const homeModalFooter = homeModal.querySelector(
  ".homeModal_footer"
) as HTMLDivElement;
const summonBtn = homeModalFooter.querySelector(
  "#summonBtn"
) as HTMLButtonElement;
const awakenBtn = homeModalFooter.querySelector(
  "#awakenBtn"
) as HTMLButtonElement;

const itemPart = document.querySelector(".itemPart") as HTMLDivElement;
const itemPartInventories = itemPart.querySelectorAll(
  ".inventory"
) as NodeListOf<HTMLDivElement>;
const itemPartNavBtns = itemPart.querySelectorAll(
  ".classNav_navBtn"
) as NodeListOf<HTMLButtonElement>;
const itemPartItemContainers = itemPart.querySelectorAll(
  ".itemContainer"
) as NodeListOf<HTMLDivElement>;
const itemDetailContainer = itemPart.querySelector(
  ".itemDetailContainer"
) as HTMLDivElement;
const itemDetailCodeContainer = itemDetailContainer.querySelector(
  ".itemCode"
) as HTMLSpanElement;
const itemDetailNameContainer = itemDetailContainer.querySelector(
  ".itemDetailContainer_itemName"
) as HTMLDivElement;
const itemDetailClassContainer = itemDetailContainer.querySelector(
  ".itemDetailContainer_itemClass"
) as HTMLDivElement;
const itemDetailDescriptionContainer = itemDetailContainer.querySelector(
  ".itemDetailContainer_itemDescription"
) as HTMLDivElement;
const itemDetailExecuteBtn = itemDetailContainer.querySelector(
  ".itemDetailContainer_btn"
) as HTMLButtonElement;
const itemModal = itemPart.querySelector(".itemModal") as HTMLDivElement;
const OutOfItemModal = itemPart.querySelector(
  "#OutOfItemModal"
) as HTMLDivElement;
const itemModalCloseBtn = itemModal.querySelector(
  ".itemModal_closeBtn"
) as HTMLDivElement;
const itemModalTitle = itemModal.querySelector(
  ".itemModal_title"
) as HTMLDivElement;
const itemModalContent = itemModal.querySelector(
  ".itemModal_content"
) as HTMLDivElement;
const itemModalMainImgContainer = itemModalContent.querySelector(
  "#itemModalMainImgContainer"
) as HTMLDivElement;
const itemModalMainGradeContainer = itemModalMainImgContainer.querySelector(
  ".itemModal_itemGrade"
) as HTMLSpanElement;
const itemModalMainImg = itemModalMainImgContainer.querySelector(
  ".itemModal_img"
) as HTMLImageElement;
const itemModalMainAmounts = itemModalMainImgContainer.querySelector(
  ".itemContainer_itemAmounts"
) as HTMLSpanElement;
const itemModalArrow = itemModalContent.querySelector(
  ".itemModal_arrow"
) as HTMLImageElement;
const itemModalResultImgContainer = itemModalContent.querySelector(
  "#itemModalResultImgContainer"
) as HTMLDivElement;
const itemModalResultGradeContainer = itemModalResultImgContainer.querySelector(
  ".itemModal_itemGrade"
) as HTMLSpanElement;
const itemModalResultImg = itemModalResultImgContainer.querySelector(
  ".itemModal_img"
) as HTMLImageElement;
const itemModalInfo = itemModalContent.querySelector(
  ".itemModal_info"
) as HTMLDivElement;
const itemModalAmountsSetterContainer = itemModalContent.querySelector(
  ".itemModal_amountsSetterContainer"
) as HTMLDivElement;
const itemModalAmountsSetter = itemModalAmountsSetterContainer.querySelector(
  ".itemModal_amountsSetter"
) as HTMLInputElement;
const itemModalBtn = itemModal.querySelector(
  ".itemModal_btn"
) as HTMLDivElement;

const makePart = document.querySelector(".makePart") as HTMLDivElement;
const makePartNavBtns = makePart.querySelectorAll(
  ".classNav_navBtn"
) as NodeListOf<HTMLDivElement>;
const makePartNameBtns = makePart.querySelectorAll(
  ".classNav_nameBtn"
) as NodeListOf<HTMLButtonElement>;
const makePartClassNavBtn = makePart.querySelector(
  "#makeClassNavBtn"
) as HTMLDivElement;
const makePartClassNameBtn = makePartClassNavBtn.querySelector(
  ".classNav_nameBtn"
) as HTMLButtonElement;
const makePartGradeNavBtn = makePart.querySelector(
  "#makeGradeNavBtn"
) as HTMLDivElement;
const makePartGradeNameBtn = makePartGradeNavBtn.querySelector(
  ".classNav_nameBtn"
) as HTMLButtonElement;
const makeModeChangeBtn = makePart.querySelector(
  ".classNav_modeChangeBtn"
) as HTMLDivElement;
const makePartNavLists = makePart.querySelectorAll(
  ".navList"
) as NodeListOf<HTMLDivElement>;
const makePartNavs = makePart.querySelectorAll(
  ".navList_nav"
) as NodeListOf<HTMLDivElement>;
const makeInventory = makePart.querySelector(
  ".craftInventory"
) as HTMLDivElement;
const makePartItemContainers = makePart.querySelectorAll(
  ".craftTargetContainer"
) as NodeListOf<HTMLDivElement>;
const craftExecuter = makePart.querySelector(
  ".craftExecuter"
) as HTMLDivElement;
const craftTargetImgContainer = craftExecuter.querySelector(
  ".craftTarget_targetImgContainer"
) as HTMLDivElement;
const craftTargetNameContainer = craftExecuter.querySelector(
  "#craftTargetName"
) as HTMLDivElement;
const craftTargetRecipeAmountsContainer = craftExecuter.querySelector(
  "#craftTargetRecipeAmounts"
) as HTMLDivElement;
const craftTargetDescriptionContainer = craftExecuter.querySelector(
  ".craftExecuter_description"
) as HTMLDivElement;
const craftTargetIngredientList = craftExecuter.querySelector(
  ".craftExecuter_ingredientList"
) as HTMLDivElement;
const craftAmountsSetter = craftExecuter.querySelector(
  ".executer_amounts"
) as HTMLInputElement;
const craftBtn = craftExecuter.querySelector(
  ".executer_craftBtn"
) as HTMLButtonElement;
const craftTargetRateContainer = craftExecuter.querySelector(
  ".executer_rateContainer"
) as HTMLDivElement;
const OutOfMakeModal = makePart.querySelector(
  "#OutOfMakeModal"
) as HTMLDivElement;
const makeModal = makePart.querySelector(".makeModal") as HTMLDivElement;
const makeModalCloseBtn = makeModal.querySelector(
  ".makeModal_btn"
) as HTMLButtonElement;
const makeModalItemGrade = makeModal.querySelector(
  ".makeModal_itemGrade"
) as HTMLSpanElement;
const makeModalImg = makeModal.querySelector(
  ".makeModal_img"
) as HTMLImageElement;
const makeModalInfo = makeModal.querySelector(
  ".makeModal_info"
) as HTMLDivElement;
const makeModalBtn = makeModal.querySelector(
  ".makeModal_btn"
) as HTMLButtonElement;

const marketPart = document.querySelector(".marketPart") as HTMLDivElement;
const searchNav = marketPart.querySelector(".searchNav") as HTMLDivElement;
const searchTextContainer = searchNav.querySelector(
  ".searchNav_searchTextContainer"
) as HTMLInputElement;
const searchNameBtns = searchNav.querySelectorAll(
  ".classNav_nameBtn"
) as NodeListOf<HTMLButtonElement>;
const searchClassNavBtn = searchNav.querySelector(
  "#marketClassNavBtn"
) as HTMLDivElement;
const searchGradeNavBtn = searchNav.querySelector(
  "#marketGradeNavBtn"
) as HTMLDivElement;
const marketMarkSpeedEnhanceNavBtn = searchNav.querySelector(
  "#marketMarkSpeedEnhanceNavBtn"
) as HTMLDivElement;
const marketMarkGrowthEnhanceNavBtn = searchNav.querySelector(
  "#marketMarkGrowthEnhanceNavBtn"
) as HTMLDivElement;
const marketMarkCreationEnhanceNavBtn = searchNav.querySelector(
  "#marketMarkCreationEnhanceNavBtn"
) as HTMLDivElement;
const marketMarkFantasyEnhanceNavBtn = searchNav.querySelector(
  "#marketMarkFantasyEnhanceNavBtn"
) as HTMLDivElement;
const marketPartNavLists = searchNav.querySelectorAll(
  ".navList"
) as NodeListOf<HTMLDivElement>;
const marketSearchPartNavs = searchNav.querySelectorAll(
  ".navList_nav"
) as NodeListOf<HTMLDivElement>;
const marketSearchBtn = searchNav.querySelector(
  "#marketSearchBtn"
) as HTMLButtonElement;
const marketInitializeBtn = searchNav.querySelector(
  "#marketInitializeBtn"
) as HTMLButtonElement;
const marketSaleModeBtn = searchNav.querySelector(
  "#marketSaleModeBtn"
) as HTMLButtonElement;
const marketItemList = marketPart.querySelector(
  ".marketItemList"
) as HTMLDivElement;
const marketItemContainers = marketItemList.querySelectorAll(
  ".marketItemContainer"
) as NodeListOf<HTMLDivElement>;
const marketBuyBtns = marketItemList.querySelectorAll(
  ".marketItemContainer_buyBtn"
) as NodeListOf<HTMLButtonElement>;
const searchPageController = marketPart.querySelector(
  ".searchPageController"
) as HTMLDivElement;
const searchLeftEndBtn = searchPageController.querySelector(
  "#leftEndBtn"
) as HTMLButtonElement;
const searchLeftBtn = searchPageController.querySelector(
  "#leftBtn"
) as HTMLButtonElement;
const searchPageShower = searchPageController.querySelector(
  ".searchPageController_pageShower"
) as HTMLDivElement;
const currentPageShower = searchPageShower.querySelector(
  "#currentPage"
) as HTMLSpanElement;
const lastPageShower = searchPageShower.querySelector(
  "#lastPage"
) as HTMLSpanElement;
const searchRightBtn = searchPageController.querySelector(
  "#rightBtn"
) as HTMLButtonElement;
const searchRightEndBtn = searchPageController.querySelector(
  "#rightEndBtn"
) as HTMLButtonElement;
const marketInventoryWrapper = marketPart.querySelector(
  ".inventoryWrapper"
) as HTMLDivElement;
const marketPartInventories = marketPart.querySelectorAll(
  ".inventory"
) as NodeListOf<HTMLDivElement>;
const currentSaleInventory = marketPart.querySelector(
  "#currentSaleInventory"
) as HTMLDivElement;
const mySellingItemContainers = currentSaleInventory.querySelectorAll(
  ".itemContainer"
) as NodeListOf<HTMLDivElement>;
const marketClassNavContainer = marketPart.querySelector(
  ".classNav"
) as HTMLDivElement;
const marketSalePartNavBtns = marketClassNavContainer.querySelectorAll(
  ".classNav_navBtn"
) as NodeListOf<HTMLButtonElement>;
const marketBuyModeBtn = marketClassNavContainer.querySelector(
  "#marketBuyModeBtn"
) as HTMLButtonElement;
const marketPartItemContainers = marketPart.querySelectorAll(
  ".itemContainer"
) as NodeListOf<HTMLDivElement>;
const marketItemDetailContainer = marketPart.querySelector(
  ".itemDetailContainer"
) as HTMLDivElement;
const marketItemDetailIdContainer = marketItemDetailContainer.querySelector(
  ".itemId"
) as HTMLSpanElement;
const marketItemDetailCodeContainer = marketItemDetailContainer.querySelector(
  ".itemCode"
) as HTMLSpanElement;
const marketItemDetailNameContainer = marketItemDetailContainer.querySelector(
  ".itemDetailContainer_itemName"
) as HTMLDivElement;
const marketItemDetailClassContainer = marketItemDetailContainer.querySelector(
  ".itemDetailContainer_itemClass"
) as HTMLDivElement;
const marketItemDetailDescriptionContainer =
  marketItemDetailContainer.querySelector(
    ".itemDetailContainer_itemDescription"
  ) as HTMLDivElement;
const marketItemDetailExecuteBtn = marketItemDetailContainer.querySelector(
  ".itemDetailContainer_btn"
) as HTMLButtonElement;
const saleModal = marketPart.querySelector("#saleModal") as HTMLDivElement;
const OutOfSaleModal = marketPart.querySelector(
  "#OutOfSaleModal"
) as HTMLDivElement;
const saleModalCloseBtn = saleModal.querySelector(
  ".itemModal_closeBtn"
) as HTMLButtonElement;
const saleModalTitle = saleModal.querySelector(
  ".itemModal_title"
) as HTMLDivElement;
const saleModalContent = saleModal.querySelector(
  ".itemModal_content"
) as HTMLDivElement;
const saleItemGradeContainer = saleModalContent.querySelector(
  ".itemModal_itemGrade"
) as HTMLSpanElement;
const saleItemImg = saleModalContent.querySelector(
  ".itemModal_img"
) as HTMLImageElement;
const saleItemAmountsContainer = saleModalContent.querySelector(
  ".itemContainer_itemAmounts"
) as HTMLSpanElement;
const saleItemAmountsSetter = saleModalContent.querySelector(
  "#saleModal_amountsSetter"
) as HTMLInputElement;
const saleItemPriceSetter = saleModalContent.querySelector(
  "#saleModal_priceSetter"
) as HTMLInputElement;
const saleItemTotalPriceShowerContainer = saleModalContent.querySelector(
  "#saleModal_totalPriceShowerContainer"
) as HTMLDivElement;
const saleItemTotalPriceShower = saleModalContent.querySelector(
  ".itemModal_totalPriceShower"
) as HTMLDivElement;
const saleModalBtn = saleModal.querySelector(
  ".itemModal_btn"
) as HTMLButtonElement;
const marketFeeContainer = marketPart.querySelector(
  ".classNav_feeContainer"
) as HTMLDivElement;
const marketFee = marketFeeContainer.querySelector(
  ".feeContainer_fee"
) as HTMLSpanElement;
const marketDiscountEndtime = marketFeeContainer.querySelector(
  ".feeContainer_endtime"
) as HTMLSpanElement;
const goldContainers = marketPart.querySelectorAll(
  ".goldContainer_goldValue"
) as NodeListOf<HTMLInputElement>;

const cashPart = document.querySelector(".cashPart") as HTMLDivElement;
const cashItemContainers = cashPart.querySelectorAll(
  ".cashItemList_cashItemContainer"
) as NodeListOf<HTMLDivElement>;
const cashItemDetailContainer = cashPart.querySelector(
  ".itemDetailContainer"
) as HTMLDivElement;
const cashItemDetailCodeContainer = cashItemDetailContainer.querySelector(
  ".itemCode"
) as HTMLSpanElement;
const cashItemDetailNameContainer = cashItemDetailContainer.querySelector(
  ".itemDetailContainer_itemName"
) as HTMLDivElement;
const cashItemDetailClassContainer = cashItemDetailContainer.querySelector(
  ".itemDetailContainer_itemClass"
) as HTMLDivElement;
const cashItemDetailDescriptionContainer =
  cashItemDetailContainer.querySelector(
    ".itemDetailContainer_itemDescription"
  ) as HTMLDivElement;
const cashItemDetailExecuteBtn = cashItemDetailContainer.querySelector(
  ".itemDetailContainer_btn"
) as HTMLButtonElement;
const cashModal = cashPart.querySelector("#cashModal") as HTMLDivElement;
const OutOfCashModal = cashPart.querySelector(
  "#OutOfCashModal"
) as HTMLDivElement;
const cashModalCloseBtn = cashModal.querySelector(
  ".itemModal_closeBtn"
) as HTMLButtonElement;
const cashModalTitle = cashModal.querySelector(
  ".itemModal_title"
) as HTMLDivElement;
const cashModalContent = cashModal.querySelector(
  ".itemModal_content"
) as HTMLDivElement;
const cashItemGradeContainer = cashModalContent.querySelector(
  ".itemModal_itemGrade"
) as HTMLSpanElement;
const cashItemImg = cashModalContent.querySelector(
  ".itemModal_img"
) as HTMLImageElement;
const cashItemAmountsSetter = cashModalContent.querySelector(
  "#cashModal_amountsSetter"
) as HTMLInputElement;
const cashItemPriceSetter = cashModalContent.querySelector(
  "#cashModal_priceSetter"
) as HTMLInputElement;
const cashItemTotalPriceShowerContainer = cashModalContent.querySelector(
  "#cashModal_totalPriceShowerContainer"
) as HTMLDivElement;
const cashItemTotalPriceShower = cashModalContent.querySelector(
  ".itemModal_totalPriceShower"
) as HTMLDivElement;
const cashModalBtn = cashModal.querySelector(
  ".itemModal_btn"
) as HTMLButtonElement;
const cashContainer = cashPart.querySelector(
  ".cashContainer_cashValue"
) as HTMLInputElement;

const creatorLevelContainer = document.querySelector(
  "#creatorLevel"
) as HTMLDivElement;
const creatorExpContainer = document.querySelector(
  ".footer_creatorExpContainer"
) as HTMLDivElement;
const creatorExpInfoContainer = creatorExpContainer.querySelector(
  ".expInfo"
) as HTMLDivElement;
const footerBtns = document.querySelectorAll(
  ".footer_btn"
) as NodeListOf<HTMLButtonElement>;
const menuBtn = document.querySelector("#menuBtn") as HTMLButtonElement;
const menuBtn_listContainer = document.querySelector(
  ".menuBtn_listContainer"
) as HTMLUListElement;
const menuBtn_lists = menuBtn_listContainer.querySelectorAll(
  ".menuBtn_list"
) as NodeListOf<HTMLLIElement>;
const profileBtn = menuBtn_listContainer.querySelector(
  "#profileBtn"
) as HTMLButtonElement;
const logoutLink = menuBtn_lists[3].querySelector("a")!;

const profileModal = document.querySelector(".profileModal") as HTMLDivElement;
const OutOfProfileModal = document.querySelector(
  ".OutOfProfileModal"
) as HTMLDivElement;
const profileModalCloseBtn = profileModal.querySelector(
  ".profileModal_closeBtn"
) as HTMLButtonElement;
const profileNickContainer = profileModal.querySelector(
  "#profile_nick"
) as HTMLInputElement;
const nickChangeBtn = profileModal.querySelector(
  "#nickChangeBtn"
) as HTMLButtonElement;
const profilePasswordContainer = profileModal.querySelector(
  "#profile_password"
) as HTMLInputElement;
const passwordChangeBtn = profileModal.querySelector(
  "#passwordChangeBtn"
) as HTMLButtonElement;
const alertModal = document.querySelector(".alertModal") as HTMLDivElement;
const OutOfAlertModal = document.querySelector(
  ".OutOfAlertModal"
) as HTMLDivElement;
const loadingShower = document.querySelector(
  ".loadingShower"
) as HTMLDivElement;
const outOfLoadingShower = document.querySelector(
  ".outOfLoadingShower"
) as HTMLDivElement;

/* common */
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
  if (![0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(num)) {
    return null;
  }
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
  const num = [
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
  if (num === -1) {
    return null;
  }
  return num;
};
const getNameInfoByCode = (code: string) => {
  const { itemClass, itemGrade, itemDetail } =
    splitCodeToInfoWithoutInspection(code);
  const itemDetailNumber = Number(itemDetail);
  let name = null;
  let korName = null;
  let description = null;
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
      description = [
        "세계를 구성하는 네 가지 원소 중 하나, 공기",
        "세계를 구성하는 네 가지 원소 중 하나, 흙",
        "세계를 구성하는 네 가지 원소 중 하나, 물",
        "세계를 구성하는 네 가지 원소 중 하나, 불",
        "공기를 응집해서 만든 결정",
        "흙을 응집해서 만든 결정",
        "물을 응집해서 만든 결정",
        "불을 응집해서 만든 결정",
        "태초의 순수한 상태의 공기",
        "태초의 순수한 상태의 흙",
        "태초의 순수한 상태의 물",
        "태초의 순수한 상태의 불",
      ][itemDetailNumber - 1];
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
      description = [
        "세계를 움직이는 네 가지 힘 중 하나, 시간",
        "세계를 움직이는 네 가지 힘 중 하나, 공간",
        "세계를 움직이는 네 가지 힘 중 하나, 빛",
        "세계를 움직이는 네 가지 힘 중 하나, 혼돈",
        "시간의 힘을 응집해 놓은 덩어리",
        "공간의 힘을 응집해 놓은 덩어리",
        "빛의 힘을 응집해 놓은 덩어리",
        "혼돈의 힘을 응집해 놓은 덩어리",
        "가장 순수한 형태의 시간",
        "가장 순수한 형태의 공간",
        "가장 순수한 형태의 빛",
        "가장 순수한 형태의 혼돈",
      ][itemDetailNumber - 1];
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
      description = [
        "토템 몸체를 만드는 재료",
        "재규어 토템의 토템 몸체",
        "곰 토템의 토템 몸체",
        "독수리 토템의 토템 몸체",
        "올빼미 토템의 토템 몸체",
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
      description = [
        `소환 쿨타임 -${3 * itemGrade}%\n(지속시간: ${144 * itemGrade}분)`,
        `경험치 획득 +${6 * itemGrade}%\n(지속시간: ${144 * itemGrade}분)`,
        `창조의 파편 획득률 +${9 * itemGrade}%\n(지속시간: ${
          144 * itemGrade
        }분)`,
        `소환 기준 레벨 +${Math.round(1.5 * itemGrade * 10) / 10}\n(지속시간: ${
          144 * itemGrade
        }분)`,
        `${
          2 ** (itemGrade - 1) * 10
        }분동안 소환사가 소환할 아이템 획득\n(경험치, 창조의 파편 x)`,
        `${
          2 ** (itemGrade - 1) * 10
        }분동안 소환사가 소환을 통해 얻을 경험치 획득\n(아이템, 창조의 파편 x)`,
        `${
          2 ** (itemGrade - 1) * 10
        }분동안 소환사가 소환을 통해 얻을 창조의 파편획득\n(아이템, 경험치 x)`,
      ][itemDetailNumber - 1];
      break;
    }
    case 5: {
      name = "mark_of_summoner";
      korName = "소환사의 문양";
      const markEnhanceGradeArr = getMarkEnhanceGrade(itemDetail);
      description = `소환 쿨타임 -${
        Math.round((3 * itemGrade - 2 + markEnhanceGradeArr[0] * 0.4) * 10) / 10
      }%\n경험치 획득 +${
        Math.round((6 * itemGrade - 4 + markEnhanceGradeArr[1] * 0.8) * 10) / 10
      }%\n창조의 파편 획득률 +${
        Math.round((9 * itemGrade - 6 + markEnhanceGradeArr[2] * 1.2) * 10) / 10
      }%\n소환 기준 레벨 +${
        Math.round((1.5 * itemGrade - 1 + markEnhanceGradeArr[3] * 0.2) * 10) /
        10
      }\n${
        itemGrade < 10
          ? `(최대 강화 시, 다음 등급 문양의 제작 재료로 사용 가능)`
          : ""
      }`;
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
      description =
        [
          "창조의 숨결 조합 가능",
          `[${changeNumToRome(itemGrade)}] 재규어 토템 몸체 조합 가능`,
          `[${changeNumToRome(itemGrade)}] 곰 토템 몸체 조합 가능`,
          `[${changeNumToRome(itemGrade)}] 독수리 토템 몸체 조합 가능`,
          `[${changeNumToRome(itemGrade)}] 올빼미 토템 몸체 조합 가능`,
          `[${changeNumToRome(itemGrade)}] 소환사의 문양 조합 가능`,
          `[${changeNumToRome(itemGrade)}] 축복: 신속 조합 가능`,
          `[${changeNumToRome(itemGrade)}] 축복: 성장 조합 가능`,
          `[${changeNumToRome(itemGrade)}] 축복: 창조 조합 가능`,
          `[${changeNumToRome(itemGrade)}] 축복: 환상 조합 가능`,
          `[${changeNumToRome(itemGrade)}] 태초의 축복: 신속 조합 가능`,
          `[${changeNumToRome(itemGrade)}] 태초의 축복: 성장 조합 가능`,
          `[${changeNumToRome(itemGrade)}] 태초의 축복: 창조 조합 가능`,
          `[${changeNumToRome(itemGrade)}] 거래소 수수료 인하 티켓 조합 가능`,
        ][itemDetailNumber] + "\n(해당 조합서 수량만큼 조합 가능)";
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
      description = [
        "창조자의 힘이 깃든 파편",
        "창조자의 숨결로, 소환사 및 토템 창조에 필요",
        `거래소 수수료 ${1.5 * itemGrade}% 할인\n(지속시간: 1시간)`,
        "정체를 알 수 없는 아주 오래 돼 보이는 종이 조각",
        `창조의 비밀이 담겨 있는 책으로, 달 ${
          cashItemPriceArr[itemGrade - 1] * 2.1
        }개 획득`,
      ][itemDetailNumber];
      break;
    }
  }
  if (!name || !korName || !description) {
    return null;
  }
  return {
    name,
    korName,
    description,
  };
};
const showIngredients = (code: string) => {
  const { itemClass, itemGrade, itemDetail } =
    splitCodeToInfoWithoutInspection(code);
  const itemDetailNumber = Number(itemDetail);
  if ([1, 2].includes(itemClass)) {
    if ([5, 6, 7, 8, 9, 10, 11, 12].includes(itemDetailNumber)) {
      return [
        {
          code: `${itemClass}_${itemGrade}_${itemDetailNumber - 4}`,
          amounts: 10,
        },
      ];
    }
  }
  if (itemClass === 3) {
    if ([1, 2, 3, 4].includes(itemDetailNumber)) {
      return [
        { code: `${itemClass}_${itemGrade}_0`, amounts: 10 },
        { code: `1_${itemGrade}_${itemDetailNumber + 8}`, amounts: 1 },
        { code: `2_${itemGrade}_${itemDetailNumber + 8}`, amounts: 1 },
      ];
    }
  }
  if (itemClass === 4) {
    if ([1, 2, 3, 4, 5, 6, 7].includes(itemDetailNumber)) {
      return [
        { code: `1_${itemGrade}_${itemDetailNumber + 4}`, amounts: 1 },
        { code: `2_${itemGrade}_${itemDetailNumber + 4}`, amounts: 1 },
      ];
    }
  }
  if (itemClass === 5) {
    if (itemGrade === 1) {
      return [
        { code: "1_1_9", amounts: 1 },
        { code: "1_1_10", amounts: 1 },
        { code: "1_1_11", amounts: 1 },
        { code: "1_1_12", amounts: 1 },
        { code: "2_1_9", amounts: 1 },
        { code: "2_1_10", amounts: 1 },
        { code: "2_1_11", amounts: 1 },
        { code: "2_1_12", amounts: 1 },
      ];
    }
    if (itemGrade <= 10) {
      return [
        { code: `5_${itemGrade - 1}_5555`, amounts: 1 },
        { code: `1_${itemGrade}_9`, amounts: 1 },
        { code: `1_${itemGrade}_10`, amounts: 1 },
        { code: `1_${itemGrade}_11`, amounts: 1 },
        { code: `1_${itemGrade}_12`, amounts: 1 },
        { code: `2_${itemGrade}_9`, amounts: 1 },
        { code: `2_${itemGrade}_10`, amounts: 1 },
        { code: `2_${itemGrade}_11`, amounts: 1 },
        { code: `2_${itemGrade}_12`, amounts: 1 },
      ];
    }
  }
  if (itemClass === 7) {
    if (code === "7_0_1") {
      return [{ code: "7_0_0", amounts: 100 }];
    }
    if (itemDetailNumber === 2) {
      return [
        { code: `1_${itemGrade}_12`, amounts: 1 },
        { code: `2_${itemGrade}_12`, amounts: 1 },
      ];
    }
    if (itemDetailNumber === 4) {
      return [
        { code: `7_${itemGrade}_3`, amounts: 10 },
        { code: `1_${itemGrade}_9`, amounts: 2 },
        { code: `1_${itemGrade}_10`, amounts: 2 },
        { code: `1_${itemGrade}_11`, amounts: 2 },
        { code: `1_${itemGrade}_12`, amounts: 1 },
        { code: `2_${itemGrade}_9`, amounts: 2 },
        { code: `2_${itemGrade}_10`, amounts: 2 },
        { code: `2_${itemGrade}_11`, amounts: 2 },
        { code: `2_${itemGrade}_12`, amounts: 1 },
      ];
    }
  }
  return null;
};
const showMarkEnhanceIngredients = (code: string) => {
  const { itemClass, itemGrade, itemDetail } =
    splitCodeToInfoWithoutInspection(code)!;
  if (itemClass === 5) {
    const markEnhanceGradeArr = getMarkEnhanceGrade(itemDetail);
    const speedEnhanceGrade = markEnhanceGradeArr[0];
    const growthEnhanceGrade = markEnhanceGradeArr[1];
    const creationEnhanceGrade = markEnhanceGradeArr[2];
    const fantasyEnhanceGrade = markEnhanceGradeArr[3];
    return [
      {
        code: `1_${itemGrade}_5`,
        amounts: speedEnhanceGrade === 5 ? 0 : speedEnhanceGrade + 1,
      },
      {
        code: `1_${itemGrade}_6`,
        amounts: growthEnhanceGrade === 5 ? 0 : growthEnhanceGrade + 1,
      },
      {
        code: `1_${itemGrade}_7`,
        amounts: creationEnhanceGrade === 5 ? 0 : creationEnhanceGrade + 1,
      },
      {
        code: `1_${itemGrade}_8`,
        amounts: fantasyEnhanceGrade === 5 ? 0 : fantasyEnhanceGrade + 1,
      },
      {
        code: `2_${itemGrade}_5`,
        amounts: speedEnhanceGrade === 5 ? 0 : speedEnhanceGrade + 1,
      },
      {
        code: `2_${itemGrade}_6`,
        amounts: growthEnhanceGrade === 5 ? 0 : growthEnhanceGrade + 1,
      },
      {
        code: `2_${itemGrade}_7`,
        amounts: creationEnhanceGrade === 5 ? 0 : creationEnhanceGrade + 1,
      },
      {
        code: `2_${itemGrade}_8`,
        amounts: fantasyEnhanceGrade === 5 ? 0 : fantasyEnhanceGrade + 1,
      },
    ];
  }
  return null;
};
const getRecipeCodeOfItem = (code: string) => {
  const { itemClass, itemGrade, itemDetail } =
    splitCodeToInfoWithoutInspection(code);
  const itemDetailNumber = Number(itemDetail);
  let gradePart = itemGrade;
  let detailPart: string | null = null;
  if (itemClass === 3 && [1, 2, 3, 4].includes(itemDetailNumber)) {
    detailPart = itemDetailNumber.toString();
  } else if (
    (itemClass === 4 &&
      itemGrade > 4 &&
      [1, 2, 3, 4].includes(itemDetailNumber)) ||
    (itemClass === 4 && [5, 6, 7].includes(itemDetailNumber))
  ) {
    detailPart = (itemDetailNumber + 5).toString();
  } else if (itemClass === 5) {
    detailPart = "5";
  } else if (itemClass === 7 && itemDetailNumber === 1) {
    gradePart = 0;
    detailPart = "0";
  } else if (itemClass === 7 && itemDetailNumber === 2) {
    detailPart = "13";
  } else {
    return null;
  }
  return `6_${gradePart}_${detailPart}`;
};
const checkItemAmounts = (code: string) => {
  const { itemClass } = splitCodeToInfoWithoutInspection(code);
  const targetClass = myItems[itemClass - 1];
  if (targetClass[code]) {
    return targetClass[code].amounts;
  } else {
    return 0;
  }
};
const getItemImgSrc = (code: string) => {
  const { itemClass, itemGrade } = splitCodeToInfoWithoutInspection(code);
  return `/images/item/${getNameInfoByCode(code)!.name}${
    itemClass === 5 ? itemGrade : ""
  }.png`;
};

const sortItems = (items: { [key: string]: Item | Mark }) => {
  return Object.fromEntries(
    Object.entries(items).sort((a, b) => {
      if (a[1].itemGrade === b[1].itemGrade) {
        if (a[1].itemClass === 5) {
          const aGradeSum = getMarkEnhanceGrade(a[1].itemDetail).reduce(
            (a, b) => {
              return a + b;
            },
            0
          );
          const bGradeSum = getMarkEnhanceGrade(b[1].itemDetail).reduce(
            (a, b) => {
              return a + b;
            },
            0
          );
          return aGradeSum - bGradeSum;
        }
        return Number(a[1].itemDetail) - Number(b[1].itemDetail);
      }
      return a[1].itemGrade - b[1].itemGrade;
    })
  );
};
const changeItemAmounts = (code: string, amounts: number) => {
  const { itemClass } = splitCodeToInfoWithoutInspection(code);
  const targetClass = myItems[itemClass - 1];
  if (targetClass[code]) {
    targetClass[code].amounts += amounts;
    if (!targetClass[code].amounts) {
      delete targetClass[code];
    }
  } else if (itemClass === 5) {
    targetClass[code] = new Mark(code, amounts);
  } else {
    targetClass[code] = new Item(code, amounts);
  }
  myItems[itemClass - 1] = sortItems(targetClass);
  resetItemContainers(itemClass);
  renderItems(itemClass);
};

let homeModalEventListeners: {
  listeningElement: any;
  eventType: string;
  addedFunction: any;
}[] = [];
let itemDetailEventListeners: {
  listeningElement: any;
  eventType: string;
  addedFunction: any;
}[] = [];
let itemModalEventListeners: {
  listeningElement: any;
  eventType: string;
  addedFunction: any;
}[] = [];
let craftExecuterEventListeners: {
  listeningElement: any;
  eventType: string;
  addedFunction: any;
}[] = [];
let marketBuyEventListener: {
  listeningElement: any;
  eventType: string;
  addedFunction: any;
}[] = [];
let saleModalEventListeners: {
  listeningElement: any;
  eventType: string;
  addedFunction: any;
}[] = [];
let marketItemDetailEventListeners: {
  listeningElement: any;
  eventType: string;
  addedFunction: any;
}[] = [];
let cashItemDetailEventListeners: {
  listeningElement: any;
  eventType: string;
  addedFunction: any;
}[] = [];
let cashModalEventListeners: {
  listeningElement: any;
  eventType: string;
  addedFunction: any;
}[] = [];

let loadInterval: any = null;
let reload: boolean = false;

class Creator {
  nick: string;
  level: number;
  gold: number;
  cash: number;
  marketDiscount: string;
  constructor(
    nick: string,
    level: number,
    gold: number,
    cash: number,
    marketDiscount: string
  ) {
    this.nick = nick;
    this.level = level;
    this.gold = gold;
    this.cash = cash;
    this.marketDiscount = marketDiscount;
  }
}
class Summoner {
  summonerIndex: number;
  level: number;
  grade: number;
  markGrade: number;
  rowIndex: number;
  cellIndex: number;
  constructor(
    summonerIndex: number,
    level: number,
    grade: number,
    markGrade: number
  ) {
    this.summonerIndex = summonerIndex;
    this.level = level;
    this.grade = grade;
    this.markGrade = markGrade;
    this.rowIndex = summonerIndex / 2 === Math.ceil(summonerIndex / 2) ? 6 : 0;
    this.cellIndex = Math.ceil(summonerIndex / 2) * 3 - 2;
  }
}
class Totem {
  totemIndex: number;
  level: number;
  grade: number;
  rowIndex: number;
  cellIndex: number;
  constructor(totemIndex: number, level: number, grade: number) {
    this.totemIndex = totemIndex;
    this.level = level;
    this.grade = grade;
    this.rowIndex = 3;
    this.cellIndex = totemIndex * 3 + (totemIndex <= 2 ? -2 : 1);
  }
}
class Item {
  code: string;
  itemClass: number;
  itemGrade: number;
  itemDetail: string;
  amounts: number;
  constructor(code: string, amounts: number) {
    this.code = code;
    const { itemClass, itemGrade, itemDetail } =
      splitCodeToInfoWithoutInspection(code);
    this.itemClass = itemClass;
    this.itemGrade = itemGrade;
    this.itemDetail = itemDetail;
    this.amounts = amounts;
  }
}
class Mark extends Item {
  markSpeedEnhanceGrade: number;
  markGrowthEnhanceGrade: number;
  markCreationEnhanceGrade: number;
  markFantasyEnhanceGrade: number;
  constructor(code: string, amounts: number) {
    super(code, amounts);
    const markEnhanceGradeArr = getMarkEnhanceGrade(this.itemDetail);
    this.markSpeedEnhanceGrade = markEnhanceGradeArr[0];
    this.markGrowthEnhanceGrade = markEnhanceGradeArr[1];
    this.markCreationEnhanceGrade = markEnhanceGradeArr[2];
    this.markFantasyEnhanceGrade = markEnhanceGradeArr[3];
  }
}
class SellingItem extends Item {
  itemId: number;
  saleCode: 1 | 2;
  price: number;
  constructor(
    code: string,
    amounts: number,
    itemId: number,
    saleCode: 1 | 2,
    price: number
  ) {
    super(code, amounts);
    this.itemId = itemId;
    this.saleCode = saleCode;
    this.price = price;
  }
}
// class MarketItem extends{

//   // { id,  code, amounts, price }
// }
const getCreatorInfoAtFirst = () => {
  const firstCreatorStringInfoContainer = document.querySelector(
    ".firstCreatorInfo"
  ) as HTMLDivElement;
  const firstCreatorInfo = JSON.parse(
    firstCreatorStringInfoContainer.innerText
  ) as {
    nick: string;
    level: number;
    gold: number;
    cash: number;
    marketCommisionDiscount: string;
  };
  const { nick, level, gold, cash, marketCommisionDiscount } = firstCreatorInfo;
  firstCreatorStringInfoContainer.remove();
  return new Creator(nick, level, gold, cash, marketCommisionDiscount);
};

const getSummonersInfoAtFirst = () => {
  const firstSummonersStringInfoContainer = document.querySelector(
    ".firstSummonersInfo"
  ) as HTMLDivElement;
  const firstSummonersInfo = JSON.parse(
    firstSummonersStringInfoContainer.innerText
  ) as { summonerIndex: number; level: number; grade: number; mark: number }[];
  const summoners: Summoner[] = [];
  for (const info of firstSummonersInfo) {
    const { summonerIndex, level, grade, mark } = info;
    summoners.push(new Summoner(summonerIndex, level, grade, mark));
  }
  firstSummonersStringInfoContainer.remove();
  return summoners;
};

const getTotemsInfoAtFirst = () => {
  const firstTotemsStringInfoContainer = document.querySelector(
    ".firstTotemsInfo"
  ) as HTMLDivElement;
  const firstTotemsInfo = JSON.parse(firstTotemsStringInfoContainer.innerText);
  const totems: (Totem | null)[] = [];
  for (const info of firstTotemsInfo) {
    if (info.totemIndex) {
      const { totemIndex, level, grade } = info as {
        name: string;
        totemIndex: number;
        grade: number;
        level: number;
      };
      totems.push(new Totem(totemIndex, level, grade));
    } else {
      totems.push(null);
    }
  }
  firstTotemsStringInfoContainer.remove();
  return totems;
};
const getMyItemsInfoAtFirst = () => {
  const firstMyItemsStringInfoContainer = document.querySelector(
    ".firstItemInfo"
  ) as HTMLDivElement;
  const firstMyItemsInfo = JSON.parse(
    firstMyItemsStringInfoContainer.innerText
  ) as {
    [key: string]: { amounts: number };
  }[];
  const myItems: { [key: string]: Item | Mark }[] = [
    {},
    {},
    {},
    {},
    {},
    {},
    {},
  ];
  for (const itemsDividedByClass of firstMyItemsInfo) {
    for (const code in itemsDividedByClass) {
      const { itemClass } = splitCodeToInfoWithoutInspection(code);
      const { amounts } = itemsDividedByClass[code];
      if (itemClass === 5) {
        myItems[itemClass - 1][code] = new Mark(code, amounts);
      } else {
        myItems[itemClass - 1][code] = new Item(code, amounts);
      }
    }
  }
  firstMyItemsStringInfoContainer.remove();
  return myItems;
};
const creator = getCreatorInfoAtFirst();
const summoners: Summoner[] = getSummonersInfoAtFirst();
const totems: (Totem | null)[] = getTotemsInfoAtFirst();
const myItems: { [key: string]: Item | Mark }[] = getMyItemsInfoAtFirst();
let mySellingItems: { [key: string]: SellingItem } = {};
let marketItems: { [key: string]: any }[] = [];

const testLoginInfo = (category: "nick" | "password", text: string) => {
  let tester = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/;
  switch (category) {
    case "password": {
      tester = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*()._-]{6,16}$/;
      break;
    }
  }
  return tester.test(text);
};
/* common(html) */
const alertByModal = (msg: string) => {
  alertModal.innerText = msg;
  alertModal.style.display = "flex";
  OutOfAlertModal.style.display = "flex";
};

const showLoading = () => {
  loadingShower.style.display = "flex";
  outOfLoadingShower.style.display = "flex";
  loadInterval = setInterval(() => {
    loadingShower.innerText =
      loadingShower.innerText === "로딩 중..."
        ? "로딩 중."
        : loadingShower.innerText + ".";
  }, 100);
};

const stopLoading = () => {
  loadingShower.style.display = "none";
  outOfLoadingShower.style.display = "none";
  clearInterval(loadInterval);
  loadInterval = null;
};

const renderExpBar = (container: Element) => {
  const expInfo = container.querySelector(".expInfo") as HTMLDivElement;
  const expBar = container.querySelector(".expBar") as HTMLDivElement;
  const expInfoText = expInfo.innerText;
  const expPercent = Number(
    expInfoText.slice(expInfoText.indexOf("(") + 1, expInfoText.indexOf("%"))
  );
  expBar.style.width = expPercent > 100 ? "100%" : `${expPercent}%`;
};
const putInItemContainer = (
  container: HTMLDivElement,
  code: string,
  amounts: number
) => {
  const { itemGrade } = splitCodeToInfoWithoutInspection(code);
  const itemCodeContainer = container.querySelector(
    ".itemCode"
  ) as HTMLSpanElement;
  const itemGradeContainer = container.querySelector(
    ".itemContainer_itemGrade"
  ) as HTMLSpanElement;
  const itemImg = container.querySelector(
    ".itemContainer_itemImg"
  ) as HTMLImageElement;
  const itemAmounts = container.querySelector(
    ".itemContainer_itemAmounts"
  ) as HTMLSpanElement;
  itemCodeContainer.innerText = code;
  itemGradeContainer.innerText = changeNumToRome(itemGrade)!;
  itemImg.src = getItemImgSrc(code);
  itemAmounts.innerText = amounts.toString();
};
const eraseItemContainer = (container: HTMLDivElement) => {
  const spanChildren = container.querySelectorAll("span");
  for (const spanChild of spanChildren) {
    spanChild.innerText = "";
  }
  const inputChildren = container.querySelectorAll("input");
  for (const inputChild of inputChildren) {
    inputChild.value = "";
    if (inputChild.type === "number") {
      inputChild.max = "";
    }
  }
  const imgChild = container.querySelector("img");
  if (imgChild) {
    imgChild.src = "/images/noImg.png";
  }
};
const resetItemContainers = (itemClass: number) => {
  const targetItemPartInventories = itemPartInventories[itemClass - 1];
  const targetMarketPartInventories = marketPartInventories[itemClass - 1];
  const itemPartContainers = targetItemPartInventories.querySelectorAll(
    ".itemContainer"
  ) as NodeListOf<HTMLDivElement>;
  const marketPartContainers = targetMarketPartInventories.querySelectorAll(
    ".itemContainer"
  ) as NodeListOf<HTMLDivElement>;
  itemPartContainers.forEach((container) => {
    eraseItemContainer(container);
  });
  marketPartContainers.forEach((container) => {
    eraseItemContainer(container);
  });
};
const renderItems = (itemClass: number) => {
  const targetItemContainers = itemPartInventories[
    itemClass - 1
  ].querySelectorAll(".itemContainer") as NodeListOf<HTMLDivElement>;
  const targetSaleItemContainers = marketPartInventories[
    itemClass - 1
  ].querySelectorAll(".itemContainer") as NodeListOf<HTMLDivElement>;
  const targetClass = myItems[itemClass - 1];
  let i = 0;
  for (const code in targetClass) {
    putInItemContainer(
      targetItemContainers[i],
      code,
      targetClass[code].amounts
    );
    putInItemContainer(
      targetSaleItemContainers[i],
      code,
      targetClass[code].amounts
    );
    i++;
  }
};
const showItemInfo =
  (part: "item" | "market" | "cash") => (event: MouseEvent) => {
    const itemContainer = event.currentTarget as HTMLDivElement;
    const codeContainer = itemContainer.querySelector(
      ".itemCode"
    ) as HTMLSpanElement;
    const itemCode = codeContainer.innerText;
    if (!itemCode) {
      return;
    }
    const partIndex = ["item", "market", "cash"].indexOf(part);
    let targetEventListeners =
      partIndex === 0
        ? itemDetailEventListeners
        : partIndex === 1
        ? marketItemDetailEventListeners
        : cashItemDetailEventListeners;
    const targetPart =
      partIndex === 0 ? itemPart : partIndex === 1 ? marketPart : cashPart;
    const targetDetailContainer =
      partIndex === 0
        ? itemDetailContainer
        : partIndex === 1
        ? marketItemDetailContainer
        : cashItemDetailContainer;
    targetEventListeners.forEach((obj) => {
      const { listeningElement, eventType, addedFunction } = obj;
      listeningElement.removeEventListener(eventType, addedFunction);
    });
    const itemPartRect = targetPart.getBoundingClientRect();
    const clientRect = itemContainer.getBoundingClientRect();
    let coordX =
      ((clientRect.x + clientRect.width * 0.5 - itemPartRect.x) /
        itemPartRect.width) *
      100;
    let coordY =
      ((clientRect.y + clientRect.height * 0.5 - itemPartRect.y) /
        itemPartRect.height) *
      100;
    if (clientRect.x > itemPartRect.width * 0.8) {
      coordX -= 18.8;
    }
    if (clientRect.y > itemPartRect.top + itemPartRect.height * 0.5) {
      coordY -= 35.71;
    }
    targetDetailContainer.style.left = `${coordX}%`;
    targetDetailContainer.style.top = `${coordY}%`;
    let itemCodeContainer = itemDetailCodeContainer;
    let itemNameContainer = itemDetailNameContainer;
    let itemClassContainer = itemDetailClassContainer;
    let itemDescriptionContainer = itemDetailDescriptionContainer;
    let itemExecuteBtn = itemDetailExecuteBtn;
    switch (partIndex) {
      case 0: {
        itemDetailEventListeners = [];
        break;
      }
      case 1: {
        marketItemDetailEventListeners = [];
        itemCodeContainer = marketItemDetailCodeContainer;
        itemNameContainer = marketItemDetailNameContainer;
        itemClassContainer = marketItemDetailClassContainer;
        itemDescriptionContainer = marketItemDetailDescriptionContainer;
        itemExecuteBtn = marketItemDetailExecuteBtn;
        break;
      }
      case 2: {
        cashItemDetailEventListeners = [];
        itemCodeContainer = cashItemDetailCodeContainer;
        itemNameContainer = cashItemDetailNameContainer;
        itemClassContainer = cashItemDetailClassContainer;
        itemDescriptionContainer = cashItemDetailDescriptionContainer;
        itemExecuteBtn = cashItemDetailExecuteBtn;
        break;
      }
    }
    const { itemClass, itemGrade, itemDetail } =
      splitCodeToInfoWithoutInspection(itemCode);
    const itemNameInfo = getNameInfoByCode(itemCode)!;
    const markEnhanceGradeArr = getMarkEnhanceGrade(itemDetail);
    itemCodeContainer.innerText = itemCode;
    itemNameContainer.innerHTML = `${
      itemGrade ? `[${changeNumToRome(itemGrade)}]` : ""
    } ${itemNameInfo.korName}${
      itemClass === 5
        ? ` <span>+${
            markEnhanceGradeArr[0] +
            markEnhanceGradeArr[1] +
            markEnhanceGradeArr[2] +
            markEnhanceGradeArr[3]
          }</span>`
        : ""
    }`;
    itemClassContainer.innerText = `분류: ${
      ["원소", "힘", "목재", "축복", "문양", "조합서", "기타"][itemClass - 1]
    }`;
    itemDescriptionContainer.innerText = `설명: ${itemNameInfo.description}`;
    itemExecuteBtn.style.display = "flex";
    switch (partIndex) {
      case 0: {
        const itemDetailNumber = Number(itemDetail);
        if (
          (itemClass === 3 && itemDetailNumber === 0) ||
          [4, 5].includes(itemClass) ||
          (itemClass === 6 && itemDetailNumber !== 0) ||
          (itemClass === 7 && [2, 4].includes(itemDetailNumber))
        ) {
          itemExecuteBtn.innerText =
            itemClass === 5
              ? "장착"
              : itemClass === 6 || (itemClass === 3 && itemDetailNumber === 0)
              ? "분해"
              : "사용";
        } else {
          itemExecuteBtn.style.display = "none";
        }
        break;
      }
      case 1: {
        const idContainer = itemContainer.querySelector(
          ".itemId"
        ) as HTMLSpanElement | null;
        marketItemDetailIdContainer.innerText = idContainer
          ? idContainer.innerText
          : "";
        const itemSaleCodeContainer = itemContainer.querySelector(
          ".itemSaleCode"
        ) as HTMLSpanElement | null;
        if (itemSaleCodeContainer) {
          const itemSaleCode = Number(itemSaleCodeContainer.innerText);
          itemExecuteBtn.innerText =
            itemSaleCode === 1 ? "판매 취소" : "판매금 수령";
        } else {
          itemExecuteBtn.innerText = "판매";
        }
        break;
      }
      case 2: {
        itemExecuteBtn.innerText = "구매";
        break;
      }
    }
    targetDetailContainer.style.display = "flex";
  };
const removeItemDetail = (part: "item" | "market" | "cash") => () => {
  const partIndex = ["item", "market", "cash"].indexOf(part);
  const targetDetailContainer =
    partIndex === 0
      ? itemDetailContainer
      : partIndex === 1
      ? marketItemDetailContainer
      : cashItemDetailContainer;
  targetDetailContainer.style.display = "none";
};
const clickDetailExecuteBtn = (part: "item" | "market" | "cash") => () => {
  let code = itemDetailCodeContainer.innerText;
  switch (part) {
    case "item": {
      openItemMenu(code);
      return;
    }
    case "market": {
      code = marketItemDetailCodeContainer.innerText;
      const itemIdText = marketItemDetailIdContainer.innerText;
      if (itemIdText) {
        const itemId = Number(itemIdText);
        const item = mySellingItems[itemId];
        if (item.saleCode === 1) {
          openSaleCancelMenu(code, itemId);
          return;
        }
        openSaleCompleteMenu(code, itemId);
        return;
      }
      openSaleMenu(code);
      return;
    }
    case "cash": {
      code = cashItemDetailCodeContainer.innerText;
      openCashMenu(code);
      return;
    }
  }
};
/* try catch 복붙
try {
try{

}catch(err:any){
  throw new Error(err)
}
} catch (err: any) {
  // dev
  // 
  reload = true;
  alertByModal("오류가 발생하여 재접속합니다.");
}
*/

/* HomePart */
const getSummonerInZone = (summonerIndex: number) => {
  const { rowIndex, cellIndex } = summoners[summonerIndex - 1];
  const summonerInZone = homePart.children[rowIndex].children[
    cellIndex
  ].querySelector(".homePart_summonerImg") as HTMLImageElement;
  return summonerInZone;
};
const getTotemInZone = (totemIndex: number) => {
  const { rowIndex, cellIndex } = totems[totemIndex - 1]!;
  const totemInZone = homePart.children[rowIndex].children[
    cellIndex
  ].querySelector(".homePart_totemImg") as HTMLImageElement;
  return totemInZone;
};
const changeSummonerInZone = (summonerIndex: number): void => {
  const summonerInZone = getSummonerInZone(summonerIndex);
  const { grade, markGrade } = summoners[summonerIndex - 1];
  summonerInZone.src = `/images/summoner/summoner${grade}_${markGrade}.png`;
};
const changeTotemInZone = (totemIndex: number): void => {
  const totemInZone = getTotemInZone(totemIndex);
  const { grade } = totems[totemIndex - 1] as Totem;
  totemInZone.src = `/images/totem/${
    ["jaguar", "bear", "eagle", "owl"][totemIndex - 1]
  }_totem${grade}.png`;
};
homePartSummonerImgs.forEach((img, index) => {
  const summonerIndex = index < 5 ? 2 * index + 1 : 2 * index - 8;
  const openSummonerMenuFunc = () => openSummonerMenu(summonerIndex);
  img.addEventListener("click", openSummonerMenuFunc);
});
homePartTotemImgs.forEach((img, index) => {
  const totemIndex = index + 1;
  const openTotemMenuFunc = () => openTotemMenu(totemIndex);
  img.addEventListener("click", openTotemMenuFunc);
});
const resetHomeModal = () => {
  homeModalEventListeners.forEach((obj) => {
    const { listeningElement, eventType, addedFunction } = obj;
    listeningElement.removeEventListener(eventType, addedFunction);
  });
  homeModalEventListeners = [];
  if (summonBtn.style.display === "none") {
    summonBtn.style.display = "block";
  }
  if (awakenBtn.style.display === "none") {
    awakenBtn.style.display = "block";
  }
  if (homeModal.classList.contains("bigHomeModal")) {
    homeModal.classList.remove("bigHomeModal");
    homeModalFirstMain.classList.remove("bigHomeModal_main");
    homeModalSecondMain.style.display = "none";
    summonBtn.classList.remove("bigHomeModal_btn");
    awakenBtn.classList.remove("bigHomeModal_btn");
  }
};
const openSummonerMenu = async (summonerIndex: number) => {
  try {
    if (loadInterval) {
      return;
    }
    showLoading();
    const res = await axios.post(`/summoner/${summonerIndex}`);
    const { data } = res;
    const { fatal } = data;
    if (fatal) {
      throw new Error("fatal error");
    } else if (fatal === false) {
      throw new Error("error");
    }
    resetHomeModal();
    if (data.info === "noSummoner") {
      homeModalImg.src = "/images/summoner/noSummoner.png";
      homeModalName.innerText = `소환사 ${changeNumToRome(summonerIndex)}`;
      homeModalLevelAndGrade.innerText = "";
      homeModalExpContainer.style.border = "none";
      homeModalExpInfo.innerText = "";
      homeModalExpBar.style.width = "0%";
      homeModalFirstInfo.innerText = `창조자 LV. ${
        (summonerIndex - 1) * 10 + 1
      } 이상일 때, 창조 가능`;
      homeModalSecondInfo.innerText = "";
      summonBtn.innerHTML = "창조<br><span>(창조의 숨결 1개 소모)</span>";
      const createSummonerFunc = createSummoner(summonerIndex);
      homeModalEventListeners.push({
        listeningElement: summonBtn,
        eventType: "click",
        addedFunction: createSummonerFunc,
      });
      summonBtn.addEventListener("click", createSummonerFunc);
      awakenBtn.style.display = "none";
    } else {
      const {
        level,
        exp,
        expPercent,
        grade,
        cooltime,
        summonCounter,
        mark,
        blessData,
      } = data;
      summoners[summonerIndex - 1].level = level;
      summoners[summonerIndex - 1].grade = grade;
      if (mark !== "0") {
        const markInfo = splitCodeToInfoWithoutInspection(mark);
        const markGrade = markInfo.itemGrade;
        const markDetail = markInfo.itemDetail;
        const speedEnhanceGrade = Number(markDetail[0]);
        const growthEnhanceGrade = Number(markDetail[1]);
        const creationEnhanceGrade = Number(markDetail[2]);
        const fantasyEnhanceGrade = Number(markDetail[3]);
        homeModalMarkInfo.innerText = `소환 쿨타임 -${
          markGrade * 3 - 2 + Math.round(speedEnhanceGrade * 4) / 10
        }%\n경험치 획득 +${
          markGrade * 6 - 4 + Math.round(growthEnhanceGrade * 8) / 10
        }%\n창조의 파편 획득률 +${
          markGrade * 9 - 6 + Math.round(creationEnhanceGrade * 12) / 10
        }%\n소환 기준 레벨 +${
          markGrade * 1.5 - 1 + Math.round(fantasyEnhanceGrade * 2) / 10
        }`;
        homeModalImg.src = `/images/summoner/summoner${grade}_${markGrade}.png`;
        homeModalMarkImg.src = getItemImgSrc(mark);
      } else {
        homeModalMarkInfo.innerText =
          "소환 쿨타임 -0%\n경험치 획득 +0%\n창조의 파편 획득률 +0%\n소환 기준 레벨 +0";
        homeModalImg.src = `/images/summoner/summoner${grade}_0.png`;
        homeModalMarkImg.src = "/images/item/noMark.png";
      }
      homeModal.classList.add("bigHomeModal");
      homeModalFirstMain.classList.add("bigHomeModal_main");
      homeModalSecondMain.style.display = "flex";
      homeModalName.innerText = `소환사 ${changeNumToRome(summonerIndex)}`;
      homeModalLevelAndGrade.innerText = `LV. ${level} (${
        grade === 0 ? "미각성" : `각성 ${changeNumToRome(grade)}`
      })`;
      homeModalExpContainer.style.border = "";
      homeModalExpInfo.innerText = `${Number(
        exp
      ).toLocaleString()} (${expPercent}%)`;
      renderExpBar(homeModalExpContainer);
      homeModalFirstInfo.innerText = `소환 쿨타임: ${cooltime}초`;
      homeModalSecondInfo.innerText =
        grade === 5
          ? "최대 각성"
          : `각성 조건: 소환사 LV. ${[30, 50, 65, 75, 90][grade]}`;
      summonBtn.innerHTML = `소환<br><span>(${Number(
        summonCounter
      ).toLocaleString()})</span>`;
      summonBtn.classList.add("bigHomeModal_btn");
      const summonItemFunc = summonItem(summonerIndex);
      homeModalEventListeners.push({
        listeningElement: summonBtn,
        eventType: "click",
        addedFunction: summonItemFunc,
      });
      summonBtn.addEventListener("click", summonItemFunc);
      if (grade === 5) {
        awakenBtn.style.display = "none";
      } else {
        awakenBtn.innerHTML = `각성<br><span>(창조의 숨결 ${
          [10, 20, 40, 80, 200][grade]
        }개 소모)</span>`;
        const awakenSummonerFunc = awakenSummoner(summonerIndex);
        homeModalEventListeners.push({
          listeningElement: awakenBtn,
          eventType: "click",
          addedFunction: awakenSummonerFunc,
        });
        awakenBtn.addEventListener("click", awakenSummonerFunc);
        awakenBtn.classList.add("bigHomeModal_btn");
      }
      homeModalEventListeners.push({
        listeningElement: homeModalMarkImg,
        eventType: "click",
        addedFunction: clickImgInHomeModal,
      });
      homeModalMarkImg.addEventListener("click", clickImgInHomeModal);
      const blessInfo: number[] = [];
      (blessData as []).forEach(
        (
          bless: {
            grade: number;
            endtime: number;
            effect: number;
            onlyEffect: number;
          },
          index
        ) => {
          const blessGrade = bless.grade;
          const blessEndtime = bless.endtime;
          const blessImg = [
            homeModalBlessOfSpeedImg,
            homeModalBlessOfGrowthImg,
            homeModalBlessOfCreationImg,
            homeModalBlessOfFantasyImg,
          ][index];
          blessImg.src = !blessGrade
            ? "/images/item/noBless.png"
            : getItemImgSrc(`4_${blessGrade}_${index + 1}`);
          if (blessGrade) {
            blessImg.style.opacity = `${
              0.5 +
              (blessEndtime - new Date().getTime()) /
                (2 * blessGrade * 1000 * 60 * 144)
            }`;
          }
          blessInfo.push(blessGrade);
        }
      );
      homeModalBlessInfo.innerText = `소환 쿨타임 -${
        blessInfo[0] * 3
      }%\n경험치 획득 +${blessInfo[1] * 6}%\n창조의 파편 획득률 +${
        blessInfo[2] * 9
      }%\n소환 기준 레벨 +${Math.round(blessInfo[3] * 15) / 10}`;
    }
    homeModal.style.display = "flex";
    OutOfHomeModal.style.display = "block";
    summonBtn.focus();
    stopLoading();
  } catch (err: any) {
    stopLoading();
    reload = true;
    alertByModal(
      err.message === "fatal error"
        ? "오류가 발생하여 재접속합니다.\n오류 조사를 위해 해당 계정이 일시적으로 정지될 수 있으니 양해 부탁드립니다."
        : "오류가 발생하여 재접속합니다."
    );
  }
};
const createSummoner = (summonerIndex: number) => async () => {
  try {
    if (loadInterval) {
      return;
    }
    if (creator.level < (summonerIndex - 1) * 10 + 1) {
      alertByModal("창조자 LV 부족!");
      return;
    }
    if (!summoners.length && summonerIndex !== 1) {
      alertByModal("소환사 창조는 단계적으로 진행!");
      return;
    }
    if (summoners.length) {
      const lastSummoner = summoners[summoners.length - 1];
      if (lastSummoner.summonerIndex !== summonerIndex - 1) {
        alertByModal("소환사 창조는 단계적으로 진행!");
        return;
      }
    }
    const breatheOfCreationAmounts = checkItemAmounts("7_0_1");
    if (breatheOfCreationAmounts < 1) {
      alertByModal("창조의 숨결 부족!");
      return;
    }
    showLoading();
    const res = await axios.post(`/summoner/create/${summonerIndex}`);
    const { data } = res;
    const { fatal } = data;
    if (fatal) {
      throw new Error("fatal error");
    } else if (fatal === false) {
      throw new Error("error");
    }
    const summoner = new Summoner(summonerIndex, 1, 0, 0);
    summoners.push(summoner);
    changeItemAmounts("7_0_1", -1);
    changeSummonerInZone(summonerIndex);
    stopLoading();
    openSummonerMenu(summonerIndex);
  } catch (err: any) {
    stopLoading();
    reload = true;
    alertByModal(
      err.message === "fatal error"
        ? "오류가 발생하여 재접속합니다.\n오류 조사를 위해 해당 계정이 일시적으로 정지될 수 있으니 양해 부탁드립니다."
        : "오류가 발생하여 재접속합니다."
    );
  }
};
const awakenSummoner = (summonerIndex: number) => async () => {
  try {
    if (loadInterval) {
      return;
    }
    const summoner = summoners[summonerIndex - 1];
    if (
      !(summoner.grade === 0 && summoner.level === 30) &&
      !(summoner.grade === 1 && summoner.level === 50) &&
      !(summoner.grade === 2 && summoner.level === 65) &&
      !(summoner.grade === 3 && summoner.level === 75) &&
      !(summoner.grade === 4 && summoner.level === 90)
    ) {
      alertByModal("해당 소환사 LV 부족!");
      return;
    }
    const breatheOfCreationAmounts = checkItemAmounts("7_0_1");
    if (breatheOfCreationAmounts < [10, 20, 40, 80, 200][summoner.grade]) {
      alertByModal("창조의 숨결 부족!");
      return;
    }
    showLoading();
    const res = await axios.post(`/summoner/awaken/${summonerIndex}`);
    const { data } = res;
    const { fatal } = data;
    if (fatal) {
      throw new Error("fatal error");
    } else if (fatal === false) {
      throw new Error("error");
    }
    const { level, grade, neededBreathe } = data;
    summoner.level = level;
    summoner.grade = grade;
    changeItemAmounts("7_0_1", -neededBreathe);
    changeSummonerInZone(summonerIndex);
    stopLoading();
    openSummonerMenu(summonerIndex);
  } catch (err: any) {
    stopLoading();
    reload = true;
    alertByModal(
      err.message === "fatal error"
        ? "오류가 발생하여 재접속합니다.\n오류 조사를 위해 해당 계정이 일시적으로 정지될 수 있으니 양해 부탁드립니다."
        : "오류가 발생하여 재접속합니다."
    );
  }
};
const summonItem = (summonerIndex: number) => async () => {
  try {
    if (loadInterval) {
      return;
    }
    showLoading();
    homeModal.style.display = "none";
    OutOfHomeModal.style.display = "none";
    const res = await axios.post(`/summoner/summon/${summonerIndex}`);
    const { data } = res;
    const { fatal } = data;
    if (fatal) {
      throw new Error("fatal error");
    } else if (fatal === false) {
      throw new Error("error");
    }
    if (data.info === "noSummonCounter") {
      stopLoading();
      alertByModal("소환 가능 횟수 X!");
      return;
    }
    const { gold, creatorLevelExpInfo, summonerLevel, totemsLevel, items } =
      data;
    updateCreatorGold(gold);
    creator.level = creatorLevelExpInfo.level;
    updateCreatorLevelExp(creatorLevelExpInfo.exp);
    summoners[summonerIndex - 1].level = summonerLevel;
    for (let i = 0; i < totems.length; i++) {
      const totem = totems[i];
      if (totem) {
        totem.level = totemsLevel[i];
      }
    }
    showItemsAmountsChange(items as { [key: string]: number });
  } catch (err: any) {
    stopLoading();
    reload = true;
    alertByModal(
      err.message === "fatal error"
        ? "오류가 발생하여 재접속합니다.\n오류 조사를 위해 해당 계정이 일시적으로 정지될 수 있으니 양해 부탁드립니다."
        : "오류가 발생하여 재접속합니다."
    );
  }
};
const clickImgInHomeModal = async (event: MouseEvent) => {
  try {
    if (loadInterval) {
      return;
    }
    const target = event.currentTarget as HTMLImageElement;
    if (target.src.includes("noMark")) {
      footerBtns[1].click();
      itemPartNavBtns[4].click();
      return;
    }
    if (target.src.includes("noBless")) {
      footerBtns[1].click();
      itemPartNavBtns[3].click();
      return;
    }
    if (!target.src.includes("mark_of_summoner")) {
      return;
    }
    const summonerIndex = changeRomeToNum(homeModalName.innerText.slice(4));
    if (summonerIndex === null) {
      throw new Error("error");
    }
    showLoading();
    const res = await axios.post(`/summoner/unequip/${summonerIndex}`);
    const { data } = res;
    const { fatal } = data;
    if (fatal) {
      throw new Error("fatal error");
    } else if (fatal === false) {
      throw new Error("error");
    }
    summoners[summonerIndex - 1].markGrade = 0;
    changeItemAmounts(data.mark, 1);
    changeSummonerInZone(summonerIndex);
    stopLoading();
    openSummonerMenu(summonerIndex);
  } catch (err: any) {
    stopLoading();
    reload = true;
    alertByModal(
      err.message === "fatal error"
        ? "오류가 발생하여 재접속합니다.\n오류 조사를 위해 해당 계정이 일시적으로 정지될 수 있으니 양해 부탁드립니다."
        : "오류가 발생하여 재접속합니다."
    );
  }
};
const openTotemMenu = async (totemIndex: number) => {
  try {
    showLoading();
    const res = await axios.post(`/totem/${totemIndex}`);
    const { data } = res;
    const { fatal } = data;
    if (fatal) {
      throw new Error("fatal error");
    } else if (fatal === false) {
      throw new Error("error");
    }
    resetHomeModal();
    summonBtn.style.display = "none";
    homeModalName.innerText = `${
      ["재규어", "곰", "독수리", "올빼미"][totemIndex - 1]
    } 토템`;
    if (data.info === "noTotem") {
      homeModalImg.src = "/images/totem/noTotem.png";
      homeModalLevelAndGrade.innerText = "";
      homeModalExpContainer.style.border = "none";
      homeModalExpInfo.innerText = "";
      homeModalExpBar.style.width = "0%";
      homeModalFirstInfo.innerText = `[I] ${
        ["재규어", "곰", "독수리", "올빼미"][totemIndex - 1]
      } 토템 몸체 1개 필요`;
      homeModalSecondInfo.innerText = "";
      awakenBtn.innerHTML = "창조<br><span>(창조의 숨결 1개 소모)</span>";
      const createTotemFunc = createTotem(totemIndex);
      homeModalEventListeners.push({
        listeningElement: awakenBtn,
        eventType: "click",
        addedFunction: createTotemFunc,
      });
      awakenBtn.addEventListener("click", createTotemFunc);
    } else {
      const { level, exp, expPercent, grade } = data;
      homeModalImg.src = `/images/totem/${
        ["jaguar", "bear", "eagle", "owl"][totemIndex - 1]
      }_totem${grade}.png`;
      homeModalLevelAndGrade.innerText = `LV. ${level} (${
        grade === 0 ? "미각성" : `각성 ${changeNumToRome(grade)}`
      })`;
      homeModalExpContainer.style.border = "";
      homeModalExpInfo.innerText = `${Number(
        exp
      ).toLocaleString()} (${expPercent}%)`;
      renderExpBar(homeModalExpContainer);
      const totemEffect = (level * [30, 60, 90, 15][totemIndex - 1]) / 100;
      homeModalFirstInfo.innerText = [
        `소환 쿨타임 -${totemEffect}%`,
        `경험치 획득 +${totemEffect}%`,
        `창조의 파편 획득률 +${totemEffect}%`,
        `소환 기준 레벨 +${totemEffect}`,
      ][totemIndex - 1];
      homeModalSecondInfo.innerText =
        grade === 9
          ? "최대 각성"
          : `각성 조건: 토템 LV. ${(grade + 1) * 10}, [${changeNumToRome(
              grade + 2
            )}] ${
              ["재규어", "곰", "독수리", "올빼미"][totemIndex - 1]
            } 토템 몸체 필요`;
      if (grade === 9) {
        awakenBtn.style.display = "none";
      } else {
        awakenBtn.innerHTML = `각성<br><span>(창조의 숨결 ${
          (grade + 1) * 10
        }개 소모)</span>`;
        const awakenTotemFunc = awakenTotem(totemIndex);
        homeModalEventListeners.push({
          listeningElement: awakenBtn,
          eventType: "click",
          addedFunction: awakenTotemFunc,
        });
        awakenBtn.addEventListener("click", awakenTotemFunc);
      }
    }
    homeModal.style.display = "flex";
    OutOfHomeModal.style.display = "block";
    awakenBtn.focus();
    stopLoading();
  } catch (err: any) {
    stopLoading();
    reload = true;
    alertByModal(
      err.message === "fatal error"
        ? "오류가 발생하여 재접속합니다.\n오류 조사를 위해 해당 계정이 일시적으로 정지될 수 있으니 양해 부탁드립니다."
        : "오류가 발생하여 재접속합니다."
    );
  }
};
const createTotem = (totemIndex: number) => async () => {
  try {
    if (loadInterval) {
      return;
    }
    const breatheOfCreationAmounts = checkItemAmounts("7_0_1");
    const totemBody = checkItemAmounts(`3_1_${totemIndex}`);
    if (breatheOfCreationAmounts < 1 || totemBody < 1) {
      alertByModal("창조 재료 부족!");
      return;
    }
    showLoading();
    const res = await axios.post(`/totem/create/${totemIndex}`);
    const { data } = res;
    const { fatal } = data;
    if (fatal) {
      throw new Error("fatal error");
    } else if (fatal === false) {
      throw new Error("error");
    }
    totems[totemIndex - 1] = new Totem(totemIndex, 1, 0);
    changeItemAmounts("7_0_1", -1);
    changeItemAmounts(`3_1_${totemIndex}`, -1);
    changeTotemInZone(totemIndex);
    stopLoading();
    openTotemMenu(totemIndex);
  } catch (err: any) {
    stopLoading();
    reload = true;
    alertByModal(
      err.message === "fatal error"
        ? "오류가 발생하여 재접속합니다.\n오류 조사를 위해 해당 계정이 일시적으로 정지될 수 있으니 양해 부탁드립니다."
        : "오류가 발생하여 재접속합니다."
    );
  }
};
const awakenTotem = (totemIndex: number) => async () => {
  try {
    if (loadInterval) {
      return;
    }
    const totem = totems[totemIndex - 1] as Totem;
    if (
      !(totem.grade === 0 && totem.level === 10) &&
      !(totem.grade === 1 && totem.level === 20) &&
      !(totem.grade === 2 && totem.level === 30) &&
      !(totem.grade === 3 && totem.level === 40) &&
      !(totem.grade === 4 && totem.level === 50) &&
      !(totem.grade === 5 && totem.level === 60) &&
      !(totem.grade === 6 && totem.level === 70) &&
      !(totem.grade === 7 && totem.level === 80) &&
      !(totem.grade === 8 && totem.level === 90)
    ) {
      alertByModal("해당 토템 LV 부족!");
      return;
    }
    const breatheOfCreationAmounts = checkItemAmounts("7_0_1");
    const totemBodyCode = `3_${totem.grade + 2}_${totemIndex}`;
    const totemBodyAmounts = checkItemAmounts(totemBodyCode);
    if (
      breatheOfCreationAmounts < (totem.grade + 1) * 10 ||
      totemBodyAmounts < 1
    ) {
      alertByModal("각성 재료 부족!");
      return;
    }
    showLoading();
    const res = await axios.post(`/totem/awaken/${totemIndex}`);
    const { data } = res;
    const { fatal } = data;
    if (fatal) {
      throw new Error("fatal error");
    } else if (fatal === false) {
      throw new Error("error");
    }
    const { level, grade, neededBreathe } = data;
    totem.level = level;
    totem.grade = grade;
    changeItemAmounts("7_0_1", -neededBreathe);
    changeItemAmounts(totemBodyCode, -1);
    changeTotemInZone(totemIndex);
    stopLoading();
    openTotemMenu(totemIndex);
  } catch (err: any) {
    stopLoading();
    reload = true;
    alertByModal(
      err.message === "fatal error"
        ? "오류가 발생하여 재접속합니다.\n오류 조사를 위해 해당 계정이 일시적으로 정지될 수 있으니 양해 부탁드립니다."
        : "오류가 발생하여 재접속합니다."
    );
  }
};

/* ItemPart */
const openItemInventory = (event: MouseEvent) => {
  if (loadInterval) {
    return;
  }
  itemDetailContainer.style.display = "none";
  itemPartInventories.forEach((inventory) => {
    inventory.style.display = "none";
  });
  const btnIndex = Array.from(itemPartNavBtns).indexOf(
    event.currentTarget as HTMLButtonElement
  );
  itemPartInventories[btnIndex].style.display = "flex";
};
const showItemsAmountsChange = (items: { [key: string]: number }) => {
  for (const code in items) {
    const { itemClass } = splitCodeToInfoWithoutInspection(code);
    const targetClass = myItems[itemClass - 1];
    const amounts = items[code];
    if (targetClass[code]) {
      targetClass[code].amounts += amounts;
    } else if (itemClass === 5) {
      targetClass[code] = new Mark(code, amounts);
    } else {
      targetClass[code] = new Item(code, amounts);
    }
  }
  for (let i = 0; i < myItems.length; i++) {
    myItems[i] = sortItems(myItems[i]);
    resetItemContainers(i + 1);
    renderItems(i + 1);
  }
  stopLoading();
  footerBtns[1].click();
  itemPartNavBtns[0].click();
};
const chooseSummonerInItemModal = (event: MouseEvent) => {
  const chosenSummonerContainers = itemModal.querySelectorAll(
    ".chosenSummonerContainer"
  );
  const chosenSummonerImgs = itemModal.querySelectorAll(".chosenSummonerImg");
  chosenSummonerContainers.forEach((container) => {
    container.classList.remove("chosenSummonerContainer");
  });
  chosenSummonerImgs.forEach((img) => {
    img.classList.remove("chosenSummonerImg");
  });
  const target = event.currentTarget as HTMLDivElement;
  const img = target.querySelector(".itemModal_smallImg") as HTMLImageElement;
  target.classList.add("chosenSummonerContainer");
  img.classList.add("chosenSummonerImg");
};
const blessSummoner = (code: string) => async () => {
  try {
    if (loadInterval) {
      return;
    }
    showLoading();
    const chosenSummonerImg = itemModal.querySelector(".chosenSummonerImg");
    if (!chosenSummonerImg) {
      stopLoading();
      alertByModal("대상 지정 필요!");
      return;
    }
    const summonerIndex =
      Array.from(itemModal.querySelectorAll(".itemModal_smallImg")).indexOf(
        chosenSummonerImg
      ) + 1;
    const blessAmounts = checkItemAmounts(code);
    let setAmounts = 1;
    const { itemDetail } = splitCodeToInfoWithoutInspection(code);
    const itemDetailNumber = Number(itemDetail);
    if ([5, 6, 7].includes(itemDetailNumber)) {
      setAmounts = Number(itemModalAmountsSetter.value);
      if (!Number.isInteger(setAmounts) || setAmounts < 1) {
        stopLoading();
        alertByModal("수량 입력 오류!");
        return;
      }
    }
    if (setAmounts > blessAmounts) {
      stopLoading();
      alertByModal("해당 축복 수량 부족!");
      return;
    }
    itemModal.style.display = "none";
    OutOfItemModal.style.display = "none";
    const res = await axios.post(`/summoner/bless/${summonerIndex}`, {
      code,
      blessAmounts: setAmounts,
    });
    const { data } = res;
    const { fatal } = data;
    if (fatal) {
      throw new Error("fatal error");
    } else if (fatal === false) {
      throw new Error("error");
    }
    const {
      items,
      fragmentOfCreation,
      creatorLevelExpInfo,
      summonerLevelInfo,
      totemsLevelInfo,
    } = data;
    changeItemAmounts(code, -setAmounts);
    if (items) {
      stopLoading();
      showItemsAmountsChange(items);
      return;
    }
    if (fragmentOfCreation || fragmentOfCreation === 0) {
      stopLoading();
      if (fragmentOfCreation) {
        showItemsAmountsChange({ "7_0_0": fragmentOfCreation });
      }
      return;
    }
    if (creatorLevelExpInfo && summonerLevelInfo && totemsLevelInfo) {
      creator.level = creatorLevelExpInfo.level;
      updateCreatorLevelExp(creatorLevelExpInfo.exp);
      summoners[summonerIndex - 1].level = summonerLevelInfo.level;
      for (const totem of totems) {
        if (totem) {
          totem.level = totemsLevelInfo[totem.totemIndex - 1].level;
        }
      }
    }
    stopLoading();
  } catch (err: any) {
    stopLoading();
    reload = true;
    alertByModal(
      err.message === "fatal error"
        ? "오류가 발생하여 재접속합니다.\n오류 조사를 위해 해당 계정이 일시적으로 정지될 수 있으니 양해 부탁드립니다."
        : "오류가 발생하여 재접속합니다."
    );
  }
};
const equipMark = (code: string) => async () => {
  try {
    if (loadInterval) {
      return;
    }
    showLoading();
    const chosenSummonerImg = itemModal.querySelector(".chosenSummonerImg");
    if (!chosenSummonerImg) {
      stopLoading();
      alertByModal("대상 지정 필요!");
      return;
    }
    const summonerIndex =
      Array.from(itemModal.querySelectorAll(".itemModal_smallImg")).indexOf(
        chosenSummonerImg
      ) + 1;
    itemModal.style.display = "none";
    OutOfItemModal.style.display = "none";
    const res = await axios.post(`/summoner/mark/${summonerIndex}`, { code });
    const { data } = res;
    const { fatal } = data;
    if (fatal) {
      throw new Error("fatal error");
    } else if (fatal === false) {
      throw new Error("error");
    }
    changeItemAmounts(code, -1);
    summoners[summonerIndex - 1].markGrade =
      splitCodeToInfoWithoutInspection(code).itemGrade;
    changeSummonerInZone(summonerIndex);
    stopLoading();
    footerBtns[0].click();
    openSummonerMenu(summonerIndex);
  } catch (err: any) {
    stopLoading();
    reload = true;
    alertByModal(
      err.message === "fatal error"
        ? "오류가 발생하여 재접속합니다.\n오류 조사를 위해 해당 계정이 일시적으로 정지될 수 있으니 양해 부탁드립니다."
        : "오류가 발생하여 재접속합니다."
    );
  }
};

const useMarketDiscountTicket = (code: string) => async () => {
  try {
    if (loadInterval) {
      return;
    }
    showLoading();
    const res = await axios.post(`/user/marketDiscount/${code}`);
    const { data } = res;
    const { fatal } = data;
    if (fatal) {
      throw new Error("fatal error");
    } else if (fatal === false) {
      throw new Error("error");
    }
    const { marketDiscount } = data;
    itemModal.style.display = "none";
    OutOfItemModal.style.display = "none";
    creator.marketDiscount = marketDiscount;
    changeItemAmounts(code, -1);
    updateMarketDiscount();
    stopLoading();
  } catch (err: any) {
    stopLoading();
    reload = true;
    alertByModal(
      err.message === "fatal error"
        ? "오류가 발생하여 재접속합니다.\n오류 조사를 위해 해당 계정이 일시적으로 정지될 수 있으니 양해 부탁드립니다."
        : "오류가 발생하여 재접속합니다."
    );
  }
};
const useOldBook = (code: string) => async () => {
  if (loadInterval) {
    return;
  }
  showLoading();
  const amounts = Number(itemModalAmountsSetter.value);
  if (!Number.isInteger(amounts) || amounts < 1) {
    stopLoading();
    alertByModal("수량 입력 오류!");
    return;
  }
  try {
    const res = await axios.post(`/user/oldBook/${code}`, { amounts });
    const { data } = res;
    const { fatal } = data;
    if (fatal) {
      throw new Error("fatal error");
    } else if (fatal === false) {
      throw new Error("error");
    }
    const { itemGrade } = splitCodeToInfoWithoutInspection(code);
    const cash = amounts * (cashItemPriceArr[itemGrade - 1] * 2.1);
    itemModal.style.display = "none";
    OutOfItemModal.style.display = "none";
    changeItemAmounts(code, -amounts);
    updateCreatorCash(cash);
    stopLoading();
  } catch (err: any) {
    stopLoading();
    reload = true;
    alertByModal(
      err.message === "fatal error"
        ? "오류가 발생하여 재접속합니다.\n오류 조사를 위해 해당 계정이 일시적으로 정지될 수 있으니 양해 부탁드립니다."
        : "오류가 발생하여 재접속합니다."
    );
  }
};
const disassembleItem = (code: string) => async () => {
  try {
    if (loadInterval) {
      return;
    }
    showLoading();
    const amounts = Number(itemModalAmountsSetter.value);
    if (!Number.isInteger(amounts) || amounts < 1) {
      stopLoading();
      alertByModal("분해 수량 입력 오류!");
    }
    const res = await axios.post(`/item/disassemble/${code}`, { amounts });
    const { data } = res;
    const { fatal } = data;
    if (fatal) {
      throw new Error("fatal error");
    } else if (fatal === false) {
      throw new Error("error");
    }
    const { itemGrade } = splitCodeToInfoWithoutInspection(code);
    changeItemAmounts(`7_${itemGrade}_3`, amounts);
    changeItemAmounts(code, -amounts);
    itemModal.style.display = "none";
    OutOfItemModal.style.display = "none";
    stopLoading();
  } catch (err: any) {
    stopLoading();
    reload = true;
    alertByModal(
      err.message === "fatal error"
        ? "오류가 발생하여 재접속합니다.\n오류 조사를 위해 해당 계정이 일시적으로 정지될 수 있으니 양해 부탁드립니다."
        : "오류가 발생하여 재접속합니다."
    );
  }
};
const openItemMenu = async (code: string) => {
  try {
    if (loadInterval) {
      return;
    }
    const itemInfo = splitCodeToInfo(code);
    if (!itemInfo) {
      throw new Error("error");
    }
    const { itemClass, itemGrade, itemDetail } = itemInfo;
    const itemDetailNumber = Number(itemDetail);
    if (
      [1, 2].includes(itemClass) ||
      (itemClass === 3 && itemDetailNumber !== 0) ||
      (itemClass === 6 && itemDetailNumber === 0) ||
      (itemClass === 7 && ![2, 4].includes(itemDetailNumber))
    ) {
      throw new Error("error");
    }
    showLoading();
    itemModalEventListeners.forEach((obj) => {
      const { listeningElement, eventType, addedFunction } = obj;
      listeningElement.removeEventListener(eventType, addedFunction);
    });
    itemModalEventListeners = [];
    const smallImgContainers = itemModalContent.querySelectorAll(
      ".itemModal_smallImgContainer"
    );
    smallImgContainers.forEach((container) => {
      container.remove();
    });
    itemModalMainImgContainer.style.display = "none";
    itemModalMainAmounts.innerText = "";
    itemModalArrow.style.display = "none";
    itemModalResultImgContainer.style.display = "none";
    itemModalInfo.style.display = "none";
    itemModalAmountsSetterContainer.style.display = "none";
    itemModalAmountsSetter.value = "1";
    const romeByGrade = changeNumToRome(itemGrade)!;
    const itemNameInfo = getNameInfoByCode(code)!;
    const amounts = checkItemAmounts(code);
    if ((itemClass === 3 && itemDetailNumber === 0) || itemClass === 6) {
      itemModalTitle.innerText = "아이템 분해";
      itemModalMainImgContainer.style.display = "flex";
      itemModalMainGradeContainer.innerText = romeByGrade;
      itemModalMainImg.src = getItemImgSrc(code);
      itemModalMainAmounts.innerText = amounts.toString();
      itemModalArrow.style.display = "flex";
      itemModalResultImgContainer.style.display = "flex";
      itemModalResultGradeContainer.innerText = romeByGrade;
      itemModalResultImg.src = getItemImgSrc("7_1_3");
      itemModalAmountsSetterContainer.style.display = "flex";
      itemModalAmountsSetter.max = amounts.toString();
      const disassembleItemFunc = disassembleItem(code);
      itemModalEventListeners.push({
        listeningElement: itemModalBtn,
        eventType: "click",
        addedFunction: disassembleItemFunc,
      });
      itemModalBtn.addEventListener("click", disassembleItemFunc);
    } else if ([4, 5].includes(itemClass)) {
      itemModalTitle.innerText = `소환사 ${
        ["축복", "문양 장착"][itemClass - 4]
      }`;
      for (let summoner of summoners) {
        const container = document.createElement("div");
        const index = document.createElement("span");
        const img = document.createElement("img");
        container.classList.add("itemModal_smallImgContainer");
        index.classList.add("itemModal_summonerIndex");
        img.classList.add("itemModal_smallImg");
        index.innerText = changeNumToRome(summoner.summonerIndex)!;
        img.src = `/images/summoner/summoner${summoner.grade}_${summoner.markGrade}.png`;
        container.append(index, img);
        itemModalEventListeners.push({
          listeningElement: container,
          eventType: "click",
          addedFunction: chooseSummonerInItemModal,
        });
        container.addEventListener("click", chooseSummonerInItemModal);
        itemModalContent.append(container);
      }
      if (itemClass === 4) {
        const blessSummonerFunc = blessSummoner(code);
        itemModalEventListeners.push({
          listeningElement: itemModalBtn,
          eventType: "click",
          addedFunction: blessSummonerFunc,
        });
        itemModalBtn.addEventListener("click", blessSummonerFunc);
        if ([5, 6, 7].includes(itemDetailNumber)) {
          itemModalAmountsSetterContainer.style.display = "flex";
          itemModalAmountsSetter.max = amounts.toString();
          itemModalContent.append(itemModalAmountsSetterContainer);
        }
      } else if (itemClass === 5) {
        const equipMarkFunc = equipMark(code);
        itemModalEventListeners.push({
          listeningElement: itemModalBtn,
          eventType: "click",
          addedFunction: equipMarkFunc,
        });
        itemModalBtn.addEventListener("click", equipMarkFunc);
      }
    } else if (itemClass === 7) {
      itemModalMainImgContainer.style.display = "flex";
      itemModalMainGradeContainer.innerText = romeByGrade;
      itemModalMainImg.src = getItemImgSrc(code);
      itemModalInfo.style.display = "flex";
      if (itemDetailNumber === 2) {
        itemModalTitle.innerText = "티켓 사용";
        itemModalInfo.innerText = `거래소 수수료 ${
          (itemGrade * 15) / 10
        }% 할인\n(지속시간: 1시간)`;
        const useMarketDiscountTicketFunc = useMarketDiscountTicket(code);
        itemModalEventListeners.push({
          listeningElement: itemModalBtn,
          eventType: "click",
          addedFunction: useMarketDiscountTicketFunc,
        });
        itemModalBtn.addEventListener("click", useMarketDiscountTicketFunc);
      } else if (itemDetailNumber === 4) {
        itemModalTitle.innerText = "창조의 고서 사용";
        itemModalInfo.innerText = `달 ${
          cashItemPriceArr[itemGrade - 1] * 2.1
        }개 획득`;
        itemModalAmountsSetterContainer.style.display = "flex";
        itemModalAmountsSetter.max = amounts.toString();
        const useOldBookFunc = useOldBook(code);
        itemModalEventListeners.push({
          listeningElement: itemModalBtn,
          eventType: "click",
          addedFunction: useOldBookFunc,
        });
        itemModalBtn.addEventListener("click", useOldBookFunc);
      }
    }
    itemModal.style.display = "flex";
    OutOfItemModal.style.display = "block";
    itemModalBtn.focus();
    stopLoading();
  } catch (err: any) {
    stopLoading();
    reload = true;
    alertByModal(
      err.message === "fatal error"
        ? "오류가 발생하여 재접속합니다.\n오류 조사를 위해 해당 계정이 일시적으로 정지될 수 있으니 양해 부탁드립니다."
        : "오류가 발생하여 재접속합니다."
    );
  }
};

/* makePart */
const changeMakeMode = async (event: MouseEvent) => {
  try {
    if (loadInterval) {
      return;
    }
    showLoading();
    resetCraftInventory();
    resetCraftExecuter();
    const target = event.currentTarget as HTMLButtonElement;
    const currentMode = target.innerText === "문양 강화" ? "make" : "enhance";
    if (currentMode === "make") {
      makePartNavBtns.forEach((btn) => {
        btn.style.display = "none";
      });
      target.innerText = "제작";
      craftAmountsSetter.style.display = "none";
      craftBtn.innerText = "강화";
      const marks = myItems[4];
      let index = 0;
      for (const markCode in marks) {
        putInMakePartItemContainer(makePartItemContainers[index], markCode);
        index++;
      }
    } else {
      resetMakeNav();
      makePartNavBtns.forEach((btn) => {
        btn.style.display = "flex";
      });
      target.innerText = "문양 강화";
      craftAmountsSetter.style.display = "block";
      craftBtn.innerText = "제작";
    }
    stopLoading();
  } catch (err: any) {
    stopLoading();
    reload = true;
    alertByModal(
      err.message === "fatal error"
        ? "오류가 발생하여 재접속합니다.\n오류 조사를 위해 해당 계정이 일시적으로 정지될 수 있으니 양해 부탁드립니다."
        : "오류가 발생하여 재접속합니다."
    );
  }
};
const resetMakeNav = () => {
  makePartClassNameBtn.innerText = "분류";
  makePartGradeNameBtn.innerText = "등급";
  makePartNavLists.forEach((list) => {
    list.style.display = "none";
  });
};
const openNavList =
  (navLists: NodeListOf<HTMLDivElement>) => (event: MouseEvent) => {
    if (loadInterval) {
      return;
    }
    if (event.target !== event.currentTarget) {
      return;
    }
    const target = event.currentTarget as HTMLDivElement;
    const navBtn = target.parentNode as HTMLDivElement;
    const navList = navBtn.querySelector(".navList") as HTMLDivElement;
    const navListDisplay = navList.style.display;
    navLists.forEach((list) => {
      list.style.display = "none";
    });
    if (navListDisplay === "none") {
      navList.style.display = "flex";
    }
  };
const chooseCraftInventoryClassification = async (event: MouseEvent) => {
  if (loadInterval) {
    return;
  }
  const target = event.currentTarget as HTMLDivElement;
  const navList = target.parentNode as HTMLDivElement;
  const navIndex = Array.from(makePartNavLists).indexOf(navList);
  const nameBtn = makePartNameBtns[navIndex];
  if (target.innerText === "모두") {
    nameBtn.innerText = "등급";
  } else {
    nameBtn.innerText = target.innerText;
  }
  navList.style.display = "none";
  const targetItemClass =
    ["원소", "힘", "목재", "축복", "문양", "조합서", "기타"].indexOf(
      makePartClassNameBtn.innerText
    ) + 1;
  if (navIndex === 0 || (navIndex === 1 && targetItemClass !== -1)) {
    const targetItemGrade = [
      "등급 x",
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
      "등급",
    ].indexOf(makePartGradeNameBtn.innerText);
    let makableList: string[] = [];
    let itemClassPart = targetItemClass;
    let itemGradePart: number | null = targetItemGrade;
    let itemDetailPart: string | null = null;
    if ([1, 2].includes(targetItemClass)) {
      if (targetItemGrade === 11) {
        for (let i = 0; i < 10; i++) {
          for (let j = 0; j < 8; j++) {
            itemGradePart = i + 1;
            itemDetailPart = (j + 5).toString();
            makableList.push(
              `${itemClassPart}_${itemGradePart}_${itemDetailPart}`
            );
          }
        }
      } else if (targetItemGrade > 0) {
        for (let j = 0; j < 8; j++) {
          itemDetailPart = (j + 5).toString();
          makableList.push(
            `${itemClassPart}_${itemGradePart}_${itemDetailPart}`
          );
        }
      }
    } else if (targetItemClass === 3) {
      if (targetItemGrade === 11) {
        for (let i = 0; i < 10; i++) {
          for (let j = 0; j < 4; j++) {
            itemGradePart = i + 1;
            itemDetailPart = (j + 1).toString();
            makableList.push(
              `${itemClassPart}_${itemGradePart}_${itemDetailPart}`
            );
          }
        }
      } else if (targetItemGrade > 0) {
        for (let j = 0; j < 4; j++) {
          itemDetailPart = (j + 1).toString();
          makableList.push(
            `${itemClassPart}_${itemGradePart}_${itemDetailPart}`
          );
        }
      }
    } else if (targetItemClass === 4) {
      if (targetItemGrade === 11) {
        for (let i = 0; i < 10; i++) {
          for (let j = 0; j < 7; j++) {
            itemGradePart = i + 1;
            itemDetailPart = (j + 1).toString();
            makableList.push(
              `${itemClassPart}_${itemGradePart}_${itemDetailPart}`
            );
          }
        }
      } else if (targetItemGrade > 0) {
        for (let j = 0; j < 7; j++) {
          itemDetailPart = (j + 1).toString();
          makableList.push(
            `${itemClassPart}_${itemGradePart}_${itemDetailPart}`
          );
        }
      }
    } else if (targetItemClass === 5) {
      if (targetItemGrade === 11) {
        for (let i = 0; i < 10; i++) {
          itemGradePart = i + 1;
          itemDetailPart = "0000";
          makableList.push(
            `${itemClassPart}_${itemGradePart}_${itemDetailPart}`
          );
        }
      } else if (targetItemGrade > 0) {
        itemDetailPart = "0000";
        makableList.push(`${itemClassPart}_${itemGradePart}_${itemDetailPart}`);
      }
    } else if (targetItemClass === 7) {
      if (targetItemGrade === 11) {
        makableList.push("7_0_1");
        for (let i = 0; i < 10; i++) {
          itemGradePart = i + 1;
          for (let j = 0; j < 2; j++) {
            itemDetailPart = (2 * (j + 1)).toString();
            makableList.push(
              `${itemClassPart}_${itemGradePart}_${itemDetailPart}`
            );
          }
        }
      } else if (targetItemGrade > 0) {
        itemDetailPart = "2";
        for (let j = 0; j < 2; j++) {
          itemDetailPart = (2 * (j + 1)).toString();
          makableList.push(
            `${itemClassPart}_${itemGradePart}_${itemDetailPart}`
          );
        }
      } else if (targetItemGrade === 0) {
        makableList.push("7_0_1");
      }
    }
    resetCraftExecuter();
    resetCraftInventory();
    makableList.forEach((code, index) => {
      putInMakePartItemContainer(makePartItemContainers[index], code);
    });
  }
  stopLoading();
};
const resetCraftInventory = () => {
  makePartItemContainers.forEach((container) => {
    eraseItemContainer(container);
  });
};
const putInMakePartItemContainer = (
  container: HTMLDivElement,
  code: string
) => {
  const { itemClass, itemGrade } = splitCodeToInfoWithoutInspection(code);
  const itemCodeContainer = container.querySelector(
    ".itemCode"
  ) as HTMLSpanElement;
  const itemGradeContainer = container.querySelector(
    ".itemContainer_itemGrade"
  ) as HTMLSpanElement;
  const itemImg = container.querySelector(
    ".craftTargetImg"
  ) as HTMLImageElement;
  itemCodeContainer.innerText = code;
  itemGradeContainer.innerText = changeNumToRome(itemGrade)!;
  itemImg.src = getItemImgSrc(code);
};
const clickItemInMakePart = (event: MouseEvent) => {
  if (loadInterval) {
    return;
  }
  const target = event.currentTarget as HTMLDivElement;
  const codeContainer = target.querySelector(".itemCode") as HTMLSpanElement;
  const code = codeContainer.innerText;
  if (!code || !splitCodeToInfo(code)) {
    return;
  }
  showLoading();
  if (makeModeChangeBtn.innerText === "문양 강화") {
    renderCraftExecuter(code);
  } else {
    renderEnhanceExecuter(code);
  }
  stopLoading();
};
const putInIngredientList = (
  code: string,
  currentAmounts: number,
  amounts: number
) => {
  const itemInfo = splitCodeToInfoWithoutInspection(code);
  const ingredientClass = itemInfo.itemClass;
  const ingredientGrade = itemInfo.itemGrade;
  const ingredientContainer = document.createElement("div");
  ingredientContainer.classList.add("craftTarget_ingredientContainer");
  const ingredientGradeContainer = document.createElement("span");
  const img = document.createElement("img");
  const amountsContainer = document.createElement("div");
  ingredientContainer.classList.add("craftTarget_ingredientContainer");
  ingredientGradeContainer.classList.add("craftItemContainer_itemGrade");
  img.classList.add("ingredientContainer_ingredientImg");
  amountsContainer.classList.add("ingredientContainer_ingredientAmounts");
  ingredientGradeContainer.innerText = `${changeNumToRome(ingredientGrade)}`;
  img.src = getItemImgSrc(code);
  amountsContainer.innerText = `(${currentAmounts}/${amounts})`;
  if (currentAmounts < amounts) {
    amountsContainer.classList.add("lowAmounts");
  }
  ingredientContainer.append(ingredientGradeContainer, img, amountsContainer);
  craftTargetIngredientList.append(ingredientContainer);
};
const resetCraftExecuter = () => {
  eraseItemContainer(craftTargetImgContainer);
  craftExecuterEventListeners.forEach((obj) => {
    const { listeningElement, eventType, addedFunction } = obj;
    listeningElement.removeEventListener(eventType, addedFunction);
  });
  craftExecuterEventListeners = [];
  craftTargetNameContainer.innerText = "";
  craftTargetRecipeAmountsContainer.innerText = "";
  craftTargetDescriptionContainer.innerText = "";
  craftTargetIngredientList.innerHTML = "";
  craftAmountsSetter.value = "";
  craftAmountsSetter.max = "";
  craftAmountsSetter.placeholder = "";
  craftTargetRateContainer.innerText = "";
};
const renderCraftExecuter = (code: string) => {
  try {
    resetCraftExecuter();
    putInMakePartItemContainer(craftTargetImgContainer, code);
    const itemInfo = splitCodeToInfoWithoutInspection(code);
    const targetItemGrade = itemInfo.itemGrade;
    craftTargetNameContainer.innerText = `${
      targetItemGrade ? `[${changeNumToRome(targetItemGrade)}] ` : ""
    }${getNameInfoByCode(code)!.korName}`;
    const recipeCode = getRecipeCodeOfItem(code);
    const recipeAmounts = recipeCode ? checkItemAmounts(recipeCode) : 10000;
    craftTargetRecipeAmountsContainer.innerText = `조합 가능 횟수: ${
      recipeCode ? recipeAmounts.toLocaleString() : "∞"
    }`;
    craftTargetDescriptionContainer.innerText =
      getNameInfoByCode(code)!.description;
    const ingredients = showIngredients(code);
    if (!ingredients) {
      throw new Error("error");
    }
    ingredients.forEach((ingredient) => {
      const ingredientCode = ingredient.code;
      const ingredientAmounts = ingredient.amounts;
      const currentAmounts = checkItemAmounts(ingredientCode);
      putInIngredientList(ingredientCode, currentAmounts, ingredientAmounts);
    });
    let successRate = 0;
    if (targetItemGrade >= 4 && creator.level < (targetItemGrade - 1) * 10) {
      successRate = -1;
    } else {
      successRate = 0.8 ** (targetItemGrade - 1) * (80 + 0.6 * creator.level);
    }
    const max = recipeAmounts > 10000 ? 10000 : recipeAmounts;
    craftAmountsSetter.max = max.toString();
    craftAmountsSetter.placeholder = `1~${max}`;
    craftAmountsSetter.value = "";
    craftAmountsSetter.style.display = "block";
    craftTargetRateContainer.innerText =
      successRate === -1
        ? "(창조자 LV 부족)"
        : `(성공 확률: ${
            successRate >= 100 ? 100 : Math.round(successRate * 100) / 100
          }%)`;
    craftTargetRateContainer.style.display = "flex";
  } catch (err: any) {
    reload = true;
    alertByModal(
      err.message === "fatal error"
        ? "오류가 발생하여 재접속합니다.\n오류 조사를 위해 해당 계정이 일시적으로 정지될 수 있으니 양해 부탁드립니다."
        : "오류가 발생하여 재접속합니다."
    );
  }
};
const openMakeModal = (code: string, success: number, fail: number) => {
  const { itemClass, itemGrade } = splitCodeToInfoWithoutInspection(code);
  makeModalItemGrade.innerText = `${
    itemGrade ? changeNumToRome(itemGrade) : ""
  }`;
  makeModalImg.src = getItemImgSrc(code);
  makeModalInfo.innerText = `성공: ${success}\n실패: ${fail}`;
  makeModal.style.display = "flex";
  OutOfMakeModal.style.display = "block";
  makeModalBtn.focus();
};
const makeItem = async () => {
  try {
    if (loadInterval) {
      return;
    }
    const codeContainer = craftTargetImgContainer.querySelector(
      ".itemCode"
    ) as HTMLSpanElement;
    const code = codeContainer.innerText;
    if (!code) {
      return;
    }
    const rate = craftTargetRateContainer.innerText;
    if (rate === "(창조자 LV 부족)") {
      return;
    }
    const amounts = Number(craftAmountsSetter.value);
    if (!Number.isInteger(amounts) || amounts < 1) {
      craftAmountsSetter.innerText = "";
      return;
    }
    const recipeCode = getRecipeCodeOfItem(code);
    if (recipeCode) {
      const recipeAmounts = checkItemAmounts(recipeCode);
      if (recipeAmounts < amounts) {
        alertByModal("조합서 부족!");
        return;
      }
    }
    const ingredients = showIngredients(code);
    if (!ingredients) {
      throw new Error("error");
    }
    for (const ingredient of ingredients) {
      const ingredientCode = ingredient.code;
      const ingredientAmounts = ingredient.amounts;
      const currentAmounts = checkItemAmounts(ingredientCode);
      if (currentAmounts < ingredientAmounts * amounts) {
        alertByModal("제작 재료 부족!");
        return;
      }
    }
    const { itemClass } = splitCodeToInfoWithoutInspection(code);
    if (itemClass === 5) {
      const myMarks = myItems[4];
      let myMarksAmounts: number = 0;
      for (const markCode in myMarks) {
        myMarksAmounts += myMarks[markCode].amounts;
      }
      if (myMarksAmounts + amounts > 135) {
        alertByModal("소환사의 문양은 최대 135개까지만 보유할 수 있습니다!");
        return;
      }
    }
    showLoading();
    const res = await axios.post(`/item/make/${code}`, { amounts });
    const { data } = res;
    const { fatal } = data;
    if (fatal) {
      throw new Error("fatal error");
    } else if (fatal === false) {
      throw new Error("error");
    }
    const { creatorLevelExpInfo, success, fail } = data;
    const { level, exp } = creatorLevelExpInfo;
    creator.level = level;
    updateCreatorLevelExp(exp);
    if (success) {
      changeItemAmounts(code, success);
    }
    if (recipeCode) {
      changeItemAmounts(recipeCode, -amounts);
    }
    ingredients.forEach((ingredient) => {
      const ingredientClass = splitCodeToInfoWithoutInspection(
        ingredient.code
      ).itemClass;
      changeItemAmounts(
        ingredient.code,
        -ingredient.amounts * (ingredientClass === 5 ? success : success + fail)
      );
    });
    openMakeModal(code, success, fail);
    resetCraftExecuter();
    stopLoading();
  } catch (err: any) {
    reload = true;
    alertByModal(
      err.message === "fatal error"
        ? "오류가 발생하여 재접속합니다.\n오류 조사를 위해 해당 계정이 일시적으로 정지될 수 있으니 양해 부탁드립니다."
        : "오류가 발생하여 재접속합니다."
    );
  }
};

const chooseEnhancePart = (event: MouseEvent) => {
  const target = event.currentTarget as HTMLDivElement;
  const lowAmountsInTarget = target.querySelector(".lowAmounts");
  if (lowAmountsInTarget) {
    return;
  }
  const maxEnhancedInTarget = target.querySelector(".maxEnhanced");
  if (maxEnhancedInTarget) {
    return;
  }
  const chosenEnhancePartsName = craftTargetIngredientList.querySelectorAll(
    ".selectedEnhanceName"
  );
  chosenEnhancePartsName.forEach((name) => {
    name.classList.remove("selectedEnhanceName");
  });
  const targetName = target.querySelector(
    ".craftExecuter_enhanceName"
  ) as HTMLDivElement;
  targetName.classList.add("selectedEnhanceName");
};
const renderEnhanceIngredientList = (
  ingredients: { code: string; amounts: number }[]
) => {
  for (let i = 0; i < 4; i++) {
    const ingredientSet = document.createElement("div");
    const enhanceName = document.createElement("div");
    const ingredientContainer_one = document.createElement("div");
    const ingredientContainer_two = document.createElement("div");
    for (let j = 0; j < 2; j++) {
      const targetIngredient = ingredients[i + j * 4];
      const targetIngredientCode = targetIngredient.code;
      const targetIngredientAmounts = targetIngredient.amounts;
      const targetIngredientGrade =
        splitCodeToInfoWithoutInspection(targetIngredientCode).itemGrade;
      const itemGradeContainer = document.createElement("span");
      const itemImg = document.createElement("img");
      const itemAmountsContainer = document.createElement("div");
      itemGradeContainer.classList.add("craftItemContainer_itemGrade");
      itemImg.classList.add("ingredientContainer_ingredientImg");
      itemAmountsContainer.classList.add(
        "ingredientContainer_ingredientAmounts"
      );
      itemGradeContainer.innerText = changeNumToRome(targetIngredientGrade)!;
      itemImg.src = getItemImgSrc(targetIngredientCode);
      const targetIngredientCurrentAmounts =
        checkItemAmounts(targetIngredientCode);
      if (!targetIngredientAmounts) {
        itemAmountsContainer.innerText = "MAX";
        itemAmountsContainer.classList.add("maxEnhanced");
      } else {
        itemAmountsContainer.innerText = `(${targetIngredientCurrentAmounts}/${targetIngredientAmounts})`;
        if (targetIngredientCurrentAmounts < targetIngredientAmounts) {
          itemAmountsContainer.classList.add("lowAmounts");
        }
      }
      [ingredientContainer_one, ingredientContainer_two][j].append(
        itemGradeContainer,
        itemImg,
        itemAmountsContainer
      );
    }
    ingredientSet.classList.add("craftExecuter_enhanceIngredientSet");
    enhanceName.classList.add("craftExecuter_enhanceName");
    ingredientContainer_one.classList.add(
      "craftExecuter_enhanceIngredientContainer"
    );
    ingredientContainer_two.classList.add(
      "craftExecuter_enhanceIngredientContainer"
    );
    enhanceName.innerText = `${["신속", "성장", "창조", "환상"][i]} +${
      ingredients[i].amounts === 0 ? 5 : ingredients[i].amounts - 1
    }`;
    craftExecuterEventListeners.push({
      listeningElement: ingredientSet,
      eventType: "click",
      addedFunction: chooseEnhancePart,
    });
    ingredientSet.addEventListener("click", chooseEnhancePart);
    ingredientSet.append(
      enhanceName,
      ingredientContainer_one,
      ingredientContainer_two
    );
    craftTargetIngredientList.append(ingredientSet);
  }
};
const renderEnhanceExecuter = async (code: string) => {
  try {
    resetCraftExecuter();
    putInMakePartItemContainer(craftTargetImgContainer, code);
    const { itemGrade, itemDetail } = splitCodeToInfoWithoutInspection(code);
    const itemNameInfo = getNameInfoByCode(code)!;
    craftTargetNameContainer.innerText = `${
      itemGrade ? `[${changeNumToRome(itemGrade)}] ` : ""
    }${itemNameInfo.korName}`;
    const markEnhanceGradeArr = getMarkEnhanceGrade(itemDetail);
    let totalEnhanceGrade = 0;
    markEnhanceGradeArr.forEach((enhanceGrade) => {
      totalEnhanceGrade += enhanceGrade;
    });
    craftTargetRecipeAmountsContainer.innerHTML = `<span class='greenSpan'>+${totalEnhanceGrade}</span>`;
    craftTargetDescriptionContainer.innerText = itemNameInfo.description;
    const enhanceIngredients = showMarkEnhanceIngredients(code);
    if (!enhanceIngredients) {
      throw new Error("error");
    }
    renderEnhanceIngredientList(enhanceIngredients);
    craftAmountsSetter.style.display = "none";
    craftTargetRateContainer.style.display = "none";
  } catch (err: any) {
    reload = true;
    alertByModal("오류가 발생하여 재접속합니다.");
  }
};
const enhanceMark = async () => {
  try {
    if (loadInterval) {
      return;
    }
    const codeContainer = craftTargetImgContainer.querySelector(
      ".itemCode"
    ) as HTMLSpanElement;
    const code = codeContainer.innerText;
    if (!code) {
      return;
    }
    const selectedEnhanceName = craftTargetIngredientList.querySelector(
      ".selectedEnhanceName"
    );
    if (!selectedEnhanceName) {
      return;
    }
    const targetIngredientSet =
      selectedEnhanceName.parentNode as HTMLDivElement;
    const enhanceIndex = Array.from(craftTargetIngredientList.children).indexOf(
      targetIngredientSet
    );
    showLoading();
    const res = await axios.post(`/item/mark/${code}`, {
      enhanceIndex,
    });
    const { data } = res;
    const { fatal } = data;
    if (fatal) {
      throw new Error("fatal error");
    } else if (fatal === false) {
      throw new Error("error");
    }
    const { success, newCode, ingredients } = data as {
      success: boolean;
      newCode: string;
      ingredients: {
        ingredientCode: string;
        ingredientAmounts: number;
      }[];
    };
    ingredients.forEach((ingredient) => {
      changeItemAmounts(
        ingredient.ingredientCode,
        -ingredient.ingredientAmounts
      );
    });
    const markCodeContainer = Array.from(
      makeInventory.querySelectorAll(".itemCode") as NodeListOf<HTMLSpanElement>
    ).filter((itemCode) => itemCode.innerText === code)[0] as HTMLSpanElement;
    const markContainer = markCodeContainer.parentNode as HTMLDivElement;
    if (success) {
      changeItemAmounts(code, -1);
      changeItemAmounts(newCode, 1);
      markCodeContainer.innerText = newCode;
    }
    stopLoading();
    markContainer.click();
    showLoading();
    const enhanceIngredientSets = craftTargetIngredientList.querySelectorAll(
      ".craftExecuter_enhanceIngredientSet"
    ) as NodeListOf<HTMLDivElement>;
    const targetEnhanceIngredientSet = enhanceIngredientSets[enhanceIndex];
    if (
      !targetEnhanceIngredientSet.querySelector(".lowAmounts") &&
      !targetEnhanceIngredientSet.querySelector(".maxEnhanced")
    ) {
      const targetEnhanceName = targetEnhanceIngredientSet.querySelector(
        ".craftExecuter_enhanceName"
      ) as HTMLDivElement;
      targetEnhanceName.classList.add("selectedEnhanceName");
    }
    stopLoading();
  } catch (err: any) {
    reload = true;
    alertByModal(
      err.message === "fatal error"
        ? "오류가 발생하여 재접속합니다.\n오류 조사를 위해 해당 계정이 일시적으로 정지될 수 있으니 양해 부탁드립니다."
        : "오류가 발생하여 재접속합니다."
    );
  }
};
const clickCraftBtn = (event: MouseEvent) => {
  const target = event.currentTarget as HTMLButtonElement;
  if (target.innerText === "제작") {
    makeItem();
  } else {
    enhanceMark();
  }
};

/* marketPart */
const changeToBuyMode = () => {
  if (loadInterval) {
    return;
  }
  resetSearchNav();
  resetMarketItemListAndController();
  searchNav.style.display = "flex";
  marketItemList.style.display = "flex";
  searchPageController.style.display = "flex";
  marketClassNavContainer.style.display = "none";
  marketInventoryWrapper.style.display = "none";
  marketPartInventories.forEach((inventory) => {
    if (inventory.style.display === "flex") {
      inventory.style.display = "none";
    }
  });
};
const changeToSaleMode = () => {
  if (loadInterval) {
    return;
  }
  searchNav.style.display = "none";
  marketItemList.style.display = "none";
  searchPageController.style.display = "none";
  marketClassNavContainer.style.display = "flex";
  marketInventoryWrapper.style.display = "flex";
  stopLoading();
  marketSalePartNavBtns[0].click();
};
const resetSearchNav = () => {
  searchTextContainer.value = "";
  searchNameBtns.forEach((btn, index) => {
    btn.innerText = ["분류", "등급", "신속", "성장", "창조", "환상"][index];
  });
};
const chooseSearchNav = (event: MouseEvent) => {
  if (loadInterval) {
    return;
  }
  const target = event.currentTarget as HTMLDivElement;
  const navList = target.parentNode as HTMLDivElement;
  const navIndex = Array.from(marketPartNavLists).indexOf(navList);
  const nameBtn = Array.from(searchNameBtns)[navIndex];
  if (target.innerText === "모두") {
    nameBtn.innerText = ["등급", "신속", "성장", "창조", "환상"][navIndex - 1];
  } else if (navIndex < 2) {
    nameBtn.innerText = target.innerText;
  } else {
    nameBtn.innerText = `${["신속", "성장", "창조", "환상"][navIndex - 2]} ${
      target.innerText
    }`;
  }
  navList.style.display = "none";
};
const searchItem = async () => {
  try {
    if (loadInterval) {
      return;
    }
    const searchText = searchTextContainer.value;
    const tester = /^[가-힣|: ]{1,}$/;
    const textTest = tester.test(searchText);
    if (searchText && !textTest) {
      alertByModal(
        "검색 란에는 한글, 공백, 특수문자 '|', ':' 만 입력 가능합니다."
      );
      return;
    }
    const searchClass =
      ["원소", "힘", "목재", "축복", "문양", "조합서", "기타"].indexOf(
        searchClassNavBtn.innerText
      ) + 1;
    const gradeText = searchGradeNavBtn.innerText;
    const searchGrade =
      gradeText === "등급"
        ? -1
        : gradeText === "등급 x"
        ? 0
        : changeRomeToNum(gradeText);
    if (searchClass === 0) {
      alertByModal("검색 아이템 분류 설정 필요!");
      return;
    }
    if (searchGrade === -1) {
      alertByModal("검색 아이템 등급 설정 필요!");
      return;
    }
    let markSpeedEnhanceGrade = null;
    let markGrowthEnhanceGrade = null;
    let markCreationEnhanceGrade = null;
    let markFantasyEnhanceGrade = null;
    if (searchClass === 5) {
      const markSpeedEnhanceGradeText = marketMarkSpeedEnhanceNavBtn.innerText;
      const markGrowthEnhanceGradeText =
        marketMarkGrowthEnhanceNavBtn.innerText;
      const markCreationEnhanceGradeText =
        marketMarkCreationEnhanceNavBtn.innerText;
      const markFantasyEnhanceGradeText =
        marketMarkFantasyEnhanceNavBtn.innerText;
      markSpeedEnhanceGrade =
        markSpeedEnhanceGradeText === "신속"
          ? null
          : Number(markSpeedEnhanceGradeText.slice(4));
      markGrowthEnhanceGrade =
        markGrowthEnhanceGradeText === "성장"
          ? null
          : Number(markGrowthEnhanceGradeText.slice(4));
      markCreationEnhanceGrade =
        markCreationEnhanceGradeText === "창조"
          ? null
          : Number(markCreationEnhanceGradeText.slice(4));
      markFantasyEnhanceGrade =
        markFantasyEnhanceGradeText === "환상"
          ? null
          : Number(markFantasyEnhanceGradeText.slice(4));
    }
    showLoading();
    const res = await axios.post("/market/search", {
      searchText,
      searchClass,
      searchGrade,
      markSpeedEnhanceGrade,
      markGrowthEnhanceGrade,
      markCreationEnhanceGrade,
      markFantasyEnhanceGrade,
    });
    const { data } = res;
    const { fatal } = data;
    if (fatal) {
      throw new Error("fatal error");
    } else if (fatal === false) {
      throw new Error("error");
    }
    resetMarketItemListAndController();
    marketItems = data.itemsData;
    if (!marketItems.length) {
      stopLoading();
      alertByModal("거래 중인 해당 아이템이 없습니다!");
      return;
    }
    currentPageShower.innerText = "1";
    lastPageShower.innerText = `${Math.ceil(marketItems.length / 10)}`;
    stopLoading();
    renderMarketItems(1);
  } catch (err: any) {
    stopLoading();
    reload = true;
    alertByModal(
      err.message === "fatal error"
        ? "오류가 발생하여 재접속합니다.\n오류 조사를 위해 해당 계정이 일시적으로 정지될 수 있으니 양해 부탁드립니다."
        : "오류가 발생하여 재접속합니다."
    );
  }
};
const updateCreatorGold = (gold: number) => {
  creator.gold += gold;
  goldContainers.forEach((container) => {
    container.value = creator.gold.toLocaleString();
  });
};
const resetMarketItemListAndController = () => {
  marketBuyEventListener.forEach((obj) => {
    const { listeningElement, eventType, addedFunction } = obj;
    listeningElement.removeEventListener(eventType, addedFunction);
  });
  marketItems = [];
  for (const marketItemContainer of marketItemContainers) {
    marketItemContainer.style.display = "none";
    const imgContainer = marketItemContainer.querySelector(
      ".marketItemContainer_imgContainer"
    ) as HTMLDivElement;
    const infoContainers = marketItemContainer.querySelectorAll(
      ".marketItemContainer_infoContainer"
    ) as NodeListOf<HTMLDivElement>;
    eraseItemContainer(imgContainer);
    for (const infoContainer of infoContainers) {
      eraseItemContainer(infoContainer);
    }
  }
  currentPageShower.innerText = "";
  lastPageShower.innerText = "";
};
const renderMarketItems = (page: number) => {
  marketBuyEventListener.forEach((obj) => {
    const { listeningElement, eventType, addedFunction } = obj;
    listeningElement.removeEventListener(eventType, addedFunction);
  });
  marketItemContainers.forEach((container) => {
    container.style.display = "none";
  });
  for (
    let i = (page - 1) * 10;
    i < (marketItems.length < page * 10 ? marketItems.length : page * 10);
    i++
  ) {
    const item = marketItems[i];
    const { id, code, amounts, price } = item;
    const { itemClass, itemGrade } = splitCodeToInfoWithoutInspection(code);
    const itemName = getNameInfoByCode(code)!.name;
    const containerIndex = i % 10;
    const marketItemContainer = marketItemContainers[containerIndex];
    const marketItemId = marketItemContainer.querySelector(
      ".itemId"
    ) as HTMLSpanElement;
    const marketItemCode = marketItemContainer.querySelector(
      ".itemCode"
    ) as HTMLSpanElement;
    const marketItemGrade = marketItemContainer.querySelector(
      ".itemContainer_itemGrade"
    ) as HTMLSpanElement;
    const marketItemImg = marketItemContainer.querySelector(
      ".itemContainer_itemImg"
    ) as HTMLImageElement;
    const marketItemAmounts = marketItemContainer.querySelector(
      ".itemContainer_itemAmounts"
    ) as HTMLSpanElement;
    const marketItemUnitPrice = marketItemContainer.querySelector(
      ".marketItemContainer_unitPrice"
    ) as HTMLSpanElement;
    const marketItemAmountsSetter = marketItemContainer.querySelector(
      ".marketItemContainer_amountsSetter"
    ) as HTMLInputElement;
    marketItemId.innerText = id;
    marketItemCode.innerText = code;
    marketItemGrade.innerText = changeNumToRome(itemGrade)!;
    marketItemImg.src = getItemImgSrc(code);
    marketItemAmounts.innerText = amounts;
    marketItemUnitPrice.innerText = price.toLocaleString();
    marketItemAmountsSetter.min = "1";
    marketItemAmountsSetter.max = amounts.toString();
    marketItemAmountsSetter.placeholder = `1~${amounts}`;
    marketItemAmountsSetter.value = "";
    marketItemContainer.style.display = "flex";
  }
};
const changeSearchPage =
  (where: "leftEnd" | "left" | "right" | "rightEnd") => () => {
    if (loadInterval || !marketItems.length) {
      return;
    }
    const currentPage = Number(currentPageShower.innerText);
    const lastPage = Number(lastPageShower.innerText);
    let targetPage = 1;
    switch (where) {
      case "left": {
        targetPage = currentPage === 1 ? 1 : currentPage - 1;
        break;
      }
      case "right": {
        targetPage = currentPage === lastPage ? lastPage : currentPage + 1;
        break;
      }
      case "rightEnd": {
        targetPage = lastPage;
        break;
      }
    }
    currentPageShower.innerText = targetPage.toString();
    renderMarketItems(targetPage);
  };
const buyItem = async (event: MouseEvent) => {
  try {
    if (loadInterval) {
      return;
    }
    const buyBtn = event.currentTarget as HTMLButtonElement;
    const marketItemContainer = buyBtn.parentNode as HTMLDivElement;
    const itemIdContainer = marketItemContainer.querySelector(
      ".itemId"
    ) as HTMLSpanElement;
    const amountsSetter = marketItemContainer.querySelector(
      ".marketItemContainer_amountsSetter"
    ) as HTMLInputElement;
    const totalAmountsContainer = marketItemContainer.querySelector(
      ".itemContainer_itemAmounts"
    ) as HTMLSpanElement;
    const itemId = Number(itemIdContainer.innerText);
    const amounts = Number(amountsSetter.value);
    const totalAmounts = Number(totalAmountsContainer.innerText);
    if (!Number.isInteger(amounts) || amounts < 1 || amounts > totalAmounts) {
      amountsSetter.value = "";
      alertByModal("올바른 형식의 수를 입력하세요!");
      return;
    }
    const priceContainer = marketItemContainer.querySelector(
      ".marketItemContainer_unitPrice"
    ) as HTMLDivElement;
    const price = Number(priceContainer.innerText.replaceAll(",", ""));
    const totalPrice = price * amounts;
    if (creator.gold < totalPrice) {
      amountsSetter.value = "";
      alertByModal("골드 부족!");
      return;
    }
    const codeContainer = marketItemContainer.querySelector(
      ".itemCode"
    ) as HTMLSpanElement;
    const code = codeContainer.innerText;
    const { itemClass } = splitCodeToInfoWithoutInspection(code);
    if (itemClass === 5) {
      const myMarks = myItems[4];
      let myMarksAmounts: number = 0;
      for (const markCode in myMarks) {
        myMarksAmounts += myMarks[markCode].amounts;
      }
      if (myMarksAmounts + amounts > 135) {
        alertByModal("소환사의 문양은 최대 135개까지만 보유할 수 있습니다!");
        return;
      }
    }
    showLoading();
    const res = await axios.post(`market/buy/${itemId}`, {
      buyingAmounts: amounts,
    });
    const { data } = res;
    const { fatal } = data;
    if (fatal) {
      throw new Error("fatal error");
    } else if (fatal === false) {
      throw new Error("error");
    }
    if (!data.info) {
      updateCreatorGold(-totalPrice);
      changeItemAmounts(code, amounts);
    }
    stopLoading();
    const marketItemContainerIndex =
      Array.from(marketItemContainers).indexOf(marketItemContainer);
    const currentPage = Number(currentPageShower.innerText);
    const lastPage = Number(lastPageShower.innerText);
    marketItems.splice((currentPage - 1) * 10 + marketItemContainerIndex, 1);
    if (marketItems.length % 10) {
      renderMarketItems(currentPage);
    } else {
      lastPageShower.innerText = (lastPage - 1).toString();
      if (currentPage !== lastPage) {
        renderMarketItems(currentPage);
      } else if (lastPage > 1) {
        changeSearchPage("left")();
      } else {
        resetMarketItemListAndController();
      }
    }
    if (data.info === "noItem") {
      alertByModal("이미 판매된 상품입니다.");
    }
  } catch (err: any) {
    stopLoading();
    reload = true;
    alertByModal(
      err.message === "fatal error"
        ? "오류가 발생하여 재접속합니다.\n오류 조사를 위해 해당 계정이 일시적으로 정지될 수 있으니 양해 부탁드립니다."
        : "오류가 발생하여 재접속합니다."
    );
  }
};
const updateMarketDiscount = () => {
  const { marketDiscount } = creator;
  if (marketDiscount === "0") {
    marketFee.innerText = "15%";
    marketDiscountEndtime.style.display = "none";
    return;
  }
  const colonIndex = marketDiscount.indexOf(":");
  const discountGrade = Number(marketDiscount.slice(0, colonIndex));
  const discountEndTime = new Date(
    Number(marketDiscount.slice(colonIndex + 1))
  );
  const currentTime = new Date();
  setTimeout(() => {
    alertByModal("거래소 수수료 인하 티켓 지속시간 종료로 새로고침합니다!");
    location.reload();
    return;
  }, discountEndTime.getTime() - currentTime.getTime());
  const dateInfo = discountEndTime
    .toLocaleDateString()
    .slice(2)
    .replaceAll(" ", "");
  const timeInfo = discountEndTime.toTimeString().slice(0, 8);
  marketFee.innerText = `${(150 - 15 * discountGrade) / 10}%`;
  marketDiscountEndtime.innerText = `(~${dateInfo} ${timeInfo})`;
  marketDiscountEndtime.style.display = "block";
};
const openSaleInventory = async (event: MouseEvent) => {
  try {
    if (loadInterval) {
      return;
    }
    marketPartInventories.forEach((inventory) => {
      inventory.style.display = "none";
    });
    marketItemDetailContainer.style.display = "none";
    const btnIndex = Array.from(marketSalePartNavBtns).indexOf(
      event.currentTarget as HTMLButtonElement
    );
    if (btnIndex === 7) {
      const res = await axios.post("/market/sale");
      const { data } = res;
      const { fatal } = data;
      if (fatal) {
        throw new Error("fatal error");
      } else if (fatal === false) {
        throw new Error("error");
      }
      const mySellingItemsData = data.sellingItems as {
        id: number;
        code: string;
        amounts: number;
        saleCode: 1 | 2;
        price: number;
      }[];
      mySellingItems = {};
      for (const item of mySellingItemsData) {
        const { id, code, amounts, saleCode, price } = item;
        mySellingItems[id] = new SellingItem(
          code,
          amounts,
          id,
          saleCode,
          price
        );
      }
      resetMySellingItemContainers();
      renderSellingItems();
    }
    marketPartInventories[btnIndex].style.display = "flex";
  } catch (err: any) {
    stopLoading();
    reload = true;
    alertByModal(
      err.message === "fatal error"
        ? "오류가 발생하여 재접속합니다.\n오류 조사를 위해 해당 계정이 일시적으로 정지될 수 있으니 양해 부탁드립니다."
        : "오류가 발생하여 재접속합니다."
    );
  }
};
const putInMySellingItemContainer = (
  container: HTMLDivElement,
  code: string,
  amounts: number,
  id: number,
  saleCode: number,
  price: number
) => {
  const itemIdContainer = container.querySelector(".itemId") as HTMLSpanElement;
  const itemSaleCodeContainer = container.querySelector(
    ".itemSaleCode"
  ) as HTMLSpanElement;
  const itemPriceContainer = container.querySelector(
    ".itemPrice"
  ) as HTMLSpanElement;
  itemIdContainer.innerText = id.toString();
  itemSaleCodeContainer.innerText = saleCode.toString();
  itemPriceContainer.innerText = price.toString();
  if (saleCode === 2) {
    container.classList.add("soldOut");
  }
  putInItemContainer(container, code, amounts);
};
const resetMySellingItemContainers = () => {
  mySellingItemContainers.forEach((container) => {
    if (container.classList.contains("soldOut")) {
      container.classList.remove("soldOut");
    }
    eraseItemContainer(container);
  });
};
const renderSellingItems = () => {
  let i = 0;
  for (const id in mySellingItems) {
    const item = mySellingItems[id];
    const { code, amounts, saleCode, price } = item;
    putInMySellingItemContainer(
      mySellingItemContainers[i],
      code,
      amounts,
      Number(id),
      saleCode,
      price
    );
    i++;
  }
};
const cancelSale = (id: number) => async () => {
  try {
    if (loadInterval) {
      return;
    }
    const cancelAmounts = Number(saleItemAmountsSetter.value);
    const maxAmounts = Number(saleItemAmountsSetter.max);
    if (
      !Number.isInteger(cancelAmounts) ||
      cancelAmounts < 1 ||
      cancelAmounts > maxAmounts
    ) {
      alertByModal("취소 개수 입력 오류!");
      return;
    }
    const { code } = mySellingItems[id];
    const { itemClass } = splitCodeToInfoWithoutInspection(code);
    if (itemClass === 5) {
      const myMarks = myItems[4];
      let myMarksAmounts: number = 0;
      for (const markCode in myMarks) {
        myMarksAmounts += myMarks[markCode].amounts;
      }
      if (myMarksAmounts + cancelAmounts > 135) {
        alertByModal("소환사의 문양은 최대 135개까지만 보유할 수 있습니다!");
        return;
      }
    }
    showLoading();
    const res = await axios.post(`/market/cancel/${id}`, {
      cancelAmounts,
    });
    const { data } = res;
    const { fatal } = data;
    if (fatal) {
      throw new Error("fatal error");
    } else if (fatal === false) {
      throw new Error("error");
    }
    changeItemAmounts(code, cancelAmounts);
    saleModal.style.display = "none";
    OutOfSaleModal.style.display = "none";
    stopLoading();
    marketSalePartNavBtns[7].click();
  } catch (err: any) {
    stopLoading();
    reload = true;
    alertByModal(
      err.message === "fatal error"
        ? "오류가 발생하여 재접속합니다.\n오류 조사를 위해 해당 계정이 일시적으로 정지될 수 있으니 양해 부탁드립니다."
        : "오류가 발생하여 재접속합니다."
    );
  }
};
const receivePayment = (id: number) => async () => {
  try {
    if (loadInterval) {
      return;
    }
    showLoading();
    const res = await axios.post(`/market/receive/${id}`);
    const { data } = res;
    const { fatal } = data;
    if (fatal) {
      throw new Error("fatal error");
    } else if (fatal === false) {
      throw new Error("error");
    }
    const { payment } = data;
    updateCreatorGold(payment);
    saleModal.style.display = "none";
    OutOfSaleModal.style.display = "none";
    stopLoading();
    marketSalePartNavBtns[7].click();
  } catch (err: any) {
    stopLoading();
    reload = true;
    alertByModal(
      err.message === "fatal error"
        ? "오류가 발생하여 재접속합니다.\n오류 조사를 위해 해당 계정이 일시적으로 정지될 수 있으니 양해 부탁드립니다."
        : "오류가 발생하여 재접속합니다."
    );
  }
};
const openSaleCancelMenu = (code: string, id: number) => {
  const { amounts } = mySellingItems[id];
  openSaleModal(code);
  saleModalTitle.innerText = "판매 취소";
  saleItemAmountsContainer.innerText = amounts.toString();
  saleItemAmountsSetter.readOnly = false;
  saleItemAmountsSetter.placeholder = `1~${amounts}`;
  saleItemAmountsSetter.min = "1";
  saleItemAmountsSetter.max = amounts.toString();
  saleItemAmountsSetter.value = "";
  saleItemPriceSetter.value = mySellingItems[id].price.toString();
  saleItemPriceSetter.readOnly = true;
  saleItemTotalPriceShowerContainer.style.display = "none";
  saleModalBtn.innerText = "취소";
  const cancelSaleFunc = cancelSale(id);
  saleModalEventListeners.push({
    listeningElement: saleModalBtn,
    eventType: "click",
    addedFunction: cancelSaleFunc,
  });
  saleModalBtn.addEventListener("click", cancelSaleFunc);
};
const openSaleCompleteMenu = (code: string, id: number) => {
  openSaleModal(code);
  saleModalTitle.innerText = "판매 대금 수령";
  const { amounts, price } = mySellingItems[id];
  const creatorMarketDiscount = creator.marketDiscount;
  const marketDiscountRate =
    creatorMarketDiscount === "0"
      ? 0
      : Number(
          creatorMarketDiscount.slice(0, creatorMarketDiscount.indexOf(":"))
        ) * 1.5;
  saleItemAmountsContainer.innerText = amounts.toString();
  saleItemAmountsSetter.value = amounts.toString();
  saleItemAmountsSetter.readOnly = true;
  saleItemPriceSetter.value = price.toString();
  saleItemPriceSetter.readOnly = true;
  saleItemTotalPriceShower.innerText = Math.floor(
    (amounts * price * (85 + marketDiscountRate)) / 100
  ).toLocaleString();
  saleModalBtn.innerText = "수령";
  const receivePaymentFunc = receivePayment(id);
  saleModalEventListeners.push({
    listeningElement: saleModalBtn,
    eventType: "click",
    addedFunction: receivePaymentFunc,
  });
  saleModalBtn.addEventListener("click", receivePaymentFunc);
};
const openSaleModal = (code: string) => {
  saleModalEventListeners.forEach((obj) => {
    const { listeningElement, eventType, addedFunction } = obj;
    listeningElement.removeEventListener(eventType, addedFunction);
  });
  saleModalEventListeners = [];
  const { itemClass, itemGrade } = splitCodeToInfoWithoutInspection(code);
  const name = getNameInfoByCode(code)!.name;
  const amounts = checkItemAmounts(code);
  saleModal.style.display = "flex";
  OutOfSaleModal.style.display = "block";
  saleItemGradeContainer.innerText = `${changeNumToRome(itemGrade)}`;
  saleItemImg.src = getItemImgSrc(code);
  saleItemAmountsContainer.innerText = amounts.toString();
  saleItemTotalPriceShowerContainer.style.display = "flex";
};
const openSaleMenu = (code: string) => {
  openSaleModal(code);
  const amounts = checkItemAmounts(code);
  saleModalTitle.innerText = "거래소 등록";
  saleItemAmountsSetter.readOnly = false;
  saleItemAmountsSetter.placeholder = `1~${amounts}`;
  saleItemAmountsSetter.min = "1";
  saleItemAmountsSetter.max = amounts.toString();
  saleItemAmountsSetter.value = "";
  saleItemPriceSetter.readOnly = false;
  saleItemPriceSetter.placeholder = "가격 설정";
  saleItemPriceSetter.value = "";
  saleItemTotalPriceShower.innerText = "";
  saleModalBtn.innerText = "등록";
  const registerItemFunc = registerItem(code);
  saleModalEventListeners.push({
    listeningElement: saleModalBtn,
    eventType: "click",
    addedFunction: registerItemFunc,
  });
  saleModalBtn.addEventListener("click", registerItemFunc);
};
const registerItem = (code: string) => async () => {
  try {
    if (loadInterval) {
      return;
    }
    const amounts = checkItemAmounts(code);
    const registerAmounts = Number(saleItemAmountsSetter.value);
    const registerPrice = Number(saleItemPriceSetter.value);
    if (
      !Number.isInteger(registerAmounts) ||
      registerAmounts < 1 ||
      registerAmounts > amounts
    ) {
      alertByModal("등록 개수 입력 오류!");
      return;
    }
    if (!Number.isInteger(registerPrice) || registerPrice < 1) {
      alertByModal("등록 가격 입력 오류!");
      return;
    }
    showLoading();
    const res = await axios.post(`/market/register/${code}`, {
      registerAmounts,
      registerPrice,
    });
    const { data } = res;
    const { fatal } = data;
    if (fatal) {
      throw new Error("fatal error");
    } else if (fatal === false) {
      throw new Error("error");
    }
    changeItemAmounts(code, -registerAmounts);
    saleModal.style.display = "none";
    OutOfSaleModal.style.display = "none";
    stopLoading();
  } catch (err: any) {
    stopLoading();
    reload = true;
    alertByModal(
      err.message === "fatal error"
        ? "오류가 발생하여 재접속합니다.\n오류 조사를 위해 해당 계정이 일시적으로 정지될 수 있으니 양해 부탁드립니다."
        : "오류가 발생하여 재접속합니다."
    );
  }
};
const showTotalSalePrice = () => {
  if (
    saleModal.style.display !== "flex" ||
    saleModalTitle.innerText !== "거래소 등록"
  ) {
    return;
  }
  const creatorMarketDiscount = creator.marketDiscount;
  const marketDiscountRate =
    creatorMarketDiscount === "0"
      ? 0
      : Number(
          creatorMarketDiscount.slice(0, creatorMarketDiscount.indexOf(":"))
        ) * 1.5;
  const amounts = Number(saleItemAmountsSetter.value);
  const maxAmounts = Number(saleItemAmountsSetter.max);
  const price = Number(saleItemPriceSetter.value);
  let totalPrice = 0;
  if (
    !Number.isInteger(amounts) ||
    amounts < 1 ||
    !Number.isInteger(price) ||
    price < 1
  ) {
    return;
  }
  if (amounts <= maxAmounts) {
    totalPrice = amounts * price;
  } else {
    saleItemAmountsSetter.value = maxAmounts.toString();
    totalPrice = maxAmounts * price;
  }
  saleItemTotalPriceShower.innerText = Math.floor(
    (totalPrice * (85 + marketDiscountRate)) / 100
  ).toLocaleString();
};

/* cashPart */
const updateCreatorCash = (cash: number) => {
  creator.cash += cash;
  cashContainer.value = creator.cash.toLocaleString();
};
const buyCashItem = (code: string) => async () => {
  try {
    if (loadInterval) {
      return;
    }
    const { itemGrade } = splitCodeToInfoWithoutInspection(code);
    const price = cashItemPriceArr[itemGrade - 1];
    const buyingAmounts = Number(cashItemAmountsSetter.value);
    const totalPrice = price * buyingAmounts;
    if (
      !Number.isInteger(buyingAmounts) ||
      buyingAmounts < 1 ||
      buyingAmounts > 1000
    ) {
      alertByModal("등록 개수 입력 오류!");
      return;
    }
    if (totalPrice > creator.cash) {
      alertByModal("캐시 부족!");
      return;
    }
    showLoading();
    const res = await axios.post(`/item/buyCashItem/${code}`, {
      buyingAmounts,
    });
    const { data } = res;
    const { fatal } = data;
    if (fatal) {
      throw new Error("fatal error");
    } else if (fatal === false) {
      throw new Error("error");
    }
    changeItemAmounts(code, buyingAmounts);
    updateCreatorCash(-totalPrice);
    cashModal.style.display = "none";
    OutOfCashModal.style.display = "none";
    stopLoading();
  } catch (err: any) {
    stopLoading();
    reload = true;
    alertByModal(
      err.message === "fatal error"
        ? "오류가 발생하여 재접속합니다.\n오류 조사를 위해 해당 계정이 일시적으로 정지될 수 있으니 양해 부탁드립니다."
        : "오류가 발생하여 재접속합니다."
    );
  }
};
const openCashMenu = (code: string) => {
  cashModalEventListeners.forEach((obj) => {
    const { listeningElement, eventType, addedFunction } = obj;
    listeningElement.removeEventListener(eventType, addedFunction);
  });
  cashModalEventListeners = [];
  const { itemGrade } = splitCodeToInfoWithoutInspection(code);
  cashModal.style.display = "flex";
  OutOfCashModal.style.display = "block";
  cashItemGradeContainer.innerText = `${changeNumToRome(itemGrade)}`;
  cashItemImg.src = getItemImgSrc(code);
  cashItemAmountsSetter.value = "";
  cashItemPriceSetter.value = cashItemPriceArr[itemGrade - 1].toString();
  cashItemTotalPriceShower.innerText = "";
  const buyCashItemFunc = buyCashItem(code);
  cashModalEventListeners.push({
    listeningElement: cashModalBtn,
    eventType: "click",
    addedFunction: buyCashItemFunc,
  });
  cashModalBtn.addEventListener("click", buyCashItemFunc);
};
const showTotalCashItemPrice = () => {
  const amounts = Number(cashItemAmountsSetter.value);
  const maxAmounts = Number(cashItemAmountsSetter.max);
  const price = Number(cashItemPriceSetter.value);
  let totalPrice = 0;
  if (!Number.isInteger(amounts) || amounts < 1) {
    return;
  }
  if (amounts <= maxAmounts) {
    totalPrice = amounts * price;
  } else {
    cashItemAmountsSetter.value = maxAmounts.toString();
    totalPrice = maxAmounts * price;
  }
  cashItemTotalPriceShower.innerText = totalPrice.toLocaleString();
};

/* footer */
const renderPart = (event: MouseEvent) => {
  if (loadInterval) {
    return;
  }
  const target = event.currentTarget as HTMLButtonElement;
  homePart.style.display = "none";
  itemPart.style.display = "none";
  makePart.style.display = "none";
  marketPart.style.display = "none";
  cashPart.style.display = "none";
  const btnIndex = Array.from(footerBtns).indexOf(target);
  if (btnIndex === 1) {
    itemPartNavBtns[0].click();
  } else if (btnIndex === 2) {
    if (makeModeChangeBtn.innerText === "제작") {
      makeModeChangeBtn.click();
    } else {
      resetMakeNav();
      resetCraftInventory();
      resetCraftExecuter();
    }
  } else if (btnIndex === 3) {
    if ((searchNav.style.display = "none")) {
      marketBuyModeBtn.click();
    } else {
      resetSearchNav();
      resetMarketItemListAndController();
    }
  }
  [homeModal, itemModal, makeModal, makeModal, makeModal][
    btnIndex
  ].style.display = "none";
  [
    OutOfHomeModal,
    OutOfItemModal,
    OutOfMakeModal,
    OutOfMakeModal,
    OutOfMakeModal,
  ][btnIndex].style.display = "none";
  [homePart, itemPart, makePart, marketPart, cashPart][btnIndex].style.display =
    "flex";
};
const changeCreatorExpToLocaleString = () => {
  const creatorExpInfo = creatorExpInfoContainer.innerText;
  creatorExpInfoContainer.innerText =
    Number(
      creatorExpInfo.slice(0, creatorExpInfo.indexOf(" "))
    ).toLocaleString() + creatorExpInfo.slice(creatorExpInfo.indexOf(" "));
  renderExpBar(creatorExpContainer);
};
const updateCreatorLevelExp = (exp: number) => {
  const expToLevelUp =
    10 ** (Math.ceil(creator.level / 10) + 3) * 5 * creator.level;
  creatorLevelContainer.innerText = `LV. ${creator.level}`;
  creatorExpInfoContainer.innerText = `${exp.toLocaleString()} (${(
    (exp / expToLevelUp) *
    100
  ).toFixed(2)}%)`;
  renderExpBar(creatorExpContainer);
};
const changeNick = async () => {
  try {
    if (loadInterval) return;
    const nick = profileNickContainer.value;
    if (nick === creator.nick) {
      profileNickContainer.value = "";
      alertByModal("변경을 희망하는 닉네임을 입력 바랍니다!");
      return;
    }
    const nickTest = testLoginInfo("nick", nick);
    if (!nickTest) {
      profileNickContainer.value = "";
      alertByModal("2~16자 내 영어, 숫자, 한글로만 닉네임 변경 가능!");
      return;
    }
    showLoading();
    const res = await axios.post("/auth/changeNick", { newNick: nick });
    const { data } = res;
    const { fatal } = data;
    if (fatal) {
      throw new Error("fatal error");
    } else if (fatal === false) {
      throw new Error("error");
    }
    const { nickExist } = data;
    stopLoading();
    if (nickExist) {
      profileNickContainer.value = "";
      alertByModal("해당 닉네임이 이미 사용 중입니다.");
    } else {
      profileNickContainer.value = nick;
      alertByModal("해당 닉네임으로 변경되었습니다!");
      reload = true;
    }
  } catch (err: any) {
    stopLoading();
    reload = true;
    alertByModal(
      err.message === "fatal error"
        ? "오류가 발생하여 재접속합니다.\n오류 조사를 위해 해당 계정이 일시적으로 정지될 수 있으니 양해 부탁드립니다."
        : "오류가 발생하여 재접속합니다."
    );
  }
};
const changePassword = async () => {
  try {
    if (loadInterval) return;
    const password = profilePasswordContainer.value;
    const passwordTest = testLoginInfo("password", password);
    if (!passwordTest) {
      profilePasswordContainer.value = "";
      alertByModal("6~16자 내 영어, 숫자로만 비밀번호 변경 가능!");
      return;
    }
    showLoading();
    const res = await axios.post("/auth/changePassword", { password });
    const { data } = res;
    const { fatal } = data;
    if (fatal) {
      throw new Error("fatal error");
    } else if (fatal === false) {
      throw new Error("error");
    }
    stopLoading();
    profileNickContainer.value = "";
    alertByModal("비밀번호 변경 완료!");
    reload = true;
  } catch (err: any) {
    stopLoading();
    reload = true;
    alertByModal(
      err.message === "fatal error"
        ? "오류가 발생하여 재접속합니다.\n오류 조사를 위해 해당 계정이 일시적으로 정지될 수 있으니 양해 부탁드립니다."
        : "오류가 발생하여 재접속합니다."
    );
  }
};

// addEventListener(basic)
homeModalCloseBtn.addEventListener("click", () => {
  homeModal.style.display = "none";
  OutOfHomeModal.style.display = "none";
});

itemPartNavBtns.forEach((btn) => {
  btn.addEventListener("click", openItemInventory);
});
itemPartItemContainers.forEach((container) => {
  container.addEventListener("click", showItemInfo("item"));
});
itemDetailContainer.addEventListener("click", removeItemDetail("item"));
itemDetailExecuteBtn.addEventListener("click", clickDetailExecuteBtn("item"));
itemModalCloseBtn.addEventListener("click", () => {
  itemModal.style.display = "none";
  OutOfItemModal.style.display = "none";
});

makePartNameBtns.forEach((btn) => {
  btn.addEventListener("click", openNavList(makePartNavLists));
});
makePartNavs.forEach((nav) => {
  nav.addEventListener("click", chooseCraftInventoryClassification);
});
makePartItemContainers.forEach((container) => {
  container.addEventListener("click", clickItemInMakePart);
});
makeModeChangeBtn.addEventListener("click", changeMakeMode);
craftBtn.addEventListener("click", clickCraftBtn);
makeModalCloseBtn.addEventListener("click", () => {
  makeModal.style.display = "none";
  OutOfMakeModal.style.display = "none";
});

marketSaleModeBtn.addEventListener("click", changeToSaleMode);
marketBuyModeBtn.addEventListener("click", changeToBuyMode);
searchNameBtns.forEach((btn) => {
  btn.addEventListener("click", openNavList(marketPartNavLists));
});
marketSearchPartNavs.forEach((nav) => {
  nav.addEventListener("click", chooseSearchNav);
});
marketSearchBtn.addEventListener("click", searchItem);
marketInitializeBtn.addEventListener("click", () => {
  resetSearchNav();
  resetMarketItemListAndController();
});
marketBuyBtns.forEach((btn) => {
  btn.addEventListener("click", buyItem);
});
searchLeftEndBtn.addEventListener("click", changeSearchPage("leftEnd"));
searchLeftBtn.addEventListener("click", changeSearchPage("left"));
searchRightBtn.addEventListener("click", changeSearchPage("right"));
searchRightEndBtn.addEventListener("click", changeSearchPage("rightEnd"));
cashItemAmountsSetter.addEventListener("input", showTotalCashItemPrice);
marketSalePartNavBtns.forEach((btn) => {
  btn.addEventListener("click", openSaleInventory);
});
marketPartItemContainers.forEach((container) => {
  container.addEventListener("click", showItemInfo("market"));
});
marketItemDetailContainer.addEventListener("click", removeItemDetail("market"));
marketItemDetailExecuteBtn.addEventListener(
  "click",
  clickDetailExecuteBtn("market")
);
saleItemAmountsSetter.addEventListener("input", showTotalSalePrice);
saleItemPriceSetter.addEventListener("input", showTotalSalePrice);
saleModalCloseBtn.addEventListener("click", () => {
  saleModal.style.display = "none";
  OutOfSaleModal.style.display = "none";
});

cashItemContainers.forEach((container) => {
  container.addEventListener("click", showItemInfo("cash"));
});
cashItemDetailContainer.addEventListener("click", removeItemDetail("cash"));
cashItemDetailExecuteBtn.addEventListener(
  "click",
  clickDetailExecuteBtn("cash")
);
cashModalCloseBtn.addEventListener("click", () => {
  cashModal.style.display = "none";
  OutOfCashModal.style.display = "none";
});

footerBtns.forEach((btn) => {
  btn.addEventListener("click", renderPart);
});
menuBtn.addEventListener("click", () => {
  if (menuBtn_listContainer.style.display === "none") {
    menuBtn_listContainer.style.display = "flex";
  } else {
    menuBtn_listContainer.style.display = "none";
  }
});
profileBtn.addEventListener("click", () => {
  if (loadInterval) return;
  profileModal.style.display = "flex";
  OutOfProfileModal.style.display = "block";
});
profileModalCloseBtn.addEventListener("click", () => {
  profileModal.style.display = "none";
  OutOfProfileModal.style.display = "none";
});
nickChangeBtn.addEventListener("click", changeNick);
passwordChangeBtn.addEventListener("click", changePassword);

alertModal.addEventListener("click", () => {
  alertModal.style.display = "none";
  OutOfAlertModal.style.display = "none";
});

document.addEventListener("click", () => {
  if (reload) {
    logoutLink.click();
    return;
  }
});
window.addEventListener("keydown", () => {
  if (reload) {
    logoutLink.click();
    return;
  }
});
document.addEventListener("click", (event: MouseEvent) => {
  if (event.target !== menuBtn) {
    menuBtn_listContainer.style.display = "none";
  }
});

window.addEventListener("load", () => {
  setTimeout(() => {
    for (const itemClass of availableItemClass) {
      renderItems(itemClass);
    }
    updateCreatorGold(0);
    updateMarketDiscount();
    updateCreatorCash(0);
    changeCreatorExpToLocaleString();
  }, 100);
});
