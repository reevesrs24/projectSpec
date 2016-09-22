
/* Starter JSON for tree */
var treeData = [
    {
        "name": "start",
        "id": 1,
    }
];


/* GLOBAL VARIABLES */
var nodeName = "";
var nodeId = "";

//D3.js script
function renderTree() {
    console.log("RENDERING");

    nodeName = "";
    nodeId = "";

    d3.select("svg").remove();

    var canvas = d3.select("#wireframe-tree")
        .append("svg")
        .attr("width", 1000)
        .attr("height", 325)
        .call(d3.behavior.zoom().on("zoom", function () {
            canvas.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")")
        }))
        .on("dblclick.zoom", null)
        .append("g")
        .attr("transform", "translate(10, 0)");


    var tree = d3.layout.tree()
        .size([300, 300]);

        var i = 0;

        var root = treeData[0];

        update(root);

        function update(source) {
            var nodes = tree.nodes(root).reverse();
            var links = tree.links(nodes);

            nodes.forEach(function(d) { d.y = d.depth * 180; });

            var node = canvas.selectAll(".node")
                .data(nodes)
                .enter()
                .append("g")
                .attr("class", "node")
                .attr("transform", function (d) {
                    return "translate(" + d.y + "," + d.x + ")";
                });

            node.append("circle")
                .attr("r", 8)
                .attr("fill", "steelblue")
                .on('click', function(d,i) {
                    // handle events here
                    // d - datum
                    // i - identifier or index
                    // this - the `<rect>` that was clicked
                    if (d3.select(this).attr("fill") == "steelblue") {
                        d3.selectAll(".node").selectAll("circle").attr("fill", "steelblue");
                        d3.select(this).attr("fill", "red");
                        nodeName = d.name;
                        nodeId = d.id;
                        console.log("NAME " + nodeName + " ID " + d.id);

                    }
                    else {
                        d3.select(this).attr("fill", "steelblue");
                        nodeName = "";
                        nodeId = "";
                    }


                });

            node.append("text")
                .attr("y", -13)
                .attr("x", -5)
                .attr("cursor", "pointer")
                .on('click', function(d, i) {
                    // handle events here
                    // d - datum
                    // i - identifier or index
                    // this - the `<rect>` that was clicked
                    console.log("TEXT CLICK ");
                    showWireframeModal(d.name, d.type, d.id);
                })
                .text(function (d) {
                    return d.name;
                });

            var diagonal = d3.svg.diagonal()
                .projection(function (d) {
                    return [d.y, d.x];
                });

            canvas.selectAll(".link")
                .data(links)
                .enter()
                .append("path")
                .attr("class", "link")
                .attr("fill", "none")
                .attr("stroke", "black")
                .attr("d", diagonal);



            canvas.append("path")
                .attr("fill", "none")
                .attr("stroke", "black");

        }

}

//Render the Tree on window load
renderTree();

function showWireframeModal(image, type, id) {

    console.log("TYPE " + type );
    //set img title
    $("#myModalLabel").text(image);

    image = image.replace(" ", "_").concat(".png");

    // set img src
    $("#wireframe-img-modal").attr('src', 'wireframe_images/' + image);

    //set img name to uuid
    $("#wireframe-img-modal").attr('name', id);

    $("#wireframe-img-modal").removeClass();

    //set img class by type
    if (type == "web")
        $("#wireframe-img-modal").addClass('wireframe-img-web');
    else
        $("#wireframe-img-modal").addClass('wireframe-img-mobile');

    if (image != "start.png")
        $('#myModal').modal('show')
}

//Delete node from tree
$("#delete-node").click(function(){

    var uuid = parseInt(document.getElementById("wireframe-img-modal").name);
    console.log("DELETE " + uuid);

    function traverse(treeArray, id) {

        if (treeArray.children) {
            for (var k in treeArray.children) {

                if (treeArray.children[k].id === id) {

                    treeArray.children.splice(k, 1);

                    renderTree();
                    break;

                } else if (treeArray.children.length) {
                    traverse(treeArray.children[k], id);
                }
            }
        }
    }

    var tree = treeData[0];

    traverse(tree, uuid);
});


//React.js script
var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
};

var PrevArrow = React.createClass({
    render: function() {
        return (
            <div className="col-sm-1 wireframe-left-button">
                <button className="btn btn-lg" onClick={this.props.onClick}>
                    <span className="glyphicon glyphicon-menu-left" aria-hidden="true"></span>
                </button>
            </div>
        );
    }

});


var NextArrow = React.createClass({

    render: function() {
        return (
            <div className="col-sm-1 wireframe-right-button">
                <button className="btn btn-lg" onClick={this.props.onClick}>
                    <span className="glyphicon glyphicon-menu-right" aria-hidden="true"></span>
                </button>
            </div>
        );
    }

});

var Wireframe = React.createClass ({
    updateTree: function() {

        var imgName = this.props.name.replace("_", " ").split(".")[0];

        function traverse(treeArray, id) {

            if (treeArray.children) {
                for (var k in treeArray.children) {
                        console.log("NAME " + treeArray.children[k].id);

                        if (treeArray.children[k].id === id) {

                            var rand = Math.floor(Math.random() * (100000 - 0) + 0);

                            if (treeArray.children[k].children) {

                                treeArray.children[k].children.push({
                                    "name": imgName,
                                    "id": rand,
                                    "type": type,
                                    "children": []
                                });
                            }
                            else
                                treeArray.children[k].children = [ {"name": imgName, "id": rand, "type": type} ];

                            renderTree();


                        } else if (treeArray.children.length) {
                            traverse(treeArray.children[k], id);
                        }
                }
            }
        }

        var type = this.props.type;
        console.log("TYPE " + this.props.type);
        var tree = treeData[0];

        if (nodeId != "")
            traverse(tree, nodeId, type);

        //If the user clicked on the "start" node
        if (nodeId == "1") {
            var rand = Math.floor(Math.random() * (100000 - 0) + 0);

            if (treeData[0].children) {

                console.log("RANDOM " + rand);
                treeData[0].children.push({
                    "name": imgName,
                    "id": rand,
                    "type": type,
                    "children": []
                });
            }
            else
                treeData[0].children = [{"name": imgName, "id": rand, "type": type}];
            renderTree();
        }

    },
    highlight: function() {

        var img = document.getElementById(this.props.id);

        console.log("IMG " + img);

        if ($(img).hasClass("wireframe-highlight")) {
            $(img).removeClass("wireframe-highlight");
        }
        else
            img.className += " wireframe-highlight";

    },
    render: function() {

        if (this.props.type === "web") {
            return (
                <div><img className="wireframe-img-web" onClick={this.highlight} id={this.props.id}
                          onDoubleClick={this.updateTree} src={"wireframe_images/" + this.props.name} /></div>
            );
        } else {
            return (
                <div><img className="wireframe-img-mobile" onClick={this.highlight} id={this.props.id}
                          onDoubleClick={this.updateTree} src={"wireframe_images/" + this.props.name}/></div>
            );
        }
    }
});


var ListWireframes = React.createClass ({


    render: function() {
        var rand = Math.random(1000);
        return (
                <Slider key={rand} className="slider-div"  {...settings} prevArrow={PrevArrow} nextArrow={NextArrow}>

                    {this.props.wireframes.map(function (item) {
                        console.log("DATA " + item.id);
                        if (item.app_type === "web")
                            return <div className="wireframe-img-div"><h1 className="wireframe-title-web">{item.name.replace("_", " ").split(".")[0]}</h1>
                                <Wireframe name={item.name} type={item.app_type} id={item.id}/> </div>
                        else
                            return <div className="wireframe-img-div"><h1 className="wireframe-title-mobile">{item.name.replace("_", " ").split(".")[0]}</h1>
                                <Wireframe name={item.name} type={item.app_type} id={item.id} /> </div>


                    }, this)}

                </Slider>
        );
    }
});

var SelectWireframeType = React.createClass ({
    getInitialState: function () {
        return this.state = { data: [{name: "blank.png"}], value: "", valueChanged: "", searchKey: ""};
    },
    getServerData: function(appType) {
        $.ajax({
            url: '/api/getWireframes',
            type: "POST",
            data: {app_type: appType},
            dataType: 'json',
            cache: false,
            success: function (json) {

                settings = {
                    dots: false,
                    infinite: false,
                    speed: 500,
                    slidesToShow: 3,
                    slidesToScroll: 3
                };

                this.setState({data: json});
            }.bind(this),
            error: function (xhr, status, err) {
            }.bind(this)
        });
    },
    componentDidMount: function () {
        this.getServerData("web");
        this.value = "web";
    },
    getServerJsonData: function(e) {
        this.getServerData(e.target.value);
        this.value = e.target.value;
    },
    searchWireframe: function(e) {
        console.log("SEARCH " + this.value);
        var dataList = document.getElementById('wireframe-list');

        if (e.target.value != "") {
            $.ajax({
                url: '/api/searchWireframes',
                type: "POST",
                data: {search: e.target.value, type: this.value},
                dataType: 'json',
                cache: false,
                success: function (json) {

                    //Remove all previously displayed options
                    var total = dataList.childElementCount;
                    for (var i = 0; i < total; i++) {
                        dataList.removeChild(dataList.firstChild);
                    }


                    // Loop over the JSON array and append new option values
                    for (var i = 0; i < json.length; i++) {

                        // Create a new <option> element.
                        var option = document.createElement('option');

                        // Set the value using the item in the JSON array.
                        option.value = json[i].name.replace("_", " ").split(".")[0];

                        // Add the <option> element to the <datalist>.
                        dataList.appendChild(option);
                    }

                }.bind(this),
                    error: function (xhr, status, err) {
                }.bind(this)
            });
        }

    },
    showWireframe: function() {
        var wireframeName = document.getElementById('wireframe-input').value;
        wireframeName = wireframeName.replace(" ", "_").concat(".png");

        console.log("VALUE " +  wireframeName);
        $.ajax({
            url: '/api/getWireframeByName',
            type: "POST",
            data: {name: wireframeName, type: this.value},
            dataType: 'json',
            cache: false,
            success: function (json) {

            var totalShow;

            switch (json.length) {
                case 1:
                    totalShow = 1;
                    break;

                case 2:
                    totalShow = 2;
                    break;

                default:
                    totalShow = 3;
                    break;

            }


            settings = {
                dots: false,
                infinite: false,
                speed: 500,
                slidesToShow: totalShow,
                slidesToScroll: 3
            };

            if (json.length != 0)
                this.setState({data: json});

            var switchClass = document.getElementsByClassName('wireframe-img-web');
            switchClass.className = "single-wireframe-img-web";

            }.bind(this),
                error: function (xhr, status, err) {
            }.bind(this)
        });

    },
    render: function() {
        return (
            <div>
                <header className="navbar bg-grey">
                    <section className="navbar-section">
                        <a href="#" className="navbar-brand">Wireframes</a>
                    </section>
                    <section className="navbar-section">
                        <div className="form-group" id="wireframes-options">
                            <select className="form-select" onChange={this.getServerJsonData} value={this.value}>
                                <option value="web">Web</option>
                                <option value="mobile">Mobile</option>
                                <option value="webAndMobile">Web + Mobile</option>
                            </select>
                        </div>
                    </section>
                    <section className="navbar-section">
                        <input type="text" className="form-input input-inline" id="wireframe-input" list="wireframe-list" placeholder="search"
                               onChange={this.searchWireframe} value={this.searchKey}/>
                        <datalist id="wireframe-list">
                        </datalist>
                        <a className="btn btn-primary" onClick={this.showWireframe}>Show</a>
                    </section>
                </header>
                    <ListWireframes wireframes={this.state.data}/>
            </div>
        );
    }
});

ReactDOM.render(
    <SelectWireframeType />,
    document.getElementById('wireframe-navbar')
);









