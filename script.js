//change the active state of navbar
   const navItems = document.querySelectorAll('.nav-item');
   navItems.forEach(navItem => {
       navItem.addEventListener('click', () => {
           navItems.forEach(navItem => {
               navItem.children[0].classList.remove('active');
           });
           navItem.children[0].classList.add('active');
       });
   }); 
