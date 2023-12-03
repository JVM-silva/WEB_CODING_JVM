$(document).ready(function () {
    const borderRed = getComputedStyle(document.body).getPropertyValue('--vermelho'),
          borderGreen = getComputedStyle(document.body).getPropertyValue('--verde');

    // fonte: https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
    const rgbToHex = (rgb) => {
        const rgbArr = rgb.substring(4, rgb.length-1)
                          .replace(/ /g, '')
                          .split(','),
              r = rgbArr[0],
              g = rgbArr[1],
              b = rgbArr[2];
         return ('#' + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)).toUpperCase();
    }

    const hasLetter = (txt) => {
        return /[a-ç0-9]/i.test(txt);
    }

    const accountData = JSON.parse(sessionStorage.getItem('login'));

    if (accountData.tipo != 'admin') { $('.admin').css('display', 'none'); }

    $('#email').text(accountData.email);
    $('#cpf').text(accountData.cpf);

    var gerindo = false;
    $('.produtos').toggle();
    $('#gerir-produtos').on('click', () => {
        gerindo = !gerindo;
        if (gerindo) {
            $('.produtos').slideDown(250);
        } else {
            $('.produtos').slideUp(250);
        }
    });

    $('#apagar-dados').on('click', () => {
        sessionStorage.clear();
        localStorage.clear();
        location.href = 'login.html';
    });

    $('#apagar-conta').on('click', () => {
        const allData = JSON.parse(localStorage.getItem('credenciais')),
              currAcc = accountData,
              dataPos = allData.map(e => e.email).indexOf(currAcc.email);
        
        let newData = allData;
        if (dataPos > -1) { newData.splice(dataPos, 1); }
        localStorage.setItem('credenciais', JSON.stringify(newData));
        $('#deslogar').trigger('click');
    });

    $('#apagar-produtos').on('click', () => {
        localStorage.removeItem('produtos');
        $('.produtos div').remove();
    });

    $('#deslogar').on('click', () => {
        localStorage.removeItem('loginSalvo');
        sessionStorage.removeItem('login');
        location.href = 'index.html';
    });

    var editando = false;
    const editarProduto = (obj = undefined, name = undefined, price = undefined, img = undefined) => {
        if (editando) return;

        const novoObj = (obj == undefined);

        const container = $('<div></div>').addClass('produto').addClass('editando'),
              form = $('<form></form>').addClass('form-editando').attr('onsubmit', 'return false;'),
              nameDiv = $('<div></div>').addClass('nome'),
              nameLabel = $('<label></label>').text('Nome');
              inputName = $('<input></input>').attr('type', 'text'),
              priceDiv = $('<div></div>').addClass('preco'),
              priceLabel = $('<label></label>').text('Preço'),
              inputPrice = $('<input></input>').attr('type', 'number')
              imgDiv = $('<div></div>').addClass('imagem'),
              imgLabel = $('<label></label>').text('Imagem'),
              inputImg = $('<input></input>').attr({type: 'text', placeholder: 'URL...'}),
              btnSave = $('<button></button>').addClass('salvar-produto').text('Salvar'),
              btnCancel = $('<button></button>').addClass('cancelar-produto').text('Cancelar');

        if (!novoObj) {
            inputName.val(name);
            inputPrice.val(price);
            if (img != './Imagens/IconesSite/produtoindisponivel.svg') {
                inputImg.val(img);
            }
        } else {
            btnSave.text('Adicionar');
        }

        nameDiv.append(nameLabel);
        nameDiv.append(inputName);
        priceDiv.append(priceLabel);
        priceDiv.append(inputPrice);
        imgDiv.append(imgLabel);
        imgDiv.append(inputImg);
        form.append(nameDiv);
        form.append(priceDiv);
        form.append(imgDiv);
        form.append(btnSave);
        form.append(btnCancel);
        container.append(form);
        
        const voltarVerde = (obj) => {
            obj.css('border-color', borderGreen);
        }

        inputName.on('click', () => { voltarVerde(inputName); });
        inputPrice.on('click', () => { voltarVerde(inputPrice); });

        btnSave.on('click', () => {
            let invalid = false;
            if (!hasLetter(inputName.val())) {
                invalid = true;
                inputName.css('border-color', borderRed);
            }
            if (!hasLetter(inputPrice.val())) {
                invalid = true;
                inputPrice.css('border-color', borderRed);
            }
            if (invalid) return;

            let imgSrc = './Imagens/IconesSite/produtoindisponivel.svg';
            if (hasLetter(inputImg.val())) { imgSrc = inputImg.val(); }

            if (novoObj) {
                adicionarProduto(inputName.val(), inputPrice.val(), inputImg.val());
                $(container).remove();
                $('#add-product').css('display', 'inline-block');
                let dadosProdutos = JSON.parse(localStorage.getItem('produtos'));
                if (dadosProdutos == null) { dadosProdutos = []; }
                const produto = {
                    nome: inputName.val(),
                    preco: inputPrice.val(),
                    img: imgSrc
                }
                dadosProdutos.push(produto);
                localStorage.setItem('produtos', JSON.stringify(dadosProdutos));
            }
            else {
                console.log('não novo');
                let dadosProdutos = JSON.parse(localStorage.getItem('produtos'));
                if (dadosProdutos == null) {
                    alert('Não foi possível editar, tente remover e adicionar o produto novamente.');
                    return;
                }
                for (x in dadosProdutos) {
                    if (dadosProdutos[x].nome == obj.find('.nome').text()) {
                        
                        dadosProdutos[x].nome = inputName.val();
                        dadosProdutos[x].preco = inputPrice.val();
                        dadosProdutos[x].img = imgSrc;
                        break;
                    }
                }
                obj.find('.nome').text(inputName.val());
                obj.find('.preco').text(inputPrice.val());
                obj.find('> img').attr('src', imgSrc);
                obj.toggle();
                container.remove();
                $('#add-product').css('display', 'inline-block');
                localStorage.setItem('produtos', JSON.stringify(dadosProdutos));
            }
            editando = false;
        });

        btnCancel.on('click', () => {
            if (novoObj) {
                $(container).remove();
                $('#add-product').css('display', 'inline-block');
            }
            else {
                obj.toggle();
                container.remove();
                $('#add-product').css('display', 'inline-block');
            }
            editando = false;
        });

        if (novoObj) {
            container.insertBefore($('#add-product'));
            $('#add-product').css('display', 'none');
        }
        else {
            container.insertAfter(obj);
            obj.toggle();
            $('#add-product').css('display', 'none');
        }
    }

    const adicionarProduto = (nome, preco, img = undefined, index = undefined) => {
        if (img == undefined) { img = './Imagens/IconesSite/produtoindisponivel.svg' }
        const novoObj = (index == undefined);

        // criar elementos
        const produto = $('<div></div>').addClass('produto'),
              imgElement = $('<img>').attr({src: img, onerror: 'imgError(this)'}),
              infoBlwImg = $('<div></div>').addClass('info-below-img'),
              txtDiv = $('<div></div>').addClass('texto'),
              pName = $('<p></p>').addClass('nome').text(`${nome}`),
              pPrice = $('<p></p>').text('R$').append('<span class="preco">'+preco+'</span>'),
              buttons = $('<div></div>').addClass('options'),
              pEdit = $('<img>').addClass('lapis').attr('src', './Imagens/IconesSite/lapis.svg'),
              pDelete = $('<img>').addClass('lixeira').attr('src', './Imagens/IconesSite/lixeira.svg');

        // juntar
        buttons.append(pEdit);
        buttons.append(pDelete);
        txtDiv.append(pName);
        txtDiv.append(pPrice);
        infoBlwImg.append(txtDiv);
        infoBlwImg.append(buttons);
        produto.append(imgElement);
        produto.append(infoBlwImg);

        // colocar no site
        if (novoObj) {
            produto.insertBefore($('#add-product'));
        } 
        else {
            produto.insertBefore(index);
            index.remove();
        }

        pEdit.on('click', () => {
            editarProduto(produto, pName.text(), produto.find($('.preco')).text(), imgElement.attr('src'));
            editando = true;
        });

        pDelete.on('click', () => {
            deletarProduto(produto);
        });
    }

    $('#add-product').on('click', () => {
        editarProduto();
        editando = true;
    });

    const deletarProduto = (obj) => {
        const dadosProdutos = JSON.parse(localStorage.getItem('produtos')),
              nome = obj.find('.nome').text();
        if (dadosProdutos == null) {
            alert('Não foi possível remover.');
            return;
        }
        for (i in dadosProdutos) {
            if (dadosProdutos[i].nome == nome) {
                dadosProdutos.splice(i, 1);
            }
        }
        localStorage.setItem('produtos', JSON.stringify(dadosProdutos));
        obj.remove();
    }

    const listarProdutos = () => {
        const produtos = JSON.parse(localStorage.getItem('produtos'));
        for (p in produtos) {
            adicionarProduto(produtos[p].nome, produtos[p].preco, produtos[p].img);
        }
    }

    listarProdutos();
});

function imgError(img) {
    img.onerror = '';
    img.src = './Imagens/IconesSite/produtoindisponivel.svg';
}