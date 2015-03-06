$(function(){

    var model = {
        // create a place to store our notes
        init: function() {
            if (!localStorage.notes) {
                localStorage.notes = JSON.stringify([]);
            }
        },
        // add a new note!
        add: function(obj) {
            var data = JSON.parse(localStorage.notes);
            data.push(obj);
            localStorage.notes = JSON.stringify(data);
        },
        // return all the current notes (to the Octopus)
        getAllNotes: function() {
            return JSON.parse(localStorage.notes);
        }
    };


    var octopus = {
        // take input from the view and pass to the model to create a new note
        addNewNote: function(noteStr) {
            model.add({
                content: noteStr,
                date: Date.now()
            });
            view.render();
        },
        // grab all the notes from the model (and give to the view)
        getNotes: function() {
            return model.getAllNotes().reverse();
        },

        // The Octopus needs to wake up the model first, then the view
        init: function() {
            model.init();
            view.init();
        }
    };


    var view = {
        // connect js view code to html elements, define new ones and render the initial view
        init: function() {
            this.noteList = $('#notes');
            var newNoteForm = $('#new-note-form');
            var newNoteContent = $('#new-note-content');
            newNoteForm.submit(function(e){
                octopus.addNewNote(newNoteContent.val());
                newNoteContent.val('');
                e.preventDefault();
            });
            view.render();
        },
        // read notes from the octopus and render them on the page
        render: function(){
            var htmlStr = '';
            octopus.getNotes().forEach(function(note){
                htmlStr += '<li class="note">'+
                        note.content +
                        '<div id="note-date">' +
                        new Date(note.date) +
                        '</div>' +
                    '</li>';
            });
            this.noteList.html( htmlStr );
        }
    };

    // start here with the Octopus. Wake him up!
    octopus.init();
});