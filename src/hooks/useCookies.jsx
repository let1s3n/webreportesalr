export const useCookies = () => {

  const saveToCookie = (cookieName, cookieValue) => {
    if (typeof window !== 'undefined') {
      document.cookie = `${cookieName}=${JSON.stringify(cookieValue)}`
    }

  }

  const readCookie = (cookieName, cookieValue) => {
    if (typeof window !== 'undefined') {
      let cookies = document.cookie.split(';')
      let formCookie = "";
      cookies.forEach((cookie) => {
        if (cookie.startsWith(`${cookieName}=`)) {
          formCookie = cookie.replace(`${cookieName}=`, "");
        }
      })
      return formCookie
    }


  }

  return [saveToCookie, readCookie]
}