// Fungsionalitas Akordion Panel Menutup dan Membuka
document.querySelectorAll('.panel-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
        const currentPanel = trigger.parentElement;
        
        document.querySelectorAll('.panel').forEach(panel => {
            if (panel !== currentPanel) {
                panel.classList.remove('active');
            }
        });
        
        currentPanel.classList.toggle('active');
        // Update aria-expanded for accessibility
        trigger.setAttribute('aria-expanded', currentPanel.classList.contains('active'));
    });
});

// Fitur Live Search Menggunakan JavaScript Tanpa Reload dengan Debounce
const searchInput = document.getElementById('searchInput');
const searchableItems = document.querySelectorAll('.searchable-item');
let searchTimeout;

searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        const filterText = e.target.value.toLowerCase().trim();
        
        searchableItems.forEach(item => {
            const searchKeywords = item.getAttribute('data-title').toLowerCase();
            
            if (filterText === '') {
                item.style.display = 'block';
                // Kembalikan panel ke posisi tertutup semula
                item.classList.remove('active');
            } else if (searchKeywords.includes(filterText)) {
                item.style.display = 'block';
                // Otomatis buka panel jika kategori tersebut cocok dengan pencarian
                if(item.classList.contains('panel')) {
                    item.classList.add('active');
                    const trigger = item.querySelector('.panel-trigger');
                    if (trigger) {
                        trigger.setAttribute('aria-expanded', true);
                    }
                }
            } else {
                item.style.display = 'none';
            }
        });
    }, 150);
});