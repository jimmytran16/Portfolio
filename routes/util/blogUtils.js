// function to calculate the read time for the posts
const calculateReadTimePerPost = (text)  => {
    const WORDS_PER_MINUTE = 200;
    let minutes = 1;
    let minutes_in_decimal  = text.length / WORDS_PER_MINUTE;

    return (minutes_in_decimal < 1) ? minutes : Math.round(minutes_in_decimal);
}

// export the function
module.exports = {
    calculateReadTimePerPost : calculateReadTimePerPost
}