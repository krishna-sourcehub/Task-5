//  Dropdown
const dropdowns=document.querySelector('.dropdown1');
dropdowns.forEach(dropdown1 =>{
    const select =dropdown1.querySelector('.select');
    const caret =dropdown1.querySelector('caret');
    const menu =dropdown1.querySelector('.menu');
    const options=dropdown1.querySelector('.menu li');
    const selected =dropdown1.querySelector('.selected');
    select.addEventListener('click',()=>{
        select.classList.toggle('select-clicked');
        caret.classList.toggle('caret-rotate');
        menu.classList.toggle('menu-open');
    });

    options.forEach(option => {
        option.addEventListener('click', ()=> {
            selected.innerText = option.innerText;
            select.classList.remove('select-clicked');
            caret.classList.remove('caret-rotate');
            menu.classList.remove('menu-open');

            options.forEach(option=>{
                option.classList.remove('active');
            });

            option.classList.add('active');
        });
    } );

});
