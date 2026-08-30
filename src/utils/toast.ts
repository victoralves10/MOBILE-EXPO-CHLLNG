import Toast from "react-native-toast-message";

// helpers pra mostrar toasts sem repetir config toda hora
export const toastSucesso = (msg: string) =>
    Toast.show({ type: "success", text1: msg, position: "bottom", visibilityTime: 2000, bottomOffset: 90 });

export const toastErro = (msg: string) =>
    Toast.show({ type: "error", text1: msg, position: "bottom", visibilityTime: 2500, bottomOffset: 90 });

export const toastAviso = (msg: string) =>
    Toast.show({ type: "info", text1: msg, position: "bottom", visibilityTime: 2000, bottomOffset: 90 });