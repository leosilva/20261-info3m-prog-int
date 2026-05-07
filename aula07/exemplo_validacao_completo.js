var estados = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR',
			'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

$(document).ready(function() {
	preencherCamposComEstados();
	$("#formulario").on("submit", function(evt) {
		if (validarFormulario() == false) {
			evt.preventDefault();
		}
	});
	$("input[type=radio][name=pagamento]").on("click", function(evt) {
		if (evt.target.id == "pagamentoCartaoCredito") {
			$("#divCartaoCredito").removeClass("d-none");
		} else {
			$("#divCartaoCredito").addClass("d-none");
		}
	});
	$("#botaoAdicionarTelefone").on("click", function() {
		var divTelefone = $("#divTelefones > div").last();
		var divClonada = divTelefone.clone();
		var idDivClonada = calcularIdDivClonada(divClonada);
		$("#divTelefones").append(divClonada);
	});
});

function calcularIdDivClonada(divClonada) {
	var prefixoDDD = "ddd";
	var prefixoNumero = "numero";
	var ultimoId = divClonada.find("label")[0].getAttribute("for").replace(prefixoDDD, "");
	ultimoId = parseInt(ultimoId)
	var novoId = ultimoId + 1;
	$.each(divClonada.find("label[for^=ddd]"), function(i, item) {
		item.setAttribute("for", prefixoDDD + novoId);
		$(this).siblings("div").find("input[id^=ddd]").attr("id", prefixoDDD + novoId);
		$(this).siblings("div").find("input[name^=ddd]").attr("name", prefixoDDD + novoId);
	});
	$.each(divClonada.find("label[for^=numero]"), function(i, item) {
		item.setAttribute("for", prefixoNumero + novoId);
		$(this).siblings("div").find("input[id^=numero]").attr("id", prefixoNumero + novoId);
		$(this).siblings("div").find("input[name^=numero]").attr("name", prefixoNumero + novoId);
	});

	console.log(divClonada);
}

function preencherCamposComEstados() {
	$('#selectEstado').append($('<option>', { 
	        value: "",
	        text : ""
	    }));
	$('#selectNaturalidade').append($('<option>', { 
	        value: "",
	        text : ""
	    }));
	$.each(estados, function (i, item) {
	    $('#selectEstado').append($('<option>', { 
	        value: item,
	        text : item
	    }));
	    $('#selectNaturalidade').append($('<option>', { 
	        value: item,
	        text : item
	    }));
	});
}

function validarFormulario() {
	if (validacaoObrigatoriedade() == false) {
		alert("Verifique os elementos obrigatórios!");
		return false;
	} else if (validacaoEmail() == false) {
		alert("Escreva um e-mail válido!");
		return false;
	} else if (validacaoFormatoCPF() == false) {
		alert("O formato do CPF deve ser 000.000.000-00!");
		return false;
	} else if (validacaoDatas() == false) {
		alert("As datas devem ser no formato DD/MM/YYYY!");
		return false;
	}
}

function validacaoDatas() {
	validacao = true;
	var datas = []
	datas.push($("#dataNasc"));
	datas.push($("#dataExpedicao"));
	$.each(datas, function(i, item) {
		if (item.val().includes("/")) {
			var dataSplitted = item.val().split("/");
			if (dataSplitted[0].length != 2 || dataSplitted[1].length != 2 ||
				dataSplitted[2].length != 4) {
				validacao = false;
			}
		}
		else {
			validacao = false;
		}
	});
	return validacao;
}

function validacaoFormatoCPF() {
	validacao = false;
	var valor = $("#cpf").val();
	if (valor.includes(".") && valor.includes("-")) {
		var strSplittedComCodigo = valor.split("-");
		var strSplittedSemCodigo = strSplittedComCodigo[0].split(".");
		if (strSplittedComCodigo[1].length == 2) {
			validacao = true;
		} else {
			$.each(strSplittedSemCodigo, function(i, item) {
				if (item.length != 3) {
					validacao = false;
				}
			});
		}
	}
	return validacao;
}

function validacaoEmail() {
	if (!$("#email").val().includes("@")) {
		return false;
	} else {
		return true;
	}
}

function validacaoObrigatoriedade(){
	var validacao = true;
	var elementos = $(".obrigatorio");
	$.each(elementos, function(i, item) {
		if (item.tagName == "INPUT" && item.type == "text") {
			validacao = validarCampoTexto(item);
		}
	});
	validacao = validarCamposRadioButton();
	validacao = validarCamposPagamentoCartaoCredito()
	return validacao;
}

function validarCamposPagamentoCartaoCredito(){
	validacao = false;
	if ($("#pagamentoCartaoCredito")[0].checked) {
		validacao = validarTipoCartao();
		validacao = validarCamposTextoCartao();
	} else if ($("#pagamentoBoleto")[0].checked) {
		validacao = true;
	}
	return validacao;
}

function validarCamposTextoCartao() {
	var valicadao = true;
	var elementos = $(".obrigatorioCartao");
	$.each(elementos, function(i, item) {
		if (item.tagName == "INPUT" && item.type == "text") {
			validacao = validarCampoTexto(item);
		}
	});
	return validacao;
}

function validarTipoCartao() {
	var validacao = false;
	var elementos = $("input[type=radio][name=tipoCartao]");
	$.each(elementos, function(i, item) {
		if (item.checked) {
			validacao = true;
		}
	});
	return validacao;
}

function validarCampoTexto(item) {
	if (item.value == "" || item.value == null) {
		return false;
	}
}

function validarCamposRadioButton() {
	var validacao = false;
	validacao = validarRadioButton('sexo');
	validacao = validarRadioButton('linguaEstrangeira');
	validacao = validarRadioButton('pagamento');
	return validacao;
}

function validarRadioButton(name) {
	var validacao = false;
	var elementos = $("input[type=radio][name=" + name + "]");
	$.each(elementos, function(i, item) {
		if (item.checked) {
			validacao = true;
		}
	});
	return validacao;
}

