function displayTab(event) {
    console.log();
    document.querySelectorAll('.btns-b').forEach(element => {
        element.classList.toggle('active')
    })
    document.querySelectorAll('.div').forEach(element => { element.style.display = 'none' });
    var classItem = (event.classList[0]).split('-btn')[0];
    console.log(classItem);
    document.querySelector(`.${classItem}`).style.display = 'block';
}