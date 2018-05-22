/*$(document).ready(function() {

    var table = $('#genericTable').DataTable();

    $('#genericTable').children().remove();

    headerRow = ['Title', 'Created Date', 'Owner', 'Modified Date', 'Modified By', 'Categories', 'Live', 'Visible'];

    function createTable(headerRow) {
        var table = $('<table class="table datatable table--full" id="genericTable"><thead><tr><td class="table-responsive"></td>\
                <td class="table-selection"></td></tr></thead><tbody></tbody></table>');
        var tr = table.find('thead tr');
        headerRow.forEach( function( val, index, arr ) {
            tr.append('<th>' + val + '</th>');
        });
        return table;
    }

    var fetched_data = $.ajax({
        url: "https://reqres.in/api/jdata",
        type: "POST",
        data: {
                "Title": "Document 01",
                "Created Date": "01/01/2017",
                "Owner": "John Doe",
                "Modified Date": "2011/04/25",
                "Modified By": "Alex Jones",
                "Categories": "aliens, paranomal, ufo",
                "Live": "on",
                "Visible": "on"
            },
        success: function(response) {
            console.log(response);
        }
    });

    table = createTable(headerRow);
    $('#genericTable').append(table);

    var dataOnInit = true; //just 2 examples of loading the data

    if (dataOnInit) {
        table.DataTable({
            ajax: {
                url: 'https://reqres.in/api/jdata'
            },
            columns: [
                { data: 'Title' },
                { data: 'Created Date' },
                { data: 'Owner' },
                { data: 'Modified Date' },
                { data: 'Modified By' },
                { data: 'Categories' },
                { data: 'Live' },
                { data: 'Visible' }
            ]
        });
    }
});*/

$(document).ready( function () {

    $.ajax({
        url: "https://reqres.in/api/jdata",
        type: "POST",
        data: {
                "Title": "Document 01",
                "Created Date": "01/01/2017",
                "Owner": "John Doe",
                "Modified Date": "2011/04/25",
                "Modified By": "Alex Jones",
                "Categories": "aliens, paranomal, ufo",
                "Live": "on",
                "Visible": "on"
            },
        success: function(response) {
            console.log(response);
            console.log("Data sent to Fake API Successfully!");
        }
    });

  var table = $('#genericTable').DataTable();
  $('#genericTable').parent().children().remove(); //remove the #example table

    headerRow = ['Title', 'Created Date', 'Owner', 'Modified Date', 'Modified By', 'Categories', 'Live', 'Visible']; //you'll probably have to build this based on incoming data
    function createTable(headerRow)
    {
        var table = $('<table class="table datatable table--full"><thead><tr></tr></thead><tbody></tbody></table>');
        var tr = table.find('thead tr');
        headerRow.forEach( function( val, index, arr ) {
            tr.append('<th>' + val + '</th>');
        });
        return table;
    }

    //Or something like that. Then add the ajax data via initialization, something like:


    /*var fetched_data = $.ajax({
            url: 'https://reqres.in/api/jdata',
            columns: [
                { data: 'Title' },
                { data: 'Created Date' },
                { data: 'Owner' },
                { data: 'Modified Date' },
                { data: 'Modified By' },
                { data: 'Categories' },
                { data: 'Live' },
                { data: 'Visible' }
            ]
        });

    console.log(fetched_data);*/

  var jsonData = [ ["Document 01", "01/01/2017", "John Doe", "25/04/2011", "Alex Jones", "aliens, paranomal, ufo", "on", "on"] ];

  table = createTable( headerRow );
  $('#generic_content .tab__content').parent().append(table);

  var dataOnInit = true; //just 2 examples of loading the data

  if (dataOnInit) //give data when initializing
  {
    table.DataTable({ data: jsonData });
  }
  else //or whenever you want to.
  {
    var api = table.DataTable();
    api.rows.add( jsonData ).draw();
  }




} );
