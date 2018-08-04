let deviceWidth = window.innerWidth;
let deviceHeight = window.innerHeight;
let timeoutsArray = [];

const adjustToScreen = () => {
    deviceWidth = window.innerWidth;
    deviceHeight = window.innerHeight;
    destroyTimeouts();
    startApp();
};

const destroyTimeouts = () => {
    timeoutsArray.forEach(timeout => {
        clearTimeout(timeout);
    });
    timeoutsArray = [];
}

window.addEventListener('resize', adjustToScreen);


const generateColumn = () => {
    return Array(Math.floor(deviceHeight / 20))
    .fill('')
    .map(() => `<span class="bit"></span>`)
    .join('');
};

const generateRows = () => {
    return Array(Math.floor(deviceWidth / 10))
    .fill('')
    .map(col => `<li class="col">${ generateColumn() }</li>`)
    .join('');
}

const bits = document.getElementById('bits');
let cols;
let colsAnimationsCount = [];

const animateColumn = (col, colIndex) => {
    const bits = col.querySelectorAll('.bit');
    const bitsLenght = bits.length;
    let lastDelay = 0;
    colsAnimationsCount[colIndex]++;
    bits.forEach((bit, bitIndex) => {
        lastDelay += Math.abs(Math.random() * 200) + 50;
        let timeout = setTimeout(() => {
            bit.classList.remove('animate');
            bit.textContent = Math.random() >= 0.5 ? '1' : '0';
            let timeout = setTimeout(() => {
                bit.classList.add('animate');
            }, 10)
            timeoutsArray.push(timeout);;
            if (colsAnimationsCount[colIndex] <= 3 && (Math.random() <= 1 / (bitsLenght * 2))) {
                animateColumn(col, colIndex);
            }
            if (bitIndex === bitsLenght - 1) {
                if (colsAnimationsCount[colIndex] <= 2) {
                    animateColumn(col, colIndex);
                } 
                colsAnimationsCount[colIndex]--;
            }
        }, lastDelay);
        timeoutsArray.push(timeout);
    });
}

const startApp = () => {
    bits.innerHTML = generateRows();
    cols = document.querySelectorAll('.col');
    colsAnimationsCount = Array(cols.length).fill('0');
    cols.forEach((col, index) => {
        animateColumn(col, index);
    });
}

startApp();


