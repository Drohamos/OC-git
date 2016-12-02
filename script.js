$(function () {
    // Fix bug Firefox
    $("#droite button").prop("disabled", false);

    $('#btn1').click(function () {
        $("#droite button").prop("disabled", true);

        ajoutBouton('Texte du label', 'label');

        $('#conteneur').hide().fadeIn();

        $('#btnok').click(function () {
            var lid = '<span>' + $('#tex').val() + '</span>';
            $('#gauche').append(lid);
            removeConteneur();
        });
    });
    $('#btn2').click(function () {
        $("#droite button").prop("disabled", true);

        ajoutBouton('Id zone de texte', 'zoneTexte');

        $('#conteneur').hide().fadeIn();

        $('#btnok').click(function () {
            var lid = '<input type="text" id="' + $('#tex').val() + '"><br>';
            $('#gauche').append(lid);
            removeConteneur();
        });
    });
    $('#btn3').click(function () {
        $("#droite button").prop("disabled", true);

        ajoutBouton('Texte du bouton', 'bouton');

        $('#conteneur').hide().fadeIn();

        $('#btnok').click(function () {
            var lid = '<button>' + $('#tex').val() + '</button>';
            $('#gauche').append(lid);
            removeConteneur();
        });
    });

    $('#droite').on('click', '#btnCancel', function() {
        removeConteneur();
    });
    
    function removeConteneur()
    {
        // On réactive les boutons
        $("#droite button").prop("disabled", false);

        // Puis fadeOut
        $('#conteneur').fadeOut(function() {
            $('#conteneur').remove();
        });
    }

    function ajoutBouton(texte, hintId)
    {
        $('hr').after(
            '<div id="conteneur">' +
                texte + ' <input type="text" id="tex">' +
                '<button id="btnok">OK</button>' +
                '<button id="btnCancel">Annuler</button>' +
            '</div>'
        );

        loadHint(hintId);
    }

    function loadHint(hindId)
    {
        $.ajaxSetup({
            beforeSend: function(xhr){
                if (xhr.overrideMimeType)
                {
                    xhr.overrideMimeType("application/json");
                }
            }
        });

        // Équivalent de load(), mais permet de récupérer directement des données JSON
        $.getJSON('data.json')
            .done(function(data) {
                $('#conteneur').append('<p>' + data[hindId] + '</p>');
            })
            .fail(function() {
                $('#conteneur').append('<p>Impossible de récupérer les données, essayez sur Firefox.</p>');
            })
        ;
    }
});