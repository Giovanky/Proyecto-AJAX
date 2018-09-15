$(document).ready(function(){
    let edit = false;
    console.log('jQuery funcionando!');
    $('#task-result').hide();
    fetchTasks();

    $('#search').keyup(function(e){
        let search = $('#search').val();
        if($('#search').val()){
            $.ajax({
                url: 'task-search.php',
                type: 'POST',
                data: {search: search},
                success: function(respuesta){
                    let task = JSON.parse(respuesta);
                    let template = '';
                    task.forEach(task => {
                        template += `<li>
                            ${task.name}
                        </li>`                 
                    });
                    $('#container').html(template);
                    $('#task-result').show();
                }
            })
        }
    });
    $('#task-form').submit(function(e){
        const postData = {
            name: $('#name').val(),
            description: $('#description').val(),
            id: $('#id').val()
        };

        let url = edit === false ? 'task-add.php' : 'task-edit.php';

        $.post(url,postData, function(respuesta){
            fetchTasks();
            console.log(respuesta);
        });
        e.preventDefault();
        //Limpia formulario
        $('#task-form').trigger('reset');        
    });
    function fetchTasks(){
        $.ajax({
            url: 'task-list.php',
            type: 'GET',
            success: function(response){
               let tasks = JSON.parse(response);
               let template = '';
               tasks.forEach(task => {
                    template += `
                    <tr taskid="${task.id}">
                        <td>${task.id}</td>
                        <td>
                            <a href="#" class="task-item">${task.name}</a>
                        </td>
                        <td>${task.description}</td>
                        <td>
                            <button class="task-delete btn btn-danger">Delete</button>
                        </td>
                    </tr>`;  
               }); 
               $('#tasks').html(template);
            }
        });
    }
    $(document).on('click','.task-delete',function(){
        if(confirm('Esta seguro de eliminar?')){
            //Obtener id para eliminar
            let element = $(this)[0].parentElement.parentElement;
            let id = $(element).attr('taskid');
            $.post('task-delete.php',{id:id},function(response){
                fetchTasks();
            });
        }
    });
    $(document).on('click','.task-item',function(){
       let element = $(this)[0].parentElement.parentElement;
       let id = $(element).attr('taskid');
        $.post('task-single.php',{id},function(response){
            const task = JSON.parse(response);
            $('#name').val(task.name);
            $('#description').val(task.description);
            $('#id').val(task.id);
            edit = true;
        });
    });
});