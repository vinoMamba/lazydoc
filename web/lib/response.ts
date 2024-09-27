export const resOk = <T = any>(message: string, data?: T) => {
  return {
    code: 200,
    message,
    data
  }
}

export const resErr = <T = any>(message: string, data?: T) => {
  return {
    code: 500,
    message,
    data
  }
}

export const res = <T = any>(code: number, message: string, data?: T) => {
  return {
    code,
    message,
    data
  }
}
