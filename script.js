document.querySelectorAll('.letter').forEach((letter, index) => {
    letter.style.opacity = '0';
    letter.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        letter.style.transition = 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
        letter.style.opacity = '1';
        letter.style.transform = 'translateY(0)';
        
        setTimeout(() => {
            letter.style.transition = 'font-variation-settings 0.25s cubic-bezier(0.4, 0, 0.2, 1)';
        }, 600);
    }, index * 100);
}); 

// 카피라이트 애니메이션
const copyright = document.querySelector('.copyright');
const letters = document.querySelectorAll('.letter');
const lastLetterIndex = letters.length - 1;
const totalAnimationTime = (lastLetterIndex * 100) + 800;

copyright.style.opacity = '0';

setTimeout(() => {
    requestAnimationFrame(() => {
        copyright.style.opacity = '1';
    });
}, totalAnimationTime);

// 소셜 버튼 애니메이션
const socialLinks = document.querySelector('.social-links');
setTimeout(() => {
    socialLinks.style.transition = 'opacity 0.4s ease-in-out';
    socialLinks.style.opacity = '1';
}, totalAnimationTime + 200);  // 카피라이트 애니메이션 후에 표시

// 테마 토글 기능
const container = document.querySelector('.text-container');

container.addEventListener('click', () => {
    const root = document.documentElement;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // 시스템이 다크 모드면 라이트로, 라이트 모드면 다크로 전환
    if (prefersDark) {
        root.classList.toggle('light');
    } else {
        root.classList.toggle('dark');
    }
}); 

// 글자별 설명 데이터
const letterDescriptions = {
    'h': {
        title: 'Harmony',
        text: 'Where digital poetry meets visual rhythm'
    },
    'e': {
        title: 'Essence',
        text: 'Distilling complexity into pure artistic expression'
    },
    'i': {
        title: 'Imagination',
        text: 'Crafting dreams into digital reality'
    },
    'm': {
        title: 'Metamorphosis',
        text: 'Transforming ideas into living, breathing art'
    },
    'l': {
        title: 'Luminance',
        text: 'Illuminating spaces between art and technology'
    },
    'i2': {
        title: 'Intuition',
        text: 'Where instinct guides artistic innovation'
    },
    'c': {
        title: 'Canvas',
        text: 'Every pixel, a brushstroke of possibility'
    },
    'h2': {
        title: 'Horizon',
        text: 'Exploring the boundaries of digital artistry'
    }
};

// 설명 표시 요소
const descriptionTitle = document.querySelector('.description-title');
const descriptionText = document.querySelector('.description-text');
const descriptionContainer = document.querySelector('.letter-description');

// 각 글자에 호버 이벤트 추가
document.querySelectorAll('.letter').forEach((letter, index) => {
    const letterKey = letter.textContent + (letter.textContent === 'h' && index > 0 ? '2' : 
                                          letter.textContent === 'i' && index > 2 ? '2' : '');
    
    letter.addEventListener('mouseenter', () => {
        const description = letterDescriptions[letterKey];
        if (description) {
            descriptionTitle.textContent = description.title;
            descriptionText.textContent = description.text;
            descriptionContainer.style.opacity = '1';
        }
    });

    letter.addEventListener('mouseleave', () => {
        descriptionContainer.style.opacity = '0';
    });
}); 