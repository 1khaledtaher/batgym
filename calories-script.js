// بيانات تجريبية (100 أكلة)
const foodSamples = [
  { name: 'صدر دجاج مشوي', category: 'بروتينات', calories: 165, carbs: 0, protein: 31, fat: 3.6 },
  { name: 'أرز أبيض', category: 'نشويات', calories: 130, carbs: 28, protein: 2.7, fat: 0.3 },
  { name: 'بطاطس مسلوقة', category: 'نشويات', calories: 87, carbs: 20, protein: 1.9, fat: 0.1 },
  { name: 'تفاح', category: 'فواكه', calories: 52, carbs: 14, protein: 0.3, fat: 0.2 },
  { name: 'موز', category: 'فواكه', calories: 89, carbs: 23, protein: 1.1, fat: 0.3 },
  { name: 'بيض مسلوق', category: 'بروتينات', calories: 155, carbs: 1.1, protein: 13, fat: 11 },
  { name: 'لحم بقري مشوي', category: 'بروتينات', calories: 250, carbs: 0, protein: 26, fat: 17 },
  { name: 'سمك مشوي', category: 'بروتينات', calories: 206, carbs: 0, protein: 22, fat: 12 },
  { name: 'جبنة قريش', category: 'بروتينات', calories: 98, carbs: 3.4, protein: 11, fat: 4.3 },
  { name: 'عدس مطبوخ', category: 'نشويات', calories: 116, carbs: 20, protein: 9, fat: 0.4 },
  { name: 'فول مدمس', category: 'نشويات', calories: 110, carbs: 19, protein: 7, fat: 0.5 },
  { name: 'خبز بلدي', category: 'نشويات', calories: 250, carbs: 50, protein: 8, fat: 1 },
  { name: 'زيت زيتون', category: 'دهون', calories: 884, carbs: 0, protein: 0, fat: 100 },
  { name: 'زبدة', category: 'دهون', calories: 717, carbs: 0.1, protein: 0.9, fat: 81 },
  { name: 'حليب كامل الدسم', category: 'مشروبات', calories: 61, carbs: 5, protein: 3.2, fat: 3.3 },
  { name: 'لبن رايب', category: 'مشروبات', calories: 40, carbs: 4.7, protein: 3.3, fat: 1 },
  { name: 'برتقال', category: 'فواكه', calories: 47, carbs: 12, protein: 0.9, fat: 0.1 },
  { name: 'خيار', category: 'خضار', calories: 16, carbs: 3.6, protein: 0.7, fat: 0.1 },
  { name: 'طماطم', category: 'خضار', calories: 18, carbs: 3.9, protein: 0.9, fat: 0.2 },
  { name: 'جزر', category: 'خضار', calories: 41, carbs: 10, protein: 0.9, fat: 0.2 },
  // ... أكمل حتى 100 أكلة متنوعة ...
];

// تحميل أو حفظ الأكل اليومي من localStorage
function getTodayKey() {
  const d = document.getElementById('foodDate');
  const date = d && d.value ? d.value : new Date().toISOString().slice(0,10);
  return 'calories_' + date;
}
function loadFoodList() {
  const key = getTodayKey();
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}
function saveFoodList(list) {
  const key = getTodayKey();
  localStorage.setItem(key, JSON.stringify(list));
}

// ... سيتم استكمال باقي المنطق: العرض، البحث، الفلترة، الإضافة، التعديل، الحذف، الرسم البياني، التصدير، الملاحظات ... 

let foodList = [];
let editIndex = null;

// عناصر الصفحة
const foodTableBody = document.getElementById('foodTableBody');
const foodSearch = document.getElementById('foodSearch');
const foodCategoryFilter = document.getElementById('foodCategoryFilter');
const addFoodBtn = document.getElementById('addFoodBtn');
const foodDate = document.getElementById('foodDate');
const caloriesSummary = document.getElementById('caloriesSummary');
const nightModeBtn = document.getElementById('nightModeBtn');

// رسم بياني
let macrosChart = null;

// تحميل بيانات اليوم عند بدء الصفحة
window.onload = function() {
  if (foodDate) foodDate.value = new Date().toISOString().slice(0,10);
  loadAndRender();
};
if (foodDate) foodDate.onchange = loadAndRender;

function loadAndRender() {
  foodList = loadFoodList();
  renderFoodTable();
  renderSummary();
  renderChart();
}

// عرض جدول الأكل
function renderFoodTable() {
  let filtered = foodList;
  let search = '';
  if (typeof foodSearch !== 'undefined' && foodSearch && foodSearch.value) {
    search = foodSearch.value.trim();
    if (search) filtered = filtered.filter(f => f.name.includes(search));
  }
  foodTableBody.innerHTML = filtered.map((f, i) => `
    <tr>
      <td>${f.name}</td>
      <td><input type='number' min='1' value='${f.amount||100}' style='width:60px' onchange='updateAmount(${i}, this.value)' /></td>
      <td>${calcVal(f, 'calories')}</td>
      <td>${calcVal(f, 'carbs')}</td>
      <td>${calcVal(f, 'protein')}</td>
      <td>${calcVal(f, 'fat')}</td>
      <td class='food-actions'>
        <button title="حذف" onclick='deleteFood(${i})' style="color:#ff5252;"><i class='fas fa-trash'></i></button>
      </td>
    </tr>
  `).join('');
}

function calcVal(f, key) {
  const amt = f.amount || 100;
  return ((f[key] * amt) / 100).toFixed(1);
}

// بحث وفلترة
if (foodSearch) foodSearch.oninput = renderFoodTable;
if (foodCategoryFilter) foodCategoryFilter.onchange = renderFoodTable;

// إضافة أكلة
if (addFoodBtn) addFoodBtn.onclick = function() {
  const name = prompt('اسم الأكلة:');
  if (!name) return;
  const calories = +prompt('السعرات لكل 100 جم:');
  const carbs = +prompt('الكربوهيدرات لكل 100 جم:');
  const protein = +prompt('البروتين لكل 100 جم:');
  const fat = +prompt('الدهون لكل 100 جم:');
  foodList.push({ name, calories, carbs, protein, fat, amount: 100 });
  saveFoodList(foodList);
  renderFoodTable();
  renderSummary();
  renderChart();
};

// تعديل أكلة
window.editFood = function(i) {
  const f = foodList[i];
  const name = prompt('اسم الأكلة:', f.name);
  if (!name) return;
  const calories = +prompt('السعرات لكل 100 جم:', f.calories);
  const carbs = +prompt('الكربوهيدرات لكل 100 جم:', f.carbs);
  const protein = +prompt('البروتين لكل 100 جم:', f.protein);
  const fat = +prompt('الدهون لكل 100 جم:', f.fat);
  foodList[i] = { ...f, name, calories, carbs, protein, fat };
  saveFoodList(foodList);
  renderFoodTable();
  renderSummary();
  renderChart();
};

// حذف أكلة
window.deleteFood = function(i) {
  if (!confirm('هل أنت متأكد من حذف هذه الأكلة؟')) return;
  foodList.splice(i, 1);
  saveFoodList(foodList);
  renderFoodTable();
  renderSummary();
  renderChart();
};

// تحديث الكمية
window.updateAmount = function(i, val) {
  foodList[i].amount = +val;
  saveFoodList(foodList);
  renderFoodTable();
  renderSummary();
  renderChart();
};

// ملخص اليوم
function renderSummary() {
  let total = { calories: 0, carbs: 0, protein: 0, fat: 0 };
  for (const f of foodList) {
    const amt = f.amount || 100;
    total.calories += (f.calories * amt) / 100;
    total.carbs += (f.carbs * amt) / 100;
    total.protein += (f.protein * amt) / 100;
    total.fat += (f.fat * amt) / 100;
  }
  caloriesSummary.innerHTML = `
    <div class='summary-card'><div class='summary-label'>السعرات</div><div class='summary-value'>${total.calories.toFixed(0)}</div></div>
    <div class='summary-card'><div class='summary-label'>كربوهيدرات</div><div class='summary-value'>${total.carbs.toFixed(1)}</div></div>
    <div class='summary-card'><div class='summary-label'>بروتين</div><div class='summary-value'>${total.protein.toFixed(1)}</div></div>
    <div class='summary-card'><div class='summary-label'>دهون</div><div class='summary-value'>${total.fat.toFixed(1)}</div></div>
  `;
}

// رسم بياني
function renderChart() {
  let total = { carbs: 0, protein: 0, fat: 0 };
  for (const f of foodList) {
    const amt = f.amount || 100;
    total.carbs += (f.carbs * amt) / 100;
    total.protein += (f.protein * amt) / 100;
    total.fat += (f.fat * amt) / 100;
  }
  const ctx = document.getElementById('macrosChart').getContext('2d');
  if (macrosChart) macrosChart.destroy();
  macrosChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['كربوهيدرات', 'بروتين', 'دهون'],
      datasets: [{
        data: [total.carbs, total.protein, total.fat],
        backgroundColor: ['#ffd700', '#0095f6', '#ff5252']
      }]
    },
    options: {
      plugins: {
        legend: { display: false }
      }
    }
  });
}

// تصدير PDF/صورة (مبسط)
document.getElementById('exportPdfBtn').onclick = function() {
  window.print();
};
var exportImgBtn = document.getElementById('exportImgBtn');
if (exportImgBtn) {
  exportImgBtn.onclick = function() {
    html2canvas(document.querySelector('.food-table-container')).then(canvas => {
      const link = document.createElement('a');
      link.download = 'food-table.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  };
}

// الوضع الليلي/الفاتح
if (nightModeBtn) nightModeBtn.onclick = function() {
  document.body.classList.toggle('light-mode');
};

// عند أول زيارة: لو مفيش بيانات اليوم، أضف 5 أكلات عشوائية من العينات
if (!loadFoodList().length) {
  const randomFoods = [];
  for (let i = 0; i < 5; i++) {
    const idx = Math.floor(Math.random() * foodSamples.length);
    randomFoods.push({ ...foodSamples[idx], amount: 100 });
  }
  saveFoodList(randomFoods);
}

// تحميل مكتبة html2canvas للرسم
(function(){
  var s=document.createElement('script');
  s.src='https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js';
  document.head.appendChild(s);
})();

// 1. بيانات 100 أكلة جاهزة (أمثلة)
const foodReadyList = [
  { name: 'صدر دجاج مشوي', calories: 165, carbs: 0, protein: 31, fat: 3.6 },
  { name: 'أرز أبيض', calories: 130, carbs: 28, protein: 2.7, fat: 0.3 },
  { name: 'بطاطس مسلوقة', calories: 87, carbs: 20, protein: 1.9, fat: 0.1 },
  { name: 'تفاح', calories: 52, carbs: 14, protein: 0.3, fat: 0.2 },
  { name: 'موز', calories: 89, carbs: 23, protein: 1.1, fat: 0.3 },
  { name: 'بيض مسلوق', calories: 155, carbs: 1.1, protein: 13, fat: 11 },
  { name: 'لحم بقري مشوي', calories: 250, carbs: 0, protein: 26, fat: 17 },
  { name: 'سمك مشوي', calories: 206, carbs: 0, protein: 22, fat: 12 },
  { name: 'جبنة قريش', calories: 98, carbs: 3.4, protein: 11, fat: 4.3 },
  { name: 'عدس مطبوخ', calories: 116, carbs: 20, protein: 9, fat: 0.4 },
  { name: 'فول مدمس', calories: 110, carbs: 19, protein: 7, fat: 0.5 },
  { name: 'خبز بلدي', calories: 250, carbs: 50, protein: 8, fat: 1 },
  { name: 'زيت زيتون', calories: 884, carbs: 0, protein: 0, fat: 100 },
  { name: 'زبدة', calories: 717, carbs: 0.1, protein: 0.9, fat: 81 },
  { name: 'حليب كامل الدسم', calories: 61, carbs: 5, protein: 3.2, fat: 3.3 },
  { name: 'لبن رايب', calories: 40, carbs: 4.7, protein: 3.3, fat: 1 },
  { name: 'برتقال', calories: 47, carbs: 12, protein: 0.9, fat: 0.1 },
  { name: 'خيار', calories: 16, carbs: 3.6, protein: 0.7, fat: 0.1 },
  { name: 'طماطم', calories: 18, carbs: 3.9, protein: 0.9, fat: 0.2 },
  { name: 'جزر', calories: 41, carbs: 10, protein: 0.9, fat: 0.2 },
  // ... أكمل حتى 100 أكلة متنوعة ...
];

// 2. فتح/إغلاق نافذة الإضافة
const addFoodModal = document.getElementById('addFoodModal');
window.closeAddFoodModal = function() { addFoodModal.style.display = 'none'; };
if (addFoodBtn) addFoodBtn.onclick = function() {
  addFoodModal.style.display = 'flex';
  // Always show ready foods tab by default
  if (tabReadyFoods && tabCustomFood && readyFoodsSection && customFoodSection) {
    tabReadyFoods.classList.remove('active'); // force reflow
    void tabReadyFoods.offsetWidth; // trigger reflow
    tabReadyFoods.classList.add('active');
    tabCustomFood.classList.remove('active');
    readyFoodsSection.style.display = 'block';
    customFoodSection.style.display = 'none';
  }
  renderFoodReadyList();
};

// 3. عرض قائمة الأكلات الجاهزة مع البحث
const foodSearchInput = document.getElementById('foodSearchInput');
const foodListContainer = document.getElementById('foodListContainer');
function renderFoodReadyList() {
  let list = [...foodReadyList, ...loadCustomFoods()];
  var q = '';
  if (foodSearchInput && foodSearchInput.value) {
    q = foodSearchInput.value.trim();
  }
  if (q) list = list.filter(f => f.name.includes(q));
  foodListContainer.innerHTML = list.map(f => `
    <div style="display:flex;align-items:center;justify-content:space-between;padding:7px 0;border-bottom:1px solid #29297a;">
      <span style="font-weight:600;">${f.name}</span>
      <span style="font-size:12px;color:#ffd700;">${f.calories} كال - ${f.protein} بروتين - ${f.carbs} كرب - ${f.fat} دهون</span>
      <button onclick='addReadyFood(${JSON.stringify(f)})' style="background:#0095f6;color:#fff;border:none;border-radius:6px;padding:3px 10px;font-size:13px;cursor:pointer;">إضافة</button>
    </div>
  `).join('');
}
if (foodSearchInput) foodSearchInput.oninput = renderFoodReadyList;

// 4. إضافة أكلة من القائمة الجاهزة
window.addReadyFood = function(f) {
  foodList.push({ ...f, amount: 100 });
  saveFoodList(foodList);
  closeAddFoodModal();
  renderFoodTable();
  renderSummary();
  renderChart();
};

// 5. إضافة أكلة مخصصة
const addCustomFoodBtn = document.getElementById('addCustomFoodBtn');
if (addCustomFoodBtn) {
  addCustomFoodBtn.onclick = function() {
    const name = document.getElementById('customFoodName').value.trim();
    const calories = +document.getElementById('customFoodCalories').value;
    const carbs = +document.getElementById('customFoodCarbs').value;
    const protein = +document.getElementById('customFoodProtein').value;
    const fat = +document.getElementById('customFoodFat').value;
    if (!name || !calories) return alert('يرجى إدخال اسم الأكلة والسعرات!');
    const food = { name, calories, carbs, protein, fat };
    saveCustomFood(food);
    foodList.push({ ...food, amount: 100 });
    saveFoodList(foodList);
    closeAddFoodModal();
    renderFoodTable();
    renderSummary();
    renderChart();
  };
}

// 6. حفظ واسترجاع الأكلات المخصصة
function saveCustomFood(food) {
  let arr = loadCustomFoods();
  arr.push(food);
  localStorage.setItem('customFoods', JSON.stringify(arr));
}
function loadCustomFoods() {
  return JSON.parse(localStorage.getItem('customFoods') || '[]');
}

// --- Modal Tab Logic for Add Food ---
const tabCustomFood = document.getElementById('tabCustomFood');
const tabReadyFoods = document.getElementById('tabReadyFoods');
const readyFoodsSection = document.getElementById('readyFoodsSection');
const customFoodSection = document.getElementById('customFoodSection');
const backToReadyFoods = document.getElementById('backToReadyFoods');

if (tabCustomFood && tabReadyFoods && readyFoodsSection && customFoodSection) {
  tabCustomFood.onclick = function() {
    tabCustomFood.classList.add('active');
    tabReadyFoods.classList.remove('active');
    readyFoodsSection.style.display = 'none';
    customFoodSection.style.display = 'block';
  };
  tabReadyFoods.onclick = function() {
    tabReadyFoods.classList.add('active');
    tabCustomFood.classList.remove('active');
    readyFoodsSection.style.display = 'block';
    customFoodSection.style.display = 'none';
  };
}
if (backToReadyFoods && tabReadyFoods) {
  backToReadyFoods.onclick = function() {
    tabReadyFoods.click();
  };
} 