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

function initTable(tableId){
    if(tableId == 'viewTable'){
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
                    $('td:eq('+i+')', row).css('min-width', (840/data.length)+'px');
                }
            },
            "pageLength": 5,
            destroy: true
        });
    }
    else if(tableId == 'maintainagentupgradeTable'){
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
                    $('td:eq('+i+')', row).css('min-width', '120px');
                }
            },
            destroy: true
        });
    }
    else{
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
                    $('td:eq('+i+')', row).css('min-width', '100px');
                }
            },
            destroy: true
        });
    }
    $('.bottom').addClass('row');
    $('.dataTables_length').addClass('col-sm-6');
    $('.dataTables_paginate').addClass('col-sm-6');
}

function destroyDataTable(tableId){
    var table = $('#'+tableId).DataTable();
    table.destroy();
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

