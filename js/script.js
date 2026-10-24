// JavaScript - CBMR Landing Page

document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================================================
    // 1. CONTROLE DO MENU MOBILE (Mantido para não quebrar o layout responsivo)
    // =========================================================================
    const mobileMenu = document.getElementById('mobile-menu');
    const openMenuBtn = document.getElementById('open-menu');
    const closeMenuBtn = document.getElementById('close-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    const toggleMenu = () => {
        if (mobileMenu) {
            mobileMenu.classList.toggle('translate-x-full');
        }
    };

    if (openMenuBtn) {
        openMenuBtn.addEventListener('click', toggleMenu);
    }

    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', toggleMenu);
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu) {
                mobileMenu.classList.add('translate-x-full');
            }
        });
    });


    // =========================================================================
    // 2. FORMULÁRIO DE PATROCÍNIO (Sua estrutura assíncrona adaptada ao Index anterior)
    // =========================================================================
    // Buscando pelo ID do formulário do seu index anterior: 'sponsor-contact-form'
    const form = document.getElementById('sponsor-contact-form');
    
    if (form) {
        const submitBtn = form.querySelector('button[type="submit"]');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            
            // Sua chave de acesso do Web3Forms
            formData.append("access_key", "41ee962e-6776-4c60-bf1a-1971c9f5b292");
            
            // Enviando as diretrizes de assunto/remetente direto pelo JS (assim seu HTML não muda!)
            formData.append("subject", "[CBMR 2026] Nova Proposta de Patrocínio!");
            formData.append("from_name", "Landing Page CBMR");

            const originalText = submitBtn.textContent;
            submitBtn.textContent = "Enviando...";
            submitBtn.disabled = true;

            try {
                const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    body: formData
                });
                
                const data = await response.json();
                
                // Valida se a requisição foi bem sucedida no servidor e na API
                if (response.ok && data.success) {
                    alert("Sucesso! Sua proposta de parceria foi enviada. Entraremos em contato em breve.");
                    form.reset();
                } else {
                    alert("Erro: " + (data.message || "Não foi possível enviar a mensagem."));
                }
            } catch (error) {
                alert("Algo deu errado. Por favor, verifique sua conexão e tente novamente.");
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // =========================================================================
    // 3. CARROSSEL DE EQUIPES - FOCO CENTRAL DINÂMICO
    // =========================================================================
    
    // Array completo com as 16 equipes mapeadas individualmente
    const equipesData = [
        // LIGA PRINCIPAL (Ícone: Prancheta 8.png)
        { name: "Allwayss", img: "img/Allwayss.PNG", liga: "LIGA PRINCIPAL", icon: "img/Prancheta 8.png" },
        { name: "Team-neXus", img: "img/Team-neXus.PNG", liga: "LIGA PRINCIPAL", icon: "img/Prancheta 8.png" },
        { name: "Ei Nerd Esports", img: "img/Ei Nerd Esports.png", liga: "LIGA PRINCIPAL", icon: "img/Prancheta 8.png" },
        { name: "Desgraces", img: "img/Desgraces.png", liga: "LIGA PRINCIPAL", icon: "img/Prancheta 8.png" },
        { name: "AURA FARMERS", img: "img/AURA FARMERS.png", liga: "LIGA PRINCIPAL", icon: "img/Prancheta 8.png" },
        { name: "Ðeviants", img: "img/Deviants.png", liga: "LIGA PRINCIPAL", icon: "img/Prancheta 8.png" },
        { name: "BKs E-SPORTS", img: "img/BKs E-Sports.PNG", liga: "LIGA PRINCIPAL", icon: "img/Prancheta 8.png" },
        { name: "mosKa", img: "img/mosKa.png", liga: "LIGA PRINCIPAL", icon: "img/Prancheta 8.png" },
        
        // LIGA DESAFIANTE (Ícone: Prancheta 6.png)
        { name: "Virtual Gang", img: "img/Virtual Gang.png", liga: "LIGA DESAFIANTE", icon: "img/Prancheta 6.png" },
        { name: "GRIFFOS_GG", img: "img/GRIFFOS_GG.png", liga: "LIGA DESAFIANTE", icon: "img/Prancheta 6.png" },
        { name: "MONØLITH", img: "img/MONØLITH.png", liga: "LIGA DESAFIANTE", icon: "img/Prancheta 6.png" },
        { name: "Calamity One", img: "img/Calamity One.png", liga: "LIGA DESAFIANTE", icon: "img/Prancheta 6.png" },
        { name: "TAKI E-SPORT", img: "img/TAKI E-SPORT.png", liga: "LIGA DESAFIANTE", icon: "img/Prancheta 6.png" },
        { name: "Catiços", img: "img/Catiços.png", liga: "LIGA DESAFIANTE", icon: "img/Prancheta 6.png" },
        { name: "Bks Academy", img: "img/Bks E-sports Academy.png", liga: "LIGA DESAFIANTE", icon: "img/Prancheta 6.png" },
        { name: "Lycanthrope", img: "img/Lycanthrope.png", liga: "LIGA DESAFIANTE", icon: "img/Prancheta 6.png" }
    ];

    const stage = document.getElementById('teams-stage');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');

    if (stage && prevBtn && nextBtn) {
        let currentIndex = 0;

        // Container pai preparado para receber os posicionamentos absolutos
        stage.className = "flex items-center justify-center relative min-h-[450px] overflow-hidden w-full px-4";

        // Injeta todos os 16 cards de uma vez no HTML no primeiro carregamento
        equipesData.forEach((team, index) => {
            const badgeColor = team.liga === "LIGA PRINCIPAL" ? "text-gold-400 border-gold-500/20 bg-gold-900/40" : "text-gray-400 border-white/10 bg-dark-900/80";
            
            const cardHTML = `
                <div class="team-card absolute w-full max-w-[285px] md:max-w-[320px] glass-card p-6 rounded-xl text-center flex flex-col items-center justify-center transition-all duration-700 ease-out transform pointer-events-none opacity-0 scale-75" data-index="${index}">
                    <img src="${team.icon}" alt="Ícone ${team.liga}" class="absolute top-4 right-4 w-12 h-12 object-contain opacity-90 filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                    <span class="absolute top-4 left-4 text-[8px] font-orbitron font-extrabold tracking-widest ${badgeColor} border px-2 py-0.5 rounded shadow-sm">
                        ${team.liga}
                    </span>
                    <div class="h-40 flex items-center justify-center mb-4 mt-8 w-full">
                        <img src="${team.img}" alt="Logo ${team.name}" class="max-h-28 max-w-[80%] object-contain filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.3)]">
                    </div>
                    <h3 class="team-name font-orbitron font-black text-white text-base tracking-wide uppercase truncate max-w-[90%] transition-colors duration-500">
                        ${team.name}
                    </h3>
                </div>
            `;
            stage.insertAdjacentHTML('beforeend', cardHTML);
        });

        const cards = stage.querySelectorAll('.team-card');

        // FUNÇÃO DE RENDERIZAÇÃO RETORNADA E CORRIGIDA
        function renderCarousel() {
            const total = equipesData.length;

            cards.forEach((card, index) => {
                let offset = index - currentIndex;
                
                // Ajuste infinito circular
                if (offset < -total / 2) offset += total;
                if (offset > total / 2) offset -= total;

                // Limpa os destaques antigos antes de aplicar os novos
                card.classList.remove('border-gold-500/40', 'shadow-gold-500/5', 'bg-gradient-to-b', 'from-gold-500/[0.03]', 'to-transparent', 'z-20', 'z-10', 'pointer-events-auto');
                const nameText = card.querySelector('.team-name');
                nameText.classList.remove('text-lg', 'md:text-xl', 'text-gold-gradient');

                // Lógica de Renderização Baseada na Posição Relativa (Sem usar a classe 'hidden')
                if (offset === 0) {
                    // CARD DO MEIO (Destaque Principal)
                    card.classList.add('border-gold-500/40', 'shadow-xl', 'shadow-gold-500/5', 'bg-gradient-to-b', 'from-gold-500/[0.03]', 'to-transparent', 'z-20', 'pointer-events-auto');
                    nameText.classList.add('text-lg', 'md:text-xl', 'text-gold-gradient');
                    
                    card.style.opacity = "1";
                    card.style.transform = "translateX(0) scale(1.05)";
                    
                } else if (offset === 1) {
                    // CARD DA DIREITA (Visível apenas em Desktop de forma nativa)
                    card.classList.add('z-10');
                    
                    // Tratamento responsivo: some no mobile por opacidade, aparece no desktop
                    card.style.opacity = window.innerWidth < 768 ? "0" : "0.35";
                    card.style.transform = "translateX(115%) scale(0.9)";
                    
                } else if (offset === -1) {
                    // CARD DA ESQUERDA (Visível apenas em Desktop de forma nativa)
                    card.classList.add('z-10');
                    
                    card.style.opacity = window.innerWidth < 768 ? "0" : "0.35";
                    card.style.transform = "translateX(-115%) scale(0.9)";
                    
                } else {
                    // BACKSTAGE (Totalmente invisível, aguardando na fila de deslize)
                    card.style.opacity = "0";
                    if (offset > 0) {
                        card.style.transform = "translateX(200%) scale(0.7)";
                    } else {
                        card.style.transform = "translateX(-200%) scale(0.7)";
                    }
                }
            });
        }

        // Eventos dos botões chamando a função renderCarousel atualizada
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % equipesData.length;
            renderCarousel();
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + equipesData.length) % equipesData.length;
            renderCarousel();
        });

        // Evento para reajustar o carrossel dinamicamente se o usuário girar a tela do celular
        window.addEventListener('resize', renderCarousel);

        // Disparo inicial
        renderCarousel();
    }

});

    // =========================================================================
// CONTAGEM REGRESSIVA DO TORNEIO (Quinta-feira, 06/08/2026 às 20:00)
// =========================================================================
function initTournamentCountdown() {
    // Data alvo ajustada explicitamente para 06 de Agosto de 2026 às 20:00:00 (Fuso Horário de Brasília UTC-3)
    const targetDate = new Date("2026-08-06T20:00:00-03:00").getTime();

    const elDays = document.getElementById("timer-days");
    const elHours = document.getElementById("timer-hours");
    const elMinutes = document.getElementById("timer-minutes");
    const elSeconds = document.getElementById("timer-seconds");
    const liveMsg = document.getElementById("tournament-live-msg");

    // Verifica se os elementos existem no DOM para evitar erros
    if (!elDays || !elHours || !elMinutes || !elSeconds) return;

    // Efeito sutil de animação quando o número muda
    function animateDigit(element, newValue) {
        if (element.textContent !== newValue) {
            element.textContent = newValue;
            element.classList.add("scale-110", "text-gold-400");
            setTimeout(() => {
                element.classList.remove("scale-110", "text-gold-400");
            }, 150);
        }
    }

    function updateCountdown() {
        const now = new Date().getTime();
        const difference = targetDate - now;

        // Se passar da hora do torneio
        if (difference <= 0) {
            elDays.textContent = "00";
            elHours.textContent = "00";
            elMinutes.textContent = "00";
            elSeconds.textContent = "00";
            if (liveMsg) liveMsg.classList.remove("hidden");
            return;
        }

        // Cálculos matemáticos de conversão de tempo
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        // Formatação garantindo sempre 2 dígitos (ex: 05, 09, 12)
        const strDays = String(days).padStart(2, "0");
        const strHours = String(hours).padStart(2, "0");
        const strMinutes = String(minutes).padStart(2, "0");
        const strSeconds = String(seconds).padStart(2, "0");

        // Atualização e disparo dos efeitos de escala
        animateDigit(elDays, strDays);
        animateDigit(elHours, strHours);
        animateDigit(elMinutes, strMinutes);
        animateDigit(elSeconds, strSeconds);
    }

    // Executa a primeira vez de forma imediata e inicia o intervalo de 1 segundo
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Inicialização automática assim que a estrutura do site carregar
document.addEventListener("DOMContentLoaded", initTournamentCountdown);

