

function debounce(cb, delay = 1000){
    //timeout variable is persisted due to closures
    let timeout;
    
    return(...args) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            cb(...args)
        }, delay)
    }
}

export {
    debounce
}