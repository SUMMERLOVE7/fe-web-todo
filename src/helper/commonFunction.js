const pipe = (...funcArray) => (firstParam) => 
    funcArray.reduce((curValue, curFunc) => 
        curFunc(curValue), firstParam);

export { pipe }
