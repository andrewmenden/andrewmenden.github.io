var tiles = createGridTiles();
var score = [0,0]; //array to get 64 bits

(tiles[0][0]).addEventListener('contextmenu', event => event.preventDefault());

function createGridTiles() {
    var tiles = [];
    
    for (let i = 0; i < 8; i++) {
        let currentRow = [];
        for (let j = 0; j < 8; j++) {
            const e = document.createElement("div");
    
            e.style.gridRow = (8-i).toString();
            e.style.gridColumn = (8-j).toString();
            e.style.backgroundColor = "rgb(46, 46, 50)";
            e.style.borderRadius = "24%";
            e.style.textAlign = "center";
            e.style.fontSize = "8.5vmin";
    
            currentRow.push(e);
            document.getElementById("board").appendChild(e);
        }
        tiles.push(currentRow);
    }
    return tiles;
}

function applyScore(score) {
    let temp = score[0];
    let string = "";
    for (let i = 0; i < 32; i++) {
        let y = i >> 3;
        let x = i & 7;
        if (temp & 1 == 1) {
            tiles[y][x].style.backgroundColor = "rgb(255, 46, 50)";
        } else {
            tiles[y][x].style.backgroundColor = "rgb(46, 46, 50)";
        }
        string += ((temp&1).toString());
        temp >>= 1;
    }

    temp = score[1];
    for (let i = 0; i < 32; i++) {
        let y = i >> 3;
        let x = i % 8;
        if (temp%2 == 1) {
            tiles[y+4][x].style.backgroundColor = "rgb(255, 46, 50)";
        } else {
            tiles[y+4][x].style.backgroundColor = "rgb(46, 46, 50)";
        }
        temp >>= 1;
    }
}

function addToScore(value) {
    if (score[0] == 4294967295) {
        if (score[1] == 4294967295) {
            return; //max reached
        } else {
            score[1]+=value;
        }
    } else {
        score[0]+=value;
    }
    applyScore(score);
}
