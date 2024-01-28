function guessThoiGian() {
    var inputText = document.getElementById('inputText').value;
    var ketquaDIV = document.getElementById('result');
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
        kqString = maHoa();
        ketquaDIV.innerText = kqString;

        if (currentIndex >= words.reduce(function (acc, word) {
            return acc + word.length;
        }, 0)) {
            clearInterval(interval);
        }

        currentIndex++;
    }, 1500);


}


function guessChuCai() {
    var inputText = document.getElementById('inputText').value;
    var ketquaDIV = document.getElementById('result');
    var banphimDIV = document.getElementById('characterButtons');
    document.getElementById('inputText').value = "";

    if (inputText.trim() === "") {
        ketquaDIV.innerText = "Vui lòng nhập nội dung.";
        return;
    }

    var words = inputText.split(' ');
    var kqString = "";

    var currentIndex = 0;

    function taoBanPhim() {
        // Remove the character buttons (if any)
        banphimDIV.innerHTML = "";

        // Create buttons for each character in the Vietnamese alphabet
        var banPhim = "abcdđefghijklmnopqrstuvwxyz";
        for (var i = 0; i < banPhim.length; i++) {
            var phimchucai = document.createElement('button');
            phimchucai.innerText = banPhim[i];
            phimchucai.onclick = function () {
                checkAndReveal(this.innerText);
            };
            banphimDIV.appendChild(phimchucai);
        }
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
