// 전역 변수
let userAge = 0;
let selectedType = '';
let currentScreen = 1;

// 화면 전환 함수
function showScreen(screenNum) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));
    const targetScreen = document.getElementById(`screen${screenNum}`);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }
}

// 다음 화면으로 이동 (첫 번째 화면)
function nextScreen1() {
    const age = parseInt(document.getElementById('age').value);
    const ageError = document.getElementById('ageError');
    
    if (isNaN(age) || age < 10 || age > 50) {
        ageError.textContent = '10~50 사이의 나이를 입력해주세요.';
        ageError.classList.add('show');
        return;
    }
    
    ageError.classList.remove('show');
    userAge = age;
    currentScreen = 2;
    showScreen(2);
}

// 유형 선택
function selectType(type) {
    selectedType = type;
    currentScreen = 3;
    
    if (type === 'highschool') {
        showScreen(3);
    } else if (type === 'university') {
        showScreen(4);
    } else if (type === 'interest') {
        showScreen(5);
    }
}

// 이전 화면으로 이동
function prevScreen() {
    if (currentScreen === 2) {
        currentScreen = 1;
        showScreen(1);
    } else if (currentScreen === 3 || currentScreen === 4 || currentScreen === 5) {
        currentScreen = 2;
        showScreen(2);
    }
}

// 고등학교 선택 결과 제출
function submitHighSchool() {
    const korean = parseInt(document.getElementById('korean').value);
    const math = parseInt(document.getElementById('math').value);
    const english = parseInt(document.getElementById('english').value);
    const science = parseInt(document.getElementById('science').value);
    const social = parseInt(document.getElementById('social').value);
    
    const hsError = document.getElementById('hsError');
    
    if (isNaN(korean) || isNaN(math) || isNaN(english) || isNaN(science) || isNaN(social)) {
        hsError.textContent = '모든 과목의 점수를 입력해주세요.';
        hsError.classList.add('show');
        return;
    }
    
    if (korean < 0 || korean > 100 || math < 0 || math > 100 || english < 0 || english > 100 || science < 0 || science > 100 || social < 0 || social > 100) {
        hsError.textContent = '점수는 0~100 사이여야 합니다.';
        hsError.classList.add('show');
        return;
    }
    
    hsError.classList.remove('show');
    
    const average = (korean + math + english + science + social) / 5;
    const result = getHighSchoolResult(average, korean, math, english);
    
    showResult(`고등학교 선택 결과`, result, average);
}

// 대학교 선택 결과 제출
function submitUniversity() {
    const univKorean = parseInt(document.getElementById('univ-korean').value);
    const univMath = parseInt(document.getElementById('univ-math').value);
    const univEnglish = parseInt(document.getElementById('univ-english').value);
    const satKorean = parseInt(document.getElementById('sat-korean').value);
    const satMath = parseInt(document.getElementById('sat-math').value);
    const satEnglish = parseInt(document.getElementById('sat-english').value);
    const satSubject = parseInt(document.getElementById('sat-subject').value);
    
    const univError = document.getElementById('univError');
    
    if (isNaN(univKorean) || isNaN(univMath) || isNaN(univEnglish) || isNaN(satKorean) || isNaN(satMath) || isNaN(satEnglish) || isNaN(satSubject)) {
        univError.textContent = '모든 등급을 입력해주세요.';
        univError.classList.add('show');
        return;
    }
    
    if (univKorean < 1 || univKorean > 9 || univMath < 1 || univMath > 9 || univEnglish < 1 || univEnglish > 9 || satKorean < 1 || satKorean > 9 || satMath < 1 || satMath > 9 || satEnglish < 1 || satEnglish > 9 || satSubject < 1 || satSubject > 9) {
        univError.textContent = '등급은 1~9 사이여야 합니다.';
        univError.classList.add('show');
        return;
    }
    
    univError.classList.remove('show');
    
    const univAverage = (univKorean + univMath + univEnglish) / 3;
    const satAverage = (satKorean + satMath + satEnglish + satSubject) / 4;
    const result = getUniversityResult(univAverage, satAverage, univMath, satMath);
    
    showResult(`대학교 선택 결과`, result, univAverage);
}

// 관심 분야 심리 분석 제출
function submitInterest() {
    const answers = {
        q1: document.querySelector('input[name="q1"]:checked')?.value,
        q2: document.querySelector('input[name="q2"]:checked')?.value,
        q3: document.querySelector('input[name="q3"]:checked')?.value,
        q4: document.querySelector('input[name="q4"]:checked')?.value,
        q5: document.querySelector('input[name="q5"]:checked')?.value
    };
    
    if (Object.values(answers).includes(undefined)) {
        alert('모든 질문에 답변해주세요.');
        return;
    }
    
    const result = getInterestResult(answers);
    showResult(`관심 분야 분석 결과`, result, null);
}

// 고등학교 추천 로직
function getHighSchoolResult(average, korean, math, english) {
    let recommendations = [];
    let type = '';
    
    if (average >= 80) {
        type = '상위권';
        if (math >= 80) {
            recommendations.push('자연계(이공계)로 진학 추천');
        } else if (korean >= 80) {
            recommendations.push('인문계로 진학 추천');
        } else {
            recommendations.push('균형잡힌 학과 추천');
        }
    } else if (average >= 60) {
        type = '중위권';
        recommendations.push('적성에 맞는 전문대학 추천');
        recommendations.push('실무 중심 학과 탐색 권장');
    } else {
        type = '기초 단계';
        recommendations.push('학습 보충 프로그램 참여 권장');
        recommendations.push('실용적인 교육 기관 탐색');
    }
    
    return `
        <div class="result-item">
            <h4>📊 성적 분석</h4>
            <p><strong>평균 점수:</strong> ${average.toFixed(1)}점</p>
            <p><strong>수준:</strong> ${type}</p>
        </div>
        <div class="result-item">
            <h4>🎯 추천</h4>
            <p>${recommendations.join('<br>')}</p>
        </div>
    `;
}

// 대학교 추천 로직
function getUniversityResult(univAverage, satAverage, univMath, satMath) {
    let recommendations = [];
    let level = '';
    
    if (univAverage <= 3 && satAverage <= 3) {
        level = '최상위권';
        recommendations.push('SKY 대학교 목표 가능');
        recommendations.push('의학, 약학 등 상위권 학과 추천');
    } else if (univAverage <= 4 && satAverage <= 4) {
        level = '상위권';
        recommendations.push('서울권 주요 대학 추천');
        recommendations.push('공학계 또는 의학계 지원 가능');
    } else if (univAverage <= 6 && satAverage <= 6) {
        level = '중상위권';
        recommendations.push('지방 국립대 및 중위권 사립대 추천');
    } else {
        level = '중위권 이하';
        recommendations.push('적성에 맞는 실용 학과 탐색');
        recommendations.push('전문대학 또는 특성화 고등학교 진학 고려');
    }
    
    return `
        <div class="result-item">
            <h4>📚 성적 분석</h4>
            <p><strong>고등학교 평균 등급:</strong> ${univAverage.toFixed(1)}등급</p>
            <p><strong>수능 평균 등급:</strong> ${satAverage.toFixed(1)}등급</p>
            <p><strong>수준:</strong> ${level}</p>
        </div>
        <div class="result-item">
            <h4>🎓 추천</h4>
            <p>${recommendations.join('<br>')}</p>
        </div>
    `;
}

// 관심 분야 분석 로직
function getInterestResult(answers) {
    const scoreMap = {
        analytical: 0,
        creative: 0,
        social: 0
    };
    
    Object.values(answers).forEach(answer => {
        scoreMap[answer]++;
    });
    
    let primaryType = '';
    let secondaryType = '';
    let jobs = [];
    let description = '';
    
    const sorted = Object.entries(scoreMap).sort((a, b) => b[1] - a[1]);
    primaryType = sorted[0][0];
    secondaryType = sorted[1][0];
    
    if (primaryType === 'analytical') {
        description = '논리적이고 체계적인 사고를 선호하시는군요!';
        jobs = ['데이터 분석가', '소프트웨어 개발자', '회계사', '금융 분석가', '과학자', '엔지니어'];
    } else if (primaryType === 'creative') {
        description = '창의성과 표현력이 뛰어나신 것 같습니다!';
        jobs = ['디자이너', '영상 제작자', '작가', '광고 기획자', '음악가', '미술가'];
    } else if (primaryType === 'social') {
        description = '사람과의 관계를 중요시하고 공감 능력이 높으신 분이군요!';
        jobs = ['상담사', '교사', '간호사', '의사', '사회복지사', 'HR 매니저'];
    }
    
    return `
        <div class="result-item">
            <h4>💭 성향 분석</h4>
            <p>${description}</p>
            <p><strong>주요 성향:</strong> ${primaryType === 'analytical' ? '분석형' : primaryType === 'creative' ? '창의형' : '사회형'}</p>
            <p><strong>부수 성향:</strong> ${secondaryType === 'analytical' ? '분석형' : secondaryType === 'creative' ? '창의형' : '사회형'}</p>
        </div>
        <div class="result-item">
            <h4>👨‍💼 추천 직업</h4>
            <p>${jobs.join(', ')}</p>
        </div>
        <div class="result-item">
            <h4>💡 조언</h4>
            <p>위의 성향과 직업들을 참고하여 진로를 선택하면 더욱 만족도 높은 인생을 살 수 있을 것입니다!</p>
        </div>
    `;
}

// 결과 표시
function showResult(title, content, score) {
    const resultContent = document.getElementById('resultContent');
    const resultTitle = document.querySelector('#resultScreen h1');
    resultTitle.textContent = title;
    resultContent.innerHTML = content;
    currentScreen = 'result';
    showScreen('resultScreen');
}

// 처음부터 시작
function restartApp() {
    // 입력값 초기화
    document.getElementById('age').value = '';
    document.getElementById('korean').value = '';
    document.getElementById('math').value = '';
    document.getElementById('english').value = '';
    document.getElementById('science').value = '';
    document.getElementById('social').value = '';
    document.getElementById('univ-korean').value = '';
    document.getElementById('univ-math').value = '';
    document.getElementById('univ-english').value = '';
    document.getElementById('sat-korean').value = '';
    document.getElementById('sat-math').value = '';
    document.getElementById('sat-english').value = '';
    document.getElementById('sat-subject').value = '';
    
    // 라디오 버튼 초기화
    document.querySelectorAll('input[type="radio"]').forEach(radio => radio.checked = false);
    
    // 에러 메시지 제거
    document.querySelectorAll('.error-message').forEach(error => error.classList.remove('show'));
    
    // 첫 번째 화면으로 이동
    currentScreen = 1;
    userAge = 0;
    selectedType = '';
    showScreen(1);
}