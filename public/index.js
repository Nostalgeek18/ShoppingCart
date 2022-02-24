
const buyTicketsBtn = document.querySelectorAll('.tour-btn');

buyTicketsBtn.forEach(btn => {
    btn.addEventListener('click', ()=> {
        alert('payment not available yet ! You can still visit our store.');
    })
})