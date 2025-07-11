// ===== HEVY MOBILE APP - MAIN SCRIPT =====

// البيانات الأساسية للتطبيق
let appData = {
  currentPage: 'home',
  workouts: [
    {
      id: 1,
      name: 'تمارين الصدر والذراعين',
      type: 'strength',
      exercises: 8,
      duration: 45,
      lastWorkout: '2024-03-13',
      progress: 85,
      exercisesList: [
        { name: 'ضغط البنش', sets: 4, reps: 12, weight: 80 },
        { name: 'ضغط الدمبل المائل', sets: 3, reps: 10, weight: 25 },
        { name: 'طيران الدمبل', sets: 3, reps: 12, weight: 18 },
        { name: 'الضغط', sets: 3, reps: 15, weight: 0 },
        { name: 'ضغط الدمبل للذراعين', sets: 3, reps: 12, weight: 15 },
        { name: 'تمارين البايسبس', sets: 3, reps: 12, weight: 20 },
        { name: 'تمارين الترايسبس', sets: 3, reps: 12, weight: 25 },
        { name: 'تمارين الكتف', sets: 3, reps: 10, weight: 12 }
      ]
    },
    {
      id: 2,
      name: 'تمارين الظهر والكتفين',
      type: 'strength',
      exercises: 7,
      duration: 50,
      lastWorkout: '2024-03-11',
      progress: 72,
      exercisesList: [
        { name: 'سحب البار', sets: 4, reps: 10, weight: 90 },
        { name: 'سحب الدمبل', sets: 3, reps: 12, weight: 30 },
        { name: 'تمارين الصف', sets: 3, reps: 12, weight: 35 },
        { name: 'تمارين الكتف الأمامي', sets: 3, reps: 10, weight: 15 },
        { name: 'تمارين الكتف الجانبي', sets: 3, reps: 12, weight: 12 },
        { name: 'تمارين الكتف الخلفي', sets: 3, reps: 12, weight: 10 },
        { name: 'تمارين البطن', sets: 3, reps: 20, weight: 0 }
      ]
    },
    {
      id: 3,
      name: 'تمارين الساقين',
      type: 'strength',
      exercises: 6,
      duration: 40,
      lastWorkout: '2024-03-09',
      progress: 68,
      exercisesList: [
        { name: 'القرفصاء', sets: 4, reps: 12, weight: 100 },
        { name: 'ضغط الساقين', sets: 3, reps: 15, weight: 120 },
        { name: 'تمارين الفخذ الأمامي', sets: 3, reps: 12, weight: 60 },
        { name: 'تمارين الفخذ الخلفي', sets: 3, reps: 12, weight: 50 },
        { name: 'تمارين العجل', sets: 4, reps: 20, weight: 80 },
        { name: 'تمارين البطن', sets: 3, reps: 20, weight: 0 }
      ]
    },
    {
      id: 4,
      name: 'تمارين القلب والكارديو',
      type: 'cardio',
      exercises: 5,
      duration: 30,
      lastWorkout: '2024-03-12',
      progress: 90,
      exercisesList: [
        { name: 'الركض', sets: 1, reps: 20, weight: 0, duration: '20 دقيقة' },
        { name: 'تمارين HIIT', sets: 1, reps: 8, weight: 0, duration: '8 دقائق' },
        { name: 'تمارين القفز', sets: 3, reps: 30, weight: 0 },
        { name: 'تمارين البربي', sets: 3, reps: 10, weight: 0 },
        { name: 'تمارين البطن', sets: 3, reps: 15, weight: 0 }
      ]
    },
    {
      id: 5,
      name: 'تمارين المرونة واليوغا',
      type: 'flexibility',
      exercises: 8,
      duration: 45,
      lastWorkout: '2024-03-10',
      progress: 55,
      exercisesList: [
        { name: 'تمارين التمدد', sets: 1, reps: 1, weight: 0, duration: '10 دقائق' },
        { name: 'وضعية الكلب', sets: 3, reps: 30, weight: 0 },
        { name: 'وضعية المحارب', sets: 3, reps: 20, weight: 0 },
        { name: 'وضعية الشجرة', sets: 3, reps: 30, weight: 0 },
        { name: 'تمارين التنفس', sets: 1, reps: 1, weight: 0, duration: '5 دقائق' },
        { name: 'تمارين التأمل', sets: 1, reps: 1, weight: 0, duration: '10 دقائق' }
      ]
    }
  ],
  recentWorkouts: [
    { name: 'تمارين الصدر والذراعين', date: '2024-03-13', duration: 45, score: 8.5, calories: 320 },
    { name: 'تمارين الظهر والكتفين', date: '2024-03-11', duration: 50, score: 8.2, calories: 380 },
    { name: 'تمارين القلب والكارديو', date: '2024-03-12', duration: 30, score: 9.1, calories: 450 },
    { name: 'تمارين الساقين', date: '2024-03-09', duration: 40, score: 7.8, calories: 420 },
    { name: 'تمارين المرونة واليوغا', date: '2024-03-10', duration: 45, score: 8.9, calories: 180 },
    { name: 'تمارين الصدر والذراعين', date: '2024-03-07', duration: 42, score: 8.0, calories: 300 },
    { name: 'تمارين الظهر والكتفين', date: '2024-03-05', duration: 48, score: 7.9, calories: 350 },
    { name: 'تمارين القلب والكارديو', date: '2024-03-06', duration: 28, score: 8.8, calories: 420 }
  ],
  exercises: [
    // تمارين الصدر
    { name: 'ضغط البنش', category: 'الصدر', icon: 'fas fa-dumbbell', difficulty: 'متوسط' },
    { name: 'ضغط الدمبل المائل', category: 'الصدر', icon: 'fas fa-dumbbell', difficulty: 'متوسط' },
    { name: 'طيران الدمبل', category: 'الصدر', icon: 'fas fa-dumbbell', difficulty: 'سهل' },
    { name: 'الضغط', category: 'الصدر', icon: 'fas fa-dumbbell', difficulty: 'سهل' },
    { name: 'ضغط الدمبل المسطح', category: 'الصدر', icon: 'fas fa-dumbbell', difficulty: 'متوسط' },
    
    // تمارين الظهر
    { name: 'سحب البار', category: 'الظهر', icon: 'fas fa-dumbbell', difficulty: 'متوسط' },
    { name: 'سحب الدمبل', category: 'الظهر', icon: 'fas fa-dumbbell', difficulty: 'متوسط' },
    { name: 'تمارين الصف', category: 'الظهر', icon: 'fas fa-dumbbell', difficulty: 'متوسط' },
    { name: 'سحب الكابل', category: 'الظهر', icon: 'fas fa-dumbbell', difficulty: 'سهل' },
    
    // تمارين الساقين
    { name: 'القرفصاء', category: 'الساقين', icon: 'fas fa-running', difficulty: 'متوسط' },
    { name: 'ضغط الساقين', category: 'الساقين', icon: 'fas fa-running', difficulty: 'سهل' },
    { name: 'تمارين الفخذ الأمامي', category: 'الساقين', icon: 'fas fa-running', difficulty: 'سهل' },
    { name: 'تمارين الفخذ الخلفي', category: 'الساقين', icon: 'fas fa-running', difficulty: 'سهل' },
    { name: 'تمارين العجل', category: 'الساقين', icon: 'fas fa-running', difficulty: 'سهل' },
    { name: 'اللانجز', category: 'الساقين', icon: 'fas fa-running', difficulty: 'متوسط' },
    
    // تمارين الذراعين
    { name: 'ضغط الدمبل للذراعين', category: 'الذراعين', icon: 'fas fa-dumbbell', difficulty: 'سهل' },
    { name: 'تمارين البايسبس', category: 'الذراعين', icon: 'fas fa-dumbbell', difficulty: 'سهل' },
    { name: 'تمارين الترايسبس', category: 'الذراعين', icon: 'fas fa-dumbbell', difficulty: 'سهل' },
    { name: 'تمارين المطرقة', category: 'الذراعين', icon: 'fas fa-dumbbell', difficulty: 'سهل' },
    
    // تمارين الكتف
    { name: 'تمارين الكتف الأمامي', category: 'الكتف', icon: 'fas fa-dumbbell', difficulty: 'سهل' },
    { name: 'تمارين الكتف الجانبي', category: 'الكتف', icon: 'fas fa-dumbbell', difficulty: 'سهل' },
    { name: 'تمارين الكتف الخلفي', category: 'الكتف', icon: 'fas fa-dumbbell', difficulty: 'سهل' },
    { name: 'ضغط الكتف', category: 'الكتف', icon: 'fas fa-dumbbell', difficulty: 'متوسط' },
    
    // تمارين القلب
    { name: 'الركض', category: 'القلب', icon: 'fas fa-heart', difficulty: 'سهل' },
    { name: 'تمارين HIIT', category: 'القلب', icon: 'fas fa-heart', difficulty: 'صعب' },
    { name: 'تمارين القفز', category: 'القلب', icon: 'fas fa-heart', difficulty: 'متوسط' },
    { name: 'تمارين البربي', category: 'القلب', icon: 'fas fa-heart', difficulty: 'صعب' },
    { name: 'ركوب الدراجة', category: 'القلب', icon: 'fas fa-heart', difficulty: 'سهل' },
    
    // تمارين البطن
    { name: 'تمارين البطن', category: 'البطن', icon: 'fas fa-dumbbell', difficulty: 'سهل' },
    { name: 'بلانك', category: 'البطن', icon: 'fas fa-dumbbell', difficulty: 'متوسط' },
    { name: 'تمارين الكرانش', category: 'البطن', icon: 'fas fa-dumbbell', difficulty: 'سهل' },
    { name: 'تمارين الجسر', category: 'البطن', icon: 'fas fa-dumbbell', difficulty: 'سهل' },
    
    // تمارين المرونة
    { name: 'تمارين التمدد', category: 'المرونة', icon: 'fas fa-running', difficulty: 'سهل' },
    { name: 'وضعية الكلب', category: 'المرونة', icon: 'fas fa-running', difficulty: 'سهل' },
    { name: 'وضعية المحارب', category: 'المرونة', icon: 'fas fa-running', difficulty: 'متوسط' },
    { name: 'وضعية الشجرة', category: 'المرونة', icon: 'fas fa-running', difficulty: 'متوسط' }
  ],
  
  // إحصائيات المستخدم
  userStats: {
    totalWorkouts: 156,
    totalCalories: 45230,
    totalDuration: 7800, // بالدقائق
    currentStreak: 12,
    longestStreak: 45,
    favoriteExercise: 'ضغط البنش',
    personalRecords: {
      'ضغط البنش': 120,
      'القرفصاء': 140,
      'سحب البار': 100,
      'الركض': 25 // بالدقائق
    }
  },
  
  // الإنجازات والشارات
  achievements: [
    {
      id: 1,
      name: 'المبتدئ',
      description: 'أكمل أول تمرين',
      icon: 'fas fa-star',
      unlocked: true,
      date: '2024-01-15'
    },
    {
      id: 2,
      name: 'المثابر',
      description: 'أكمل 10 تمارين متتالية',
      icon: 'fas fa-fire',
      unlocked: true,
      date: '2024-02-01'
    },
    {
      id: 3,
      name: 'قوي القلب',
      description: 'أكمل 50 تمرين كارديو',
      icon: 'fas fa-heart',
      unlocked: true,
      date: '2024-02-20'
    },
    {
      id: 4,
      name: 'الحديد',
      description: 'رفع 100 كجم في ضغط البنش',
      icon: 'fas fa-dumbbell',
      unlocked: true,
      date: '2024-03-10'
    },
    {
      id: 5,
      name: 'المحارب',
      description: 'أكمل 100 تمرين',
      icon: 'fas fa-shield-alt',
      unlocked: false,
      progress: 85
    },
    {
      id: 6,
      name: 'المرونة',
      description: 'أكمل 30 تمرين مرونة',
      icon: 'fas fa-yoga',
      unlocked: false,
      progress: 60
    },
    {
      id: 7,
      name: 'السرعة',
      description: 'أكمل 5 كيلومتر في أقل من 25 دقيقة',
      icon: 'fas fa-running',
      unlocked: false,
      progress: 0
    },
    {
      id: 8,
      name: 'القوة الخارقة',
      description: 'رفع 150 كجم في القرفصاء',
      icon: 'fas fa-crown',
      unlocked: false,
      progress: 0
    }
  ],
  
  // التحديات المجتمعية
  challenges: [
    {
      id: 1,
      name: 'تحدي 30 يوم',
      description: 'تمرين يومي لمدة 30 يوم',
      participants: 1247,
      daysLeft: 18,
      progress: 40,
      reward: 'شارة المثابر الذهبية',
      type: 'streak'
    },
    {
      id: 2,
      name: 'تحدي القوة',
      description: 'زيادة الوزن في ضغط البنش 10 كجم',
      participants: 892,
      daysLeft: 30,
      progress: 70,
      reward: 'شارة القوة',
      type: 'strength'
    },
    {
      id: 3,
      name: 'تحدي الكارديو',
      description: 'ركض 100 كيلومتر في الشهر',
      participants: 567,
      daysLeft: 15,
      progress: 65,
      reward: 'شارة العداء',
      type: 'cardio'
    },
    {
      id: 4,
      name: 'تحدي المرونة',
      description: 'تمارين يوغا يومية لمدة أسبوع',
      participants: 234,
      daysLeft: 7,
      progress: 85,
      reward: 'شارة المرونة',
      type: 'flexibility'
    },
    {
      id: 5,
      name: 'تحدي المجتمع',
      description: 'مشاركة 10 تمارين مع المجتمع',
      participants: 445,
      daysLeft: 20,
      progress: 30,
      reward: 'شارة المجتمع',
      type: 'social'
    }
  ],
  
  // المدربون
  coaches: [
    {
      id: 1,
      name: 'أحمد محمد',
      specialty: 'تمارين القوة',
      experience: '8 سنوات',
      rating: 4.8,
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      online: true,
      price: '200 ريال/جلسة'
    },
    {
      id: 2,
      name: 'سارة أحمد',
      specialty: 'تمارين الكارديو واللياقة',
      experience: '5 سنوات',
      rating: 4.9,
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      online: true,
      price: '180 ريال/جلسة'
    },
    {
      id: 3,
      name: 'محمد علي',
      specialty: 'تمارين المرونة واليوغا',
      experience: '10 سنوات',
      rating: 4.7,
      avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
      online: false,
      price: '220 ريال/جلسة'
    },
    {
      id: 4,
      name: 'فاطمة حسن',
      specialty: 'تمارين البطن والجسم',
      experience: '6 سنوات',
      rating: 4.6,
      avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
      online: true,
      price: '160 ريال/جلسة'
    }
  ]
};

// ===== إدارة الصفحات =====
// function showPage(pageName) { ... } // يمكن حذفها أو تركها فارغة

// ===== إدارة النوافذ المنبثقة =====
function showModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

function hideModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
            modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}

// ===== إدارة التمارين =====
function startWorkout() {
  const workout = appData.workouts[0];
  if (workout) {
    showModal('workout-session-modal');
    updateWorkoutSession(workout);
  }
}

function updateWorkoutSession(workout) {
  const sessionContainer = document.getElementById('workout-session-container');
  if (sessionContainer) {
    sessionContainer.innerHTML = workout.exercisesList.map((exercise, index) => `
      <div class="exercise-session-item">
        <div class="exercise-header">
          <h4>${exercise.name}</h4>
          <span class="exercise-number">${index + 1}/${workout.exercisesList.length}</span>
        </div>
        <div class="sets-container">
          ${Array.from({length: exercise.sets}, (_, i) => `
            <div class="set-item" data-exercise="${index}" data-set="${i}">
              <span class="set-number">المجموعة ${i + 1}</span>
              <div class="set-inputs">
                <input type="number" class="weight-input" placeholder="الوزن" value="${exercise.weight}">
                <input type="number" class="reps-input" placeholder="التكرارات" value="${exercise.reps}">
              </div>
              <button class="complete-set-btn" onclick="completeSet(${index}, ${i})">
                <i class="fas fa-check"></i>
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
  }
}

function completeSet(exerciseIndex, setIndex) {
  const setItem = document.querySelector(`[data-exercise="${exerciseIndex}"][data-set="${setIndex}"]`);
  if (setItem) {
    setItem.classList.add('completed');
    const completeBtn = setItem.querySelector('.complete-set-btn');
    completeBtn.innerHTML = '<i class="fas fa-check-circle"></i>';
    completeBtn.style.background = '#4CAF50';
  }
}

// ===== إدارة الإشعارات =====
function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
        notification.innerHTML = `
    <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
  setTimeout(() => {
    notification.classList.add('show');
  }, 100);
  
        setTimeout(() => {
    notification.classList.remove('show');
            setTimeout(() => {
      document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

// ===== تحديث التاريخ =====
function updateCurrentDate() {
  const dateElement = document.getElementById('current-date');
  if (dateElement) {
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = now.toLocaleDateString('ar-SA', options);
  }
}

// ===== حفظ البيانات =====
function saveWorkout() {
  const name = document.getElementById('workout-name').value;
  const type = document.getElementById('workout-type').value;
  
  if (!name.trim()) {
    showNotification('يرجى إدخال اسم التمرين', 'error');
    return;
  }
  
  const newWorkout = {
    id: Date.now(),
    name: name,
    type: type,
    exercises: 0,
    duration: 0,
    lastWorkout: null,
    progress: 0,
    exercisesList: []
  };
  
  appData.workouts.unshift(newWorkout);
  showNotification('تم حفظ التمرين بنجاح', 'success');
  hideModal('new-workout-modal');
  updateWorkoutsList();
}

// ===== تحديث قائمة التمارين =====
function updateWorkoutsList() {
  const workoutsList = document.getElementById('workouts-list');
  if (workoutsList) {
    workoutsList.innerHTML = appData.workouts.map(workout => `
      <div class="workout-item" onclick="selectWorkout(${workout.id})">
        <div class="workout-icon">
          <i class="fas fa-dumbbell"></i>
        </div>
        <div class="workout-details">
          <h4>${workout.name}</h4>
          <p>${workout.exercises} تمارين • ${workout.duration} دقيقة</p>
        </div>
        <div class="workout-actions">
          <button class="btn-primary" onclick="startWorkout(${workout.id}); event.stopPropagation();">
            <i class="fas fa-play"></i>
          </button>
          <button class="btn-secondary" onclick="editWorkout(${workout.id}); event.stopPropagation();">
            <i class="fas fa-edit"></i>
          </button>
        </div>
      </div>
    `).join('');
  }
}

// ===== إدارة قاعدة البيانات =====
function showExercisesDatabase() {
  const exercisesContainer = document.getElementById('exercises-database');
  if (exercisesContainer) {
    exercisesContainer.innerHTML = appData.exercises.map(exercise => `
      <div class="exercise-db-item">
        <div class="exercise-icon">
          <i class="${exercise.icon}"></i>
        </div>
        <div class="exercise-info">
          <h4>${exercise.name}</h4>
          <p>${exercise.category}</p>
        </div>
        <button class="btn-secondary" onclick="addToWorkout('${exercise.name}')">
          <i class="fas fa-plus"></i>
        </button>
      </div>
    `).join('');
  }
}

// ===== إدارة السجل =====
function showWorkoutHistory() {
  const historyContainer = document.getElementById('workout-history');
  if (historyContainer) {
    historyContainer.innerHTML = appData.recentWorkouts.map(workout => `
      <div class="history-item">
        <div class="history-icon">
          <i class="fas fa-dumbbell"></i>
        </div>
        <div class="history-details">
          <h4>${workout.name}</h4>
          <p>${workout.date} • ${workout.duration} دقيقة</p>
        </div>
        <div class="history-score">
          <span class="score">${workout.score}</span>
        </div>
      </div>
    `).join('');
  }
}

// ===== إدارة الإعدادات =====
function showSettings() {
  showModal('settings-modal');
}

// ===== إدارة الإشعارات =====
function showNotifications() {
  showModal('notifications-modal');
}

// ===== إدارة الإنجازات =====
function showAchievements() {
  const achievementsContainer = document.getElementById('achievements-container');
  if (achievementsContainer) {
    achievementsContainer.innerHTML = appData.achievements.map(achievement => `
      <div class="achievement-item ${achievement.unlocked ? 'unlocked' : 'locked'}">
        <div class="achievement-icon">
          <i class="${achievement.icon}"></i>
        </div>
        <div class="achievement-info">
          <h4>${achievement.name}</h4>
          <p>${achievement.description}</p>
          ${achievement.unlocked ? 
            `<span class="achievement-date">تم الحصول عليه في ${achievement.date}</span>` :
            `<div class="achievement-progress">
              <div class="progress-bar">
                <div class="progress-fill" style="width: ${achievement.progress}%"></div>
              </div>
              <span class="progress-text">${achievement.progress}%</span>
            </div>`
          }
        </div>
        <div class="achievement-status">
          ${achievement.unlocked ? 
            '<i class="fas fa-check-circle"></i>' : 
            '<i class="fas fa-lock"></i>'
          }
        </div>
      </div>
    `).join('');
  }
}

// ===== إدارة التحديات =====
function showChallenges() {
  const challengesContainer = document.getElementById('challenges-container');
  if (challengesContainer) {
    challengesContainer.innerHTML = appData.challenges.map(challenge => `
      <div class="challenge-item">
        <div class="challenge-header">
          <h4>${challenge.name}</h4>
          <span class="challenge-type ${challenge.type}">${challenge.type}</span>
        </div>
        <p class="challenge-description">${challenge.description}</p>
        <div class="challenge-stats">
          <div class="challenge-stat">
            <i class="fas fa-users"></i>
            <span>${challenge.participants} مشارك</span>
          </div>
          <div class="challenge-stat">
            <i class="fas fa-clock"></i>
            <span>${challenge.daysLeft} يوم متبقي</span>
          </div>
        </div>
        <div class="challenge-progress">
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${challenge.progress}%"></div>
          </div>
          <span class="progress-text">${challenge.progress}% مكتمل</span>
        </div>
        <div class="challenge-reward">
          <i class="fas fa-trophy"></i>
          <span>${challenge.reward}</span>
        </div>
        <button class="btn-primary challenge-join-btn">
          <i class="fas fa-play"></i>
          انضم للتحدي
        </button>
      </div>
    `).join('');
  }
}

// ===== إدارة المدربين =====
function showCoaches() {
  const coachesContainer = document.getElementById('coaches-container');
  if (coachesContainer) {
    coachesContainer.innerHTML = appData.coaches.map(coach => `
      <div class="coach-item">
        <div class="coach-avatar">
          <img src="${coach.avatar}" alt="${coach.name}">
          <div class="online-status ${coach.online ? 'online' : 'offline'}">
            <i class="fas fa-circle"></i>
          </div>
        </div>
        <div class="coach-info">
          <h4>${coach.name}</h4>
          <p class="coach-specialty">${coach.specialty}</p>
          <div class="coach-details">
            <span class="coach-experience">
              <i class="fas fa-clock"></i>
              ${coach.experience}
            </span>
            <span class="coach-rating">
              <i class="fas fa-star"></i>
              ${coach.rating}
            </span>
          </div>
        </div>
        <div class="coach-actions">
          <div class="coach-price">${coach.price}</div>
          <button class="btn-primary coach-book-btn">
            <i class="fas fa-calendar"></i>
            احجز جلسة
          </button>
          <button class="btn-secondary coach-chat-btn">
            <i class="fas fa-comment"></i>
            دردشة
          </button>
        </div>
      </div>
    `).join('');
  }
}

// ===== إضافة الصفحات المفقودة =====
function createMissingPages() {
  const appContainer = document.querySelector('.app-container');
  
  // صفحة التمارين
  if (!document.getElementById('workouts-page')) {
    const workoutsPage = document.createElement('div');
    workoutsPage.id = 'workouts-page';
    workoutsPage.className = 'page';
    workoutsPage.style.display = 'none';
    workoutsPage.innerHTML = `
      <div class="page-header">
        <h2>التمارين</h2>
        <button class="btn-primary" onclick="showModal('new-workout-modal')">
          <i class="fas fa-plus"></i>
          تمرين جديد
        </button>
      </div>
      <div class="workouts-container" id="workouts-list">
        <!-- سيتم ملؤها بواسطة updateWorkoutsList() -->
      </div>
    `;
    appContainer.appendChild(workoutsPage);
  }
  
  // صفحة قاعدة البيانات
  if (!document.getElementById('exercises-page')) {
    const exercisesPage = document.createElement('div');
    exercisesPage.id = 'exercises-page';
    exercisesPage.className = 'page';
    exercisesPage.style.display = 'none';
    exercisesPage.innerHTML = `
      <div class="page-header">
        <h2>قاعدة بيانات التمارين</h2>
        <div class="search-box">
          <input type="text" placeholder="البحث في التمارين..." id="exercise-search">
          <i class="fas fa-search"></i>
        </div>
      </div>
      <div class="exercises-container" id="exercises-database">
        <!-- سيتم ملؤها بواسطة showExercisesDatabase() -->
      </div>
    `;
    appContainer.appendChild(exercisesPage);
  }
  
  // صفحة السجل
  if (!document.getElementById('history-page')) {
    const historyPage = document.createElement('div');
    historyPage.id = 'history-page';
    historyPage.className = 'page';
    historyPage.style.display = 'none';
    historyPage.innerHTML = `
      <div class="page-header">
        <h2>سجل التمارين</h2>
        <div class="filter-buttons">
          <button class="filter-btn active" data-filter="all">الكل</button>
          <button class="filter-btn" data-filter="week">هذا الأسبوع</button>
          <button class="filter-btn" data-filter="month">هذا الشهر</button>
        </div>
      </div>
      <div class="history-container" id="workout-history">
        <!-- سيتم ملؤها بواسطة showWorkoutHistory() -->
      </div>
    `;
    appContainer.appendChild(historyPage);
  }
  
  // صفحة الملف الشخصي
  if (!document.getElementById('profile-page')) {
    const profilePage = document.createElement('div');
    profilePage.id = 'profile-page';
    profilePage.className = 'page';
    profilePage.style.display = 'none';
    profilePage.innerHTML = `
      <div class="profile-header">
        <div class="profile-avatar">
          <i class="fas fa-user"></i>
        </div>
        <div class="profile-info">
          <h3>المستخدم</h3>
          <p>عضو منذ مارس 2024</p>
        </div>
      </div>
      <div class="profile-stats">
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-dumbbell"></i>
          </div>
          <div class="stat-info">
            <span class="stat-number">${appData.userStats.totalWorkouts}</span>
            <span class="stat-label">تمرين مكتمل</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-clock"></i>
          </div>
          <div class="stat-info">
            <span class="stat-number">${Math.round(appData.userStats.totalDuration / 60)}</span>
            <span class="stat-label">ساعة تدريب</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-fire"></i>
          </div>
          <div class="stat-info">
            <span class="stat-number">${appData.userStats.currentStreak}</span>
            <span class="stat-label">يوم متتالي</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-trophy"></i>
          </div>
          <div class="stat-info">
            <span class="stat-number">${Object.keys(appData.userStats.personalRecords).length}</span>
            <span class="stat-label">رقم قياسي</span>
          </div>
        </div>
      </div>
      <div class="profile-actions">
        <button class="profile-btn" onclick="showSettings()">
          <i class="fas fa-cog"></i>
          الإعدادات
        </button>
        <button class="profile-btn" onclick="showNotifications()">
          <i class="fas fa-bell"></i>
          الإشعارات
        </button>
        <button class="profile-btn" onclick="exportData()">
          <i class="fas fa-download"></i>
          تصدير البيانات
        </button>
      </div>
    `;
    appContainer.appendChild(profilePage);
  }
  
  // صفحة المجتمع
  if (!document.getElementById('community-page')) {
    const communityPage = document.createElement('div');
    communityPage.id = 'community-page';
    communityPage.className = 'page';
    communityPage.style.display = 'none';
    communityPage.innerHTML = `
      <div class="page-header">
        <h2>المجتمع</h2>
      </div>
      <div class="community-feed" id="community-feed">
        <!-- سيتم ملؤها بواسطة showCommunityFeed() -->
      </div>
    `;
    appContainer.appendChild(communityPage);
  }
}

// ===== إضافة النوافذ المنبثقة المفقودة =====
function createMissingModals() {
  // نافذة جلسة التمرين
  if (!document.getElementById('workout-session-modal')) {
    const sessionModal = document.createElement('div');
    sessionModal.className = 'modal-overlay';
    sessionModal.id = 'workout-session-modal';
    sessionModal.style.display = 'none';
    sessionModal.innerHTML = `
      <div class="modal workout-session-modal">
        <div class="modal-header">
          <h3>جلسة التمرين</h3>
          <button class="close-btn" onclick="hideModal('workout-session-modal')">&times;</button>
        </div>
        <div class="modal-body">
          <div class="workout-timer">
            <span id="workout-timer">00:00</span>
          </div>
          <div class="workout-session-container" id="workout-session-container">
            <!-- سيتم ملؤها بواسطة updateWorkoutSession() -->
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-secondary" onclick="pauseWorkout()">
            <i class="fas fa-pause"></i>
            إيقاف مؤقت
          </button>
          <button class="btn-primary" onclick="finishWorkout()">
            <i class="fas fa-check"></i>
            إنهاء التمرين
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(sessionModal);
  }
  
  // نافذة الإعدادات
  if (!document.getElementById('settings-modal')) {
    const settingsModal = document.createElement('div');
    settingsModal.className = 'modal-overlay';
    settingsModal.id = 'settings-modal';
    settingsModal.style.display = 'none';
    settingsModal.innerHTML = `
      <div class="modal">
        <div class="modal-header">
          <h3>الإعدادات</h3>
          <button class="close-btn" onclick="hideModal('settings-modal')">&times;</button>
        </div>
        <div class="modal-body">
          <div class="setting-item">
            <label>اللغة</label>
            <select>
              <option value="ar">العربية</option>
              <option value="en">English</option>
            </select>
          </div>
          <div class="setting-item">
            <label>وحدة الوزن</label>
            <select>
              <option value="kg">كيلوغرام</option>
              <option value="lb">باوند</option>
            </select>
          </div>
          <div class="setting-item">
            <label>مؤقت الراحة الافتراضي</label>
            <input type="number" value="90" min="30" max="300">
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(settingsModal);
  }
  
  // نافذة الإشعارات
  if (!document.getElementById('notifications-modal')) {
    const notificationsModal = document.createElement('div');
    notificationsModal.className = 'modal-overlay';
    notificationsModal.id = 'notifications-modal';
    notificationsModal.style.display = 'none';
    notificationsModal.innerHTML = `
      <div class="modal">
        <div class="modal-header">
          <h3>الإشعارات</h3>
          <button class="close-btn" onclick="hideModal('notifications-modal')">&times;</button>
        </div>
        <div class="modal-body">
          <div class="notification-item">
            <div class="notification-icon">
              <i class="fas fa-trophy"></i>
            </div>
            <div class="notification-content">
              <h4>أحسنت! رقم قياسي جديد</h4>
              <p>حطمت رقمك القياسي في تمرين ضغط البنش</p>
              <span class="notification-time">منذ 5 دقائق</span>
            </div>
          </div>
          <div class="notification-item">
            <div class="notification-icon">
              <i class="fas fa-calendar"></i>
            </div>
            <div class="notification-content">
              <h4>موعد التمرين</h4>
              <p>حان وقت تمرين الصدر والذراعين</p>
              <span class="notification-time">منذ ساعة</span>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(notificationsModal);
  }
  
  // نافذة إضافة بوست جديد
  if (!document.getElementById('add-post-modal')) {
    const addPostModal = document.createElement('div');
    addPostModal.className = 'modal-overlay';
    addPostModal.id = 'add-post-modal';
    addPostModal.style.display = 'none';
    addPostModal.innerHTML = `
      <div class="modal">
        <div class="modal-header">
          <h3>إضافة بوست جديد</h3>
          <button class="close-btn" onclick="hideModal('add-post-modal')">&times;</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label>اسم المستخدم</label>
            <input type="text" id="new-post-user" placeholder="اسمك أو اسم مستعار">
          </div>
          <div class="form-group">
            <label>نص البوست</label>
            <textarea id="new-post-text" placeholder="اكتب شيئًا..." rows="3"></textarea>
          </div>
          <div class="form-group">
            <label>رابط صورة (اختياري)</label>
            <input type="text" id="new-post-image" placeholder="رابط صورة (اختياري)">
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-secondary" onclick="hideModal('add-post-modal')">إلغاء</button>
          <button class="btn-primary" id="save-post-btn">نشر</button>
        </div>
      </div>
    `;
    document.body.appendChild(addPostModal);
  }
}

// ===== ربط الأحداث =====
function bindEvents() {
  // أزرار الإجراءات السريعة
  document.getElementById('new-workout-btn')?.addEventListener('click', () => {
    showModal('new-workout-modal');
  });
  
  document.getElementById('continue-workout-btn')?.addEventListener('click', () => {
    startWorkout();
  });
  
  document.getElementById('workout-history-btn')?.addEventListener('click', () => {
    showPage('history');
  });
  
  // أزرار التمرين اليوم
  document.getElementById('start-workout-btn')?.addEventListener('click', startWorkout);
  document.getElementById('edit-workout-btn')?.addEventListener('click', () => {
    showModal('edit-workout-modal');
  });
  
  // أزرار عرض الكل
  document.getElementById('view-all-workouts')?.addEventListener('click', () => {
    showPage('workouts');
  });
  
  document.getElementById('view-all-history')?.addEventListener('click', () => {
    showPage('history');
  });
  
  // أزرار الإعدادات والإشعارات
  document.getElementById('settings-btn')?.addEventListener('click', showSettings);
  document.getElementById('notifications-btn')?.addEventListener('click', showNotifications);
  
  // أزرار النوافذ المنبثقة
  document.getElementById('save-workout-btn')?.addEventListener('click', saveWorkout);
  
  // إغلاق النوافذ المنبثقة
  document.querySelectorAll('.close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-modal') || 
                     btn.closest('.modal-overlay')?.id;
      if (modalId) hideModal(modalId);
    });
  });
  
  // إغلاق النوافذ المنبثقة عند الضغط خارجها
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        hideModal(overlay.id);
      }
    });
  });
  
  // زر المجتمع
  document.querySelector('.nav-item[data-page="community"]')?.addEventListener('click', () => {
    showPage('community');
    showCommunityFeed();
  });
  
  // زر إضافة بوست جديد
  document.getElementById('add-post-btn')?.addEventListener('click', () => {
    showModal('add-post-modal');
  });
}

// ===== بوستات السوشيال ميديا التجريبية =====
let socialPosts = [
  // {
  //   user: 'ahmed_fit',
  //   avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  //   time: 'منذ 10 دقائق',
  //   media: { type: 'image', url: 'https://images.unsplash.com/photo-1517960413843-0aee8e2d471c?auto=format&fit=crop&w=400&q=80' },
  //   text: 'أكملت تمرين الصدر اليوم! 💪🔥 ضغط البنش 100 كجم × 8 تكرارات. الشعور رهيب!',
  //   likes: 24,
  //   liked: true,
  //   comments: [
  //     { user: 'mona', text: 'برافو عليك! 🔥', likes: 3 },
  //     { user: 'coach_ali', text: 'أداء ممتاز! استمر هكذا', likes: 2 },
  //     { user: 'fitness_lover', text: 'أنا كمان بدأت تمرين الصدر اليوم 💪', likes: 1 }
  //   ]
  // },
  {
    user: 'sara.gym',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    time: 'منذ ساعة',
    media: { type: 'image', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' },
    text: 'تمرين الرجلين كان متعب بس ممتع! 🦵✨ القرفصاء 80 كجم × 10 تكرارات × 4 مجموعات',
    likes: 31,
    liked: false,
    comments: [
      { user: 'ahmed_fit', text: '🔥🔥 أداء قوي!', likes: 5 },
      { user: 'coach', text: 'استمري! الرجلين أساس الجسم', likes: 4 },
      { user: 'gym_buddy', text: 'أنا كمان أحب تمرين الرجلين 💪', likes: 2 }
    ]
  },
  {
    user: 'mohamed_pro',
    avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
    time: 'منذ ساعتين',
    media: null,
    text: 'حافظ على استمراريتك، النتائج قادمة! 🚀 اليوم 30 يوم متواصل في الجيم. لا تستسلم!',
    likes: 18,
    liked: true,
    comments: [
      { user: 'fitness_goals', text: 'إلهام حقيقي! 👏', likes: 3 },
      { user: 'workout_motivation', text: 'أحتاج هذا التحفيز اليوم', likes: 2 }
    ]
  },
  {
    user: 'lina_fitness',
    avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
    time: 'منذ 3 ساعات',
    media: { type: 'image', url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=400&q=80' },
    text: 'تمارين الكارديو اليوم! 🏃‍♀️ 30 دقيقة ركض + 15 دقيقة تمارين HIIT. الشعور رهيب!',
    likes: 42,
    liked: false,
    comments: [
      { user: 'cardio_lover', text: 'أداء ممتاز! 🔥', likes: 6 },
      { user: 'fitness_coach', text: 'مزيج مثالي من الكارديو!', likes: 4 },
      { user: 'health_freak', text: 'أنا كمان أحب HIIT 💪', likes: 3 }
    ]
  },
  {
    user: 'omar_strength',
    avatar: 'https://randomuser.me/api/portraits/men/78.jpg',
    time: 'منذ 5 ساعات',
    media: { type: 'image', url: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=400&q=80' },
    text: 'تمرين الظهر اليوم! 🏋️‍♂️ سحب البار 120 كجم × 6 تكرارات. الظهر أصبح أقوى!',
    likes: 28,
    liked: true,
    comments: [
      { user: 'back_master', text: 'أوزان قوية! 💪', likes: 4 },
      { user: 'strength_training', text: 'أداء ممتاز في سحب البار', likes: 3 },
      { user: 'gym_warrior', text: 'أنا كمان أحب تمرين الظهر 🔥', likes: 2 }
    ]
  },
  {
    user: 'nour_yoga',
    avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
    time: 'منذ 6 ساعات',
    media: null,
    text: 'جلسة يوغا صباحية 🧘‍♀️ 45 دقيقة من الاسترخاء والتمدد. بداية مثالية لليوم!',
    likes: 15,
    liked: false,
    comments: [
      { user: 'yoga_lover', text: 'السلام الداخلي يبدأ باليوغا 🕉️', likes: 3 },
      { user: 'mindful_life', text: 'أحتاج جلسة يوغا اليوم', likes: 2 }
    ]
  },
  {
    user: 'karim_boxing',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    time: 'منذ 8 ساعات',
    media: { type: 'image', url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=400&q=80' },
    text: 'جلسة ملاكمة اليوم! 🥊 10 جولات × 3 دقائق. التعرق والطاقة في أعلى مستوياتها!',
    likes: 35,
    liked: true,
    comments: [
      { user: 'boxing_champ', text: 'أداء قوي! 🔥', likes: 5 },
      { user: 'fight_club', text: 'الملاكمة أفضل تمرين للقلب', likes: 4 },
      { user: 'warrior_spirit', text: 'أنا كمان أحب الملاكمة 💪', likes: 3 }
    ]
  },
  {
    user: 'dalia_pilates',
    avatar: 'https://randomuser.me/api/portraits/women/67.jpg',
    time: 'منذ 10 ساعات',
    media: { type: 'image', url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=400&q=80' },
    text: 'جلسة بيلاتس اليوم! 🧘‍♀️ 60 دقيقة من تمارين القوة والمرونة. الجسم يشعر بالانتعاش!',
    likes: 22,
    liked: false,
    comments: [
      { user: 'pilates_pro', text: 'بيلاتس ممتاز للجسم! 💪', likes: 4 },
      { user: 'flexibility_queen', text: 'المرونة والقوة معاً 🎯', likes: 3 },
      { user: 'core_strength', text: 'أنا كمان أحب البيلاتس', likes: 2 }
    ]
  }
];

// نافذة التفاصيل بتصميم انستجرام
function showPostDetails(idx) {
  console.log('محاولة فتح البوست رقم:', idx);
  const post = socialPosts[idx];
  if (!post) {
    console.log('البوست غير موجود');
    return;
  }
  console.log('تم العثور على البوست:', post.user);
  
  // بناء نافذة التفاصيل
  let modal = document.getElementById('postDetailsModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'postDetailsModal';
    modal.className = 'modal-overlay post-details-overlay';
    modal.innerHTML = `
      <div class='modal post-details-modal'>
        <div class='post-details-header'>
          <div class='post-details-user'>
            <img class='avatar' src='${post.avatar}' alt='${post.user}'>
            <div class='user-info' style='display:flex;align-items:center;justify-content:space-between;gap:8px;'>
              <a class='username' href='profile.html?user=${post.user}'>${post.user}</a>
              <span class='time'>${post.time}</span>
            </div>
          </div>
          <button class='close-btn' onclick='closePostDetails()'>
            <i class='fas fa-times'></i>
          </button>
        </div>
        <div class='post-details-content'>
          <div class='post-details-media'></div>
          <div class='post-details-info'>
            <div class='post-details-text'>
              ${post.text}
            </div>
            <div class='post-details-actions'>
              <button class='like-btn${post.liked ? ' liked' : ''}' data-idx="${idx}" onclick="toggleLikeInModal(${idx})">
                <i class='fas fa-heart'></i>
              </button>
              <button class='comment-btn' onclick="focusCommentInput()">
                <i class='fas fa-comment'></i>
              </button>
              <button class='share-btn'>
                <i class='fas fa-share'></i>
              </button>
            </div>
            <div class='post-details-likes'>
              <span class='likes-count'>${post.likes} إعجاب</span>
            </div>
            <div class='post-details-comments'></div>
            <div class='post-details-add-comment'>
              <input type='text' placeholder='أضف تعليقاً...' class='comment-input'>
              <button class='post-comment-btn' disabled>نشر</button>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  } else {
    // تحديث المحتوى إذا كانت النافذة موجودة
    modal.querySelector('.post-details-user .avatar').src = post.avatar;
    modal.querySelector('.post-details-user .username').textContent = post.user;
    modal.querySelector('.post-details-user .time').textContent = post.time;
    modal.querySelector('.like-btn').className = `like-btn${post.liked ? ' liked' : ''}`;
    modal.querySelector('.like-btn').setAttribute('data-idx', idx);
    modal.querySelector('.like-btn').setAttribute('onclick', `toggleLikeInModal(${idx})`);
    modal.querySelector('.likes-count').textContent = `${post.likes} إعجاب`;
    modal.querySelector('.post-details-text').innerHTML = post.text;
    // تحديث زر المتابعة
    const followBtn = modal.querySelector('#followBtnModal');
    if (followBtn) {
      followBtn.setAttribute('onclick', `
        console.log('تم الضغط على زر المتابعة للمستخدم: ${post.user}');
        toggleFollow(event, '${post.user}');
        showPostDetails(${idx});
      `);
    }
  }
  
  // تحديث الوسائط
  const mediaContainer = modal.querySelector('.post-details-media');
  const postTextDiv = modal.querySelector('.post-details-text');
  if (post.media && post.media.url) {
    mediaContainer.style.display = 'flex';
    if (post.media.type === 'image') {
      mediaContainer.innerHTML = `<img src='${post.media.url}' alt='post'>`;
    } else if (post.media.type === 'video') {
      mediaContainer.innerHTML = `<video src='${post.media.url}' controls></video>`;
    }
    // تأكد أن نص البوست في مكانه الطبيعي
    postTextDiv.style.marginTop = '';
  } else {
    mediaContainer.innerHTML = '';
    mediaContainer.style.display = 'none';
    // اجعل نص البوست يلتصق بالهيدر
    postTextDiv.style.marginTop = '0';
  }
  
  // تحديث التعليقات
  updateModalComments(idx);
  
  // تفعيل إضافة تعليق
  const commentInput = modal.querySelector('.comment-input');
  const postCommentBtn = modal.querySelector('.post-comment-btn');
  
  commentInput.oninput = function() {
    postCommentBtn.disabled = !this.value.trim();
  };
  
  postCommentBtn.onclick = function() {
    const commentText = commentInput.value.trim();
    if (!commentText) return;
    
    // إضافة التعليق
    if (!post.comments) post.comments = [];
    post.comments.push({
      user: 'أنت',
      text: commentText,
      likes: 0,
      liked: false,
      isOwnComment: true
    });
    
    // تحديث العرض
    commentInput.value = '';
    postCommentBtn.disabled = true;
    updateModalComments(idx); // تحديث التعليقات في النافذة
    renderFeed(); // تحديث الفيد الرئيسي
    renderHomeFeed(); // تحديث الفيد في الصفحة الرئيسية
  };
  
  modal.style.display = 'flex';
  modal.style.opacity = '1';
  modal.style.visibility = 'visible';
  
  console.log('تم إظهار النافذة');
  
  // منع التمرير في الصفحة الخلفية
  document.body.style.overflow = 'hidden';
}

// تحديث التعليقات في النافذة
function updateModalComments(postIdx) {
  const post = socialPosts[postIdx];
  if (!post) return;
  
  const modal = document.getElementById('postDetailsModal');
  if (!modal) return;
  
  const commentsContainer = modal.querySelector('.post-details-comments');
  const allComments = (post.comments || []).slice().sort((a,b) => (b.likes||0)-(a.likes||0));
  
  if (allComments.length > 0) {
    commentsHtml = allComments.map((c, cidx) => `
      <div class='post-details-comment'>
        <div class='comment-content'>
          <a class='username' href='profile.html?user=${c.user}'>${c.user}</a> ${c.text}
        </div>
        <div class='comment-actions'>
          <button class='comment-like-btn${c.liked ? ' liked' : ''}' onclick="toggleCommentLikeInModal(${postIdx}, ${cidx})">
            <i class='fas fa-heart'></i>
          </button>
          ${c.isOwnComment ? `<button class='delete-comment-btn' onclick="deleteCommentInModal(${postIdx}, ${cidx})">
            <i class='fas fa-trash'></i>
          </button>` : ''}
        </div>
      </div>
    `).join('');
    commentsContainer.innerHTML = commentsHtml;
  } else {
    commentsContainer.innerHTML = '<div class="no-comments">لا توجد تعليقات بعد</div>';
  }
}

// تفعيل الإعجاب من داخل النافذة
function toggleLikeInModal(postIdx) {
  const post = socialPosts[postIdx];
  if (!post) return;
  
  post.liked = !post.liked;
  if (post.liked) {
    post.likes++;
  } else {
    post.likes = Math.max(0, post.likes - 1);
  }
  
  // تحديث النافذة
  const modal = document.getElementById('postDetailsModal');
  if (modal) {
    const likeBtn = modal.querySelector('.like-btn');
    const likesCount = modal.querySelector('.likes-count');
    
    likeBtn.className = `like-btn${post.liked ? ' liked' : ''}`;
    likesCount.textContent = `${post.likes} إعجاب`;
  }
  
  // تحديث الفيد الرئيسي
  renderFeed();
  renderHomeFeed();
}

// تفعيل إعجاب التعليق من داخل النافذة
function toggleCommentLikeInModal(postIdx, commentIdx) {
  const post = socialPosts[postIdx];
  if (!post || !post.comments || !post.comments[commentIdx]) return;
  
  const comment = post.comments[commentIdx];
  comment.liked = !comment.liked;
  if (comment.liked) {
    comment.likes = (comment.likes || 0) + 1;
  } else {
    comment.likes = Math.max(0, (comment.likes || 0) - 1);
  }
  
  // تحديث النافذة
  updateModalComments(postIdx);
  
  // تحديث الفيد الرئيسي
  renderFeed();
  renderHomeFeed();
}

// حذف التعليق من داخل النافذة
function deleteCommentInModal(postIdx, commentIdx) {
  const post = socialPosts[postIdx];
  if (!post || !post.comments || !post.comments[commentIdx]) return;
  
  // تأكيد الحذف
  if (confirm('هل أنت متأكد من حذف هذا التعليق؟')) {
    post.comments.splice(commentIdx, 1);
    
    // تحديث النافذة
    updateModalComments(postIdx);
    
    // تحديث الفيد الرئيسي
    renderFeed();
    renderHomeFeed();
    
    showNotification('تم حذف التعليق بنجاح', 'success');
  }
}

// إغلاق نافذة التفاصيل
function closePostDetails() {
  const modal = document.getElementById('postDetailsModal');
  if (modal) {
    modal.style.display = 'none';
    modal.style.opacity = '0';
    modal.style.visibility = 'hidden';
    // إعادة تفعيل التمرير في الصفحة
    document.body.style.overflow = '';
  }
}

// التركيز على حقل التعليق
function focusCommentInput() {
  const commentInput = document.querySelector('.comment-input');
  if (commentInput) {
    commentInput.focus();
  }
}

function showCommunityFeed() {
  const communityFeed = document.getElementById('community-feed');
  if (!communityFeed) return;
  
  // إنشاء عنصر feed داخل community-feed إذا لم يكن موجوداً
  let feed = communityFeed.querySelector('#feed');
  if (!feed) {
    feed = document.createElement('div');
    feed.id = 'feed';
    communityFeed.appendChild(feed);
  }
  
  renderFeed();
}

function renderFeed() {
  const feed = document.getElementById('feed');
  if (!feed) return;
  feed.innerHTML = socialPosts.map((post, idx) => {
    // أعلى 3 تعليقات حسب التفاعل
    let topComments = (post.comments||[]).slice().sort((a,b)=>(b.likes||0)-(a.likes||0)).slice(0,3);
    return `
    <div class="community-post" data-idx="${idx}" onclick="showPostDetails(${idx})">
      <div class="post-header" style="display:flex;align-items:center;justify-content:space-between;">
        <div style="display:flex;align-items:center;gap:8px;">
          <a href="profile.html?user=${post.user}"><img class="avatar" src="${post.avatar}" alt="${post.user}" style="object-fit:cover;"></a>
          <div class="user-info" style="display:flex;align-items:center;gap:8px;">
            <a href="profile.html?user=${post.user}" class="username" style="margin-right:0;">${post.user}</a>
          </div>
        </div>
        ${(post.user === 'أنت' || post.user === 'أحمد الجيمر') ? `
          <div class="post-menu-wrapper" style="position:relative;display:inline-block;">
            <button class="post-menu-btn" onclick="event.stopPropagation(); togglePostMenu(this, ${idx})" style="background:none;border:none;color:#fff;font-size:20px;cursor:pointer;padding:2px 8px;">&#8942;</button>
            <div class="post-menu-dropdown" style="display:none;position:absolute;left:0;top:28px;background:#232323;border-radius:8px;box-shadow:0 2px 12px #0005;z-index:10;min-width:120px;">
              <button onclick="deletePost(${idx})" style="color:#f55;background:none;border:none;padding:10px 16px;width:100%;text-align:right;font-size:15px;cursor:pointer;">حذف المنشور</button>
            </div>
          </div>
        ` : ''}
      </div>
      ${((post.media && post.media.url)
        ? (post.media.type === 'image' ? `<img class="post-image" src="${post.media.url}" alt="post">` : `<video class="post-image" src="${post.media.url}" controls></video>`)
        : '') + `<div class="post-text">${post.text}</div>`}
      <div class="post-time" style="padding:0 16px 4px;font-size:12px;color:#8e8e8e;text-align:right;">${post.time}</div>
      <div class="post-actions" onclick="event.stopPropagation()">
        <button class="like-btn${post.liked ? ' liked' : ''}" data-idx="${idx}" onclick="toggleLike(${idx})"><i class="fas fa-heart"></i> <span>${post.likes}</span></button>
        <button class="comment-btn" data-idx="${idx}"><i class="fas fa-comment"></i> <span>${post.comments.length}</span></button>
      </div>
      <div class="comments-list">
        ${topComments.map((c, cidx) => `
          <div class="comment">
            <div class="comment-content"><a href="profile.html?user=${c.user}" class="username">${c.user}:</a> ${c.text}</div>
            <div class="comment-actions">
              <button class='comment-like-btn${c.liked ? ' liked' : ''}' onclick="event.stopPropagation(); toggleCommentLike(${idx}, ${cidx})">
                <i class='fas fa-heart'></i>
              </button>
            </div>
          </div>
        `).join('')}
        ${post.comments.length > 3 ? `<div class="more-comments">عرض ${post.comments.length - 3} تعليق إضافي</div>` : ''}
      </div>
    </div>
    `;
  }).join('');
}

// نموذج نشر منشور جديد
const postForm = document.getElementById('postForm');
if (postForm) {
  let mediaFile = null;
  
  // تفعيل التمدد التلقائي للنص
  const textarea = document.getElementById('postText');
  const submitBtn = document.getElementById('postSubmitBtn');
  
  if (textarea) {
    textarea.addEventListener('input', function() {
      // إعادة تعيين الارتفاع
      this.style.height = 'auto';
      // تعيين الارتفاع الجديد
      this.style.height = Math.min(this.scrollHeight, 100) + 'px';
      
      // تفعيل/إلغاء تفعيل زر النشر
      if (submitBtn) {
        submitBtn.disabled = !this.value.trim() && !mediaFile;
      }
    });
    
    // تفعيل/إلغاء تفعيل زر النشر عند التحميل
    if (submitBtn) {
      submitBtn.disabled = !textarea.value.trim() && !mediaFile;
    }
  }
  
  postForm.onsubmit = function(e) {
    e.preventDefault();
    const text = document.getElementById('postText').value;
    if (!text.trim() && !mediaFile) return;
    
    const newPost = {
      user: 'أنت',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      time: 'الآن',
      media: null,
      text,
      likes: 0,
      liked: false,
      comments: []
    };
    
    if (mediaFile) {
      if (mediaFile.type.startsWith('image')) {
        newPost.media = { type: 'image', url: mediaFile.preview };
      } else if (mediaFile.type.startsWith('video')) {
        newPost.media = { type: 'video', url: mediaFile.preview };
      }
    }
    
    socialPosts.unshift(newPost);
    localStorage.setItem('socialPosts', JSON.stringify(socialPosts));
    document.getElementById('postText').value = '';
    document.getElementById('postText').style.height = 'auto';
    document.getElementById('mediaPreview').innerHTML = '';
    mediaFile = null;
    
    // إعادة تعطيل زر النشر
    if (submitBtn) {
      submitBtn.disabled = true;
    }
    
    renderFeed();
    renderHomeFeed();
    showNotification('تم نشر البوست بنجاح!', 'success');
  };
  
  // رفع صورة/فيديو
  document.getElementById('postImage').onchange = function(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(ev) {
      mediaFile = { type: file.type, preview: ev.target.result };
      const preview = document.getElementById('mediaPreview');
      
      if (file.type.startsWith('image')) {
        preview.innerHTML = `<img src="${ev.target.result}" style="max-width:100%;border-radius:10px;">`;
      } else if (file.type.startsWith('video')) {
        preview.innerHTML = `<video src="${ev.target.result}" controls style="max-width:100%;border-radius:10px;"></video>`;
      }
      
      // تفعيل زر النشر إذا كان هناك نص أو وسائط
      if (submitBtn) {
        submitBtn.disabled = !textarea.value.trim() && !mediaFile;
      }
    };
    reader.readAsDataURL(file);
  };
}

// عند تحميل الصفحة الرئيسية
if (document.getElementById('feed')) {
  renderFeed();
}

// عرض البوستات في الصفحة الرئيسية
if (document.getElementById('home-feed')) {
  renderHomeFeed();
}

// إضافة event listener للصفحة
document.addEventListener('DOMContentLoaded', function() {
  console.log('الصفحة تم تحميلها');
  console.log('عدد البوستات:', socialPosts.length);
  
  // عرض البوستات في الصفحة الرئيسية
  if (document.getElementById('home-feed')) {
    renderHomeFeed();
  }
  
  // تفعيل السايدبار
  initializeSidebar();
});

// ===== عرض البوستات في الصفحة الرئيسية =====
function renderHomeFeed() {
  const homeFeed = document.getElementById('home-feed');
  if (!homeFeed) return;
  
  // عرض أول 5 بوستات فقط في الصفحة الرئيسية
  const homePosts = socialPosts.slice(0, 5);
  
  homeFeed.innerHTML = homePosts.map((post, idx) => {
    // أعلى 2 تعليق فقط في الصفحة الرئيسية
    let topComments = (post.comments||[]).slice().sort((a,b)=>(b.likes||0)-(a.likes||0)).slice(0,2);
    return `
    <div class="community-post" data-idx="${idx}" onclick="showPostDetails(${idx})">
      <div class="post-header" style="display:flex;align-items:center;justify-content:space-between;">
        <div style="display:flex;align-items:center;gap:8px;">
          <a href="profile.html?user=${post.user}"><img class="avatar" src="${post.avatar}" alt="${post.user}" style="object-fit:cover;"></a>
          <div class="user-info" style="display:flex;align-items:center;gap:8px;">
            <a href="profile.html?user=${post.user}" class="username" style="margin-right:0;">${post.user}</a>
          </div>
        </div>
        ${(post.user === 'أنت' || post.user === 'أحمد الجيمر') ? `
          <div class="post-menu-wrapper" style="position:relative;display:inline-block;">
            <button class="post-menu-btn" onclick="event.stopPropagation(); togglePostMenu(this, ${idx})" style="background:none;border:none;color:#fff;font-size:20px;cursor:pointer;padding:2px 8px;">&#8942;</button>
            <div class="post-menu-dropdown" style="display:none;position:absolute;left:0;top:28px;background:#232323;border-radius:8px;box-shadow:0 2px 12px #0005;z-index:10;min-width:120px;">
              <button onclick="deletePost(${idx})" style="color:#f55;background:none;border:none;padding:10px 16px;width:100%;text-align:right;font-size:15px;cursor:pointer;">حذف المنشور</button>
            </div>
          </div>
        ` : ''}
      </div>
      ${((post.media && post.media.url)
        ? (post.media.type === 'image' ? `<img class="post-image" src="${post.media.url}" alt="post">` : `<video class="post-image" src="${post.media.url}" controls></video>`)
        : '') + `<div class="post-text">${post.text}</div>`}
      <div class="post-time" style="padding:0 16px 4px;font-size:12px;color:#8e8e8e;text-align:right;">${post.time}</div>
      <div class="post-actions" onclick="event.stopPropagation()">
        <button class="like-btn${post.liked ? ' liked' : ''}" data-idx="${idx}" onclick="toggleLike(${idx})"><i class="fas fa-heart"></i> <span>${post.likes}</span></button>
        <button class="comment-btn" data-idx="${idx}"><i class="fas fa-comment"></i> <span>${post.comments.length}</span></button>
      </div>
      <div class="comments-list">
        ${topComments.map((c, cidx) => `
          <div class="comment">
            <div class="comment-content"><a href="profile.html?user=${c.user}" class="username">${c.user}:</a> ${c.text}</div>
            <div class="comment-actions">
              <button class='comment-like-btn${c.liked ? ' liked' : ''}' onclick="toggleCommentLike(${idx}, ${cidx})">
                <i class='fas fa-heart'></i>
              </button>
            </div>
          </div>
        `).join('')}
        ${post.comments.length > 2 ? `<div class="more-comments">عرض ${post.comments.length - 2} تعليق إضافي</div>` : ''}
      </div>
    </div>
    `;
  }).join('');
}

// ===== تفعيل الإعجابات =====
function toggleLike(postIndex) {
  const post = socialPosts[postIndex];
  if (!post) return;
  
  post.liked = !post.liked;
  post.likes += post.liked ? 1 : -1;
  
  // تحديث العرض
  const likeBtn = document.querySelector(`[data-idx="${postIndex}"].like-btn`);
  if (likeBtn) {
    likeBtn.classList.toggle('liked', post.liked);
    likeBtn.querySelector('span').textContent = post.likes;
  }
  
  // تحديث الفيد في الصفحة الرئيسية
  if (document.getElementById('home-feed')) {
    renderHomeFeed();
  }
  
  // تحديث الفيد في صفحة المجتمع
  if (document.getElementById('feed')) {
    renderFeed();
  }
}

// ===== تفعيل إعجابات التعليقات =====
function toggleCommentLike(postIndex, commentIndex) {
  const post = socialPosts[postIndex];
  if (!post || !post.comments[commentIndex]) return;
  
  const comment = post.comments[commentIndex];
  comment.liked = !comment.liked;
  comment.likes = (comment.likes || 0) + (comment.liked ? 1 : -1);
  
  // تحديث العرض
  const commentLikeBtn = document.querySelector(`[data-idx="${postIndex}"] .comment:nth-child(${commentIndex + 1}) .comment-like-btn`);
  if (commentLikeBtn) {
    commentLikeBtn.classList.toggle('liked', comment.liked);
    commentLikeBtn.querySelector('.comment-like-count').textContent = comment.likes;
  }
  
  // تحديث الفيد في الصفحة الرئيسية
  if (document.getElementById('home-feed')) {
    renderHomeFeed();
  }
  
  // تحديث الفيد في صفحة المجتمع
  if (document.getElementById('feed')) {
    renderFeed();
  }
}

// ===== تهيئة التطبيق =====
function initApp() {
  createMissingPages();
  createMissingModals();
  bindEvents();
  updateCurrentDate();
  updateWorkoutsList();
  showExercisesDatabase();
  showWorkoutHistory();
  showCommunityFeed();
  showAchievements();
  showChallenges();
  showCoaches();
  // تحديث التاريخ كل دقيقة
  setInterval(updateCurrentDate, 60000);
  console.log('Hevy Mobile App initialized successfully!');
}

// ===== وظائف إضافية =====
function selectWorkout(workoutId) {
  const workout = appData.workouts.find(w => w.id === workoutId);
  if (workout) {
    showModal('workout-details-modal');
    // يمكن إضافة تفاصيل التمرين هنا
  }
}

function editWorkout(workoutId) {
  const workout = appData.workouts.find(w => w.id === workoutId);
  if (workout) {
    showModal('edit-workout-modal');
    // يمكن إضافة نموذج التعديل هنا
  }
}

function addToWorkout(exerciseName) {
  showNotification(`تم إضافة ${exerciseName} إلى التمرين`, 'success');
}

function pauseWorkout() {
  showNotification('تم إيقاف التمرين مؤقتاً', 'info');
}

function finishWorkout() {
  showNotification('تم إنهاء التمرين بنجاح!', 'success');
  hideModal('workout-session-modal');
}

function exportData() {
  showNotification('تم تصدير البيانات بنجاح', 'success');
}

// ===== وظائف السايدبار المركزية =====
function initializeSidebar() {
  const sidebarBtn = document.getElementById('sidebar-btn');
  const sidebar = document.getElementById('sidebar');
  const closeSidebar = document.getElementById('closeSidebar');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  
  if (!sidebarBtn || !sidebar || !closeSidebar || !sidebarOverlay) return;
  
  function openSidebar() {
    sidebar.classList.add('active');
    sidebarOverlay.classList.add('active');
  }
  
  function closeSidebarFn() {
    sidebar.classList.remove('active');
    sidebarOverlay.classList.remove('active');
  }
  
  sidebarBtn.onclick = openSidebar;
  closeSidebar.onclick = closeSidebarFn;
  sidebarOverlay.onclick = closeSidebarFn;
  
  // سحب لإغلاق السايدبار على الموبايل
  let startX = null;
  sidebar.addEventListener('touchstart', e => { startX = e.touches[0].clientX; });
  sidebar.addEventListener('touchmove', e => {
    if (startX !== null) {
      const diff = startX - e.touches[0].clientX;
      if (diff > 60) { closeSidebarFn(); startX = null; }
    }
  });
  sidebar.addEventListener('touchend', () => { startX = null; });
}

// ===== وظائف القائمة الإضافية المركزية =====
function initializeMoreNavigation() {
  const moreBtn = document.getElementById('showMoreNav');
  const moreSheet = document.getElementById('moreBottomSheet');
  const closeMore = document.getElementById('closeMoreNav');
  const moreOverlay = document.getElementById('moreOverlay');
  
  if (!moreBtn || !moreSheet || !closeMore) return;
  
  moreBtn.onclick = () => { 
    moreSheet.classList.add('active'); 
    if (moreOverlay) moreOverlay.classList.add('active'); 
  };
  
  closeMore.onclick = () => { 
    moreSheet.classList.remove('active'); 
    if (moreOverlay) moreOverlay.classList.remove('active'); 
  };
  
  if (moreOverlay) {
    moreOverlay.onclick = () => { 
      moreSheet.classList.remove('active'); 
      moreOverlay.classList.remove('active'); 
    };
  }
  
  // إغلاق بالسحب للأسفل
  let startY = null;
  moreSheet.addEventListener('touchstart', e => { startY = e.touches[0].clientY; });
  moreSheet.addEventListener('touchmove', e => {
    if (startY !== null) {
      const diff = e.touches[0].clientY - startY;
      if (diff > 60) { 
        moreSheet.classList.remove('active'); 
        if (moreOverlay) moreOverlay.classList.remove('active'); 
        startY = null; 
      }
    }
  });
  moreSheet.addEventListener('touchend', () => { startY = null; });
  
  // لا تغلق القائمة عند الضغط على أي عنصر بداخلها
  const sheetLinks = moreSheet.querySelectorAll('.sheet-action');
  sheetLinks.forEach(link => {
    link.onclick = function(e) {
      // لا تغلق القائمة تلقائياً
      // الانتقال للصفحة فقط
    };
  });
}

// ===== تشغيل التطبيق عند تحميل الصفحة =====
document.addEventListener('DOMContentLoaded', function() {
  initApp();
  initializeSidebar();
  initializeMoreNavigation();
});

// إضافة دعم لوحة المفاتيح
document.addEventListener('keydown', function(e) {
  const modal = document.getElementById('postDetailsModal');
  if (modal && modal.style.display === 'flex') {
    if (e.key === 'Escape') {
      closePostDetails();
    }
    if (e.key === 'Enter' && e.ctrlKey) {
      const commentInput = modal.querySelector('.comment-input');
      const postCommentBtn = modal.querySelector('.post-comment-btn');
      if (commentInput && postCommentBtn && !postCommentBtn.disabled) {
        postCommentBtn.click();
      }
    }
  }
});

// إغلاق النافذة عند النقر خارجها
document.addEventListener('click', function(e) {
  const modal = document.getElementById('postDetailsModal');
  if (modal && e.target === modal) {
    closePostDetails();
  }
});

// منع التمرير في الصفحة الخلفية عند فتح النافذة
function preventBackgroundScroll() {
  const modal = document.getElementById('postDetailsModal');
  if (modal && modal.style.display === 'flex') {
    // منع التمرير في الصفحة
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
  } else {
    // إعادة تفعيل التمرير
    document.body.style.overflow = 'auto';
    document.body.style.position = 'static';
    document.body.style.width = 'auto';
  }
}

// مراقبة تغييرات النافذة
const observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
      preventBackgroundScroll();
    }
  });
});

// بدء المراقبة
const postDetailsModal = document.getElementById('postDetailsModal');
if (postDetailsModal) {
  observer.observe(postDetailsModal, { attributes: true });
}

// منع التمرير في النافذة من التأثير على الصفحة الخلفية
document.addEventListener('touchmove', function(e) {
  const modal = document.getElementById('postDetailsModal');
  if (modal && modal.style.display === 'flex') {
    const target = e.target;
    const isInModal = modal.contains(target);
    const isScrollable = target.closest('.post-details-comments') || 
                        target.closest('.post-details-media') ||
                        target.closest('.post-details-info');
    
    if (!isInModal || !isScrollable) {
      e.preventDefault();
    }
  }
}, { passive: false });

// منع التمرير بالماوس في النافذة
document.addEventListener('wheel', function(e) {
  const modal = document.getElementById('postDetailsModal');
  if (modal && modal.style.display === 'flex') {
    const target = e.target;
    const isInModal = modal.contains(target);
    const isScrollable = target.closest('.post-details-comments') || 
                        target.closest('.post-details-media') ||
                        target.closest('.post-details-info');
    
    if (!isInModal || !isScrollable) {
      e.preventDefault();
    }
  }
}, { passive: false });

// أضف دوال المتابعة في أعلى الملف:
function isFollowing(username) {
  return localStorage.getItem('follow_' + username) === '1';
}
function setFollowing(username, val) {
  console.log('setFollowing:', username, val);
  localStorage.setItem('follow_' + username, val ? '1' : '0');
}

// أضف دالة toggleFollow في window:
window.toggleFollow = function(event, username) {
  event.stopPropagation();
  const state = isFollowing(username);
  setFollowing(username, !state);
  renderHomeFeed();
  if (typeof renderFeed === 'function') renderFeed();
};

/* أضف أو عدل CSS الخاص بالنافذة */
const style = document.createElement('style');
style.innerHTML = `
  .post-details-modal {
    max-width: 96vw;
    width: 100%;
    max-height: 96vh;
    height: auto;
    overflow-y: auto;
    border-radius: 16px;
    box-sizing: border-box;
    margin: 2vw auto;
    background: #222;
    color: #fff;
    display: flex;
    flex-direction: column;
    padding: 0;
  }
  .post-details-content {
    display: flex;
    flex-direction: column;
    gap: 0;
    width: 100%;
    box-sizing: border-box;
  }
  .post-details-media img,
  .post-details-media video {
    max-width: 100vw;
    max-height: 40vh;
    width: 100%;
    border-radius: 12px 12px 0 0;
    object-fit: cover;
    display: block;
    margin: 0 auto;
  }
  @media (max-width: 600px) {
    .post-details-modal {
      max-width: 100vw;
      margin: 0;
      border-radius: 0;
    }
    .post-details-media img,
    .post-details-media video {
      max-width: 100vw;
      max-height: 32vh;
    }
  }
`;
document.head.appendChild(style);

// في صفحة الملف الشخصي، عند تفعيل زر القائمة الجانبية:
if (window.location.pathname.includes('profile.html')) {
  const sidebarBtn = document.getElementById('sidebar-btn');
  if (sidebarBtn) {
    sidebarBtn.onclick = function() {
      window.location.href = 'profile.html?user=أنت';
    };
  }
}

// عند تحميل الصفحة: إذا كان هناك منشورات محفوظة في localStorage، استخدمها
if (localStorage.getItem('socialPosts')) {
  try {
    socialPosts = JSON.parse(localStorage.getItem('socialPosts'));
  } catch(e) {}
}

// أضف في نهاية الملف:
function togglePostMenu(btn, idx) {
  // إغلاق أي قائمة مفتوحة
  document.querySelectorAll('.post-menu-dropdown').forEach(el => el.style.display = 'none');
  // فتح القائمة الحالية
  const menu = btn.nextElementSibling;
  if (menu) menu.style.display = 'block';
  // إغلاق القائمة عند الضغط خارجها
  document.addEventListener('click', function handler(e) {
    if (!menu.contains(e.target) && e.target !== btn) {
      menu.style.display = 'none';
      document.removeEventListener('click', handler);
    }
  });
}
function deletePost(idx) {
  if (confirm('هل أنت متأكد من حذف هذا المنشور؟')) {
    socialPosts.splice(idx, 1);
    localStorage.setItem('socialPosts', JSON.stringify(socialPosts));
    renderFeed && renderFeed();
    renderHomeFeed && renderHomeFeed();
    // إذا كنت في صفحة البروفايل
    if (typeof renderProfile === 'function') renderProfile();
  }
}
