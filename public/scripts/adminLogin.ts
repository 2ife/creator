import axios from "axios";


const loginForm = document.querySelector("#loginForm") as HTMLFormElement;
const loginIdContainer = document.querySelector(
  "#login_id"
) as HTMLInputElement;
const loginPasswordContainer = document.querySelector(
  "#login_password"
) as HTMLInputElement;
const loginBtn = document.querySelector("#loginBtn") as HTMLButtonElement;

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

let loadInterval: any = null;
let reload: boolean = false;

const testLoginInfo = (category: "nick" | "id" | "password", text: string) => {
  let tester = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/;
  switch (category) {
    case "id": {
      tester = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/;
      break;
    }
    case "password": {
      tester = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*()._-]{6,16}$/;
      break;
    }
  }
  return tester.test(text);
};

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

const login = async () => {
  if (loadInterval) {
    return;
  }
  const loginFailMessage =
    "해당 아이디가 존재하지 않거나, 비밀번호가 일치하지 않습니다.";
  const id = loginIdContainer.value;
  const password = loginPasswordContainer.value;
  const idTest = testLoginInfo("id", id);
  const passwordTest = testLoginInfo("password", password);
  if (!idTest || !passwordTest) {
    loginIdContainer.value = "";
    loginPasswordContainer.value = "";
    return alertByModal(loginFailMessage);
  }
  showLoading();
  try {
    const res = await axios.post("/admin/login", { id, password });
    const { data } = res;
    const { fatal, info } = data as {
      info: "noUser" | undefined;
      fatal: boolean | undefined;
    };
    if (fatal) {
      throw new Error("fatal error");
    } else if (fatal === false) {
      throw new Error("error");
    }
    stopLoading();
    if (info === "noUser") {
      reload = true;
      alertByModal(loginFailMessage);
    } else {
      return location.reload();
    }
  } catch (err: any) {
    reload = true;
    alertByModal(
      err.message === "fatal error"
        ? "오류가 발생하여 재접속합니다.\n오류 조사를 위해 해당 계정이 일시적으로 정지될 수 있으니 양해 부탁드립니다."
        : "오류가 발생하여 재접속합니다."
    );
  }
};
loginBtn.addEventListener("click", login);
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
