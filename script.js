// نصائح يومية
const tips = [
  "اشرب كمية كافية من الماء يوميًا.",
  "مارس تمارين الإحماء قبل التمرين.",
  "تناول البروتين بعد التمرين لبناء العضلات.",
  "نم جيدًا لتحسين الأداء الرياضي.",
  "قلل من السكريات للحفاظ على وزنك.",
  "قس وزنك في نفس الوقت يوميًا.",
  "نوع تمارينك لتحفيز العضلات.",
  "تناول الخضروات مع كل وجبة.",
  "حدد هدفًا واضحًا للياقتك.",
  "لا تهمل تمارين الإطالة بعد التمرين."
];
const tipBox = document.getElementById('daily-tip');
if (tipBox) {
  const today = new Date().toISOString().slice(0, 10);
  let tipIndex = localStorage.getItem('batgem_tip_date') === today ? +localStorage.getItem('batgem_tip_index') : Math.floor(Math.random() * tips.length);
  tipBox.textContent = tips[tipIndex];
  localStorage.setItem('batgem_tip_date', today);
  localStorage.setItem('batgem_tip_index', tipIndex);
}

// تفعيل تمييز الزر النشط في الشريط السفلي
const navBtns = document.querySelectorAll('.nav-btn');-
navBtns.forEach(btn => {
  btn.addEventListener('click', function() {
    navBtns.forEach(b => b.classList.remove('active'));
    this.classList.add('active');
  });
});

// الوضع الداكن/النهاري (ثابت على الداكن هنا)
const themeBtn = document.getElementById('toggle-theme');
if (themeBtn) {
  themeBtn.onclick = () => {};
  themeBtn.textContent = '🌙';
}

// حاسبة السعرات
const calorieForm = document.getElementById('calorie-form');
const calorieResult = document.getElementById('calorie-result');
if (calorieForm && calorieResult) {
  calorieForm.onsubmit = e => {
    e.preventDefault();
    const w = +calorieForm.weight.value;
    const h = +calorieForm.height.value;
    const a = +calorieForm.age.value;
    const g = calorieForm.gender.value;
    const act = +calorieForm.activity.value;
    if (!w || !h || !a || !g || !act) return;
    let bmr = g === 'male' ? 88.362 + (13.397 * w) + (4.799 * h) - (5.677 * a) : 447.593 + (9.247 * w) + (3.098 * h) - (4.330 * a);
    let cal = Math.round(bmr * act);
    calorieResult.textContent = `سعراتك اليومية: ${cal} سعر حراري`;
  };
}

// تتبع الوزن
const weightForm = document.getElementById('weight-form');
const weightTableElem = document.getElementById('weight-table');
if (weightTableElem) {
  const weightTable = weightTableElem.querySelector('tbody');
  function renderWeights() {
    const user = firebase.auth().currentUser;
    if (!user) {
      weightTable.innerHTML = '<tr><td colspan="3" style="text-align:center;color:#ffe08299;">سجل دخول لعرض أوزانك</td></tr>';
      return;
    }
    firebase.database().ref('weights/' + user.uid).once('value', snap => {
      const weights = snap.val() ? Object.values(snap.val()) : [];
      weightTable.innerHTML = '';
      weights.forEach((w) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${w.date}</td><td>${w.weight}</td><td><button class="delete-btn" data-i="${w.id}">حذف</button></td>`;
        weightTable.appendChild(tr);
      });
    });
  }
  renderWeights();
  if (weightForm) {
    weightForm.onsubmit = e => {
      e.preventDefault();
      const user = firebase.auth().currentUser;
      if (!user) {
        showAuthModalIfNeeded(() => weightForm.requestSubmit());
        return;
      }
      const weight = +weightForm['weight-input'].value;
      const date = weightForm['date-input'].value;
      if (!weight || !date) return;
      const id = Date.now();
      const weightObj = { weight, date, id };
      firebase.database().ref('weights/' + user.uid + '/' + id).set(weightObj, renderWeights);
      weightForm.reset();
    };
    weightTable.onclick = e => {
      if (e.target.classList.contains('delete-btn')) {
        const user = firebase.auth().currentUser;
        if (!user) {
          showAuthModalIfNeeded();
          return;
        }
        const id = e.target.dataset.i;
        firebase.database().ref('weights/' + user.uid + '/' + id).remove(renderWeights);
      }
    };
  }
  firebase.auth().onAuthStateChanged(renderWeights);
}

// مكتبة التمارين
const exerciseList = document.getElementById('exercise-list');
if (exerciseList) {
  const exercises = [
    { name: "Push Up", desc: "تمرين ضغط للصدر والذراعين.", youtube: "https://www.youtube.com/watch?v=_l3ySVKYVJ8" },
    { name: "Squat", desc: "تمرين القرفصاء لتقوية الرجلين.", youtube: "https://www.youtube.com/watch?v=aclHkVaku9U" },
    { name: "Plank", desc: "تمرين البلانك لتقوية البطن.", youtube: "https://www.youtube.com/watch?v=pSHjTRCQxIw" },
    { name: "Lunges", desc: "تمرين الطعنات لتقوية الرجلين والمؤخرة.", youtube: "https://www.youtube.com/watch?v=QOVaHwm-Q6U" },
    { name: "Crunches", desc: "تمرين المعدة الكلاسيكي.", youtube: "https://www.youtube.com/watch?v=Xyd_fa5zoEU" },
    { name: "Burpees", desc: "تمرين بيربي لحرق الدهون وزيادة اللياقة.", youtube: "https://www.youtube.com/watch?v=TU8QYVW0gDU" },
    { name: "Mountain Climbers", desc: "تمرين تسلق الجبل لشد البطن وزيادة اللياقة.", youtube: "https://www.youtube.com/watch?v=nmwgirgXLYM" },
    { name: "Pull Up", desc: "تمرين العقلة لتقوية الظهر والذراعين.", youtube: "https://www.youtube.com/watch?v=eGo4IYlbE5g" },
    { name: "Dips", desc: "تمرين الديبس لتقوية الترايسبس والصدر.", youtube: "https://www.youtube.com/watch?v=2z8JmcrW-As" },
    { name: "Jumping Jacks", desc: "تمرين القفز لرفع اللياقة وحرق السعرات.", youtube: "https://www.youtube.com/watch?v=c4DAnQ6DtF8" },
    { name: "Russian Twist", desc: "تمرين تويست روسي لعضلات البطن الجانبية.", youtube: "https://www.youtube.com/watch?v=wkD8rjkodUI" },
    { name: "Superman", desc: "تمرين سوبرمان لعضلات أسفل الظهر.", youtube: "https://www.youtube.com/watch?v=z6PJMT2y8GQ" }
  ];
  let openVideoIdx = null;
  function renderExercises() {
    exerciseList.innerHTML = exercises.map((ex, idx) => `
      <div class="exercise-card">
        <h3>${ex.name}</h3>
        <p>${ex.desc}</p>
        <button class="video-btn" data-vid="${ex.youtube}" data-idx="${idx}">شاهد الفيديو</button>
        ${openVideoIdx === idx ? `<div class="exercise-video"><iframe width="100%" height="100%" src="https://www.youtube.com/embed/${ex.youtube.split('v=')[1].split('&')[0]}?autoplay=1" frameborder="0" allowfullscreen></iframe></div>` : ''}
      </div>
    `).join('');
  }
  renderExercises();
  exerciseList.onclick = function(e) {
    if (e.target.classList.contains('video-btn')) {
      const idx = +e.target.dataset.idx;
      openVideoIdx = openVideoIdx === idx ? null : idx;
      renderExercises();
    }
  };
}

// مكتبة الوجبات
const mealsTableElem = document.getElementById('meals-table');
const mealsSearch = document.getElementById('meals-search');
const showMoreMealsBtn = document.getElementById('show-more-meals');
if (mealsTableElem) {
  const meals = [
    { name: "صدر دجاج مشوي", calories: 165, protein: 31, carbs: 0, fat: 3.6 },
    { name: "أرز أبيض", calories: 130, protein: 2.7, carbs: 28, fat: 0.3 },
    { name: "بيض مسلوق", calories: 78, protein: 6, carbs: 0.6, fat: 5.3 },
    { name: "بطاطس مسلوقة", calories: 87, protein: 2, carbs: 20, fat: 0.1 },
    { name: "تونة معلبة", calories: 132, protein: 28, carbs: 0, fat: 1 },
    { name: "شوفان بالحليب", calories: 220, protein: 9, carbs: 36, fat: 5 },
    { name: "سمك مشوي", calories: 180, protein: 22, carbs: 0, fat: 9 },
    { name: "سلطة خضراء", calories: 40, protein: 2, carbs: 8, fat: 0.5 },
    { name: "مكرونة مسلوقة", calories: 158, protein: 5.8, carbs: 31, fat: 0.9 },
    { name: "جبنة قريش", calories: 98, protein: 11, carbs: 3.4, fat: 4.3 },
    { name: "فول مدمس", calories: 110, protein: 8, carbs: 18, fat: 0.5 },
    { name: "عدس أصفر", calories: 116, protein: 9, carbs: 20, fat: 0.4 },
    { name: "بطاطا مشوية", calories: 90, protein: 2, carbs: 21, fat: 0.1 },
    { name: "لحم بقري مشوي", calories: 250, protein: 26, carbs: 0, fat: 15 },
    { name: "دجاج بانيه مشوي", calories: 210, protein: 28, carbs: 8, fat: 7 },
    { name: "سمبوسك جبنة", calories: 130, protein: 4, carbs: 14, fat: 6 },
    { name: "شوربة خضار", calories: 60, protein: 2, carbs: 10, fat: 1 },
    { name: "كوسة مطبوخة", calories: 35, protein: 1.2, carbs: 7, fat: 0.2 },
    { name: "بروكلي مسلوق", calories: 34, protein: 2.8, carbs: 7, fat: 0.4 },
    { name: "تفاح", calories: 52, protein: 0.3, carbs: 14, fat: 0.2 },
    { name: "موز", calories: 89, protein: 1.1, carbs: 23, fat: 0.3 },
    { name: "تمر", calories: 277, protein: 1.8, carbs: 75, fat: 0.2 },
    { name: "زبادي قليل الدسم", calories: 60, protein: 5, carbs: 7, fat: 1.5 },
    { name: "شيا بودينج", calories: 150, protein: 5, carbs: 18, fat: 6 },
    { name: "سلطة تونة", calories: 180, protein: 18, carbs: 6, fat: 8 },
    { name: "حمص بالطحينة", calories: 166, protein: 7.9, carbs: 14, fat: 9.6 },
    { name: "فراخ مشوية مع خضار", calories: 210, protein: 28, carbs: 7, fat: 7 },
    { name: "كبدة مشوية", calories: 175, protein: 27, carbs: 2, fat: 6 },
    { name: "سلطة فواكه", calories: 90, protein: 1, carbs: 22, fat: 0.2 },
    { name: "شوربة عدس", calories: 120, protein: 7, carbs: 18, fat: 2 },
  ];
  let shown = 6;
  let searchVal = '';
  const mealsTable = mealsTableElem.querySelector('tbody');
  function renderMeals() {
    let filtered = meals.filter(m => m.name.includes(searchVal));
    let toShow = filtered.slice(0, shown);
    mealsTable.innerHTML = toShow.map(m => `
      <tr>
        <td>${m.name}</td>
        <td>${m.calories}</td>
        <td>${m.protein}g</td>
        <td>${m.carbs}g</td>
        <td>${m.fat}g</td>
      </tr>
    `).join('');
    if (showMoreMealsBtn) {
      showMoreMealsBtn.style.display = (filtered.length > shown) ? 'block' : 'none';
    }
  }
  renderMeals();
  if (showMoreMealsBtn) {
    showMoreMealsBtn.onclick = function() {
      shown += 6;
      renderMeals();
    };
  }
  if (mealsSearch) {
    mealsSearch.oninput = function() {
      searchVal = mealsSearch.value.trim();
      shown = 6;
      renderMeals();
      if (searchVal) showMoreMealsBtn.style.display = 'none';
    };
  }
}

// سوشيال ميديا مصغرة
const postForm = document.getElementById('post-form');
const postsFeed = document.getElementById('posts-feed');
if (postForm && postsFeed) {
  let posts = JSON.parse(localStorage.getItem('batgem_posts') || '[]');
  function timeAgo(date) {
    const now = Date.now();
    const diff = Math.floor((now - date) / 1000);
    if (diff < 60) return 'الآن';
    if (diff < 3600) return `${Math.floor(diff/60)} دقيقة`;
    if (diff < 86400) return `${Math.floor(diff/3600)} ساعة`;
    return `${Math.floor(diff/86400)} يوم`;
  }
  function renderPosts() {
    postsFeed.innerHTML = posts.map((p, i) => `
      <div class="post-card">
        <div style="display:flex;align-items:center;gap:8px;justify-content:space-between;">
          <span style="color:#ffe082;font-size:1.2rem;">🦇</span>
          <span style="font-size:0.85rem;color:#bbb;">${timeAgo(p.time||Date.now())}</span>
        </div>
        ${p.img ? `<img src="${p.img}" class="post-img" alt="post" />` : ''}
        <div style="font-size:1.1rem;">${p.text}</div>
        <div class="post-actions">
          <button class="like-btn${p.liked ? ' liked' : ''}" data-i="${i}">❤️ ${p.likes || 0}</button>
          <button class="comment-btn" data-i="${i}">💬 تعليق (${(p.comments||[]).length})</button>
          <button class="delete-btn" data-del="${i}">🗑️ حذف</button>
        </div>
        <div class="comment-list">
          ${(p.comments||[]).map(c => `<div class="comment-item">${c}</div>`).join('')}
        </div>
        <form class="comment-form" data-i="${i}" style="display:none;gap:4px;margin-top:4px;">
          <input type="text" placeholder="اكتب تعليق..." required style="flex:1;">
          <button type="submit">إرسال</button>
        </form>
      </div>
    `).join('');
  }
  renderPosts();
  postForm.onsubmit = e => {
    e.preventDefault();
    const text = postForm['post-text'].value;
    const file = postForm['post-image'].files[0];
    if (!text && !file) return;
    const postObj = { text, img: '', likes: 0, liked: false, comments: [], time: Date.now() };
    if (file) {
      const reader = new FileReader();
      reader.onload = function(evt) {
        postObj.img = evt.target.result;
        posts.push(postObj);
        localStorage.setItem('batgem_posts', JSON.stringify(posts));
        renderPosts();
      };
      reader.readAsDataURL(file);
    } else {
      posts.push(postObj);
      localStorage.setItem('batgem_posts', JSON.stringify(posts));
      renderPosts();
    }
    postForm.reset();
  };
  postsFeed.onclick = e => {
    const i = e.target.dataset.i;
    if (e.target.classList.contains('like-btn')) {
      posts[i].liked = !posts[i].liked;
      posts[i].likes = (posts[i].likes || 0) + (posts[i].liked ? 1 : -1);
      localStorage.setItem('batgem_posts', JSON.stringify(posts));
      renderPosts();
    }
    if (e.target.classList.contains('comment-btn')) {
      const form = postsFeed.querySelector(`form.comment-form[data-i='${i}']`);
      if (form) form.style.display = form.style.display === 'none' ? 'flex' : 'none';
    }
    if (e.target.classList.contains('delete-btn')) {
      posts.splice(+e.target.dataset.del, 1);
      localStorage.setItem('batgem_posts', JSON.stringify(posts));
      renderPosts();
    }
  };
  postsFeed.addEventListener('submit', function(e) {
    if (e.target.classList.contains('comment-form')) {
      e.preventDefault();
      const i = e.target.dataset.i;
      const val = e.target.querySelector('input').value;
      if (!val) return;
      posts[i].comments = posts[i].comments || [];
      posts[i].comments.push(val);
      localStorage.setItem('batgem_posts', JSON.stringify(posts));
      renderPosts();
    }
  });
}

// --- تهيئة Firebase ---
const firebaseConfig = {
  apiKey: "AIzaSyApWq5kHcl8_ncVI_xzlJAljo2OUALY6tY",
  authDomain: "batgem-2b33b.firebaseapp.com",
  projectId: "batgem-2b33b",
  storageBucket: "batgem-2b33b.firebasestorage.app",
  messagingSenderId: "705056072326",
  appId: "1:705056072326:web:a33ed633bac307d6b7a707",
  measurementId: "G-7CY0SNKJ7N",
  databaseURL: "https://batgem-2b33b-default-rtdb.firebaseio.com/"
};
if (typeof firebase !== 'undefined' && !firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// قسم البوستات في الصفحة الرئيسية
const mainPostForm = document.getElementById('main-post-form');
const mainPostInput = document.getElementById('main-post-input');
const mainPostsFeed = document.getElementById('main-posts-feed');
const mainPostImage = document.getElementById('main-post-image');
const mainPostImageBtn = document.getElementById('main-post-image-btn');
const mainPostImagePreview = document.getElementById('main-post-image-preview');

// --- Firebase posts logic ---
function fetchMainPosts(callback) {
  firebase.database().ref('mainPosts').once('value', snap => {
    const postsObj = snap.val() || {};
    // أضف id لكل بوست
    const posts = Object.entries(postsObj).map(([id, post]) => ({...post, id})).reverse();
    callback(posts);
  });
}
function saveMainPost(post, callback) {
  const newPostRef = firebase.database().ref('mainPosts').push();
  newPostRef.set(post, callback);
}
function updateMainPost(postId, data, callback) {
  firebase.database().ref('mainPosts/' + postId).update(data, callback);
}
function deleteMainPost(postId, callback) {
  firebase.database().ref('mainPosts/' + postId).remove(callback);
}

function formatPostTime(postTime) {
  let dateObj;
  if (typeof postTime === 'number') {
    dateObj = new Date(postTime);
  } else if (typeof postTime === 'string') {
    dateObj = new Date(postTime);
    if (isNaN(dateObj.getTime())) {
      return postTime;
    }
  } else {
    return '';
  }
  const now = new Date();
  const postDay = dateObj.getDate();
  const postMonth = dateObj.getMonth();
  const postYear = dateObj.getFullYear();
  const nowDay = now.getDate();
  const nowMonth = now.getMonth();
  const nowYear = now.getFullYear();
  let hour = dateObj.getHours();
  const min = dateObj.getMinutes().toString().padStart(2, '0');
  if (postYear === nowYear && postMonth === nowMonth && postDay === nowDay) {
    let period = hour >= 12 ? 'مساءً' : 'صباحًا';
    let hour12 = hour % 12;
    if (hour12 === 0) hour12 = 12;
    return `اليوم ${hour12}:${min} ${period}`;
  }
  const yesterday = new Date(now);
  yesterday.setDate(nowDay - 1);
  if (postYear === yesterday.getFullYear() && postMonth === yesterday.getMonth() && postDay === yesterday.getDate()) {
    let hour = dateObj.getHours();
    let period = hour >= 12 ? 'مساءً' : 'صباحًا';
    let hour12 = hour % 12;
    if (hour12 === 0) hour12 = 12;
    return `الأمس ${hour12}:${min} ${period}`;
  }
  return `${postDay}/${postMonth+1}/${postYear} ${hour.toString().padStart(2, '0')}:${min}`;
}

function renderMainPosts() {
  if (!mainPostsFeed) return;
  fetchMainPosts(posts => {
    const user = firebase.auth().currentUser;
    mainPostsFeed.innerHTML = posts.length ? posts.map((post, idx) => {
      const comments = post.comments || [];
      const liked = user && post.likes && post.likes[user.uid];
      return `
              <div class="insta-post-card" style="background:#232526;color:#ffe082;border-radius:14px;padding:10px 0 0 0;margin-bottom:18px;box-shadow:none;max-width:420px;margin-left:auto;margin-right:auto;display:block;">
        <a href="post.html?id=${post.id}" style="display:block;text-decoration:none;color:inherit;cursor:pointer;">
          <div style="display:flex;align-items:center;gap:10px;padding:0 12px 6px 12px;">
            <img src="${post.author?.avatar || 'https://www.gravatar.com/avatar/?d=mp&s=80'}" style="width:38px;height:38px;border-radius:50%;object-fit:cover;">
            <span style="font-size:1.08rem;color:#ffe082;font-weight:bold;">${post.author?.name || 'مجهول'}</span>
          </div>
          ${post.img ? `<img src="${post.img}" style="width:100%;max-height:320px;object-fit:cover;display:block;">` : ''}
          <div style="padding:10px 14px 0 14px;">
            <div style="font-size:1.13rem;margin-bottom:6px;">${post.text}</div>
            <div style="display:flex;align-items:center;gap:18px;margin-bottom:4px;">
              <span style="font-size:0.92rem;color:#ffe08299;margin-right:auto;">${formatPostTime(post.time)}</span>
            </div>
          </div>
        </a>
        <div class="main-post-actions" style="display:flex;align-items:center;gap:18px;padding:8px 18px 0 18px;">
          <button class="main-like-btn${liked ? ' liked' : ''}" data-id="${post.id}" style="background:none;border:none;font-size:1.25rem;cursor:pointer;display:flex;align-items:center;gap:4px;">
            ${liked ? '❤️' : '🤍'} <span>${post.likes ? Object.keys(post.likes).length : 0}</span>
          </button>
          <button class="main-comment-btn" data-id="${post.id}" style="background:none;border:none;color:#ffe082;font-size:1.18rem;cursor:pointer;display:flex;align-items:center;gap:4px;">💬 <span>${comments.length}</span></button>
        </div>
        <div class="main-comments-block" id="main-comments-block-${post.id}" style="display:none;margin-top:6px;">
          <div class="main-comments-list">
            ${comments.length ? comments.map((c, ci) => `<div style='background:#232526;border-radius:7px;padding:5px 9px;margin-bottom:4px;display:flex;align-items:center;gap:6px;'><span style='flex:1;'>${c.text}</span>${user && c.uid === user.uid ? `<button class='main-delete-comment-btn' data-p='${post.id}' data-c='${c.id}' style='background:none;border:none;color:#e53935;font-size:1rem;cursor:pointer;' title='حذف التعليق'>🗑️</button>` : ''}</div>`).join('') : '<div style="color:#ffe08299;text-align:center;">لا يوجد تعليقات بعد</div>'}
          </div>
          ${user ? `<form class="main-comment-form" data-id="${post.id}" style="display:flex;gap:4px;margin-top:4px;"><input type="text" placeholder="اكتب تعليق..." required style="flex:1;"><button type="submit">إرسال</button></form>` : ''}
        </div>
      </div>
      `;
    }).join('') : '<div style="color:#ffe08299;text-align:center;">لسه مفيش بوستات، ابدأ انت يا بطل!</div>';
    // لايك
    if (user) {
      mainPostsFeed.querySelectorAll('.main-like-btn').forEach(btn => {
        btn.onclick = function(event) {
          event.preventDefault();
          event.stopPropagation();
          const postId = this.dataset.id;
          const likeRef = firebase.database().ref('mainPosts/' + postId + '/likes/' + user.uid);
          likeRef.once('value', snap => {
            if (snap.exists()) {
              likeRef.remove(() => renderMainPosts());
            } else {
              likeRef.set(true, () => renderMainPosts());
            }
          });
        };
      });
    }
    // فتح/غلق التعليقات
    mainPostsFeed.querySelectorAll('.main-comment-btn').forEach(btn => {
      btn.onclick = function(event) {
        event.preventDefault();
        event.stopPropagation();
        const postId = this.dataset.id;
        const block = document.getElementById('main-comments-block-' + postId);
        if (block) block.style.display = block.style.display === 'none' ? 'block' : 'none';
      };
    });
    // إضافة تعليق
    if (user) {
      mainPostsFeed.querySelectorAll('form.main-comment-form').forEach(form => {
        form.onsubmit = function(e) {
          e.preventDefault();
          const postId = form.dataset.id;
          const val = form.querySelector('input').value.trim();
          if (!val) return;
          const commentObj = { text: val, uid: user.uid, name: user.displayName, id: Date.now() };
          const commentsRef = firebase.database().ref('mainPosts/' + postId + '/comments');
          commentsRef.once('value', snap => {
            let comments = snap.val() ? Object.values(snap.val()) : [];
            comments.push(commentObj);
            commentsRef.set(comments, () => renderMainPosts());
          });
        };
      });
      // حذف تعليق
      mainPostsFeed.querySelectorAll('.main-delete-comment-btn').forEach(btn => {
        btn.onclick = function() {
          const postId = this.dataset.p;
          const commentId = +this.dataset.c;
          const commentsRef = firebase.database().ref('mainPosts/' + postId + '/comments');
          commentsRef.once('value', snap => {
            let comments = snap.val() ? Object.values(snap.val()) : [];
            comments = comments.filter(c => c.id !== commentId);
            commentsRef.set(comments, () => renderMainPosts());
          });
        };
      });
    }
  });
}

if (mainPostForm && mainPostInput && mainPostsFeed) {
  mainPostForm.onsubmit = function(e) {
    e.preventDefault();
    const val = mainPostInput.value.trim();
    if (!val) return;
    const user = firebase.auth().currentUser;
    if (!user || !user.displayName) {
      alert('حدثت مشكلة في جلب بيانات حسابك. يرجى إعادة تحميل الصفحة أو تسجيل الدخول مجددًا.');
      return;
    }
    const author = {
      name: user.displayName,
      avatar: user.photoURL || 'https://www.gravatar.com/avatar/?d=mp&s=80',
      uid: user.uid
    };
    const time = Date.now();
    let img = '';
    if (mainPostImage && mainPostImage.files && mainPostImage.files[0]) {
      const reader = new FileReader();
      reader.onload = function(evt) {
        img = evt.target.result;
        const postObj = { text: val, time, img, author, comments: [], likes: {}, id: Date.now() };
        saveMainPost(postObj, () => {
          mainPostInput.value = '';
          mainPostImage.value = '';
          renderMainPosts();
        });
      };
      reader.readAsDataURL(mainPostImage.files[0]);
    } else {
      const postObj = { text: val, time, author, comments: [], likes: {}, id: Date.now() };
      saveMainPost(postObj, () => {
        mainPostInput.value = '';
        renderMainPosts();
      });
    }
  };
}

if (mainPostsFeed) {
  firebase.auth().onAuthStateChanged(() => {
    renderMainPosts();
  });
}

if (mainPostImageBtn && mainPostImage) {
  mainPostImageBtn.onclick = function() {
    mainPostImage.click();
  };
  mainPostImage.onchange = function() {
    if (mainPostImage.files && mainPostImage.files[0]) {
      const reader = new FileReader();
      reader.onload = function(evt) {
        mainPostImagePreview.innerHTML = `<img src="${evt.target.result}" alt="صورة" />`;
        mainPostImagePreview.style.display = 'inline-block';
      };
      reader.readAsDataURL(mainPostImage.files[0]);
    } else {
      mainPostImagePreview.innerHTML = '';
      mainPostImagePreview.style.display = 'none';
    }
  };
}

if (mainPostForm) {
  const origSubmit = mainPostForm.onsubmit;
  mainPostForm.onsubmit = function(e) {
    if (!firebase.auth().currentUser) {
      e.preventDefault();
      showAuthModalIfNeeded(() => mainPostForm.requestSubmit());
      return false;
    }
    if (origSubmit) origSubmit(e);
  };
}

const openPostModalBox = document.getElementById('open-post-modal');
const mainPostModal = document.getElementById('main-post-modal');
const closeMainPostModal = document.getElementById('close-main-post-modal');
if (openPostModalBox && mainPostModal) {
  openPostModalBox.onclick = function() {
    mainPostModal.style.display = 'flex';
  };
}
if (closeMainPostModal && mainPostModal) {
  closeMainPostModal.onclick = function() {
    mainPostModal.style.display = 'none';
  };
}
// عند نشر البوست اغلق النافذة
if (mainPostForm && mainPostModal) {
  const origSubmit = mainPostForm.onsubmit;
  mainPostForm.onsubmit = function(e) {
    if (origSubmit) origSubmit(e);
    mainPostModal.style.display = 'none';
  };
}

// --- منطق تسجيل الدخول والخروج ---
const authOverlay = document.getElementById('auth-overlay');
const mainContentWrapper = document.getElementById('main-content-wrapper');
const loginBtn = document.getElementById('google-login-btn');
const logoutBtn = document.getElementById('logout-btn');
const profileName = document.getElementById('profile-name');
const profileAvatar = document.getElementById('profile-avatar');

// لم نعد نحتاج لإخفاء الصفحة أو إظهار overlay عند عدم تسجيل الدخول
// فقط نحدث بيانات البروفايل والأزرار
function showAuthOverlay() {
  /* لم نعد نستخدم overlay */
}
function hideAuthOverlay() {
  /* لم نعد نستخدم overlay */
}

if (loginBtn) {
  loginBtn.onclick = function() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  };
}
if (logoutBtn) {
  logoutBtn.onclick = function() {
    firebase.auth().signOut();
    location.reload();
  };
}

firebase.auth().onAuthStateChanged(user => {
  // لا تخفي الصفحة، فقط حدث بيانات البروفايل والأزرار
  if (user) {
    if (loginBtn) loginBtn.style.display = 'none';
    if (logoutBtn) logoutBtn.style.display = 'inline-block';
    if (profileName) profileName.textContent = user.displayName || 'مستخدم بات كود';
    if (profileAvatar) profileAvatar.src = user.photoURL || 'https://www.gravatar.com/avatar/?d=mp&s=80';
    // يمكنك هنا جلب بوستات وأوزان المستخدم
  } else {
    if (loginBtn) loginBtn.style.display = 'inline-block';
    if (logoutBtn) logoutBtn.style.display = 'none';
    if (profileName) profileName.textContent = 'بطل بات كود';
    if (profileAvatar) profileAvatar.src = 'https://www.gravatar.com/avatar/?d=mp&s=80';
    // أخفِ بيانات المستخدم الأخرى إذا لزم
  }
  if (typeof renderMainPosts === 'function') renderMainPosts();
});

// منطق فتح/غلق نوافذ تسجيل الدخول وإنشاء الحساب
const emailLoginModal = document.getElementById('email-login-modal');
const registerModal = document.getElementById('register-modal');
const emailLoginBtn = document.getElementById('email-login-btn');
const registerBtn = document.getElementById('register-btn');
const closeEmailLoginModal = document.getElementById('close-email-login-modal');
const closeRegisterModal = document.getElementById('close-register-modal');

if (emailLoginBtn && emailLoginModal) {
  emailLoginBtn.onclick = function() { emailLoginModal.style.display = 'flex'; };
}
if (registerBtn && registerModal) {
  registerBtn.onclick = function() { registerModal.style.display = 'flex'; };
}
if (closeEmailLoginModal && emailLoginModal) {
  closeEmailLoginModal.onclick = function() { emailLoginModal.style.display = 'none'; };
}
if (closeRegisterModal && registerModal) {
  closeRegisterModal.onclick = function() { registerModal.style.display = 'none'; };
}

// تسجيل الدخول بالإيميل
const emailLoginForm = document.getElementById('email-login-form');
const emailLoginError = document.getElementById('email-login-error');
if (emailLoginForm) {
  emailLoginForm.onsubmit = function(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    emailLoginError.textContent = '';
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => { emailLoginModal.style.display = 'none'; })
      .catch(err => { emailLoginError.textContent = 'بيانات الدخول غير صحيحة أو هناك مشكلة.'; });
  };
}

// إنشاء حساب جديد
const registerForm = document.getElementById('register-form');
const registerError = document.getElementById('register-error');
if (registerForm) {
  registerForm.onsubmit = function(e) {
    e.preventDefault();
    const name = document.getElementById('register-name').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value;
    const password2 = document.getElementById('register-password2').value;
    registerError.textContent = '';
    if (password !== password2) {
      registerError.textContent = 'كلمة السر غير متطابقة.';
      return;
    }
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        return userCredential.user.updateProfile({ displayName: name });
      })
      .then(() => { registerModal.style.display = 'none'; })
      .catch(err => { registerError.textContent = 'حدث خطأ أثناء إنشاء الحساب أو الإيميل مستخدم بالفعل.'; });
  };
}

const postsAuthMessage = document.getElementById('posts-auth-message');
const postThoughtBarWrapper = document.getElementById('post-thought-bar-wrapper');

function showPostsAuthMessage() {
  if (postsAuthMessage) postsAuthMessage.style.display = 'block';
  if (postThoughtBarWrapper) postThoughtBarWrapper.style.display = 'none';
  if (mainPostModal) mainPostModal.style.display = 'none';
}
function showPostsFeatures() {
  if (postsAuthMessage) postsAuthMessage.style.display = 'none';
  if (postThoughtBarWrapper) postThoughtBarWrapper.style.display = '';
}

firebase.auth().onAuthStateChanged(() => {
  if (typeof renderMainPosts === 'function') renderMainPosts();
  if (typeof showPostsAuthMessage === 'function' && typeof showPostsFeatures === 'function') {
    if (firebase.auth().currentUser) {
      showPostsFeatures();
    } else {
      showPostsAuthMessage();
    }
  }
});

// دالة لفتح نافذة تسجيل الدخول عند الحاجة
function showAuthModalIfNeeded(callback) {
  if (firebase.auth().currentUser) {
    if (typeof callback === 'function') callback();
    return;
  }
  // افتح نافذة تسجيل الدخول (مثلاً email-login-modal أو register-modal)
  // هنا نفتح نافذة تسجيل الدخول بالإيميل كخيار افتراضي ويمكنك تخصيصها
  if (emailLoginModal) emailLoginModal.style.display = 'flex';
  // بعد تسجيل الدخول، نفذ callback
  const unsub = firebase.auth().onAuthStateChanged(user => {
    if (user) {
      if (typeof callback === 'function') callback();
      if (emailLoginModal) emailLoginModal.style.display = 'none';
      unsub();
    }
  });
}

// مثال: عند محاولة نشر بوست
if (mainPostForm) {
  const origSubmit = mainPostForm.onsubmit;
  mainPostForm.onsubmit = function(e) {
    if (!firebase.auth().currentUser) {
      e.preventDefault();
      showAuthModalIfNeeded(() => mainPostForm.requestSubmit());
      return false;
    }
    if (origSubmit) origSubmit(e);
  };
}
// يمكنك تكرار نفس المنطق لأي زر أو ميزة تتطلب تسجيل دخول (تعليق، لايك، إضافة وزن...)
// ... باقي الكود ...

// زر تسجيل الدخول الموحد في الصفحة الرئيسية
const mainLoginBtn = document.getElementById('main-login-btn');
if (mainLoginBtn && emailLoginModal) {
  mainLoginBtn.onclick = function() {
    emailLoginModal.style.display = 'flex';
  };
}

// رابط فتح نافذة إنشاء الحساب من نافذة تسجيل الدخول
const openRegisterLink = document.getElementById('open-register-link');
if (openRegisterLink && registerModal && emailLoginModal) {
  openRegisterLink.onclick = function(e) {
    e.preventDefault();
    emailLoginModal.style.display = 'none';
    registerModal.style.display = 'flex';
  };
}

// إغلاق النوافذ عند الضغط خارجها
function closeModalOnOutsideClick(modal) {
  if (!modal) return;
  modal.addEventListener('mousedown', function(e) {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
}
closeModalOnOutsideClick(emailLoginModal);
closeModalOnOutsideClick(registerModal);

// تحديث الهيدر باسم المستخدم
function updateMainHeaderGreeting() {
  const h1 = document.querySelector('.main-content .hero-card h1');
  if (!h1) return;
  const user = firebase.auth().currentUser;
  let name = 'بطل';
  if (user && user.displayName) {
    name = user.displayName.trim().split(' ')[0];
  }
  h1.textContent = `ازيك يا ${name}! 👋`;
}
// استدعِ الدالة عند تغيير حالة تسجيل الدخول
firebase.auth().onAuthStateChanged(() => {
  updateMainHeaderGreeting();
});
// استدعِ الدالة عند تحميل الصفحة لأول مرة
updateMainHeaderGreeting();

const navProfileName = document.getElementById('nav-profile-name');
function updateNavProfileName() {
  const user = firebase.auth().currentUser;
  if (navProfileName) {
    navProfileName.textContent = (user && user.displayName) ? user.displayName.split(' ')[0] : 'حسابي';
  }
}
firebase.auth().onAuthStateChanged(() => {
  updateNavProfileName();
});
updateNavProfileName();

// بوستات الحساب الشخصي (account)
const accountPostsFeed = document.getElementById('account-posts-feed');
function renderAccountPosts() {
  if (!accountPostsFeed) return;
  const user = firebase.auth().currentUser;
  if (!user) {
    accountPostsFeed.innerHTML = '<div style="color:#ffe08299;text-align:center;">سجل دخول لعرض بوستاتك</div>';
    return;
  }
  firebase.database().ref('mainPosts').orderByChild('author/uid').equalTo(user.uid).once('value', snap => {
    const postsObj = snap.val() || {};
    const posts = Object.entries(postsObj).map(([id, post]) => ({...post, id})).reverse();
    accountPostsFeed.innerHTML = posts.length ? posts.map((post) => {
      const comments = post.comments || [];
      return `
              <div class="account-post-card" style="background:#232526;color:#ffe082;border-radius:12px;padding:10px 12px;margin-bottom:8px;box-shadow:none;">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;justify-content:space-between;">
          <div style="display:flex;align-items:center;gap:8px;">
            <img src="${post.author?.avatar || 'https://www.gravatar.com/avatar/?d=mp&s=80'}" style="width:32px;height:32px;border-radius:50%;object-fit:cover;">
            <span style="font-size:1.01rem;color:#ffe082;">${post.author?.name || 'مجهول'}</span>
          </div>
          <button class="delete-post-btn" data-id="${post.id}" title="حذف البوست" style="background:none;border:none;color:#e53935;font-size:1.2rem;cursor:pointer;">🗑️</button>
        </div>
        ${post.img ? `<img src="${post.img}" style="max-width:100%;border-radius:8px;margin-bottom:6px;">` : ''}
        <span style="font-size:1.05rem;">${post.text}</span>
        <div style="font-size:0.85rem;color:#ffe08299;margin-top:4px;text-align:left;">${formatPostTime(post.time)}</div>
        <div class="comment-list" style="margin-top:8px;">
          ${comments.map((c) => `<div class="comment-item" style="display:flex;align-items:center;gap:6px;margin-bottom:4px;"><span>${c.text}</span>${c.uid === user.uid ? `<button class="delete-comment-btn" data-p="${post.id}" data-c="${c.id}" title="حذف التعليق" style="background:none;border:none;color:#e53935;font-size:1rem;cursor:pointer;">🗑️</button>` : ''}</div>`).join('')}
        </div>
        <form class="comment-form" data-id="${post.id}" style="display:flex;gap:4px;margin-top:4px;">
          <input type="text" placeholder="اكتب تعليق..." required style="flex:1;">
          <button type="submit">إرسال</button>
        </form>
      </div>
      `;
    }).join('') : '<div style="color:#ffe08299;text-align:center;">لسه ما نشرتش بوستات هنا!</div>';
    // حذف البوست
    accountPostsFeed.querySelectorAll('.delete-post-btn').forEach(btn => {
      btn.onclick = function() {
        const id = this.dataset.id;
        firebase.database().ref('mainPosts/' + id).remove(renderAccountPosts);
      };
    });
    // حذف تعليق
    accountPostsFeed.querySelectorAll('.delete-comment-btn').forEach(btn => {
      btn.onclick = function() {
        const postId = this.dataset.p;
        const commentId = +this.dataset.c;
        const commentsRef = firebase.database().ref('mainPosts/' + postId + '/comments');
        commentsRef.once('value', snap => {
          let comments = snap.val() ? Object.values(snap.val()) : [];
          comments = comments.filter(c => c.id !== commentId);
          commentsRef.set(comments, renderAccountPosts);
        });
      };
    });
    // إضافة تعليق
    accountPostsFeed.querySelectorAll('form.comment-form').forEach(form => {
      form.onsubmit = function(e) {
        e.preventDefault();
        const postId = form.dataset.id;
        const val = form.querySelector('input').value.trim();
        if (!val) return;
        const commentObj = { text: val, uid: user.uid, name: user.displayName, id: Date.now() };
        const commentsRef = firebase.database().ref('mainPosts/' + postId + '/comments');
        commentsRef.once('value', snap => {
          let comments = snap.val() ? Object.values(snap.val()) : [];
          comments.push(commentObj);
          commentsRef.set(comments, renderAccountPosts);
        });
      };
    });
  });
}
firebase.auth().onAuthStateChanged(() => {
  renderAccountPosts();
});
renderAccountPosts();

// تحديث صورة واسم المستخدم في نافذة إنشاء المنشور
function updateMainPostModalUser() {
  const user = firebase.auth().currentUser;
  const avatar = document.getElementById('main-post-modal-avatar');
  const name = document.getElementById('main-post-modal-name');
  if (avatar) avatar.src = user && user.photoURL ? user.photoURL : 'https://www.gravatar.com/avatar/?d=mp&s=80';
  if (name) name.textContent = user && user.displayName ? user.displayName.split(' ')[0] : 'اسم المستخدم';
}
if (document.getElementById('main-post-modal')) {
  firebase.auth().onAuthStateChanged(() => {
    updateMainPostModalUser();
  });
  updateMainPostModalUser();
}

// إضافة خاصية الضغط المزدوج للايك على البوستات
function addDoubleClickLike() {
  const postCards = document.querySelectorAll('.post-card');
  
  postCards.forEach(card => {
    let clickCount = 0;
    let clickTimer = null;
    
    card.addEventListener('click', function(e) {
      // تجاهل الضغط على أزرار اللايك والكومنت
      if (e.target.closest('.main-like-btn') || e.target.closest('.main-comment-btn')) {
        return;
      }
      
      clickCount++;
      
      if (clickCount === 1) {
        clickTimer = setTimeout(() => {
          clickCount = 0;
        }, 300); // 300ms للضغط المزدوج
      } else if (clickCount === 2) {
        clearTimeout(clickTimer);
        clickCount = 0;
        
        // البحث عن زر اللايك في هذا البوست وعمل لايك تلقائياً
        const likeBtn = card.querySelector('.main-like-btn');
        if (likeBtn && !likeBtn.classList.contains('liked')) {
          likeBtn.click();
          
          // إضافة تأثير بصري للضغط المزدوج
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.transform = 'scale(1)';
          }, 150);
          
          // إضافة تأثير القلب الكبير
          showHeartEffect(card);
        }
      }
    });
  });
}

// دالة إظهار تأثير القلب الكبير
function showHeartEffect(card) {
  // إنشاء عنصر القلب
  const heart = document.createElement('div');
  heart.innerHTML = '❤️';
  heart.style.cssText = `
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 80px;
    z-index: 1000;
    pointer-events: none;
    animation: heartBeat 1s ease-out forwards;
    filter: drop-shadow(0 0 20px rgba(212, 175, 55, 0.8));
  `;
  
  // إضافة CSS للأنيميشن
  if (!document.getElementById('heart-animation-style')) {
    const style = document.createElement('style');
    style.id = 'heart-animation-style';
    style.textContent = `
      @keyframes heartBeat {
        0% {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0);
        }
        50% {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1.2);
        }
        100% {
          opacity: 0;
          transform: translate(-50%, -50%) scale(1.5);
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  // إضافة القلب للكارت
  card.style.position = 'relative';
  card.appendChild(heart);
  
  // إزالة القلب بعد انتهاء الأنيميشن
  setTimeout(() => {
    if (heart.parentNode) {
      heart.parentNode.removeChild(heart);
    }
  }, 1000);
}

// استدعاء دالة الضغط المزدوج عند تحميل البوستات
document.addEventListener('DOMContentLoaded', function() {
  // إضافة الضغط المزدوج للايك على البوستات الموجودة
  addDoubleClickLike();
  
  // مراقبة إضافة بوستات جديدة وإضافة الضغط المزدوج لها
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList') {
        const newPostCards = document.querySelectorAll('.post-card:not([data-double-click-added])');
        if (newPostCards.length > 0) {
          newPostCards.forEach(card => {
            card.setAttribute('data-double-click-added', 'true');
            let clickCount = 0;
            let clickTimer = null;
            
            card.addEventListener('click', function(e) {
              if (e.target.closest('.main-like-btn') || e.target.closest('.main-comment-btn')) {
                return;
              }
              
              clickCount++;
              
              if (clickCount === 1) {
                clickTimer = setTimeout(() => {
                  clickCount = 0;
                }, 300);
              } else if (clickCount === 2) {
                clearTimeout(clickTimer);
                clickCount = 0;
                
                const likeBtn = card.querySelector('.main-like-btn');
                if (likeBtn && !likeBtn.classList.contains('liked')) {
                  likeBtn.click();
                  
                  card.style.transform = 'scale(0.95)';
                  setTimeout(() => {
                    card.style.transform = 'scale(1)';
                  }, 150);
                }
              }
            });
          });
        }
      }
    });
  });
  
  // مراقبة التغييرات في منطقة البوستات
  const postsContainer = document.getElementById('mainPostsFeed');
  if (postsContainer) {
    observer.observe(postsContainer, { childList: true, subtree: true });
  }
}); 