let operationCheckedClass = 'ecology-checked';
const operationList = Array.from(document.querySelectorAll('.operation'));
operationList.forEach(operation => {
    operation.addEventListener('click', operationIconChecked)
});
function operationIconChecked(e) {
    const target = e.currentTarget;
    const targetClassList = target.classList;

    operationList.forEach(operation => {
        const classList = operation.classList;
        if (classList.contains(operationCheckedClass)) {
            classList.remove(operationCheckedClass);
        }
    });

    const uniqueClass = targetClassList[1];

    const checkedClass = `${uniqueClass}-checked`;
    targetClassList.add(checkedClass);
    operationCheckedClass = checkedClass;

}


