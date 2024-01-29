function guessThoiGian() {
    var inputText = document.getElementById('inputText').value;
    var ketquaDIV = document.getElementById('result');
    var beep = new Audio('AUDIO/ClockBeep.mp3');
    document.getElementById('inputText').value = "";

    if (inputText.trim() === "") {
        ketquaDIV.innerText = "Vui lòng nhập nội dung.";
        return;
    }

    var words = inputText.split(' ');
    var kqString = "";

    function maHoa() {
        var mahoaWords = words.map(function (word) {
            return word.substring(0, currentIndex).padEnd(word.length, '_');
        });
        return mahoaWords.join('\n');
    }

    var currentIndex = 0;
    var interval = setInterval(function () {
        // kqString = maHoa();
        // ketquaDIV.innerText = kqString;

        if (currentIndex >= words.reduce(function (acc, word) {
            return acc + word.length;
        }, 0)) {
            clearInterval(interval);
        }
        currentIndex++;
    }, 15000);

    var countdownIndex = 0;
    var tudainhat = words.reduce(function (max, word) {
            return Math.max(max, word.length);
        }, 0);
    function startCountdown() {
        var countdown = 14;
        var countdownInterval = setInterval(function () {
            kqString = maHoa();
            ketquaDIV.innerHTML = `${kqString} <span class="demnguoc">${countdown}</span>`;

            if (countdown === 0) {
                clearInterval(countdownInterval);
                countdownIndex++;
                if (countdownIndex < tudainhat) {
                    setTimeout(startCountdown, 0);
                }
            }
            countdown--;
            beep.play();
        }, 1000);
    }
    startCountdown();
}

function guessChuCai() {
    var inputText = document.getElementById('inputText').value;
    var ketquaDIV = document.getElementById('result');
    var banphimDIV = document.getElementById('characterButtons');
    var pop = new Audio('AUDIO/Pop.wav');
    document.getElementById('inputText').value = "";

    if (inputText.trim() === "") {
        ketquaDIV.innerText = "Vui lòng nhập nội dung.";
        return;
    }

    var words = inputText.split(' ');
    var kqString = "";

    var currentIndex = 0;
    var isUpperCaseChuCai = false;

    function taoBanPhim() {
        banphimDIV.innerHTML = "";

        // Thêm nút chuyển đổi chữ hoa chữ thường
        var toggleCaseBtn = document.createElement('button');
        toggleCaseBtn.innerText = "⬇";
        toggleCaseBtn.onclick = function () {
            pop.play();
            toggleCaseChuCai();
        };
        banphimDIV.appendChild(toggleCaseBtn);

        // Thêm các phím chữ cái
        var banPhim = "abcdđefghijklmnopqrstuvwxyz";
        for (var i = 0; i < banPhim.length; i++) {
            var phimchucai = document.createElement('button');
            phimchucai.innerText = isUpperCaseChuCai ? banPhim[i].toUpperCase() : banPhim[i];
            phimchucai.onclick = function () {
                pop.play();
                checkAndReveal(this.innerText);
            };
            banphimDIV.appendChild(phimchucai);
        }

    }

    function toggleCaseChuCai() {
        isUpperCaseChuCai = !isUpperCaseChuCai;

        var banPhimButtons = document.getElementById('characterButtons').querySelectorAll('button');
        for (var i = 0; i < banPhimButtons.length; i++) {
            var character = isUpperCaseChuCai ? banPhimButtons[i].innerText.toUpperCase() : banPhimButtons[i].innerText.toLowerCase();
            banPhimButtons[i].innerText = character;
        }

        // Thay đổi nội dung của nút
        var toggleCaseBtn = document.getElementById('characterButtons').querySelector('button');
        toggleCaseBtn.innerText = isUpperCaseChuCai ? "⬆" : "⬇";
    }

    function maHoa() {
        var mahoaWords = words.map(function (word) {
            return word.substring(0, currentIndex).padEnd(word.length, '_');
        });
        return mahoaWords.join('\n');
    }

    function checkAndReveal(char) {
        for (var i = 0; i < inputText.trim().length; i++) {
            var baseChar = inputText[i].normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            
            if (baseChar === char) {
                kqString = kqString.split('');
                kqString[i] = char;
                kqString = kqString.join('');
            }
        }
        ketquaDIV.innerText = kqString;
    }

    kqString = maHoa();
    ketquaDIV.innerText = kqString;
    taoBanPhim();
}

function resetContent() {
    document.getElementById('inputText').value = "";
    document.getElementById('result').innerText = "";
    document.getElementById('characterButtons').innerHTML = "";
}
