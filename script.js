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

        // 마지막 글자 애니메이션 완료 후 버튼 표시
        if (index === document.querySelectorAll('.letter').length - 1) {
            setTimeout(() => {
                lookAroundBtn.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
                lookAroundBtn.style.opacity = '1';
                lookAroundBtn.style.visibility = 'visible';
                lookAroundBtn.style.transform = 'translateY(0)';
            }, 600); // 마지막 글자 애니메이션 후 약간의 딜레이
        }
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

// 테마 관련 함수들
const themeManager = {
    // 테마 상태 초기화
    init() {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const root = document.documentElement;

        if (savedTheme) {
            // 저장된 테마가 있으면 적용
            root.classList.add(savedTheme);
        } else if (prefersDark) {
            // 저장된 테마가 없고 시스템이 다크모드면 다크모드 적용
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            // 그 외의 경우 라이트모드 적용
            root.classList.add('light');
            localStorage.setItem('theme', 'light');
        }
    },

    // 테마 토글
    toggle() {
        const root = document.documentElement;
        const currentTheme = localStorage.getItem('theme');
        
        if (currentTheme === 'light') {
            root.classList.remove('light');
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            root.classList.add('light');
            localStorage.setItem('theme', 'light');
        }
    }
};

// 페이지 로드 시 테마 초기화
document.addEventListener('DOMContentLoaded', () => {
    themeManager.init();
});

// 테마 토글 이벤트 리스너 수정
const container = document.querySelector('.text-container');
container.addEventListener('click', () => {
    themeManager.toggle();
}); 

// 시스템 테마 변경 감지
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    // 사용자가 수동으로 테마를 설정하지 않은 경우에만 시스템 테마를 따름
    if (!localStorage.getItem('theme')) {
        const root = document.documentElement;
        if (e.matches) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.add('light');
            localStorage.setItem('theme', 'light');
        }
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

// Three.js 설정
let scene, camera, renderer;
let currentModel = null;

const shapes = {
    'h': 'cube',
    'e': 'sphere',
    'i': 'cylinder',
    'm': 'torus',
    'l': 'cone',
    'i2': 'octahedron',
    'c': 'torusKnot',
    'h2': 'dodecahedron'
};

// 회전값을 저장할 변수 추가
let currentRotation = {
    x: 0,
    y: 0
};

function initThree() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('three-container').appendChild(renderer.domElement);
    camera.position.z = 5;
}

function createWireframeModel(shape) {
    if (currentModel) {
        // 현재 회전값 저장
        currentRotation.x = currentModel.rotation.x;
        currentRotation.y = currentModel.rotation.y;
        scene.remove(currentModel);
    }

    let geometry;
    switch(shape) {
        case 'cube':
            geometry = new THREE.BoxGeometry(2, 2, 2);
            break;
        case 'sphere':
            geometry = new THREE.SphereGeometry(1.2, 16, 16);
            break;
        case 'cylinder':
            geometry = new THREE.CylinderGeometry(1, 1, 2, 16);
            break;
        case 'torus':
            geometry = new THREE.TorusGeometry(1, 0.4, 16, 32);
            break;
        case 'cone':
            geometry = new THREE.ConeGeometry(1, 2, 16);
            break;
        case 'octahedron':
            geometry = new THREE.OctahedronGeometry(1.5);
            break;
        case 'torusKnot':
            geometry = new THREE.TorusKnotGeometry(1, 0.3, 64, 16);
            break;
        case 'dodecahedron':
            geometry = new THREE.DodecahedronGeometry(1.2);
            break;
    }

    // 재질 설정 수정
    const material = new THREE.MeshBasicMaterial({
        color: getComputedStyle(document.documentElement).getPropertyValue('--text-color'),
        wireframe: true,
        transparent: true,
        opacity: 0.0,  // 투명도 조정
        depthWrite: false  // 깊이 버퍼 비활성화로 투명도 개선
    });

    currentModel = new THREE.Mesh(geometry, material);
    
    // 저장된 회전값 적용
    currentModel.rotation.x = currentRotation.x;
    currentModel.rotation.y = currentRotation.y;
    
    scene.add(currentModel);
}

function animate() {
    requestAnimationFrame(animate);
    if (currentModel) {
        // 회전값 업데이트
        currentModel.rotation.x += 0.001;
        currentModel.rotation.y += 0.001;
        
        // 현재 회전값 저장
        currentRotation.x = currentModel.rotation.x;
        currentRotation.y = currentModel.rotation.y;
    }
    renderer.render(scene, camera);
}

// Three.js 초기화
initThree();
animate();

// 글자 호버 이벤트 수정
document.querySelectorAll('.letter').forEach((letter, index) => {
    const letterKey = letter.textContent + (letter.textContent === 'h' && index > 0 ? '2' : 
                                          letter.textContent === 'i' && index > 2 ? '2' : '');
    
    letter.addEventListener('mouseenter', () => {
        const description = letterDescriptions[letterKey];
        if (description) {
            descriptionTitle.textContent = description.title;
            descriptionText.textContent = description.text;
            descriptionContainer.style.opacity = '1';
            descriptionContainer.style.visibility = 'visible';
            
            // 3D 모델 생성
            createWireframeModel(shapes[letterKey]);
        }
    });

    letter.addEventListener('mouseleave', () => {
        descriptionContainer.style.opacity = '0';
        descriptionContainer.style.visibility = 'hidden';
        if (currentModel) {
            scene.remove(currentModel);
            currentModel = null;
        }
    });
}); 

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}); 