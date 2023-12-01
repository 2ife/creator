"use strict";
// var __importDefault = (this && this.__importDefault) || function (mod) {
//     return (mod && mod.__esModule) ? mod : { "default": mod };
// };
// Object.defineProperty(exports, "__esModule", { value: true });
// const axios = __importDefault(require("axios"));
/* html */
const userNavBtn = document.querySelector("#userNavBtn");
const errorNavBtn = document.querySelector("#errorNavBtn");
const userSearchNav = document.querySelector("#userSearchNav");
const userSearchNavBtn = userSearchNav.querySelector(".searchNav_navBtn");
const userSearchNameBtn = userSearchNav.querySelector(".searchNav_nameBtn");
const userSearchNavList = userSearchNavBtn.querySelector(".searchNav_navList");
const userSearchNavs = userSearchNavList.querySelectorAll(".navlist_nav");
const userSearchNavConditionList = userSearchNav.querySelector(".searchNav_conditionList");
const userLockCheckBox = userSearchNav.querySelector("#userLockCheckBox");
const userCashCodeCheckBox = userSearchNav.querySelector("#userCashCodeCheckBox");
const userSearchTextContainer = userSearchNav.querySelector(".searchNav_searchTextContainer");
const userSearchBtn = userSearchNav.querySelector(".searchNav_searchBtn");
const userSearchNavDeleteCashCodeBtn = userSearchNav.querySelector("#userSearchNavDeleteCashCodeBtn");
const userTable = document.querySelector(".userTable");
const userTableHead = document.querySelector(".userTable_head");
const userTableHeadCheckbox = userTableHead.querySelector(".userTable_headCheckbox");
const userTableBody = document.querySelector(".userTable_body");
const userTableBodyRows = userTableBody.querySelectorAll(".userTable_row");
const userTableBodyCheckboxes = userTableBody.querySelectorAll(".userTable_bodyCheckbox");
const userTableController = document.querySelector(".userTableController");
const userTableLeftEndBtn = userTableController.querySelector("#leftEndBtn");
const userTableLeftBtn = userTableController.querySelector("#leftBtn");
const userTableCurrentPageShower = userTableController.querySelector("#currentPage");
const userTableLastPageShower = userTableController.querySelector("#lastPage");
const userTableRightBtn = userTableController.querySelector("#rightBtn");
const userTableRightEndBtn = userTableController.querySelector("#rightEndBtn");
const errorSearchNav = document.querySelector("#errorSearchNav");
const errorSearchNavBtn = errorSearchNav.querySelector(".searchNav_navBtn");
const errorSearchNameBtn = errorSearchNav.querySelector(".searchNav_nameBtn");
const errorSearchNavList = errorSearchNavBtn.querySelector(".searchNav_navList");
const errorSearchNavs = errorSearchNavList.querySelectorAll(".navlist_nav");
const errorFatalCheckBox = errorSearchNav.querySelector(".conditionContainer_checkbox");
const errorSearchTextContainer = errorSearchNav.querySelector(".searchNav_searchTextContainer");
const errorSearchBtn = errorSearchNav.querySelector(".searchNav_searchBtn");
const errorSearchNavDeleteErrorBtn = errorSearchNav.querySelector("#errorSearchNavDeleteErrorBtn");
const errorTable = document.querySelector(".errorTable");
const errorTableHead = document.querySelector(".errorTable_head");
const errorTableHeadCheckbox = errorTableHead.querySelector(".errorTable_headCheckbox");
const errorTableBody = document.querySelector(".errorTable_body");
const errorTableBodyRows = errorTableBody.querySelectorAll(".errorTable_row");
const errorTableBodyCheckboxes = errorTableBody.querySelectorAll(".errorTable_bodyCheckbox");
const errorTableController = document.querySelector(".errorTableController");
const errorTableLeftEndBtn = errorTableController.querySelector("#leftEndBtn");
const errorTableLeftBtn = errorTableController.querySelector("#leftBtn");
const errorTableCurrentPageShower = errorTableController.querySelector("#currentPage");
const errorTableLastPageShower = errorTableController.querySelector("#lastPage");
const errorTableRightBtn = errorTableController.querySelector("#rightBtn");
const errorTableRightEndBtn = errorTableController.querySelector("#rightEndBtn");
const userInfoContainer = document.querySelector(".userInfoContainer");
const userInfoContainerCloseBtn = userInfoContainer.querySelector(".userInfoContainer_closeBtn");
const userInfoTableBody = userInfoContainer.querySelector(".userInfoTable_body");
const userInfoTableBodyCells = userInfoTableBody.querySelectorAll(".userInfoTable_bodyCell");
const userInfoTableNickCell = userInfoTableBody.querySelector(".nickCell");
const userInfoTableIdCell = userInfoTableBody.querySelector(".idCell");
const userInfoTableGoldCell = userInfoTableBody.querySelector(".goldCell");
const userInfoTableCashCell = userInfoTableBody.querySelector(".cashCell");
const userInfoTableLockMemoCell = userInfoTableBody.querySelector(".lockMemoCell");
const userInfoTableCashCodeCell = userInfoTableBody.querySelector(".cashCodeCell");
const errorInfoTableLabel = userInfoContainer.querySelector("#errorInfoTableLabel");
const errorInfoTable = userInfoContainer.querySelector(".errorInfoTable");
const errorInfoTableHeadCheckbox = errorInfoTable.querySelector(".errorInfoTable_headCheckbox");
const errorInfoTableBodyRows = errorInfoTable.querySelectorAll(".errorInfoTable_row");
const errorInfoTableBodyCheckboxes = errorInfoTable.querySelectorAll(".errorInfoTable_bodyCheckbox");
const summonersInfoTableBody = userInfoContainer.querySelector(".summonersInfoTable_body");
const summonersInfoTableBodyRows = summonersInfoTableBody.querySelectorAll(".summonersInfoTable_row");
const totemsInfoTableBody = userInfoContainer.querySelector(".totemsInfoTable_body");
const totemsInfoTableBodyRows = totemsInfoTableBody.querySelectorAll(".totemsInfoTable_row");
const userInfoContainerDeleteCashCodeBtn = userInfoContainer.querySelector("#userInfoContainerDeleteCashCodeBtn");
const userInfoContainerDeleteErrorBtn = userInfoContainer.querySelector("#userInfoContainerDeleteErrorBtn");
const userInfoContainerUserLockBtn = userInfoContainer.querySelector("#userInfoContainerUserLockBtn");
const userInfoContainerDeleteUserBtn = userInfoContainer.querySelector("#userInfoContainerDeleteUserBtn");
const newNickContainer = userInfoContainer.querySelector("#newNickContainer");
const changeNickBtn = userInfoContainer.querySelector("#changeNickBtn");
const goldChangeAllChecker = userInfoContainer.querySelector("#goldChangeAllChecker");
const goldChangeNumberContainer = userInfoContainer.querySelector("#goldChangeNumberContainer");
const changeGoldBtn = userInfoContainer.querySelector("#changeGoldBtn");
const cashChangeAllChecker = userInfoContainer.querySelector("#cashChangeAllChecker");
const cashChangeNumberContainer = userInfoContainer.querySelector("#cashChangeNumberContainer");
const changeCashBtn = userInfoContainer.querySelector("#changeCashBtn");
const itemChangeCodeContainer = userInfoContainer.querySelector("#itemChangeCodeContainer");
const itemChangeAmountsContainer = userInfoContainer.querySelector("#itemChangeAmountsContainer");
const changeItemBtn = userInfoContainer.querySelector("#changeItemBtn");
const alertModal = document.querySelector(".alertModal");
const OutOfAlertModal = document.querySelector(".OutOfAlertModal");
const loadingShower = document.querySelector(".loadingShower");
const outOfLoadingShower = document.querySelector(".outOfLoadingShower");
const usersStrDataContainer = document.querySelector(".usersStrData");
const errorsStrDataContainer = document.querySelector(".errorsStrData");
const users = JSON.parse(usersStrDataContainer.innerText);
const errors = JSON.parse(errorsStrDataContainer.innerText);
let targetUsers = users;
let targetErrors = errors;
let targetUserErrors = {};
let loadInterval = null;
let reload = false;
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
const checkCode = (code) => {
    const underBarNumbers = Array.from(code).filter((str) => str === "_").length;
    if (underBarNumbers !== 2) {
        return false;
    }
    const firstUnderBarIndex = code.indexOf("_");
    const lastUnderBarIndex = code.lastIndexOf("_");
    const itemClass = Number(code.slice(0, firstUnderBarIndex));
    if (![1, 2, 3, 4, 5, 6, 7].includes(itemClass)) {
        return false;
    }
    const itemGrade = Number(code.slice(firstUnderBarIndex + 1, lastUnderBarIndex));
    if (![0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(itemGrade) ||
        (![6, 7].includes(itemClass) && itemGrade === 0)) {
        return false;
    }
    const itemDetail = code.slice(lastUnderBarIndex + 1);
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
/* common(html) */
const clickSearchNavBtn = (part) => (event) => {
    const target = event.target;
    const nameBtn = part === "user" ? userSearchNameBtn : errorSearchNameBtn;
    const navList = part === "user" ? userSearchNavList : errorSearchNavList;
    if (target === nameBtn) {
        if (navList.style.display === "none") {
            navList.style.display = "flex";
        }
        else {
            navList.style.display = "none";
        }
    }
    else if (target.classList.contains("navList_nav")) {
        nameBtn.innerText = target.innerText;
        navList.style.display = "none";
    }
};
const resetMainTable = (part) => {
    const rows = part === "user" ? userTableBodyRows : errorTableBodyRows;
    for (const row of rows) {
        const cells = Array.from(row.children);
        cells.forEach((cell, cellIndex) => {
            if (cellIndex) {
                cell.innerText = "";
            }
        });
    }
    const currentPageShower = part === "user" ? userTableCurrentPageShower : errorTableCurrentPageShower;
    const lastPageShower = part === "user" ? userTableLastPageShower : errorTableLastPageShower;
    currentPageShower.innerText = "";
    lastPageShower.innerText = "";
};
const renderMainTable = (part) => {
    resetMainTable(part);
    const targets = part === "user" ? targetUsers : targetErrors;
    const targetsKeys = Object.keys(targets);
    const targetsLength = targetsKeys.length;
    if (!targetsLength) {
        alertByModal(`해당 조건 부합 ${part === "user" ? "유저" : "에러"} 없음!`);
        return;
    }
    const pages = Math.ceil(targetsLength / 10);
    const lastPageShower = part === "user" ? userTableLastPageShower : errorTableLastPageShower;
    lastPageShower.innerText = pages.toString();
    renderMainTablePage(part, 1);
};
const renderMainTablePage = (part, page) => {
    const currentPageShower = part === "user" ? userTableCurrentPageShower : errorTableCurrentPageShower;
    currentPageShower.innerText = page.toString();
    const targetsInPage = [];
    const currentTargets = part === "user" ? targetUsers : targetErrors;
    const currentTargetsKeys = Object.keys(currentTargets);
    let targetsInPageLength = 0;
    for (const targetId in currentTargets) {
        if (targetsInPageLength === 10) {
            break;
        }
        const target = currentTargets[targetId];
        const targetIndex = currentTargetsKeys.indexOf(targetId);
        if (targetIndex >= 10 * (page - 1) && targetIndex < 10 * page) {
            targetsInPage[targetsInPageLength] = target;
            targetsInPageLength++;
        }
    }
    const tableBodyRows = part === "user" ? userTableBodyRows : errorTableBodyRows;
    tableBodyRows.forEach((row, rowIndex) => {
        const target = targetsInPage[rowIndex];
        if (!target) {
            return;
        }
        switch (part) {
            case "user": {
                const { nick, loginId, id, level, gold, cash, lockMemo, cashCode } = target;
                const cells = Array.from(row.children);
                cells.forEach((cell, cellIndex) => {
                    if (cellIndex) {
                        cell.innerText = `${[nick, loginId, id, level, gold, cash, lockMemo, cashCode][cellIndex - 1]}`;
                    }
                });
                break;
            }
            case "error": {
                const { user, id, place, status, content, fatal } = target;
                const cells = Array.from(row.children);
                cells.forEach((cell, cellIndex) => {
                    if (cellIndex) {
                        cell.innerText = `${[user, id, place, status, content, fatal][cellIndex - 1]}`;
                    }
                });
                break;
            }
        }
    });
};
const clickHeadCheckBox = (part) => () => {
    let headCheckbox = userTableHeadCheckbox;
    let bodyCheckboxes = userTableBodyCheckboxes;
    switch (part) {
        case "error": {
            headCheckbox = errorTableHeadCheckbox;
            bodyCheckboxes = errorTableBodyCheckboxes;
            break;
        }
        case "userError": {
            headCheckbox = errorInfoTableHeadCheckbox;
            bodyCheckboxes = errorInfoTableBodyCheckboxes;
            break;
        }
    }
    const checked = headCheckbox.checked;
    bodyCheckboxes.forEach((checkBox) => {
        checkBox.checked = checked;
    });
};
const getIdsChecked = (part) => {
    let bodyCheckboxes = userTableBodyCheckboxes;
    switch (part) {
        case "error": {
            bodyCheckboxes = errorTableBodyCheckboxes;
            break;
        }
        case "userError": {
            bodyCheckboxes = errorInfoTableBodyCheckboxes;
            break;
        }
    }
    const targetBoxes = Array.from(bodyCheckboxes).filter((box) => {
        return box.checked;
    });
    let targetIds = [];
    targetBoxes.forEach((box) => {
        const idCell = box.parentNode.parentNode.querySelector(".idCell");
        if (idCell.innerText !== "") {
            targetIds.push(Number(idCell.innerText));
        }
    });
    return targetIds;
};
const changeMainTablePage = (part, direction) => () => {
    if (loadInterval)
        return;
    const currentPageShower = part === "user"
        ? userTableCurrentPageShower
        : errorTableCurrentPageShower;
    const currentPage = Number(currentPageShower.innerText);
    if (!currentPage) {
        return;
    }
    const lastPageShower = part === "user" ? userTableLastPageShower : errorTableLastPageShower;
    const lastPage = Number(lastPageShower.innerText);
    if (direction === "leftEnd" && currentPage > 1) {
        resetMainTable(part);
        lastPageShower.innerText = `${lastPage}`;
        renderMainTablePage(part, 1);
    }
    else if (direction === "left" && currentPage > 1) {
        resetMainTable(part);
        lastPageShower.innerText = `${lastPage}`;
        renderMainTablePage(part, currentPage - 1);
    }
    else if (direction === "right" && currentPage < lastPage) {
        resetMainTable(part);
        lastPageShower.innerText = `${lastPage}`;
        renderMainTablePage(part, currentPage + 1);
    }
    else if (direction === "rightEnd" && currentPage < lastPage) {
        resetMainTable(part);
        lastPageShower.innerText = `${lastPage}`;
        renderMainTablePage(part, lastPage);
    }
};
/* header */
const changeSearchPart = (part) => () => {
    if (loadInterval)
        return;
    userInfoContainer.style.display = "none";
    switch (part) {
        case "user": {
            userSearchNav.style.display = "flex";
            userTable.style.display = "table";
            userTableController.style.display = "flex";
            errorSearchNav.style.display = "none";
            errorTable.style.display = "none";
            errorTableController.style.display = "none";
            break;
        }
        case "error": {
            userSearchNav.style.display = "none";
            userTable.style.display = "none";
            userTableController.style.display = "none";
            errorSearchNav.style.display = "flex";
            errorTable.style.display = "table";
            errorTableController.style.display = "flex";
            break;
        }
    }
};
/* user */
const searchUser = () => {
    const userSearchClass = userSearchNameBtn.innerText;
    const userLock = userLockCheckBox.checked;
    const userCashCode = userCashCodeCheckBox.checked;
    const searchText = userSearchTextContainer.value;
    userSearchTextContainer.value = "";
    if (!["닉네임", "ID", "ID(DB)"].includes(userSearchClass)) {
        reload = true;
        alertByModal("분류 설정 오류!");
        return;
    }
    targetUsers = {};
    for (const userId in users) {
        const user = users[userId];
        let targetOrNot = false;
        if ((userSearchClass === "닉네임" && user.nick.includes(searchText)) ||
            (userSearchClass === "ID" && user.loginId.includes(searchText)) ||
            (userSearchClass === "ID(DB)" && Number(userId) === Number(searchText))) {
            targetOrNot = true;
        }
        if (targetOrNot &&
            (userLock ? user.lockMemo !== null : user.lockMemo === null) &&
            (userCashCode ? user.cashCode !== null : user.cashCode === null)) {
            targetUsers[userId] = user;
        }
    }
    renderMainTable("user");
};
const lockOrUnlockUser = async () => {
    try {
        if (loadInterval)
            return;
        showLoading();
        const userId = Number(userInfoTableIdCell.innerText);
        const lockMemo = newNickContainer.value;
        const res = await axios.default.post(`/admin/lock/${userId}`, { lockMemo });
        const { data } = res;
        const { fatal } = data;
        if (fatal) {
            throw new Error("fatal error");
        }
        else if (fatal === false) {
            throw new Error("error");
        }
        const user = users[userId];
        const userInTargetUsers = targetUsers[userId];
        const userLock = user.lockMemo !== null ? true : false;
        if (userLock) {
            user.lockMemo = null;
            userInTargetUsers.lockMemo = null;
            userInfoTableLockMemoCell.innerText = "null";
        }
        else {
            user.lockMemo = lockMemo;
            userInTargetUsers.lockMemo = lockMemo;
            userInfoTableLockMemoCell.innerText = lockMemo;
        }
        stopLoading();
    }
    catch (err) {
        reload = true;
        alertByModal(err.message === "fatal error"
            ? "오류가 발생하여 재접속합니다.\n오류 조사를 위해 해당 계정이 일시적으로 정지될 수 있으니 양해 부탁드립니다."
            : "오류가 발생하여 재접속합니다.");
    }
};
const resetErrorInfoTableBodyRows = () => {
    for (const row of errorInfoTableBodyRows) {
        const cells = Array.from(row.children);
        cells.forEach((cell, index) => {
            if (index) {
                cell.innerText = "";
            }
        });
    }
};
const renderErrorInfoTableBodyRows = () => {
    const targetUserErrorsKeys = Object.keys(targetUserErrors);
    const targetUserErrorsLength = targetUserErrorsKeys.length;
    if (targetUserErrorsLength) {
        errorInfoTableLabel.innerText = `에러 (${targetUserErrorsLength})`;
        for (let i = 0; i < targetUserErrorsLength; i++) {
            if (i > 4) {
                break;
            }
            const errorId = Number(targetUserErrorsKeys[i]);
            const error = targetUserErrors[errorId];
            const { user, id, place, status, content, fatal } = error;
            for (let j = 0; j < 6; j++) {
                const cell = errorInfoTableBodyRows[i].children[j + 1];
                cell.innerText = `${[user, id, place, status, content, fatal][j]}`;
            }
        }
    }
    else {
        errorInfoTableLabel.innerText = "에러";
    }
};
const openUserInfo = async (event) => {
    try {
        if (loadInterval)
            return;
        const target = event.target;
        if (target.cellIndex !== 4)
            return;
        const targetIdContainer = target.parentNode.querySelector(".idCell");
        const targetId = Number(targetIdContainer.innerText);
        const targetUser = targetUsers[targetId];
        if (!targetUser) {
            reload = true;
            alertByModal("해당 유저 없음!");
            return;
        }
        userSearchNav.style.display = "none";
        userTable.style.display = "none";
        userTableController.style.display = "none";
        const { nick, loginId, id, level, gold, cash, lockMemo, cashCode } = targetUser;
        targetUserErrors = {};
        for (const errorId in errors) {
            const error = errors[errorId];
            if (error.user === id) {
                targetUserErrors[errorId] = error;
            }
        }
        userInfoTableBodyCells.forEach((cell, index) => {
            cell.innerText = `${[nick, loginId, id, level, gold, cash, lockMemo, cashCode][index]}`;
        });
        resetErrorInfoTableBodyRows();
        renderErrorInfoTableBodyRows();
        showLoading();
        const res = await axios.default.post(`/admin/userInfo/${id}`);
        const { data } = res;
        const { fatal } = data;
        if (fatal) {
            throw new Error("fatal error");
        }
        else if (fatal === false) {
            throw new Error("error");
        }
        const { summonersData, totemsData } = data;
        summonersData.forEach((summoner) => {
            const { summonerIndex, grade, level } = summoner;
            for (let i = 0; i < 3; i++) {
                const targetCell = summonersInfoTableBodyRows[i].children[summonerIndex];
                targetCell.innerText = `${[summonerIndex, grade, level][i]}`;
            }
        });
        totemsData.forEach((totem) => {
            const { totemIndex, grade, level } = totem;
            for (let i = 0; i < 3; i++) {
                const targetCell = totemsInfoTableBodyRows[i].children[totemIndex];
                targetCell.innerText = `${[totemIndex, grade, level][i]}`;
            }
        });
        userInfoContainer.style.display = "flex";
        stopLoading();
    }
    catch (err) {
        reload = true;
        alertByModal(err.message === "fatal error"
            ? "오류가 발생하여 재접속합니다.\n오류 조사를 위해 해당 계정이 일시적으로 정지될 수 있으니 양해 부탁드립니다."
            : "오류가 발생하여 재접속합니다.");
    }
};
const deleteCashCode = (part) => async () => {
    try {
        if (loadInterval)
            return;
        let targetIds = [];
        switch (part) {
            case "user": {
                targetIds = getIdsChecked("user");
                break;
            }
            case "userInfo": {
                targetIds.push(Number(userInfoTableIdCell.innerText));
                break;
            }
        }
        showLoading();
        const res = await axios.default.post("/admin/deleteCashCode", {
            userIds: targetIds,
        });
        const { data } = res;
        const { fatal } = data;
        if (fatal) {
            throw new Error("fatal error");
        }
        else if (fatal === false) {
            throw new Error("error");
        }
        targetIds.forEach((id) => {
            const user = users[id];
            user.cashCode = null;
        });
        stopLoading();
        switch (part) {
            case "user": {
                userNavBtn.click();
                userLockCheckBox.checked = false;
                userCashCodeCheckBox.checked = false;
                userSearchBtn.click();
                break;
            }
            case "userInfo": {
                userInfoTableCashCodeCell.innerText = "null";
                break;
            }
        }
    }
    catch (err) {
        reload = true;
        alertByModal(err.message === "fatal error"
            ? "오류가 발생하여 재접속합니다.\n오류 조사를 위해 해당 계정이 일시적으로 정지될 수 있으니 양해 부탁드립니다."
            : "오류가 발생하여 재접속합니다.");
    }
};
const deleteError = (part) => async () => {
    try {
        if (loadInterval)
            return;
        let targetIds = [];
        switch (part) {
            case "error": {
                targetIds = getIdsChecked("error");
                break;
            }
            case "userInfo": {
                targetIds = getIdsChecked("userError");
                break;
            }
        }
        showLoading();
        const res = await axios.default.post("/admin/deleteError", {
            errorIds: targetIds,
        });
        const { data } = res;
        const { fatal } = data;
        if (fatal) {
            throw new Error("fatal error");
        }
        else if (fatal === false) {
            throw new Error("error");
        }
        targetIds.forEach((id) => {
            delete errors[id];
            if (part === "userInfo") {
                delete targetUserErrors[id];
            }
        });
        stopLoading();
        switch (part) {
            case "error": {
                errorNavBtn.click();
                errorFatalCheckBox.checked = false;
                errorSearchBtn.click();
                break;
            }
            case "userInfo": {
                resetErrorInfoTableBodyRows();
                renderErrorInfoTableBodyRows();
                break;
            }
        }
    }
    catch (err) {
        reload = true;
        alertByModal(err.message === "fatal error"
            ? "오류가 발생하여 재접속합니다.\n오류 조사를 위해 해당 계정이 일시적으로 정지될 수 있으니 양해 부탁드립니다."
            : "오류가 발생하여 재접속합니다.");
    }
};
const deleteUser = async () => {
    try {
        if (loadInterval)
            return;
        if (newNickContainer.value !== "삭제") {
            return;
        }
        const userId = Number(userInfoTableIdCell.innerText);
        showLoading();
        const res = await axios.default.post(`/admin/deleteUser/${userId}`);
        const { data } = res;
        const { fatal } = data;
        if (fatal) {
            throw new Error("fatal error");
        }
        else if (fatal === false) {
            throw new Error("error");
        }
        stopLoading();
        reload = true;
        alertByModal("해당 계정이 삭제되었습니다!");
    }
    catch (err) {
        reload = true;
        alertByModal(err.message === "fatal error"
            ? "오류가 발생하여 재접속합니다.\n오류 조사를 위해 해당 계정이 일시적으로 정지될 수 있으니 양해 부탁드립니다."
            : "오류가 발생하여 재접속합니다.");
    }
};
const changeUserNick = async () => {
    try {
        if (loadInterval)
            return;
        const currentNick = userInfoTableNickCell.innerText;
        const newNick = newNickContainer.value;
        if (!newNick || currentNick === newNick)
            return;
        const nickTester = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/;
        if (!nickTester.test(newNick)) {
            alertByModal("2 ~ 16자 내 영어, 숫자, 한글로 작성하세요!");
            newNickContainer.value = "";
            return;
        }
        const userId = Number(userInfoTableIdCell.innerText);
        showLoading();
        const res = await axios.default.post(`/admin/changeNick/${userId}`, { newNick });
        const { data } = res;
        const { fatal } = data;
        if (fatal) {
            throw new Error("fatal error");
        }
        else if (fatal === false) {
            throw new Error("error");
        }
        users[userId].nick = newNick;
        targetUsers[userId].nick = newNick;
        userInfoTableNickCell.innerText = newNick;
        newNickContainer.value = "";
        stopLoading();
    }
    catch (err) {
        reload = true;
        alertByModal(err.message === "fatal error"
            ? "오류가 발생하여 재접속합니다.\n오류 조사를 위해 해당 계정이 일시적으로 정지될 수 있으니 양해 부탁드립니다."
            : "오류가 발생하여 재접속합니다.");
    }
};
const changeUserGold = async () => {
    try {
        if (loadInterval)
            return;
        const gold = Number(goldChangeNumberContainer.value);
        if (!Number.isInteger(gold)) {
            alertByModal("숫자를 입력하세요!");
            goldChangeNumberContainer.value = "";
            return;
        }
        const currentGold = Number(userInfoTableGoldCell.innerText);
        if (currentGold + gold < 0) {
            goldChangeNumberContainer.value = "";
            alertByModal("보유 골드를 초과하는 골드 감소 불가!");
            return;
        }
        const allCheck = goldChangeAllChecker.checked;
        if (allCheck && gold < 0) {
            alertByModal("전체 유저 대상으로는 증가만 가능!");
            return;
        }
        const userId = Number(userInfoTableIdCell.innerText);
        showLoading();
        const res = await axios.default.post("/admin/changeGold", {
            userId: allCheck ? "all" : userId,
            gold,
        });
        const { data } = res;
        const { fatal } = data;
        if (fatal) {
            throw new Error("fatal error");
        }
        else if (fatal === false) {
            throw new Error("error");
        }
        if (allCheck) {
            reload = true;
        }
        else {
            users[userId].gold += gold;
            userInfoTableGoldCell.innerText = `${currentGold + gold}`;
            goldChangeAllChecker.checked = false;
            goldChangeNumberContainer.value = "";
        }
        stopLoading();
        alertByModal(`${gold} 골드 지급 완료!`);
    }
    catch (err) {
        reload = true;
        alertByModal(err.message === "fatal error"
            ? "오류가 발생하여 재접속합니다.\n오류 조사를 위해 해당 계정이 일시적으로 정지될 수 있으니 양해 부탁드립니다."
            : "오류가 발생하여 재접속합니다.");
    }
};
const changeUserCash = async () => {
    try {
        if (loadInterval)
            return;
        const cash = Number(cashChangeNumberContainer.value);
        if (!Number.isInteger(cash)) {
            alertByModal("숫자를 입력하세요!");
            cashChangeNumberContainer.value = "";
            return;
        }
        const allCheck = cashChangeAllChecker.checked;
        if (allCheck && cash < 0) {
            alertByModal("전체 유저 대상으로는 증가만 가능!");
            return;
        }
        const currentCash = Number(userInfoTableCashCell.innerText);
        if (currentCash + cash < 0) {
            cashChangeNumberContainer.value = "";
            alertByModal("보유 골드를 초과하는 골드 감소 불가!");
            return;
        }
        const userId = Number(userInfoTableIdCell.innerText);
        showLoading();
        const res = await axios.default.post("/admin/changeCash", {
            userId: allCheck ? "all" : userId,
            cash,
        });
        const { data } = res;
        const { fatal } = data;
        if (fatal) {
            throw new Error("fatal error");
        }
        else if (fatal === false) {
            throw new Error("error");
        }
        if (allCheck) {
            reload = true;
        }
        else {
            users[userId].cash += cash;
            userInfoTableCashCell.innerText = `${currentCash + cash}`;
            cashChangeAllChecker.checked = false;
            cashChangeNumberContainer.value = "";
        }
        stopLoading();
        alertByModal(`${cash} 캐시 지급 완료!`);
    }
    catch (err) {
        reload = true;
        alertByModal(err.message === "fatal error"
            ? "오류가 발생하여 재접속합니다.\n오류 조사를 위해 해당 계정이 일시적으로 정지될 수 있으니 양해 부탁드립니다."
            : "오류가 발생하여 재접속합니다.");
    }
};
const changeUserItem = async () => {
    try {
        if (loadInterval)
            return;
        const itemCode = itemChangeCodeContainer.value;
        const codeValid = checkCode(itemCode);
        if (!codeValid) {
            alertByModal("코드 이상!");
            itemChangeCodeContainer.value = "";
            return;
        }
        const itemAmounts = Number(itemChangeAmountsContainer.value);
        if (!Number.isInteger(itemAmounts) || itemAmounts === 0) {
            alertByModal("0 이외의 정수를 입력하세요!");
            itemChangeAmountsContainer.value = "";
            return;
        }
        const userId = Number(userInfoTableIdCell.innerText);
        showLoading();
        const res = await axios.default.post(`/admin/changeItem/${userId}`, {
            itemCode,
            itemAmounts,
        });
        const { data } = res;
        const { fatal } = data;
        if (fatal) {
            throw new Error("fatal error");
        }
        else if (fatal === false) {
            throw new Error("error");
        }
        itemChangeCodeContainer.value = "";
        itemChangeAmountsContainer.value = "";
        alertByModal("아이템 수량 변경 완료!");
        stopLoading();
    }
    catch (err) {
        reload = true;
        alertByModal(err.message === "fatal error"
            ? "오류가 발생하여 재접속합니다.\n오류 조사를 위해 해당 계정이 일시적으로 정지될 수 있으니 양해 부탁드립니다."
            : "오류가 발생하여 재접속합니다.");
    }
};
/* error */
const searchError = () => {
    const errorSearchClass = errorSearchNameBtn.innerText;
    const errorFatal = errorFatalCheckBox.checked;
    const searchText = errorSearchTextContainer.value;
    errorSearchTextContainer.value = "";
    if (!["유저", "위치", "내용"].includes(errorSearchClass)) {
        reload = true;
        alertByModal("분류 설정 오류!");
        return;
    }
    targetErrors = {};
    for (const errorId in errors) {
        const error = errors[errorId];
        let targetOrNot = false;
        if ((errorSearchClass === "유저" &&
            ((!error.user && searchText === "") ||
                error.user === Number(searchText))) ||
            (errorSearchClass === "위치" && error.place.includes(searchText)) ||
            (errorSearchClass === "내용" && error.content.includes(searchText))) {
            targetOrNot = true;
        }
        if (targetOrNot && error.fatal === errorFatal) {
            targetErrors[errorId] = error;
        }
    }
    renderMainTable("error");
};
/* userInfo */
const closeUserInfoContainer = () => {
    if (loadInterval)
        return;
    userSearchNav.style.display = "flex";
    userTable.style.display = "table";
    userTableController.style.display = "flex";
    userInfoContainer.style.display = "none";
    userSearchBtn.click();
};
/* etc */
const alertByModal = (msg) => {
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
/* eventListener */
userNavBtn.addEventListener("click", changeSearchPart("user"));
errorNavBtn.addEventListener("click", changeSearchPart("error"));
userSearchNavBtn.addEventListener("click", clickSearchNavBtn("user"));
userSearchBtn.addEventListener("click", searchUser);
userSearchNavDeleteCashCodeBtn.addEventListener("click", deleteCashCode("user"));
userTableHeadCheckbox.addEventListener("click", clickHeadCheckBox("user"));
userTableBodyRows.forEach((row) => {
    row.addEventListener("click", openUserInfo);
});
errorSearchNavBtn.addEventListener("click", clickSearchNavBtn("error"));
errorSearchBtn.addEventListener("click", searchError);
errorSearchNavDeleteErrorBtn.addEventListener("click", deleteError("error"));
errorTableHeadCheckbox.addEventListener("click", clickHeadCheckBox("error"));
userTableLeftEndBtn.addEventListener("click", changeMainTablePage("user", "leftEnd"));
userTableLeftBtn.addEventListener("click", changeMainTablePage("user", "left"));
userTableRightBtn.addEventListener("click", changeMainTablePage("user", "right"));
userTableRightEndBtn.addEventListener("click", changeMainTablePage("user", "rightEnd"));
errorTableLeftEndBtn.addEventListener("click", changeMainTablePage("error", "leftEnd"));
errorTableLeftBtn.addEventListener("click", changeMainTablePage("error", "left"));
errorTableRightBtn.addEventListener("click", changeMainTablePage("error", "right"));
errorTableRightEndBtn.addEventListener("click", changeMainTablePage("error", "rightEnd"));
userInfoContainerCloseBtn.addEventListener("click", closeUserInfoContainer);
errorInfoTableHeadCheckbox.addEventListener("click", clickHeadCheckBox("userError"));
userInfoContainerDeleteCashCodeBtn.addEventListener("click", deleteCashCode("userInfo"));
userInfoContainerDeleteErrorBtn.addEventListener("click", deleteError("userInfo"));
userInfoContainerUserLockBtn.addEventListener("click", lockOrUnlockUser);
userInfoContainerDeleteUserBtn.addEventListener("click", deleteUser);
changeNickBtn.addEventListener("click", changeUserNick);
changeGoldBtn.addEventListener("click", changeUserGold);
changeCashBtn.addEventListener("click", changeUserCash);
changeItemBtn.addEventListener("click", changeUserItem);
alertModal.addEventListener("click", () => {
    alertModal.style.display = "none";
    OutOfAlertModal.style.display = "none";
});
document.addEventListener("click", () => {
    if (reload) {
        return location.reload();
    }
});
window.addEventListener("keydown", () => {
    if (reload) {
        return location.reload();
    }
});
/* first func */
usersStrDataContainer.remove();
errorsStrDataContainer.remove();
renderMainTable("user");
renderMainTable("error");
