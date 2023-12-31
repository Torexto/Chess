const board = document.querySelector(".board");

import { ResetHighlight, IsWhite, CheckPieces } from "./other.js";

let _SelectedPiece = null;

const def = [
    "rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook",
    "pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn",
    "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank",
    "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank",
    "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank",
    "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank",
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
        this.element.setAttribute("piece-id", this.i);
        if(this.type != "blank" && this.color != "")
        {
            this.element.innerHTML = `<img src="assets/${this.color}Pieces/${this.type}.svg">`;
            this.element.className = `pieces ${this.type} ${this.color} notmoved`;
        }
        else
        {
            this.element.className = `pieces blank`;
        }
        board.appendChild(this.element);
    }
}

function CreateBoard(arr)
{
    board.innerHTML = "";
    _SelectedPiece = null;
    for(var i = 0; i < arr.length; i++)
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

board.addEventListener("click", (event) => {
    const SelectedPiece = CheckPieces(event.target);

    if(_SelectedPiece == null)
    {
        // Select Piece to move
        _SelectedPiece = SelectedPiece;
        if(_SelectedPiece && _SelectedPiece.classList.contains("blank"))
        {
            _SelectedPiece = null;
        }
        else
        {
            HighlightLegalMoves();
        }
    }
    else
    {
        // Select target and check is valid move
        IsValid(SelectedPiece);
    }
})    

function Move(piece)
{
    _SelectedPiece.classList.remove("notmoved");
    piece.innerHTML = _SelectedPiece.innerHTML;
    piece.className = _SelectedPiece.className;
    _SelectedPiece.innerHTML = "";
    _SelectedPiece.className = "pieces blank";
    
    _SelectedPiece = null;
    ResetHighlight();
}
function CheckPromotion(piece, Destignation)
{
    if(Destignation <= 7)
    {
        _SelectedPiece.innerHTML = '<img src="assets/WhitePieces/queen.svg">';
        _SelectedPiece.className = "pieces queen White notmoved";
    }
    else if(Destignation >= 56)
    {
        _SelectedPiece.innerHTML = '<img src="assets/BlackPieces/queen.svg">';
        _SelectedPiece.className = "pieces queen Black notmoved";
    }
    Move(piece);
}

function IsValid(piece)
{
    const PieceLocation = _SelectedPiece.getAttribute("piece-id");
    const Destignation = piece.getAttribute("piece-id");

    // Check Valid move for pawn
    if(_SelectedPiece.classList.contains("pawn")) 
    {
        const isWhite = IsWhite(_SelectedPiece);
        const direction = isWhite ? -1 : 1;
            
        if(Destignation - PieceLocation === 8 * direction && !piece.querySelector("img"))
        {
            CheckPromotion(piece, Destignation);
        }
        else if((_SelectedPiece.classList.contains("notmoved") && (Destignation - PieceLocation === 16 * direction)) && !piece.querySelector("img"))
        {
            CheckPromotion(piece, Destignation);
        }
        else if((isWhite && Destignation - PieceLocation === -7) && piece.querySelector("img"))
        {
            CheckPromotion(piece, Destignation);
        }
        else if((isWhite && Destignation - PieceLocation === -9) && piece.querySelector("img"))
        {
            CheckPromotion(piece, Destignation);
        }
        else if((!isWhite && Destignation - PieceLocation === 7) && piece.querySelector("img"))
        {
            CheckPromotion(piece, Destignation);
        }
        else if((!isWhite && Destignation - PieceLocation === 9) && piece.querySelector("img"))
        {
            CheckPromotion(piece, Destignation);
        }
        else
        {
            _SelectedPiece = null;
            ResetHighlight();
        }
    }

    // Check Valid move for rook
    else if(_SelectedPiece.classList.contains("rook"))
    {

    }
}

function HighlightLegalMoves(piece)
{
    ResetHighlight();
    const PieceLocation = _SelectedPiece.getAttribute("piece-id");
    
    if(_SelectedPiece.classList.contains("pawn")) 
    {
        const isWhite = IsWhite(_SelectedPiece);
        const direction = isWhite ? -1 : 1;
            
        for(var i = 0; i < def.length; i++)
        {
            if(i - PieceLocation === 8 * direction && !document.querySelector(`[piece-id="${i}"] img`))
            {
                Highlight(i);
            }
            else if((_SelectedPiece.classList.contains("notmoved") && (i - PieceLocation === 16 * direction)) && !document.querySelector(`[piece-id="${i}"] img`))
            {
                Highlight(i);
            }
            else if((isWhite && i - PieceLocation === -7) && document.querySelector(`[piece-id="${i}"] img`))
            {
                Highlight(i);
            }
            else if((isWhite && i - PieceLocation === -9) && document.querySelector(`[piece-id="${i}"] img`))
            {
                Highlight(i);
            }
            else if((!isWhite && i - PieceLocation === 7) && document.querySelector(`[piece-id="${i}"] img`))
            {
                Highlight(i);
            }
            else if((!isWhite && i - PieceLocation === 9) && document.querySelector(`[piece-id="${i}"] img`))
            {
                Highlight(i);
            }
        }
    }
}

function Highlight(square)
{
    const targetDiv = document.querySelector(`[piece-id="${square}"]`);
    targetDiv.classList.add("legalmove");
}