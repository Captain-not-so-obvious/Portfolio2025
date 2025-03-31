$(document).ready(function() {

  //sticky header
    $(window).scroll(function() {
      if ($(this).scrollTop() > 1) {
        $(".header-area").addClass("sticky");
      } else {
        $(".header-area").removeClass("sticky");
      }
  
      // Update the active section in the header
      updateActiveSection();
    });
  
    $(".header ul li a").click(function(e) {
      e.preventDefault(); 
  
      var target = $(this).attr("href");
  
      if ($(target).hasClass("active-section")) {
        return; 
      }
  
      if (target === "#home") {
        $("html, body").animate(
          {
            scrollTop: 0 
          },
          500
        );
      } else {
        var offset = $(target).offset().top - 40; 
  
        $("html, body").animate(
          {
            scrollTop: offset
          },
          500
        );
      }
  
      $(".header ul li a").removeClass("active");
      $(this).addClass("active");
    });
  

    //Initial content revealing js
    ScrollReveal({
      distance: "100px",
      duration: 2000,
      delay: 200
    });
  
    ScrollReveal().reveal(".header a, .profile-photo, .about-content, .education", {
      origin: "left"
    });
    ScrollReveal().reveal(".header ul, .profile-text, .about-skills, .internship", {
      origin: "right"
    });
    ScrollReveal().reveal(".project-title, .contact-title", {
      origin: "top"
    });
    ScrollReveal().reveal(".projects, .contact", {
      origin: "bottom"
    });


const form = document.querySelector('.contact-form');
const msg = document.querySelector('.msg');

const carregandoElemento = document.createElement('div');
carregandoElemento.id = 'carregando';
carregandoElemento.innerHTML = '<div class="spinner"></div><p>Enviando...</p>';
carregandoElemento.style.display = 'none'; // Inicialmente oculto
form.parentNode.insertBefore(carregandoElemento, form.nextSibling);

// Adiciona CSS para o spinner e mensagens

const style = document.createElement('style');
estilo.textContent = `
 #carregando {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
  }

  .spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border-left-color: #04b0da;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { tranform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  #msg {
    padding: 10px;
    margin-top: 20opx;
    border-radius: 5px;
    text-align: center;
    transition: all 0.5s ease;
    display: block;
    width: 100%;
    }

  .sucesso-mensagem {
  background-color: rgba(76, 175, 80, 0.2);
  color: #2e7d32;
  border: 1px solid #2e7d32;
  }

  .erro-mensagem {
  background-color: rgba(244, 67, 54, 0.2);
  color: #c62828;
  border: 1px solid #c62828;
  }
  `;

document.head.appendChild(style)

form.addEventListener('envio', function(e) {
// Isso aqui mostra o elemento carregando
carregandoElemento.style.display = 'flex';

// Desabilita o botão de envio, para impedir envios múltiplos
const botaoEnviar = form.querySelector('.envio')
if (botaoEnviar) {
  botaoEnviar.disabled = true;
  botaoEnviar.value = "Enviando...";
};

//Armazena o fato de que estamos enviando
// Usaremos localStorage para verificar após redirecionamento
localStorage.setItem('formSubmitting', 'true');

});

// Verifica após o carregamento da página se acabamos de enviar um formulário
window.addEventListener('load', function() {
  if (this.localStorage.getItem('formSubmitting') === 'true') {
    // Limpa Sinalizador
    localStorage.removeItem('formSubmitting');
    //Mostra mensagem de sucesso
    msg.innerHTML = "Mensagem enviada com sucesso! Em breve entraremos em contato."
    msg.className = "sucesso-mensagem";

    //Remove mensagem logo depois
    this.setTimeout(function() {
      msg.innerHTML = "";
      msg.className = ""; // Remove a classe de sucesso
    }
    , 5000);
  }
  });
  });
  
  function updateActiveSection() {
    var scrollPosition = $(window).scrollTop();
  
    // Checking if scroll position is at the top of the page
    if (scrollPosition === 0) {
      $(".header ul li a").removeClass("active");
      $(".header ul li a[href='#home']").addClass("active");
      return;
    }
  
    // Iterate through each section and update the active class in the header
    $("section").each(function() {
      var target = $(this).attr("id");
      var offset = $(this).offset().top;
      var height = $(this).outerHeight();
  
      if (
        scrollPosition >= offset - 40 &&
        scrollPosition < offset + height - 40
      ) {
        $(".header ul li a").removeClass("active");
        $(".header ul li a[href='#" + target + "']").addClass("active");
      }
    });
  }
  

 