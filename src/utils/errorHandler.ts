export const getAxiosErrorMsg = (error: any) => {
    let errorMsg = "An unknown error occurred.";
    if (error.response) {
        errorMsg = error.response.data.msg || "An error occurred with the server response";
    } else if (error.request) {
        errorMsg = "Service unavailable now.\nPlease try again later.";
    }

    return errorMsg;
}