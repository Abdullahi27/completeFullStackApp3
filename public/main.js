
document.querySelector('.add').addEventListener('click', ()=>{
    let emoji = document.querySelector('#emoji').value
    let notes = document.querySelector('#notes').value
    let date = document.querySelector('#date').value
    let select = document.querySelector('#field1')
    let workouts = []
    for (let item of select) {
        if (item.selected){
            workouts.push(item.innerText)
        }
    }

    let answer = window.confirm("Confirm save data?");
        if (answer) {
            fetch('workout', {
                method: 'post',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  emoji:emoji,
                  notes:notes,
                  date:date,
                  workouts:workouts
                })
              })
              .then( 
                window.location.reload(true)
              )
        }

})


document.getElementById('date').valueAsDate = new Date();


const trash = document.getElementsByClassName("trash");


Array.from(trash).forEach(function (element) {
  element.addEventListener('click', function () {
    const id = element.dataset.id
    fetch('deleteworkout', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'id': id

      })
    }).then( 
        window.location.reload(true)
      )
  });
});


//STRAIGHT FROM W3 SCHOOL EXAMPLE

// Get the modal
let modal

// Get the button that opens the modal
var btn = document.querySelectorAll("#myBtn")

// Get the <span> element that closes the modal
spans = document.getElementsByClassName("close")

Array.from(spans).forEach((item) => {
    item.onclick = function() {
        // Get the modal
        modal = document.getElementById(`${item.dataset.id}`);
          modal.style.display = "none";
        }
});

// When the user clicks the button, open the modal 
Array.from(btn).forEach((item) => {
    console.log('modal btn clicked')

    // Get the modal
    modal = document.getElementById(`${item.dataset.id}`);
    item.onclick = function() {
        modal.style.display = "block";
      }



});








// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

let updateBtn = document.querySelectorAll('#update')
Array.from(updateBtn).forEach(item=>{
    item.addEventListener('click', ()=>{
        console.log('update btn clicked')
        let emoji = document.querySelector(`#emoji${item.dataset.index}`).value
        let notes = document.querySelector(`#notes${item.dataset.index}`).value
        let date = document.querySelector(`#date${item.dataset.index}`).value
        let select = document.querySelector(`#field${item.dataset.index}`)
        let workouts = []
        for (let work of select) {
            if (work.selected){
                workouts.push(work.innerText)
            }
        }
    
        fetch('updateworkout', {
            method: 'put',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              emoji:emoji,
              notes:notes,
              date:date,
              workouts:workouts,
              id:item.dataset.id
            })
          })
          .then( 
            window.location.reload(true)
          )

    })
})