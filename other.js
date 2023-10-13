export function IsWhite(piece)
{
    return piece.classList.contains("White");
}

export function ResetHighLight()
{
    const pieces = document.querySelectorAll(".legalmove");
    pieces.forEach(element => {
        element.classList.remove("legalmove");
    });
}

export function HighLight(fields)
{
    fields.forEach(element => {
        element.classList.add("legalmove")
    });
}

export function CheckPieces(piece)
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