console.log('JS Magic Notes');
showNotes();

/**
 * ! if user Add Notes and it to the localStorage
 */
let addNoteBtn = document.getElementById('addNoteBtn');
addNoteBtn.addEventListener('click', function(e) {
	let addNoteTxt = document.getElementById('addNoteTxt');
	let notes = localStorage.getItem('notes');
	if (notes == null) {
		notesObj = [];
	} else {
		notesObj = JSON.parse(notes);
	}
	notesObj.push(addNoteTxt.value);
	localStorage.setItem('notes', JSON.stringify(notesObj));
	addNoteTxt.value = '';

	console.log(notesObj);

	// * showNotes() function call
	showNotes();
});

/**
 * ! show notes from localStorage
 */
function showNotes() {
	let notes = localStorage.getItem('notes');
	if (notes == null) {
		notesObj = [];
	} else {
		notesObj = JSON.parse(notes);
	}

	let html = '';
	notesObj.forEach(function(element, index) {
		// console.log(element, index);
		html += `
			<div class=" mb-4 col-sm-1 col-lg-3">
                <div class="card shadow-sm noteCard">
                    <div class="card-body">
                        <h5>Note ${index + 1}</h5><hr>
                        <p class="text-justify">
                            ${element}
                        </p>
                        <button id="${index}" onClick="let cnfrm = confirm('Are You Sure To Delete This Note'); if(cnfrm){ delNote(this.id); }else{ false }"  type="button" class="btn btn-outline-danger">Delete Note</button>
                    </div>
                </div>
            </div>
		`;
	});
	let showNotes = document.getElementById('showNotes');

	if (notesObj.length != 0) {
		showNotes.innerHTML = html;
	} else {
		showNotes.innerHTML = ` 
			<div class="alert alert-light" role="alert">
				<h4 class="alert-heading">Nothing To Show !</h4>
				<h4>
					<small class="text-muted">Use 'Add Note' Section Above To Add Note.</small>
				</h4>
			</div>
		`;
	}
	// console.log(showNotes);
}

/**
 * ! Delete a note
 */
function delNote(index) {
	let notes = localStorage.getItem('notes');
	if (notes == null) {
		notesObj = [];
	} else {
		notesObj = JSON.parse(notes);
	}

	// remove 1 item (one note)
	notesObj.splice(index, 1);

	// update localStorage
	localStorage.setItem('notes', JSON.stringify(notesObj));

	// Call showNotes() function
	showNotes();
}

/**
 * ! Delete All Notes
 */
function clearAllNotes() {
	localStorage.clear();
	showNotes();
}

/**
 * ! Search Note
 */
let search = document.getElementById('search');
search.addEventListener('input', function(e) {
	let inputVal = search.value.toLowerCase();
	let noteCard = document.getElementsByClassName('noteCard');
	Array.from(noteCard).forEach(function(element) {
		let cardTxt = element.getElementsByTagName('p')[0].innerText.toLowerCase();
		// console.log(cardTxt);
		if (cardTxt.includes(inputVal)) {
			element.style.display = 'block';
			// console.log('include');
		} else {
			element.style.display = 'none';
			// console.log('not include');
		}
		// console.log(cardTxt);
	});

	// console.log(inputVal);
});
