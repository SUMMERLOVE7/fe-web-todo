const pipe = (...funcArray) => (firstParam) => 
    funcArray.reduce((curValue, curFunc) => 
        curFunc(curValue), firstParam);

const addEvent = ($target, callBackArray, eventType="click") => {
    callBackArray.forEach((callBack) => 
        $target.addEventListener(eventType, callBack)
    )
}

const multiSelector = (queryArray) => queryArray.map((query) => document.querySelector(query));

export { pipe, addEvent, multiSelector }
