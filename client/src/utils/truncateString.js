const truncateString = (str, limit = 100) => {
    if (str.length <= limit) return str;

    return str.substring(0, limit - 3) + '...';


}

export default truncateString;