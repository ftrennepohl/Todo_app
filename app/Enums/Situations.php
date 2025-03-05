<?php

namespace App\Enums;

enum Situations: string
{
    case Pendente = 'pendente';
    case EmProgresso = 'em progresso';
    case Finalizada = 'finalizada';
}
?>
