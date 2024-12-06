document.querySelectorAll('.letter').forEach((letter, index) => {
    // 초기 애니메이션만 유지
    letter.style.opacity = '0';
    letter.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        letter.style.transition = 'opacity 0.25s ease-in-out, transform 0.25s ease-in-out';
        letter.style.opacity = '1';
        letter.style.transform = 'translateY(0)';
        
        // 초기 애니메이션이 끝나면 font-variation-settings transition만 남기기
        setTimeout(() => {
            letter.style.transition = 'font-variation-settings 0.25s cubic-bezier(0.4, 0, 0.2, 1)';
        }, 500);
    }, index * 200);
}); 

// 테마 토글 기능 추가
const container = document.querySelector('.text-container');
container.addEventListener('click', () => {
    // data-theme 속성을 사용하여 현재 테마 추적
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
}); 