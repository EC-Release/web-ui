$( document ).ready(function() {
    $('[data-toggle="tooltip"]').tooltip(); // For tooltips
    $.fn.extend({
        treed: function (o) {
        
        var openedClass = 'fa-minus';
        var closedClass = 'fa-plus';
        
        if (typeof o != 'undefined'){
            if (typeof o.openedClass != 'undefined'){
            openedClass = o.openedClass;
            }
            if (typeof o.closedClass != 'undefined'){
            closedClass = o.closedClass;
            }
        };
        
            //initialize each of the top levels
            var tree = $(this);
            tree.addClass("tree");
            tree.find('li').has("ul").each(function () {
                var branch = $(this); //li with children ul
                branch.prepend("<i class='fa " + closedClass + "'></i>");
                branch.addClass('branch');
                branch.on('click', function (e) {
                    if (this == e.target) {
                        var icon = $(this).children('i:first');
                        icon.toggleClass(openedClass + " " + closedClass);
                        $(this).children().children().toggle();
                    }
                })
                branch.children().children().toggle();
            });
            //fire event from the dynamically added icon
        tree.find('.branch .indicator').each(function(){
            $(this).on('click', function () {
                $(this).closest('li').click();
            });
        });
            //fire event to open branch if the li contains an anchor instead of text
            tree.find('.branch>a').each(function () {
                $(this).on('click', function (e) {
                    $(this).closest('li').click();
                    e.preventDefault();
                });
            });
            //fire event to open branch if the li contains a button instead of text
            tree.find('.branch>button').each(function () {
                $(this).on('click', function (e) {
                    $(this).closest('li').click();
                    e.preventDefault();
                });
            });
        }
    });
});

function loadTree(id){
    $('#'+id).treed();
}

function generateTopology(nodeData, replacedDivId){
    // create an array with nodes
    var nodes = new vis.DataSet(nodeData.nodes);

    // create an array with edges
    var edges = new vis.DataSet(nodeData.edges);

    // create a network
    var container = document.getElementById(replacedDivId);
    var data = {
        nodes: nodes,
        edges: edges
    };
    var options = {};
    var network = new vis.Network(container, data, options);
    network.on("click", function (params) {
        let clickedNodeId = params.nodes[0];
        let el = document.getElementById('parentTreeNodeAnchor'+clickedNodeId);
        if(el !== null && nodeData.nodes[0].id != clickedNodeId){
          el.click();
        }
    });
}

function initTable(tableId,  preserveState){
    var pageLength = 5;
    let tableWidth = 0;
    if(tableId == 'viewTable'){
        tableWidth = $('#viewTableDiv')[0].offsetWidth - 200;
        $('#'+tableId).DataTable({
            "dom": '<"top"f>rt<"bottom"lp>',
            "bSort": true,
            "scrollX": true,
            "language": {
                "paginate": {
                    "previous": "<",
                    "next": ">"
                }
            },
            'createdRow': function(row, data, dataIndex){
                for(i=0; i < data.length; i++){
                    $('td:eq('+i+')', row).css('min-width', (tableWidth/data.length)+'px');
                }
            },
            "pageLength": pageLength,
            destroy: true,
            "fnDrawCallback": function(oSettings) {
                if (oSettings.aiDisplay.length <= pageLength) {
                    $('.dataTables_paginate').hide();
                }
                else{
                    $('.dataTables_paginate').show();
                }
            }
        });
    }
    else if(tableId == 'maintainagentupgradeTable'){
        tableWidth = $('#maintainagentupgradeTableDiv')[0].offsetWidth - 200;
        $('#'+tableId).DataTable({
            "dom": 'rt<"bottom"lp>',
            "bSort": true,
            "scrollX": true,
            "language": {
                "paginate": {
                    "previous": "<",
                    "next": ">"
                }
            },
            'createdRow': function(row, data, dataIndex){
                for(i=0; i < data.length; i++){
                    $('td:eq('+i+')', row).css('min-width', (tableWidth/data.length)+'px');
                }
            },
            "pageLength": pageLength,
            stateSave: preserveState,
            destroy: true,
            "fnDrawCallback": function(oSettings) {
                if (oSettings.aiDisplay.length <= pageLength) {
                    $('.dataTables_paginate').hide();
                }
                else{
                    $('.dataTables_paginate').show();
                }
            }
        });
    }
    else if(tableId == 'subscriptionupgradeTable'){ 
        tableWidth = $('#subscriptionupgradeTableDiv')[0].offsetWidth - 200;
        $('#'+tableId).DataTable({
            "dom": 'rt<"bottom"lp>',
            "bSort": true,
            "scrollX": true,
            "language": {
                "paginate": {
                    "previous": "<",
                    "next": ">"
                }
            },
            'createdRow': function(row, data, dataIndex){
                for(i=0; i < data.length; i++){
                    $('td:eq('+i+')', row).css('min-width', (tableWidth/data.length)+'px');
                }
            },
            "pageLength": pageLength,
            stateSave: preserveState,
            destroy: true,
            "fnDrawCallback": function(oSettings) {
                if (oSettings.aiDisplay.length <= pageLength) {
                    $('.dataTables_paginate').hide();
                }
                else{
                    $('.dataTables_paginate').show();
                }
            }
        });
    }
    else{
        tableWidth = $('#'+tableId+'Div')[0].offsetWidth - 200;
        $('#'+tableId).DataTable({
            "dom": 'rt<"bottom"lp>',
            "bSort": true,
            "scrollX": true,
            "language": {
                "paginate": {
                    "previous": "<",
                    "next": ">"
                }
            },
            'createdRow': function(row, data, dataIndex){
                for(i=0; i < data.length; i++){
                    $('td:eq('+i+')', row).css('min-width', (tableWidth/data.length)+'px');
                }
            },
            "pageLength": pageLength,
            destroy: true,
            "fnDrawCallback": function(oSettings) {
                if (oSettings.aiDisplay.length <= pageLength) {
                    $('.dataTables_paginate').hide();
                }
                else{
                    $('.dataTables_paginate').show();
                }
            }
        });
    }
    $('.bottom').addClass('row');
    $('.dataTables_length').addClass('col-sm-6');
    $('.dataTables_paginate').addClass('col-sm-6');
}

function destroyDataTable(tableId){
    var table = $('#'+tableId).DataTable();
    console.log(table);
    table.destroy();
}

function removeDataTableRow(tableId, rowIndex){
    var table = $('#'+tableId).DataTable();
    table.row("#"+tableId+'TbodyTr_'+rowIndex).remove().draw(false);
}

function openCollapsible(btnId) {
    let el = document.getElementById(btnId);
    let collapsebleState = el.getAttribute('aria-expanded');
    if (collapsebleState === 'false') {
        el.click();
    }
}

function enableToolTip(){
    setTimeout(() => {
        $('[data-toggle="popover"]').popover(); // For tooltips
    }, 1000);
}

function extraLargeModal(currentView){
    $('#mediumModal').addClass('largeModal');
    $('#mediumModalContent').addClass('largeModalContent');
    $('#mediumModalContent').addClass('rounded-0');
    $('#mediumModalContent header').addClass('rounded-0');
    if(document.getElementsByClassName('table').length > 0){
        let tableInitial = currentView.toLowerCase();
        initTable(tableInitial+'Table', true);
    }
    
}

function medModal(currentView){
    $('#mediumModal').removeClass('largeModal');
    $('#mediumModalContent').removeClass('largeModalContent');
    $('#mediumModalContent').removeClass('rounded-0');
    $('#mediumModalContent header').removeClass('rounded-0');
}

