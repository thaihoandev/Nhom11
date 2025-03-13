// toan_js.js - JavaScript cho trang cá nhân của Nguyễn Văn Toàn

// Chờ đến khi DOM được tải xong
document.addEventListener('DOMContentLoaded', function() {
    console.log('Trang web đã sẵn sàng!');
    
    // Khởi tạo tất cả các thành phần tương tác
    initNavigation();
    initAnimations();
    initScrollToTop();
    initThemeToggle();
    initContactForm();
    initProgressBars();
  });
  
  // Xử lý điều hướng thanh điều hướng
  function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');
    
    // Thêm sự kiện cuộn để cập nhật trạng thái active của menu
    window.addEventListener('scroll', function() {
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop) {
          current = section.getAttribute('id');
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
          link.classList.add('active');
        }
      });
    });
    
    // Thêm sự kiện click cho các liên kết điều hướng
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        window.scrollTo({
          top: targetSection.offsetTop - 70,
          behavior: 'smooth'
        });
        
        // Cập nhật trạng thái active
        navLinks.forEach(link => link.classList.remove('active'));
        this.classList.add('active');
      });
    });
  }
  
  // Hiệu ứng hoạt ảnh khi cuộn
  function initAnimations() {
    // Hiệu ứng cho các phần tử khi cuộn
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    // Theo dõi tất cả các phần
    document.querySelectorAll('section').forEach(section => {
      observer.observe(section);
    });
    
    // Theo dõi các mục timeline
    document.querySelectorAll('.timeline-item').forEach((item, index) => {
      item.style.setProperty('--i', index + 1);
      observer.observe(item);
    });
  }
  
  // Nút cuộn lên đầu trang
  function initScrollToTop() {
    const scrollTopBtn = document.querySelector('.scroll-top');
    
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('active');
      } else {
        scrollTopBtn.classList.remove('active');
      }
    });
    
    scrollTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Chuyển đổi chế độ sáng/tối
  function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Kiểm tra theme đã lưu
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.setAttribute('data-theme', 'dark');
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
    }
    
    themeToggle.addEventListener('click', function() {
      if (document.body.getAttribute('data-theme') === 'dark') {
        // Chuyển sang chế độ sáng
        document.body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
      } else {
        // Chuyển sang chế độ tối
        document.body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
      }
    });
  }
  
  // Xử lý form liên hệ
  function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Lấy dữ liệu form
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      // Kiểm tra dữ liệu đầu vào
      if (!name || !email || !message) {
        showNotification('Vui lòng điền đầy đủ thông tin!', 'error');
        return;
      }
      
      // Mô phỏng gửi form (trong thực tế sẽ gửi đến server)
      console.log('Dữ liệu form:', { name, email, message });
      
      // Hiển thị thông báo thành công
      showNotification('Tin nhắn của bạn đã được gửi thành công!', 'success');
      
      // Reset form
      contactForm.reset();
    });
  }
  
  // Hiệu ứng thanh tiến trình kỹ năng
  function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar-fill');
    
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const width = entry.target.getAttribute('style').match(/width: (\d+)%/)[1];
          entry.target.style.width = '0%';
          
          // Thêm độ trễ nhỏ trước khi kích hoạt animation
          setTimeout(() => {
            entry.target.style.width = width + '%';
          }, 200);
          
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    progressBars.forEach(bar => {
      observer.observe(bar);
    });
  }
  
  // Hàm hiển thị thông báo
  function showNotification(message, type = 'info') {
    // Tạo phần tử thông báo
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
      </div>
      <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    // Thêm vào body
    document.body.appendChild(notification);
    
    // Thêm sự kiện đóng thông báo
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
      notification.classList.add('hiding');
      setTimeout(() => {
        notification.remove();
      }, 300);
    });
    
    // Tự động đóng sau 5 giây
    setTimeout(() => {
      if (document.body.contains(notification)) {
        notification.classList.add('hiding');
        setTimeout(() => {
          notification.remove();
        }, 300);
      }
    }, 5000);
    
    // Hiệu ứng hiển thị
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);
  }
  
  // Thêm CSS cho thông báo
  function addNotificationStyles() {
    if (!document.getElementById('notification-styles')) {
      const style = document.createElement('style');
      style.id = 'notification-styles';
      style.textContent = `
        .notification {
          position: fixed;
          bottom: 20px;
          right: 20px;
          min-width: 300px;
          background-color: white;
          color: #333;
          border-radius: 5px;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
          transform: translateY(100px);
          opacity: 0;
          transition: transform 0.3s ease, opacity 0.3s ease;
          z-index: 1000;
        }
        
        .notification.show {
          transform: translateY(0);
          opacity: 1;
        }
        
        .notification.hiding {
          transform: translateY(100px);
          opacity: 0;
        }
        
        .notification-content {
          display: flex;
          align-items: center;
          padding: 15px;
          gap: 10px;
        }
        
        .notification.success {
          border-left: 5px solid #4CAF50;
        }
        
        .notification.error {
          border-left: 5px solid #F44336;
        }
        
        .notification.info {
          border-left: 5px solid #2196F3;
        }
        
        .notification.success i {
          color: #4CAF50;
        }
        
        .notification.error i {
          color: #F44336;
        }
        
        .notification.info i {
          color: #2196F3;
        }
        
        .notification-close {
          position: absolute;
          top: 10px;
          right: 10px;
          background: none;
          border: none;
          cursor: pointer;
          color: #999;
          font-size: 0.8rem;
        }
        
        .notification-close:hover {
          color: #333;
        }
      `;
      document.head.appendChild(style);
    }
  }
  
  // Thêm styles cho thông báo khi trang được tải
  document.addEventListener('DOMContentLoaded', addNotificationStyles);
  
  // Hiệu ứng máy đánh chữ cho văn bản giới thiệu
  function initTypewriter() {
    const textElement = document.querySelector('#about p:first-of-type');
    const text = textElement.textContent;
    textElement.textContent = '';
    
    let i = 0;
    const speed = 30; // Tốc độ đánh chữ (ms)
    
    function typeWriter() {
      if (i < text.length) {
        textElement.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
      }
    }
    
    // Kích hoạt hiệu ứng khi phần giới thiệu hiển thị
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(typeWriter, 500);
          observer.unobserve(entry.target);
        }
      });
    });
    
    observer.observe(document.querySelector('#about'));
  }
  
  // Thêm tính năng bộ lọc dự án
  function initProjectFilter() {
    // Thêm bộ lọc nếu có nhiều dự án hơn
    if (document.querySelectorAll('.project-card').length > 3) {
      const filterContainer = document.createElement('div');
      filterContainer.className = 'project-filter';
      filterContainer.innerHTML = `
        <button class="filter-btn active" data-filter="all">Tất cả</button>
        <button class="filter-btn" data-filter="web">Web</button>
        <button class="filter-btn" data-filter="ai">AI</button>
        <button class="filter-btn" data-filter="mobile">Mobile</button>
      `;
      
      document.querySelector('#projects h2').after(filterContainer);
      
      // Thêm sự kiện lọc
      const filterButtons = document.querySelectorAll('.filter-btn');
      const projectCards = document.querySelectorAll('.project-card');
      
      filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
          const filter = this.dataset.filter;
          
          // Cập nhật trạng thái active cho nút
          filterButtons.forEach(btn => btn.classList.remove('active'));
          this.classList.add('active');
          
          // Lọc các dự án
          projectCards.forEach(card => {
            if (filter === 'all') {
              card.style.display = 'block';
            } else {
              // Trong thực tế, bạn sẽ thêm các class tương ứng cho mỗi dự án
              if (card.classList.contains(filter)) {
                card.style.display = 'block';
              } else {
                card.style.display = 'none';
              }
            }
          });
        });
      });
    }
  }
  
  // Gọi các chức năng bổ sung
  document.addEventListener('DOMContentLoaded', function() {
    initTypewriter();
    // Chỉ gọi initProjectFilter nếu có nhiều dự án
    if (document.querySelectorAll('.project-card').length > 3) {
      initProjectFilter();
    }
  });