const board = document.querySelector(".board");
const reset = document.querySelector(".reset")

let _SelectedPiece = null;

const def = [
    "rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook",
    "pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn",
    "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "",
    "pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn",
    "rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"
];

class Piece
{
    constructor(type, color, i)
    {
        this.type = type;
        this.color = color;
        this.i = i;
        this.element = document.createElement('div');
        this.element.className = `pieces ${this.type} ${this.color}`;
        this.element.setAttribute("piece-id", this.i);
        if(this.type != "" && this.color != "")
        {
            this.element.innerHTML = `<img src="assets/${this.color}Pieces/${this.type}.svg">`;
        }
        board.appendChild(this.element);
    }
}

function CreateBoard(arr)
{
    board.innerHTML = "";
    _SelectedPiece = null;
    for(i = 0; i < arr.length; i++)
    {
        if(i <= 15)
        {
            new Piece(arr[i], "Black", i);
        }
        else if(i >= 48)
        {
            new Piece(arr[i], "White", i);
        }
        else
        {
            new Piece(arr[i], "", i);
        }
    }
}

window.onload = CreateBoard(def);

reset.addEventListener("click", () => {
    CreateBoard(def);
});

function CheckPieces(piece)
{
    if(!piece.classList.contains('pieces'))
    {
        return piece.parentNode;
        
    }
    else
    {
        return piece;
    }
}

board.addEventListener("click", (event) => {
    const SelectedPiece = CheckPieces(event.target);

    var bool = Move(SelectedPiece);
})

function Move(piece)
{
    if(_SelectedPiece == null)
    {
        _SelectedPiece = piece;
        return false;
    }
    else
    {
        console.log(piece);
        console.log(_SelectedPiece);

        piece.innerHTML = _SelectedPiece.innerHTML;
        piece.className = _SelectedPiece.className;
        _SelectedPiece.innerHTML = "";
        _SelectedPiece.className = "pieces";
        
        _SelectedPiece = null;
        return true;
    }
}